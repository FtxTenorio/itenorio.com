import { Tardis } from '../components/Tardis';
import { Navbar } from '../components/NavBar';

const MusicPage = () => {
  // Dados atualizados com as imagens em alta resolução e os links do Spotify
  const tracks = [
    { name: "bliss", artist: "milet", cover: "https://i.scdn.co/image/ab67616d0000b27382a3a2e9e3075e173b204eb2", link: "https://open.spotify.com/track/3UMRhdJ5UDK68YiW0AqDtH" },
    { name: "Do You Feel It?", artist: "Chaos Chaos", cover: "https://i.scdn.co/image/ab67616d0000b2732d50a845cd4b8d7863320bff", link: "https://open.spotify.com/track/3lOok0REf4j3790abX26PR" },
    { name: "Pompeii", artist: "Bastille", cover: "https://i.scdn.co/image/ab67616d0000b273b89cf022db28fa31376e0ed8", link: "https://open.spotify.com/track/6fNhZRFEkBfgW39W3wKARJ" },
    { name: "Riptide", artist: "Vance Joy", cover: "https://i.scdn.co/image/ab67616d0000b273d3ce97395ff522b0d70c1094", link: "https://open.spotify.com/track/7yq4Qj7cqayVTp3FF9CWbm" },
    { name: "Demons", artist: "Imagine Dragons", cover: "https://i.scdn.co/image/ab67616d0000b273407bd04707c463bbb3410737", link: "https://open.spotify.com/track/5qaEfEh1AtSdrdrByCP7qR" },
    { name: "Let Her Go", artist: "Passenger", cover: "https://i.scdn.co/image/ab67616d0000b273eb0b18cce8b7f5c9fc1579e7", link: "https://open.spotify.com/track/2pUpNOgJBIBCcjyQZQ00qU" },
    { name: "Sweater Weather", artist: "The Neighbourhood", cover: "https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921", link: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6" },
    { name: "Losing My Religion", artist: "R.E.M.", cover: "https://i.scdn.co/image/ab67616d0000b273e2dd4e821bcc3f70dc0c8ffd", link: "https://open.spotify.com/track/31AOj9sFz2gM0O3hMARRBx" },
    { name: "Wake Me Up", artist: "Avicii", cover: "https://i.scdn.co/image/ab67616d0000b273e14f11f796cef9f9a82691a7", link: "https://open.spotify.com/track/0nrRP2bk19rLc0orkWPQk2" },
    { name: "Somebody Told Me", artist: "The Killers", cover: "https://i.scdn.co/image/ab67616d0000b273ccdddd46119a4ff53eaf1f5d", link: "https://open.spotify.com/track/6PwjJ58I4t7Mae9xfZ9l9v" },
    { name: "This Love", artist: "Maroon 5", cover: "https://i.scdn.co/image/ab67616d0000b27392f2d790c6a97b195f66d51e", link: "https://open.spotify.com/track/6ECp64rv50XVz93WvxXMGF" },
    { name: "Blinding Lights", artist: "The Weeknd", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", link: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" }
  ];

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen">
      {/* Shared Components */}
      <Navbar />
      <Tardis />

      {/* Main Content */}
      <main className="content-wrapper px-4 pt-32 pb-24 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 glowing-text tracking-tight">
              My Playlist
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The tracks that inspire me and soundtrack my coding sessions.
            </p>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-6 bg-[#1DB954] rounded-sm"></span>
              Heavy Rotation
            </h2>
          </div>

          {/* Spotify-style Music Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {tracks.map((track, index) => (
              <a 
                key={index} 
                href={track.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121826] p-4 rounded-lg hover:bg-[#1a2235] transition-all duration-300 shadow-md border border-white/5 border-b-4 border-b-transparent hover:border-b-[#1DB954] group cursor-pointer flex flex-col no-underline"
              >
                <div className="relative mb-4">
                  <img 
                    src={track.cover} 
                    alt={track.name} 
                    className="w-full aspect-square object-cover rounded-md shadow-lg" 
                  />
                  {/* Play Button Overlay (Spotify Style) */}
                  <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl translate-y-2 group-hover:translate-y-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6 ml-1">
                      <path d="M6 4l15 8-15 8z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-bold text-base truncate" title={track.name}>
                  {track.name}
                </h3>
                <p className="text-gray-400 text-sm truncate mt-1" title={track.artist}>
                  {track.artist}
                </p>
              </a>
            ))}
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

export default MusicPage;