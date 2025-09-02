import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';

export function EventBanner() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 overflow-hidden">
      {/* Halloween Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎃</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">👻</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">🦇</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">🕷️</div>
        <div className="absolute top-1/2 left-1/4 text-3xl animate-bounce delay-700">💀</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-pulse delay-300">🕸️</div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/assets/WhatsApp Image 2025-09-01 at 23.19.01 (2).jpeg" 
          alt="Vista do sítio" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          {/* Event Badge */}
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-2 mb-4">
            ⚠️ SÍTIO 4.1 18/10/25 😎 ⚠️
          </Badge>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 bg-clip-text text-transparent drop-shadow-2xl">
            HALLOWEEN
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 drop-shadow-lg">
            Sitio do Bruno
          </h2>



          {/* Event Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-orange-200 shadow-lg">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="text-gray-800 font-bold text-lg mb-2">Quando</h3>
              <p className="text-orange-700">17, 18, 19</p>
              <p className="text-orange-700">Outubro 2025</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 shadow-lg">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-gray-800 font-bold text-lg mb-2">Onde</h3>
              <p className="text-purple-700">Sítio Exclusivo</p>
              <p className="text-purple-700">Piscina Aquecida 🏊‍♂️</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-red-200 shadow-lg">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="text-gray-800 font-bold text-lg mb-2">Vagas</h3>
              <p className="text-red-700">Apenas 36</p>
              <p className="text-red-700">Limitadas!</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <p className="text-2xl md:text-3xl text-gray-800 font-bold mb-4">
              E aí, tá afim de ir? ❓❔❓❔
            </p>
            <button 
              onClick={() => {
                const confirmSection = document.querySelector('[data-section="confirm-presence"]');
                if (confirmSection) {
                  confirmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl cursor-pointer"
            >
              Vamos Celebrar Juntos! 🎃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}