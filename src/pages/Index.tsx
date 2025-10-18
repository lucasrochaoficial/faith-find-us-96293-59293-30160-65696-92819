import React from 'react';
import { useQuizData } from '@/hooks/useQuizData';
import { useNavigation } from '@/hooks/useNavigation';
import WelcomeScreen from '@/components/WelcomeScreen';
import GenderSelection from '@/components/GenderSelection';
import QuizFlow from '@/components/QuizFlow';
import LoadingScreen from '@/components/LoadingScreen';
import ProfilesDisplay from '@/components/ProfilesDisplay';
import PlansSection from '@/components/PlansSection';

const Index = () => {
  const { quizData, updateQuizData } = useQuizData();
  const { currentStep, quizStep, isTransitioning, handleNext, handleBack, navigate } = useNavigation();

  const handleGenderSelect = (gender: 'male' | 'female') => {
    updateQuizData('gender', gender);
    handleNext();
  };

  const handleAnswer = (key: string, value: string) => {
    updateQuizData(key as keyof typeof quizData, value);
  };

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleNext} />
      )}

      {currentStep === 'gender' && (
        <GenderSelection onSelect={handleGenderSelect} onBack={handleBack} />
      )}

      {currentStep === 'quiz' && (
        <QuizFlow
          step={quizStep}
          onNext={handleNext}
          onBack={handleBack}
          onAnswer={handleAnswer}
        />
      )}

      {currentStep === 'loading' && (
        <LoadingScreen onComplete={handleNext} />
      )}

      {currentStep === 'profiles' && (
        <ProfilesDisplay
          onNext={handleNext}
          onBack={handleBack}
          quizData={quizData}
        />
      )}

      {currentStep === 'plans' && (
        <PlansSection onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
