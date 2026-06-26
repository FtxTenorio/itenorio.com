import { Tardis } from '../components/Tardis';
import { Navbar } from '../components/NavBar';

const StacksPage = () => {
  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Main Content */}
      <main className="content-wrapper px-4 pt-32 pb-24 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 glowing-text tracking-tight">
              My Arsenal
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              The core technologies, tools, and certifications that drive my work as a Backend Engineer.
            </p>

            {/* ========================================== */}
            {/* RECRUITER QUICK STATS (Visual Stats)       */}
            {/* ========================================== */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {/* Status Badge */}
              <div className="bg-[#121826] border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium text-gray-200 flex items-center gap-3 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Open to Work (Remote / Europe / UK)
              </div>
              
              {/* Experience Badge */}
              <div className="bg-[#121826] border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium text-blue-400 flex items-center gap-2 shadow-lg">
                <i className="fas fa-laptop-code text-lg"></i>
                5+ Years of Experience
              </div>

              {/* Education/Focus Badge */}
              <div className="bg-[#121826] border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium text-yellow-500 flex items-center gap-2 shadow-lg">
                <i className="fas fa-user-shield text-lg"></i>
                BSc Information Systems & PG Cybersecurity
              </div>
            </div>
          </div>

          {/* Certifications Section (Flagship) */}
          <div className="mb-24 mt-12">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-6 bg-[#ffc000] rounded-sm"></span>
                Certifications
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { name: "AWS Solutions Architect", img: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png" },
                { name: "AWS Associate", img: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png" },
                { name: "AWS AI Practitioner", img: "https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png" },
                { name: "AWS Cloud Practitioner", img: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" },
                { name: "Terraform Associate", img: "https://images.credly.com/images/0dc62494-dc94-469a-83af-e35309f27356/blob" }
              ].map((cert, index) => (
                <div 
                  key={index}
                  className="bg-[#121826] flex flex-col items-center p-6 rounded-lg hover:-translate-y-2 transition-all duration-300 shadow-lg border border-white/5 border-b-4 border-b-[#ffc000] group"
                >
                  <img src={cert.img} alt={cert.name} className="h-24 object-contain group-hover:scale-110 transition-transform duration-500" />
                  <p className="mt-4 text-sm font-semibold text-gray-300 text-center">{cert.name}</p>
                </div>
              ))}
            </div>

            {/* Credly Profile Button */}
            <div className="mt-10 flex justify-center">
              <a 
                href="https://www.credly.com/users/paulo-tenorio/badges" 
                target="_blank" 
                rel="noreferrer noopener"
                className="group flex items-center gap-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#ffc000] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
                { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
                { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" }
              ].map((stack, index) => (
                <div 
                  key={index} 
                  className="bg-[#121826] rounded-lg p-6 hover:bg-[#1a2235] transition-colors duration-300 shadow-md border border-white/5 border-b-4 border-b-[#0078d7] flex flex-col items-center justify-center gap-4"
                >
                  <img src={stack.icon} alt={stack.name} className="w-14 h-14" />
                  <h3 className="text-md font-bold text-gray-200">{stack.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 w-full text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Paulo Sérgio Rodrigues de Faria Tenório. All rights reserved.
          </p>
        </div>
      </main>

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
      `}</style>
    </div>
  );
};

export default StacksPage;