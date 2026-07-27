import { useEffect, useState } from 'react';

// ==========================================
// DADOS
// ==========================================
const techStack = [
  { 
    name: "Node.js", 
    years: 5,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    description: "Used as the main engine for developing robust backend ecosystems, focusing on high scalability, event-driven architectures, and efficient asynchronous I/O manipulation."
  },
  { 
    name: "TypeScript", 
    years: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    description: "Implemented to ensure safe static typing, modularity, and maintainability in large-scale applications, drastically reducing runtime bugs."
  },
  { 
    name: "NestJS", 
    years: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    description: "Preferred framework for building structured corporate APIs and microservices, fully leveraging dependency injection and Clean Architecture patterns."
  },
  { 
    name: "AWS", 
    years: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    description: "Solid experience designing and deploying serverless and traditional infrastructures, integrating essential services like Lambda, SQS, DynamoDB, Cognito, CloudFront, and API Gateway."
  },
  { 
    name: "Docker", 
    years: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    description: "Continuous use for containerizing development and production environments, ensuring absolute parity across environments and optimizing CI/CD pipelines."
  },
  { 
    name: "Terraform", 
    years: 2,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    description: "Automated Infrastructure as Code (IaC) provisioning on AWS, maintaining replicable, modular, and secure states declaratively."
  },
  { 
    name: "Python", 
    years: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    description: "Applied in developing automation scripts, secondary data processing pipelines, and agile integrations with artificial intelligence tools."
  },
  { 
    name: "PostgreSQL", 
    years: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    description: "Modeling complex relational databases, query optimization, strategic index creation, and ensuring ACID transactional integrity."
  }
];

