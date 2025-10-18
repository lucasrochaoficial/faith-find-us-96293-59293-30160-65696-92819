import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen gradient-welcome flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }}></div>
        <div className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '50%', right: '10%', animationDelay: '1s' }}></div>
        <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '20%', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full gradient-button flex items-center justify-center shadow-2xl">
            <i className="ri-heart-fill text-5xl text-white"></i>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-pacifico text-center mb-4 gradient-text">
          Tinder Cristão
        </h1>
        <p className="text-center text-white text-xl mb-8 font-light">
          Onde a fé encontra o amor verdadeiro
        </p>

        {/* Info Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Pessoas esperando por você</p>
              <p className="text-white text-3xl font-bold">5.000+</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <i className="ri-user-heart-line text-3xl text-white"></i>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          Começar Jornada
          <i className="ri-arrow-right-line text-2xl"></i>
        </button>

        {/* Trust indicators */}
        <div className="mt-8 flex justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-1">
            <i className="ri-shield-check-line"></i>
            <span>Seguro</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-lock-line"></i>
            <span>Privado</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="ri-heart-line"></i>
            <span>Cristão</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
