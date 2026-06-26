import { useEffect, useRef } from 'react';
import { Tardis } from '../components/Tardis';
import { Navbar } from '../components/NavBar';

// ==========================================
// MAIN COMPONENT (GAMES PAGE)
// ==========================================
const GamesPage = () => {
  const floatingItemsRef = useRef([]);

  // Physics loop strictly for items in floatingItemsRef (if any are added later)
  useEffect(() => {
    if (floatingItemsRef.current.length === 0) return;

    const elementsData = floatingItemsRef.current.map((el, index) => ({
      id: `item-${index}`,
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 120),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      parallaxSpeed: parseFloat(el.getAttribute('data-speed')) || 20
    }));

    const handleMouseMove = (e) => {
      updatePhysics(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const updatePhysics = (mouseX, mouseY) => {
    if (!floatingItemsRef.current.length) return;

    for (let i = 0; i < floatingItemsRef.current.length; i++) {
      let item = floatingItemsRef.current[i];
      item.x += item.vx;
      item.y += item.vy;

      if (item.x <= 0) { item.x = 0; item.vx *= -1; }
      if (item.x + 120 >= window.innerWidth) { item.x = window.innerWidth - 120; item.vx *= -1; }
      if (item.y <= 0) { item.y = 0; item.vy *= -1; }
      if (item.y + 120 >= window.innerHeight) { item.y = window.innerHeight - 120; item.vy *= -1; }
    }

    floatingItemsRef.current.forEach(item => {
      let xOffset = (window.innerWidth / 2 - mouseX) / item.parallaxSpeed;
      let yOffset = (window.innerHeight / 2 - mouseY) / item.parallaxSpeed;

      if (floatingItemsRef.current[item.id]) {
        floatingItemsRef.current[item.id].style.left = `${item.x}px`;
        floatingItemsRef.current[item.id].style.top = `${item.y}px`;
        floatingItemsRef.current[item.id].style.marginLeft = `${xOffset}px`;
        floatingItemsRef.current[item.id].style.marginTop = `${yOffset}px`;
      }
    });

    requestAnimationFrame(() => updatePhysics(mouseX, mouseY));
  };

  useEffect(() => {
    if (window.innerWidth > 0 && window.innerHeight > 0) {
      let initialMouseX = window.innerWidth / 2;
      let initialMouseY = window.innerHeight / 2;
      updatePhysics(initialMouseX, initialMouseY);
    }
  }, []);

  const games = [
    {
      name: "DAVE THE DIVER",
      played: "58.3 hours",
      achievements: "43/43",
      progress: 100,
      isPerfect: true,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1868140/81bdb3bce15d27ca1b4554a642d91096e89be229/header.jpg"
    },
    {
      name: "Enter the Gungeon",
      played: "49.9 hours",
      achievements: "54/54",
      progress: 100,
      isPerfect: true,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/311690/471d245bd8a37011c16852694342e5ad2d8a4667/header.jpg"
    },
    {
      name: "Crimson Desert",
      played: "142.1 hours",
      achievements: "3/34",
      progress: (3 / 34) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/3321460/abd7dbdeaede8b6c9a6d40bf116ff2b883f2dd45/header.jpg"
    },
    {
      name: "The Witcher 3: Wild Hunt",
      played: "125.5 hours",
      achievements: "35/78",
      progress: (35 / 78) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/292030/ad9240e088f953a84aee814034c50a6a92bf4516/header.jpg"
    },
    {
      name: "Sea of Thieves",
      played: "69.1 hours",
      achievements: "102/293",
      progress: (102 / 293) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1172620/579c6d544424019a032f4add98e8f923925c1cef/header.jpg"
    },
    {
      name: "Oxygen Not Included",
      played: "62.6 hours",
      achievements: "12/51",
      progress: (12 / 51) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/457140/header.jpg"
    },
    {
      name: "No Man's Sky",
      played: "10.5 hours",
      achievements: "5/27",
      progress: (5 / 27) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/275850/5f39cba0164881a53f6aee01f72180f7c619c011/header.jpg"
    },
    {
      name: "Resident Evil Village",
      played: "6 hours",
      achievements: "8/56",
      progress: (8 / 56) * 100,
      isPerfect: false,
      image: "https://shared.fastly.steamstatic.com/store_item_assets//steam/apps/1196590/header.jpg"
    }
  ];

  const renderGameCard = (game, index) => (
    <div 
      key={index} 
      className={`steam-card bg-[#141924] rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] border ${
        game.isPerfect 
          ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]' 
          : 'border-[rgba(255,255,255,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)]' 
      }`}
    >
      <div className="relative h-44 w-full">
        <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
        {game.isPerfect && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0b0f19] text-[10px] font-extrabold px-2 py-1 rounded shadow-lg flex items-center gap-1 uppercase tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Platinum
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between bg-gradient-to-t from-[#0d121c] to-[#141924]">
        <h3 className="text-lg font-bold text-[#e5e7eb] mb-3 truncate" title={game.name}>{game.name}</h3>
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs text-[#8f98a0]">
            <span className="uppercase font-semibold tracking-wider">Play Time</span>
            <span className="text-[#a3b1be] font-medium">{game.played}</span>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-center text-xs text-[#8f98a0] mb-1">
              <span className="uppercase font-semibold tracking-wider">Achievements</span>
              <span className="text-[#a3b1be]">{game.achievements}</span>
            </div>
            <div className="w-full h-1.5 bg-[#232936] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  game.isPerfect 
                    ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]' 
                    : 'bg-[#1A9FFF] shadow-[0_0_10px_rgba(26,159,255,0.5)]'
                }`}
                style={{ width: `${game.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Main Content */}
      <main className="content-wrapper px-4 text-center pt-32 pb-24 relative z-20">
        
        {/* Title and Steam Button Wrapper */}
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto mb-4">
          <h1 className="text-4xl md:text-6xl font-extrabold glowing-text tracking-tight text-center">
            My Favorite Games
          </h1>
          
          <div className="mt-6 md:mt-0 md:absolute md:right-0">
            <a 
              href="https://steamcommunity.com/id/ftxdante" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#171a21] to-[#1b2838] hover:from-[#1b2838] hover:to-[#2a475e] text-white text-sm font-semibold py-2.5 px-6 rounded-full shadow-[0_0_15px_rgba(26,159,255,0.4)] hover:shadow-[0_0_25px_rgba(26,159,255,0.6)] transition-all duration-300 border border-[#2a475e]"
            >
              My Steam
            </a>
          </div>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
          Stats and achievements of the games that are part of my journey.
        </p>

        {/* All Games Grid */}
        <div className="max-w-6xl mx-auto text-left mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => renderGameCard(game, index))}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full text-center mt-10">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Paulo Tenório. All rights reserved.
          </p>
        </div>
      </main>

      {/* Layout Base Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #0b0f19;
          color: #ffffff;
          overflow-x: hidden;
          margin: 0;
          height: 100vh;
        }

        .glowing-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5);
        }

        .content-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default GamesPage;