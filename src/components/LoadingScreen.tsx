import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingStages = [
  {
    icon: 'ri-loader-4-line',
    text: 'Analisando seu perfil...',
    step: 1
  },
  {
    icon: 'ri-map-pin-line',
    text: 'Buscando pessoas na sua região...',
    step: 2
  },
  {
    icon: 'ri-group-line',
    text: 'Encontrando perfis compatíveis...',
    step: 3
  },
  {
    icon: 'ri-heart-line',
    text: 'Preparando seus matches...',
    step: 4
  }
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.8; // 100% in 5 seconds (100 / (5000 / 40))
      });
    }, 40);

    // Stage transitions every 1.25 seconds
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= loadingStages.length - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1250);

    // Complete after 5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const stage = loadingStages[currentStage];

  return (
    <div className="min-h-screen gradient-gender flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Spinning Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg flex items-center justify-center">
              <i className={`${stage.icon} text-6xl text-white animate-spin`}></i>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {stage.text}
        </h2>

        {/* Step indicator */}
        <p className="text-white/70 text-sm mb-8">
          {stage.step} de 4 - Isso pode levar alguns segundos...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
