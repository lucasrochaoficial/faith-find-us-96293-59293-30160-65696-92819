import React from 'react';

interface PlansSectionProps {
  onBack: () => void;
}

const PlansSection: React.FC<PlansSectionProps> = ({ onBack }) => {
  const plans = [
    {
      name: 'ACESSO SEMANAL',
      price: 'R$ 6,00',
      duration: '7 dias de acesso',
      gradient: 'gradient-plan-1',
      features: [
        'Perfil completo + fotos',
        'Chat básico',
        'Suporte por email'
      ],
      link: 'https://www.ggcheckout.com/checkout/v2/WiGBZseqs4ELenJmf69s',
      popular: false
    },
    {
      name: 'ACESSO MENSAL',
      price: 'R$ 12,00',
      duration: '30 dias de acesso',
      gradient: 'gradient-plan-2',
      features: [
        'Matches ilimitados',
        'Chat + chamadas',
        'Grupos por estado',
        'Filtros avançados',
        'Suporte prioritário'
      ],
      link: 'https://www.ggcheckout.com/checkout/v2/GZLT1RH4NA87CJDvOKTv',
      popular: false
    },
    {
      name: 'ACESSO ANUAL',
      price: 'R$ 20,00',
      duration: 'Acesso VITALÍCIO',
      gradient: 'gradient-plan-3',
      features: [
        'Todos os recursos premium',
        '+5.000 materiais exclusivos',
        'Suporte 24h VIP',
        'Economia de 83%',
        'Acesso vitalício'
      ],
      link: 'https://www.ggcheckout.com/checkout/v2/JTXguUYPqmF6yR9BCGi9',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 pb-24">
      <div className="max-w-6xl mx-auto pt-6">
        {/* Header */}
        <button
          onClick={onBack}
          className="text-white bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors mb-6"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>

        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ACESSO
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            TINDER CRISTÃO
          </h1>
        </div>
        <p className="text-white/80 text-center text-xl mb-12">
          Escolha o melhor plano para você
        </p>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
            Veja Como Funciona
          </h2>
          <p className="text-white/80 text-center text-lg mb-6">
            Conheça nossa plataforma e veja casais que se formaram
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/QTvgTq9cq8E?autoplay=1&controls=1"
                title="Video Explicativo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl overflow-hidden shadow-2xl ${
                plan.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-center py-2">
                  <span className="text-sm font-bold text-white">⭐ MAIS POPULAR</span>
                </div>
              )}
              
              <div className={`${plan.gradient} p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/90 text-sm mb-4">{plan.duration}</p>
                <div className="text-5xl font-bold mb-2">{plan.price}</div>
              </div>

              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <i className="ri-check-line text-green-500 text-xl flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${plan.gradient} text-white py-4 rounded-xl text-center font-semibold hover:scale-105 transition-transform`}
                >
                  Assinar Agora
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="bg-green-500 rounded-3xl p-8 mb-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">🛡️ GARANTIA LEGAL</h2>
            <p className="text-xl mb-4">
              Conforme Código de Defesa do Consumidor
            </p>
            <p className="text-lg">
              Você tem o direito ao arrependimento em até 7 dias após a compra com reembolso integral.
              Sua satisfação é garantida por lei!
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Nossa Comunidade
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">27</div>
              <div className="text-white/80">Estados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5.000+</div>
              <div className="text-white/80">Membros</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-white/80">Grupos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
