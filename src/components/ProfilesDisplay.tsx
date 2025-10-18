import React, { useState, useEffect, useMemo } from 'react';
import { QuizData } from '@/hooks/useQuizData';
import homem1825 from '@/assets/homem_18-25_anos.jpg';
import homem2635 from '@/assets/homem_26-35_anos.jpg';
import homem3655 from '@/assets/homem_36-55_anos.jpg';
import homem56 from '@/assets/homem_56.jpg';
import mulher1825 from '@/assets/mulher_18-25_anos.jpg';
import mulher2635 from '@/assets/mulher_26-35_anos.jpg';
import mulher3655 from '@/assets/mulher_36-55_anos.jpg';
import mulher56 from '@/assets/mulher_56.jpg';
// Blocked profile images - men
import blockedHomem1825_1 from '@/assets/blocked_homem_18-25_1.jpg';
import blockedHomem1825_2 from '@/assets/blocked_homem_18-25_2.jpg';
import blockedHomem1825_3 from '@/assets/blocked_homem_18-25_3.jpg';
import blockedHomem2635_1 from '@/assets/blocked_homem_26-35_1.jpg';
import blockedHomem2635_2 from '@/assets/blocked_homem_26-35_2.jpg';
import blockedHomem2635_3 from '@/assets/blocked_homem_26-35_3.jpg';
import blockedHomem3645_1 from '@/assets/blocked_homem_36-45_1.jpg';
import blockedHomem3645_2 from '@/assets/blocked_homem_36-45_2.jpg';
import blockedHomem3645_3 from '@/assets/blocked_homem_36-45_3.jpg';
import blockedHomem46_1 from '@/assets/blocked_homem_46_1.jpg';
import blockedHomem46_2 from '@/assets/blocked_homem_46_2.jpg';
import blockedHomem46_3 from '@/assets/blocked_homem_46_3.jpg';
// Blocked profile images - women
import blockedMulher1825_1 from '@/assets/blocked_mulher_18-25_1.jpg';
import blockedMulher1825_2 from '@/assets/blocked_mulher_18-25_2.jpg';
import blockedMulher1825_3 from '@/assets/blocked_mulher_18-25_3.jpg';
import blockedMulher2635_1 from '@/assets/blocked_mulher_26-35_1.jpg';
import blockedMulher2635_2 from '@/assets/blocked_mulher_26-35_2.jpg';
import blockedMulher2635_3 from '@/assets/blocked_mulher_26-35_3.jpg';
import blockedMulher3645_1 from '@/assets/blocked_mulher_36-45_1.jpg';
import blockedMulher3645_2 from '@/assets/blocked_mulher_36-45_2.jpg';
import blockedMulher3645_3 from '@/assets/blocked_mulher_36-45_3.jpg';
import blockedMulher46_1 from '@/assets/blocked_mulher_46_1.jpg';
import blockedMulher46_2 from '@/assets/blocked_mulher_46_2.jpg';
import blockedMulher46_3 from '@/assets/blocked_mulher_46_3.jpg';

interface ProfilesDisplayProps {
  onNext: () => void;
  onBack: () => void;
  quizData: Partial<QuizData>;
}

interface Profile {
  name: string;
  age: number;
  distance: string;
  state: string;
  interests: string[];
  imageUrl: string;
}

