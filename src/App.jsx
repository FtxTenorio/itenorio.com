import "./App.css";

const App = () => {
  return (
    <div className="bg-gray-950 text-gray-200 flex items-center justify-center min-h-screen p-4">
      <main className="text-center space-y-8 max-w-2xl w-full">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
          I'm preparing something incredible for you. Follow the progress and stay connected through my social networks.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a 
            href="https://github.com/FtxTenorio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg"
          >
            <i className="fab fa-github text-2xl text-gray-300 hover:text-white"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/ftxtenorio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg"
          >
            <i className="fab fa-linkedin text-2xl text-gray-300 hover:text-white"></i>
          </a>
          <a 
            href="https://www.instagram.com/ftxtenorio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg"
          >
            <i className="fab fa-instagram text-2xl text-gray-300 hover:text-white"></i>
          </a>
          <a 
            href="https://www.twitch.tv/ftxtenorio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 shadow-lg"
          >
            <i className="fab fa-twitch text-2xl text-gray-300 hover:text-white"></i>
          </a>
        </div>
      </main>
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Paulo Tenório. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
