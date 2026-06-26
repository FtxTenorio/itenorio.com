import { useEffect, useState } from 'react';
import { Tardis } from '../components/Tardis';
import { Navbar } from '../components/NavBar';

// Expanded tech stack list with metadata, years of experience, and English descriptions
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

// Certification list with difficulty levels, issuers, and detailed meanings
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

// Visual component for signal strength bars
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

const StacksPage = () => {
  const [activeStack, setActiveStack] = useState(null);
  const [activeCert, setActiveCert] = useState(null);

  // Close modals when pressing Esc
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
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      <main className="content-wrapper px-4 pt-32 pb-24 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 glowing-text tracking-tight">
              My Arsenal
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              The core technologies, tools, and certifications that drive my work as a Backend Engineer.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              <div className="bg-[#121826] border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-medium text-gray-200 flex items-center gap-2 md:gap-3 shadow-lg text-center leading-snug">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Open to Work (Remote / Europe / UK)
              </div>
              
              <div className="bg-[#121826] border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-medium text-blue-400 flex items-center gap-2 shadow-lg text-center leading-snug">
                <i className="fas fa-laptop-code text-base md:text-lg shrink-0"></i>
                5+ Years of Experience
              </div>

              {/* Tag da faculdade ajustada para não ficar grossa no mobile */}
              <div className="bg-[#121826] border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-medium text-yellow-500 flex items-center justify-center gap-2 shadow-lg text-center leading-snug">
                <i className="fas fa-user-shield text-base md:text-lg shrink-0"></i>
                BSc Information Systems & PG Cybersecurity
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-24 mt-12">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-6 bg-[#ffc000] rounded-sm"></span>
                Certifications
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveCert(cert)}
                  className="bg-[#121826] flex flex-col items-center p-4 md:p-6 rounded-lg hover:-translate-y-2 transition-all duration-300 shadow-lg border border-white/5 border-b-4 border-b-[#ffc000] group cursor-pointer relative"
                >
                  <img src={cert.img} alt={cert.name} className="h-20 md:h-24 object-contain group-hover:scale-110 transition-transform duration-500" />
                  <p className="mt-4 text-xs md:text-sm font-semibold text-gray-200 text-center leading-tight">{cert.name}</p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-1 text-center">{cert.issuer}</p>
                  
                  {/* Click to expand hint - Sempre visível no mobile, aparece no hover em telas grandes */}
                  <span className="text-[10px] text-[#ffc000] mt-3 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-expand-alt"></i> Click for details
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a 
                href="https://www.credly.com/users/paulo-tenorio/badges" 
                target="_blank" 
                rel="noreferrer noopener"
                className="group flex items-center justify-center w-full max-w-xs sm:max-w-none sm:w-auto gap-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#ffc000] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base text-center"
              >
                <span>View Full Profile on Credly</span>
                <i className="fas fa-external-link-alt text-[#ffc000] group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-6 bg-[#0078d7] rounded-sm"></span>
                Tech Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {techStack.map((stack, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveStack(stack)}
                  className="bg-[#121826] rounded-lg p-4 md:p-6 hover:bg-[#1a2235] transition-colors duration-300 shadow-md border border-white/5 border-b-4 border-b-[#0078d7] flex flex-col items-center justify-center gap-3 cursor-pointer group relative"
                >
                  <img src={stack.icon} alt={stack.name} className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-center w-full">
                    <h3 className="text-sm md:text-md font-bold text-gray-200 text-center">{stack.name}</h3>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-1 text-center">{stack.years} {stack.years === 1 ? 'year' : 'years'} of exp.</p>
                  </div>
                  
                  {/* Click to expand hint - Sempre visível no mobile */}
                  <span className="text-[10px] text-[#0078d7] mt-1 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-expand-alt"></i> Click for details
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ========================================== */}
      {/* TECH STACK MODAL                           */}
      {/* ========================================== */}
      {activeStack && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveStack(null)}
        >
          <div 
            className="bg-[#121826] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveStack(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            <div className="flex items-center gap-4 mb-5 pr-6">
              <img src={activeStack.icon} alt={activeStack.name} className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">{activeStack.name}</h3>
                <span className="inline-block mt-1 bg-[#0078d7]/20 border border-[#0078d7]/30 text-[#0078d7] text-xs px-2.5 py-1 rounded-md font-semibold">
                  {activeStack.years} {activeStack.years === 1 ? 'Year' : 'Years'} of Experience
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2 text-left">Technical Scope</h4>
              <p className="text-gray-300 text-sm leading-relaxed text-left">{activeStack.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* CERTIFICATION MODAL                        */}
      {/* ========================================== */}
      {activeCert && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="bg-[#121826] border border-white/10 max-w-xl w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left border-b border-white/5 pb-5 pt-2 sm:pt-0">
              <img src={activeCert.img} alt={activeCert.name} className="h-20 w-20 md:h-24 md:w-24 object-contain shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{activeCert.name}</h3>
                <div className="flex justify-center sm:justify-start">
                  <SignalStrength difficulty={activeCert.difficulty} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#ffc000] tracking-wider mb-1.5 text-left">What it means</h4>
                <p className="text-gray-200 text-sm leading-relaxed text-left">{activeCert.meaning}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1.5 text-left">Requirements & Complexity</h4>
                <p className="text-gray-400 text-sm leading-relaxed text-left">{activeCert.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #0b0f19;
          color: #ffffff;
          overflow-x: hidden;
          margin: 0;
          height: 100vh;
        }

        .glowing-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2);
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        :global(.animate-fade-in) {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StacksPage;