import { useState, useCallback } from 'react';

export type Step = 'welcome' | 'gender' | 'quiz' | 'loading' | 'profiles' | 'plans';

export function useNavigation() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [quizStep, setQuizStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useCallback((step: Step, delay = 150) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, delay);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep === 'welcome') {
        setCurrentStep('gender');
      } else if (currentStep === 'gender') {
        setCurrentStep('quiz');
      } else if (currentStep === 'quiz') {
        const maxQuizSteps = 8;
        if (quizStep < maxQuizSteps - 1) {
          setQuizStep(quizStep + 1);
        } else {
          setCurrentStep('loading');
        }
      } else if (currentStep === 'loading') {
        setCurrentStep('profiles');
      } else if (currentStep === 'profiles') {
        setCurrentStep('plans');
      }
      setIsTransitioning(false);
    }, 150);
  }, [currentStep, quizStep, isTransitioning]);

  const handleBack = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep === 'plans') {
        setCurrentStep('profiles');
      } else if (currentStep === 'profiles') {
        setCurrentStep('loading');
      } else if (currentStep === 'loading') {
        setCurrentStep('quiz');
      } else if (currentStep === 'quiz') {
        if (quizStep > 0) {
          setQuizStep(quizStep - 1);
        } else {
          setCurrentStep('gender');
        }
      } else if (currentStep === 'gender') {
        setCurrentStep('welcome');
      }
      setIsTransitioning(false);
    }, 150);
  }, [currentStep, quizStep, isTransitioning]);

  return {
    currentStep,
    quizStep,
    isTransitioning,
    navigate,
    handleNext,
    handleBack,
    setQuizStep
  };
}
