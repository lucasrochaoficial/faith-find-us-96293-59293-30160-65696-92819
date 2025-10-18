import { useState, useCallback } from 'react';

export interface QuizData {
  gender: 'male' | 'female';
  age: string;
  city: string;
  religion: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
}

export function useQuizData() {
  const [quizData, setQuizData] = useState<Partial<QuizData>>({});

  const updateQuizData = useCallback((key: keyof QuizData, value: string) => {
    setQuizData(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetQuizData = useCallback(() => {
    setQuizData({});
  }, []);

  return {
    quizData,
    updateQuizData,
    resetQuizData
  };
}