const certifications = [
  { 
    name: "AWS Solutions Architect", 
    issuer: "Amazon Web Services",
    difficulty: "hard", 
    img: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    meaning: "Validates advanced technical competency in designing robust, resilient, and economically optimized distributed systems within the AWS platform.",
    details: "One of the most respected cloud certifications, requiring deep knowledge in complex migration scenarios, multi-account security, hybrid networks, and global fault tolerance strategies."
  },
  { 
    name: "AWS Associate", 
    issuer: "Amazon Web Services",
    difficulty: "medium", 
    img: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
    meaning: "Certifies practical ability to implement, manage, and operate AWS cloud applications autonomously.",
    details: "Focuses heavily on fundamental compute, storage, database, and security concepts for day-to-day backend engineering tasks."
  },
  { 
    name: "AWS AI Practitioner", 
    issuer: "Amazon Web Services",
    difficulty: "easy", 
    img: "https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png",
    meaning: "Certifies understanding of Artificial Intelligence, Machine Learning concepts, and native AWS generative AI services.",
    details: "Covers practical use of tools like Amazon Bedrock, SageMaker, and language models, preparing professionals to align AI capabilities with business demands."
  },
  { 
    name: "AWS Cloud Practitioner", 
    issuer: "Amazon Web Services",
    difficulty: "easy", 
    img: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    meaning: "Foundational credential proving a holistic and general view of the entire AWS ecosystem and terminology.",
    details: "Ideal for solidifying concepts of billing, support, global security, and basic cloud architecture before advancing to highly specialized tracks."
  },
  { 
    name: "Terraform Associate", 
    issuer: "HashiCorp",
    difficulty: "medium", 
    img: "https://images.credly.com/images/0dc62494-dc94-469a-83af-e35309f27356/blob",
    meaning: "Official HashiCorp certification validating mastery of open-source Infrastructure as Code (IaC) concepts.",
    details: "Ensures the professional understands HCL file structure, state management (state files), creation of reusable modules, and secure execution of workflows via the Terraform CLI."
  }
];

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================
const SignalStrength = ({ difficulty }) => {
  const getBars = () => {
    switch(difficulty) {
      case 'easy':
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Easy">
            <div className="w-1.5 h-2 rounded-sm bg-green-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-white/10"></div>
            <div className="w-1.5 h-4 rounded-sm bg-white/10"></div>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Medium">
            <div className="w-1.5 h-2 rounded-sm bg-yellow-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-yellow-500"></div>
            <div className="w-1.5 h-4 rounded-sm bg-white/10"></div>
          </div>
        );
      case 'hard':
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Hard">
            <div className="w-1.5 h-2 rounded-sm bg-red-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-red-500"></div>
            <div className="w-1.5 h-4 rounded-sm bg-red-500"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getDifficultyLabel = () => {
    if (difficulty === 'easy') return <span className="text-green-400 text-xs font-semibold uppercase">Easy</span>;
    if (difficulty === 'medium') return <span className="text-yellow-400 text-xs font-semibold uppercase">Medium</span>;
    return <span className="text-red-400 text-xs font-semibold uppercase">Hard</span>;
  };

  return (
    <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-md border border-white/5">
      {getBars()}
      {getDifficultyLabel()}
    </div>
  );
};

// ==========================================
// PÁGINA PRINCIPAL
// ==========================================
const PortfolioPage = () => {
  const [activeStack, setActiveStack] = useState(null);
  const [activeCert, setActiveCert] = useState(null);

  // Fechar modais com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveStack(null);
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen font-sans mt-20">
      {/* Wrapper principal centralizado */}
      <main className="px-4 pt-12 pb-24 relative z-20 flex flex-col items-center">
        
        {/* === HERO SECTION === */}
        <div className="text-center mb-12 flex flex-col items-center max-w-3xl">
          {/* Foto e Badge OPENTOWORK */}
          <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105 z-20 bg-white/5">
            <img src="https://source-of-data.s3.sa-east-1.amazonaws.com/public/tenorio-logo.png" alt="Paulo Tenório" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <path d="M 0 50 A 50 50 0 0 0 100 50 L 86 50 A 36 36 0 0 1 14 50 Z" fill="#008139" opacity="0.95" />
                <path id="text-path" d="M 7 50 A 43 43 0 0 0 93 50" fill="none" />
                <text fontSize="8.5" fontWeight="bold" fill="white" letterSpacing="0.8">
                  <textPath href="#text-path" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                    #OPENTOWORK
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 glowing-text tracking-tight">
            Paulo Tenório
          </h1>
          <h2 className="text-lg md:text-xl text-gray-400 font-semibold mb-6">
            Senior Backend Engineer & Cloud Architect
          </h2>
          <p className="text-gray-300 text-base md:text-lg mx-auto leading-relaxed mb-8">
            I'm building a space to share my journey, my projects, and the things that make me, me.
            Delivering scalable software solutions and robust backend ecosystems for modern businesses.
          </p>

          {/* === BADGES RÁPIDOS === */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-gray-200 flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Open to Work (Remote / Europe / UK)
            </div>
            
            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-blue-400 flex items-center gap-2 shadow-lg">
              <i className="fas fa-laptop-code"></i>
              5+ Years of Experience
            </div>

            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-yellow-500 flex items-center gap-2 shadow-lg">
              <i className="fas fa-user-shield"></i>
              BSc Info Systems & PG Cybersecurity
            </div>
          </div>

          {/* === SOCIAL LINKS === */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="https://github.com/FtxTenorio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg">
              <i className="fab fa-github text-lg text-gray-300 hover:text-white"></i>
            </a>
            <a href="https://www.linkedin.com/in/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-lg">
              <i className="fab fa-linkedin text-lg text-gray-300 hover:text-white"></i>
            </a>
            <a href="https://www.instagram.com/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-pink-700 hover:scale-110 transition-all duration-300 shadow-lg">
              <i className="fab fa-instagram text-lg text-gray-300 hover:text-white"></i>
            </a>
          </div>
        </div>

        {/* === SEÇÃO: CERTIFICAÇÕES === */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-20">
          <div className="flex items-center justify-center mb-8 border-b border-white/10 pb-4 w-full">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#ffc000] rounded-sm"></span>
              Certifications
            </h2>
          </div>
          
          {/* Flex Wrap centraliza os itens e não os estica */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 w-full">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                onClick={() => setActiveCert(cert)}
                className="w-36 md:w-40 bg-[#121826] flex flex-col items-center p-4 rounded-xl hover:-translate-y-2 transition-all duration-300 shadow-lg border border-white/5 border-b-4 border-b-[#ffc000] group cursor-pointer"
              >
                <img src={cert.img} alt={cert.name} className="h-16 md:h-20 object-contain group-hover:scale-110 transition-transform duration-500" />
                <p className="mt-3 text-xs md:text-sm font-semibold text-gray-200 text-center leading-tight">{cert.name}</p>
                
                <span className="text-[10px] text-[#ffc000] mt-2 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-expand-alt"></i> Details
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://www.credly.com/users/paulo-tenorio/badges" 
              target="_blank" 
              rel="noreferrer noopener"
              className="group flex items-center justify-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#ffc000] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm"
            >
              <span>View Credly Profile</span>
              <i className="fas fa-external-link-alt text-[#ffc000] group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        {/* === SEÇÃO: TECH STACK === */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-12">
          <div className="flex items-center justify-center mb-8 border-b border-white/10 pb-4 w-full">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#0078d7] rounded-sm"></span>
              Tech Arsenal
            </h2>
          </div>

          {/* Flex Wrap centraliza os itens e limita a largura */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
            {techStack.map((stack, index) => (
              <div 
                key={index} 
                onClick={() => setActiveStack(stack)}
                className="w-28 md:w-32 bg-[#121826] rounded-xl p-4 hover:bg-[#1a2235] transition-colors duration-300 shadow-md border border-white/5 border-b-4 border-b-[#0078d7] flex flex-col items-center justify-center gap-2 cursor-pointer group"
              >
                <img src={stack.icon} alt={stack.name} className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-center w-full mt-1">
                  <h3 className="text-xs md:text-sm font-bold text-gray-200">{stack.name}</h3>
                  <p className="text-[9px] md:text-[10px] text-gray-400 mt-0.5">{stack.years} {stack.years === 1 ? 'yr' : 'yrs'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ==========================================
          MODAIS GLOBAIS
          ========================================== */}
      
      {/* MODAL TECH STACK */}
      {activeStack && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveStack(null)}
        >
          <div 
            className="bg-[#121826] border border-white/10 max-w-sm w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveStack(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <div className="flex items-center gap-4 mb-5 pr-6">
              <img src={activeStack.icon} alt={activeStack.name} className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">{activeStack.name}</h3>
                <span className="inline-block mt-1 bg-[#0078d7]/20 border border-[#0078d7]/30 text-[#0078d7] text-[10px] px-2 py-1 rounded-md font-semibold uppercase tracking-wider">
                  {activeStack.years} {activeStack.years === 1 ? 'Year' : 'Years'} Exp.
                </span>
              </div>
            </div>
            <div className="border-t border-white/5 pt-4">
              <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-2 text-left">Technical Scope</h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-left">{activeStack.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CERTIFICAÇÃO */}
      {activeCert && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="bg-[#121826] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left border-b border-white/5 pb-5 pt-2 sm:pt-0">
              <img src={activeCert.img} alt={activeCert.name} className="h-16 w-16 md:h-20 md:w-20 object-contain shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{activeCert.name}</h3>
                <div className="flex justify-center sm:justify-start">
                  <SignalStrength difficulty={activeCert.difficulty} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase text-[#ffc000] tracking-wider mb-1 text-left">What it means</h4>
                <p className="text-gray-200 text-xs md:text-sm leading-relaxed text-left">{activeCert.meaning}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1 text-left">Requirements</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-left">{activeCert.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        .glowing-text {
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        :global(.animate-fade-in) {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;