import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AnalysisResult, 
  CandidateProfile, 
  InterviewSession, 
  RoleInput 
} from '../types';
import { 
  SEED_ANALYSIS_RESULT, 
  SEED_CANDIDATE_PROFILE, 
  SEED_INTERVIEW_SESSION,
  EMPTY_CANDIDATE_PROFILE
} from '../lib/seedData';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  candidateProfile: CandidateProfile;
  setCandidateProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  activeAnalysis: AnalysisResult;
  setActiveAnalysis: React.Dispatch<React.SetStateAction<AnalysisResult>>;
  allAnalyses: AnalysisResult[];
  activeInterview: InterviewSession;
  setActiveInterview: React.Dispatch<React.SetStateAction<InterviewSession>>;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  isAnalyzing: boolean;
  analysisProgressStep: number;
  runAnalysis: (input: RoleInput, forceDemo?: boolean) => Promise<AnalysisResult>;
  submitInterviewAnswer: (questionId: string, answerText: string) => Promise<any>;
  hasGeminiKey: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(EMPTY_CANDIDATE_PROFILE);
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisResult>(SEED_ANALYSIS_RESULT);
  const [allAnalyses, setAllAnalyses] = useState<AnalysisResult[]>([SEED_ANALYSIS_RESULT]);
  const [activeInterview, setActiveInterview] = useState<InterviewSession>(SEED_INTERVIEW_SESSION);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgressStep, setAnalysisProgressStep] = useState<number>(0);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);

  // Sync with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check server status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setHasGeminiKey(data.hasGeminiKey);
      })
      .catch(() => {
        setHasGeminiKey(false);
      });
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const runAnalysis = async (input: RoleInput, forceDemo?: boolean): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    setAnalysisProgressStep(1); // Reading job requirements

    // Visual step sequence
    const stepInterval = setInterval(() => {
      setAnalysisProgressStep((prev) => {
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 900);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleInput: input,
          candidateProfile,
          forceDemo: forceDemo ?? isDemoMode,
        }),
      });

      clearInterval(stepInterval);
      setAnalysisProgressStep(6); // Building career paths & finalizing

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.reason || errorData.error || 'Analysis request failed');
      }

      const data = await response.json();
      const result: AnalysisResult = data.analysis;

      setActiveAnalysis(result);
      setAllAnalyses((prev) => [result, ...prev.filter((a) => a.id !== result.id)]);

      // Create linked interview session
      try {
        const isDemo = result.isDemoMode || forceDemo || isDemoMode;
        const interviewRes = await fetch('/api/interview/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            analysisId: result.id,
            roleTitle: result.roleTitle,
            employer: result.employer,
            requirements: {
              matchedSkills: result.matchedSkills,
              partialSkills: result.partialSkills,
              missingSkills: result.missingSkills,
              claimEvidenceConflicts: result.claimEvidenceConflicts,
            },
            isDemoMode: isDemo,
          }),
        });

        if (interviewRes.ok) {
          const interviewData = await interviewRes.json();
          if (interviewData.session) {
            setActiveInterview(interviewData.session);
          }
        } else {
          throw new Error('Interview generation failed');
        }
      } catch (e) {
        console.warn('Interview generation error:', e);
        const isDemo = result.isDemoMode || forceDemo || isDemoMode;
        if (isDemo) {
          const fallbackSession = {
            ...SEED_INTERVIEW_SESSION,
            id: `interview-${Date.now()}`,
            roleId: result.id,
            roleTitle: result.roleTitle,
            employer: result.employer,
            currentQuestionIndex: 0,
          };
          setActiveInterview(fallbackSession);
        } else {
          throw new Error('Could not generate live interview questions. Please retry.');
        }
      }

      setIsAnalyzing(false);
      navigate(`/app/role/${result.id}`);
      return result;
    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      console.warn('Error during analysis:', err);
      throw err;
    }
  };

  const submitInterviewAnswer = async (questionId: string, answerText: string) => {
    const question = activeInterview.questions.find((q) => q.id === questionId);
    if (!question) return;

    try {
      const response = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeInterview.id,
          questionId,
          questionText: question.question,
          idealKeyPoints: question.idealKeyPoints,
          userResponse: answerText,
        }),
      });

      const data = await response.json();
      const evaluation = data.evaluation;

      setActiveInterview((prev) => {
        const updatedQuestions = prev.questions.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,
              userResponse: answerText,
              evaluation,
            };
          }
          return q;
        });

        const evaluatedQuestions = updatedQuestions.filter((q) => q.evaluation);
        const avgScore = evaluatedQuestions.length > 0
          ? Math.round(
              evaluatedQuestions.reduce((sum, q) => sum + (q.evaluation?.overallScore || 0), 0) /
                evaluatedQuestions.length
            )
          : undefined;

        return {
          ...prev,
          questions: updatedQuestions,
          overallInterviewScore: avgScore,
          updatedAt: new Date().toISOString(),
        };
      });

      return evaluation;
    } catch (err) {
      console.error('Failed to evaluate interview answer:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        candidateProfile,
        setCandidateProfile,
        activeAnalysis,
        setActiveAnalysis,
        allAnalyses,
        activeInterview,
        setActiveInterview,
        isDemoMode,
        setIsDemoMode,
        isAnalyzing,
        analysisProgressStep,
        runAnalysis,
        submitInterviewAnswer,
        hasGeminiKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