const ProfilesDisplay: React.FC<ProfilesDisplayProps> = ({ onNext, onBack, quizData }) => {
  const [imageError, setImageError] = useState(false);

  // Generate compatible profiles based on quiz data
  const compatibleProfiles = useMemo(() => {
    const profileGender = quizData.gender === 'male' ? 'female' : 'male';
    const userAge = quizData.age || '18-25';
    
    // Determine age range for profile images
    let ageRange = '';
    let imageUrl = '';
    let minAge = 18;
    let maxAge = 25;
    
    if (userAge === '18-25') {
      ageRange = '18-25';
      imageUrl = profileGender === 'male' ? homem1825 : mulher1825;
      minAge = 18;
      maxAge = 25;
    } else if (userAge === '26-35') {
      ageRange = '26-35';
      imageUrl = profileGender === 'male' ? homem2635 : mulher2635;
      minAge = 26;
      maxAge = 35;
    } else if (userAge === '36-45') {
      ageRange = '36-55';
      imageUrl = profileGender === 'male' ? homem3655 : mulher3655;
      minAge = 36;
      maxAge = 55;
    } else {
      ageRange = '56+';
      imageUrl = profileGender === 'male' ? homem56 : mulher56;
      minAge = 56;
      maxAge = 70;
    }

    // Generate interests based on quiz answers - now getting 4 badges
    const interests = ['Igreja'];
    if (quizData.question2?.includes('Música')) interests.push('Música');
    if (quizData.question2?.includes('Leitura')) interests.push('Leitura');
    if (quizData.question3?.includes('Viagens')) interests.push('Viagens');
    if (quizData.question4?.includes('Esportes')) interests.push('Esportes');
    if (quizData.question5?.includes('Oração')) interests.push('Oração');
    if (quizData.question1?.includes('Família')) interests.push('Família');
    if (quizData.question3?.includes('Aventura')) interests.push('Aventura');
    if (quizData.question2?.includes('Cinema')) interests.push('Cinema');

    // Random names database - larger pool for variety
    const maleFirstNames = [
      'João', 'Pedro', 'Lucas', 'Rafael', 'Felipe', 'Gabriel', 
      'Mateus', 'Bruno', 'Daniel', 'André', 'Carlos', 'Fernando',
      'Gustavo', 'Henrique', 'Igor', 'José', 'Leonardo', 'Marcelo'
    ];
    
    const maleLastNames = [
      'Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima',
      'Pereira', 'Ferreira', 'Rodrigues', 'Alves', 'Nascimento', 'Araújo'
    ];
    
    const femaleFirstNames = [
      'Maria', 'Ana', 'Juliana', 'Fernanda', 'Beatriz', 'Carolina',
      'Isabela', 'Camila', 'Amanda', 'Bruna', 'Larissa', 'Mariana',
      'Paula', 'Rafaela', 'Daniela', 'Gabriela', 'Letícia', 'Patrícia'
    ];
    
    const femaleLastNames = [
      'Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima',
      'Pereira', 'Ferreira', 'Rodrigues', 'Alves', 'Nascimento', 'Araújo'
    ];

    // Function to generate random name
    const generateRandomName = (gender: string) => {
      if (gender === 'male') {
        const firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
        const lastName = maleLastNames[Math.floor(Math.random() * maleLastNames.length)];
        return `${firstName} ${lastName}`;
      } else {
        const firstName = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
        const lastName = femaleLastNames[Math.floor(Math.random() * femaleLastNames.length)];
        return `${firstName} ${lastName}`;
      }
    };

    // Function to generate random age within range
    const generateRandomAge = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Select locked images based on age range
    let lockedImages: string[] = [];
    if (userAge === '18-25') {
      lockedImages = profileGender === 'male' 
        ? [blockedHomem1825_1, blockedHomem1825_2, blockedHomem1825_3]
        : [blockedMulher1825_1, blockedMulher1825_2, blockedMulher1825_3];
    } else if (userAge === '26-35') {
      lockedImages = profileGender === 'male' 
        ? [blockedHomem2635_1, blockedHomem2635_2, blockedHomem2635_3]
        : [blockedMulher2635_1, blockedMulher2635_2, blockedMulher2635_3];
    } else if (userAge === '36-45') {
      lockedImages = profileGender === 'male' 
        ? [blockedHomem3645_1, blockedHomem3645_2, blockedHomem3645_3]
        : [blockedMulher3645_1, blockedMulher3645_2, blockedMulher3645_3];
    } else {
      lockedImages = profileGender === 'male' 
        ? [blockedHomem46_1, blockedHomem46_2, blockedHomem46_3]
        : [blockedMulher46_1, blockedMulher46_2, blockedMulher46_3];
    }

    // Generate 4 profiles (1 unlocked + 3 locked) with random names and ages
    return Array.from({ length: 4 }, (_, index) => {
      let distance = '4.7 km';
      if (index === 1) distance = '2.2 km';
      if (index === 2) distance = '6.4 km';
      if (index === 3) distance = '7.9 km';
      
      return {
        name: generateRandomName(profileGender),
        age: generateRandomAge(minAge, maxAge),
        distance,
        state: quizData.city || 'SP',
        interests: interests.slice(0, 4), // Now showing 4 badges
        imageUrl: index === 0 ? imageUrl : lockedImages[index - 1],
        isLocked: index !== 0
      };
    });
  }, [quizData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-6">
        <button
          onClick={onBack}
          className="text-white bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors mb-6"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>

        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Encontramos {compatibleProfiles.length} Pessoas Compatíveis! 🎉
        </h1>
        <p className="text-white/80 mb-6 text-center">Essas pessoas do seu estado compartilham valores similares aos seus</p>

        {/* Profiles Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {compatibleProfiles.map((profile, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl relative">
              <div className="relative h-52">
                {!imageError && profile.imageUrl ? (
                  <img 
                    src={profile.imageUrl}
                    alt={profile.isLocked ? "Perfil bloqueado" : "Perfil compatível"}
                    className={`w-full h-full object-cover ${profile.isLocked ? 'blur-sm scale-110' : ''}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className={`w-full h-full ${profile.isLocked ? 'bg-gradient-to-br from-gray-300 to-gray-400' : 'bg-gradient-to-br from-pink-400 to-purple-500'} flex items-center justify-center`}>
                    <i className="ri-user-heart-line text-6xl text-white"></i>
                  </div>
                )}
                
                {!profile.isLocked ? (
                  <>
                    <div className="absolute top-3 right-3 bg-purple-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      {profile.distance}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white text-base font-bold mb-1">
                        {profile.name}, {profile.age}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                        <i className="ri-map-pin-line"></i>
                        {profile.state}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {profile.interests.map((interest, i) => (
                          <span key={i} className="bg-purple-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Locked profile overlay */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
                      <i className="ri-lock-fill text-5xl text-purple-600 mb-3"></i>
                      <p className="text-gray-800 text-base font-semibold">Perfil Bloqueado</p>
                      <p className="text-gray-600 text-xs mt-1 mb-3">Assine para ver</p>
                      
                      {/* Show partial info */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 mt-2">
                        <p className="text-gray-800 text-sm font-medium">{profile.name}, {profile.age}</p>
                        <p className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                          <i className="ri-map-pin-line"></i>
                          {profile.state} • {profile.distance}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Unlock Message */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg border border-white/30">
            <p className="text-xs text-center">
              <span className="text-gray-800 font-bold">💜 +{compatibleProfiles.filter(p => p.isLocked).length} perfis bloqueados.</span>
              <span className="text-white"> Desbloqueie todos os perfis e comece a conversar agora</span>
            </p>
          </div>
        </div>

        {/* Areas Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Nossas Áreas</h2>
          <p className="text-white/80 text-center mb-6">Conheça os espaços que preparamos para você</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Area 1 */}
            <div className="gradient-area-1 rounded-3xl p-6 text-white shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="mb-4">
                <img 
                  src="https://www.agvitrinebusiness.online/wp-content/uploads/2025/09/46803cf9bb44366c021692b7bc9ab55a.png"
                  alt="Área de Grupo"
                  className="w-full h-72 object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Área de Grupo</h3>
              <p className="text-white/90">Conecte-se com grupos da sua região</p>
            </div>

            {/* Area 2 */}
            <div className="gradient-area-2 rounded-3xl p-6 text-white shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="mb-4">
                <img 
                  src="https://www.agvitrinebusiness.online/wp-content/uploads/2025/09/2643c46506f9dcade6d686dfaaa80645.png"
                  alt="Área de Curso"
                  className="w-full h-72 object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Área de Curso</h3>
              <p className="text-white/90">Aprenda sobre relacionamentos cristãos</p>
            </div>

            {/* Area 3 */}
            <div className="gradient-area-3 rounded-3xl p-6 text-white shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="mb-4">
                <img 
                  src="https://www.agvitrinebusiness.online/wp-content/uploads/2025/09/e252348d223a1a8c46f2f7609838902d.png"
                  alt="Portal de Entrada"
                  className="w-full h-[28rem] object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Portal de Entrada</h3>
              <p className="text-white/90">Acesse eventos e encontros</p>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-16 pb-6 px-4 z-50 shadow-2xl">
        <div className="max-w-md mx-auto">
          <p className="text-center text-white text-sm mb-3">
            <span className="inline-flex items-center gap-1">
              <i className="ri-user-heart-line"></i>
              Milhares de cristãos esperando por você
            </span>
          </p>
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-4 px-8 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
          >
            <i className="ri-arrow-right-line text-xl"></i>
            Desbloquear Perfis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilesDisplay;
