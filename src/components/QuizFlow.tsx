import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuizFlowProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
  onAnswer: (key: string, value: string) => void;
}

const questions = [
  {
    key: 'age',
    title: 'Qual é a sua idade?',
    options: ['18-25', '26-35', '36-45', '46-55', '56+']
  },
  {
    key: 'city',
    title: 'Em qual estado você mora?',
    isDropdown: true,
    options: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
  },
  {
    key: 'religion',
    title: 'Qual é a sua denominação religiosa?',
    options: ['Evangélica', 'Católica', 'Protestante', 'Adventista']
  },
  {
    key: 'question1',
    title: 'Você frequenta igreja regularmente?',
    options: ['Sim, sempre', 'Às vezes', 'Raramente', 'Não']
  },
  {
    key: 'question2',
    title: 'O que você busca?',
    options: ['Sim, casamento', 'Namoro sério', 'Conhecer pessoas', 'Amizade']
  },
  {
    key: 'question3',
    title: 'Qual a importância da fé para você?',
    options: ['Muito importante', 'Importante', 'Pouco importante', 'Indiferente']
  },
  {
    key: 'question4',
    title: 'Você gostaria de orar junto com seu parceiro(a)?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca']
  },
  {
    key: 'question5',
    title: 'Sobre ter filhos:',
    options: ['Tenho filhos', 'Quero ter', 'Talvez futuramente', 'Não quero']
  }
];

const QuizFlow: React.FC<QuizFlowProps> = ({ step, onNext, onBack, onAnswer }) => {
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleOptionClick = (value: string) => {
    onAnswer(currentQuestion.key, value);
    setTimeout(onNext, 150);
  };

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
    onAnswer(currentQuestion.key, value);
    setTimeout(onNext, 150);
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(currentQuestion.key, textValue);
      setTimeout(onNext, 150);
    }
  };

  const isLastQuestion = step === questions.length - 1;

  return (
    <div className="min-h-screen gradient-gender flex flex-col items-center justify-center p-4">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 p-4">
        <div className="max-w-md mx-auto bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
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
        <div className="text-center mb-8">
          <p className="text-white/80 text-sm mb-2">
            Pergunta {step + 1} de {questions.length}
          </p>
          <h2 className="text-3xl font-bold text-white">
            {currentQuestion.title}
          </h2>
        </div>

        {currentQuestion.isDropdown ? (
          <div className="space-y-4">
            <Select onValueChange={handleDropdownChange} value={selectedValue}>
              <SelectTrigger className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-white/50 h-auto">
                <SelectValue placeholder="Selecione seu estado" className="text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/20 max-h-[300px]">
                {currentQuestion.options?.map((option, index) => (
                  <SelectItem key={index} value={option} className="text-lg py-3 cursor-pointer hover:bg-purple-100">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white text-lg font-medium hover:bg-white/20 hover:scale-105 transition-all duration-200 text-left flex items-center justify-between"
              >
                {option}
                <i className="ri-arrow-right-line text-xl"></i>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizFlow;
