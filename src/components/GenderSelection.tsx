import React from 'react';

interface GenderSelectionProps {
  onSelect: (gender: 'male' | 'female') => void;
  onBack: () => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen gradient-gender flex flex-col items-center justify-center p-4">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 p-4">
        <div className="max-w-md mx-auto bg-white/20 rounded-full h-2 overflow-hidden">
          <div className="bg-white h-full w-[12.5%] transition-all duration-300"></div>
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-4 text-white bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <i className="ri-arrow-left-line text-xl"></i>
      </button>

      <div className="max-w-md w-full">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Qual é o seu gênero?
        </h2>
        <p className="text-white/90 text-center mb-10 text-lg">
          Responda algumas perguntas rápidas para encontrarmos sua alma gêmea. É fácil, rápido e pode mudar sua vida!
        </p>

        <div className="space-y-4">
          {/* Male button */}
          <button
            onClick={() => onSelect('male')}
            className="w-full gradient-male text-white py-8 px-6 rounded-3xl text-2xl font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-4"
          >
            <i className="ri-men-line text-4xl"></i>
            Masculino
          </button>

          {/* Female button */}
          <button
            onClick={() => onSelect('female')}
            className="w-full gradient-female text-white py-8 px-6 rounded-3xl text-2xl font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-4"
          >
            <i className="ri-women-line text-4xl"></i>
            Feminino
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
