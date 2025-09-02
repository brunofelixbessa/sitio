import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function VenueGallery() {
  const images = [
    {
      src: "/assets/WhatsApp Image 2025-09-01 at 23.19.01 (2).jpeg",
      alt: "Área de descanso com vista panorâmica",
      title: "Área de Relaxamento"
    },
    {
      src: "/assets/WhatsApp Image 2025-09-01 at 23.19.03.jpeg",
      alt: "Piscina aquecida com cascata",
      title: "Piscina Aquecida"
    },
    {
      src: "/assets/WhatsApp Image 2025-09-01 at 23.19.01.jpeg",
      alt: "Vista externa do sítio",
      title: "Vista Externa"
    },
    {
      src: "/assets/WhatsApp Image 2025-09-01 at 23.19.02.jpeg",
      alt: "Área interna do sítio",
      title: "Área Interna"
    },
    {
      src: "/assets/WhatsApp Image 2025-09-01 at 23.19.01 (1).jpeg",
      alt: "Jardim e área verde",
      title: "Área Verde"
    },
    {
      src: "/assets/foto portao.png",
      alt: "Portão de entrada do sítio",
      title: "Entrada"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            📸 Conheça o Sítio
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Um lugar incrível com vista panorâmica, piscina aquecida e muito espaço para diversão! 🏞️
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4 flex-1 flex items-center justify-center">
                <h3 className="text-lg font-bold text-gray-800 text-center">{image.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🌟 Por que você vai amar este lugar?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                <div>
                  <div className="text-3xl mb-2">🏔️</div>
                  <h4 className="font-bold mb-2">Vista Incrível</h4>
                  <p className="text-sm">Paisagem montanhosa de tirar o fôlego</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🏊‍♂️</div>
                  <h4 className="font-bold mb-2">Piscina Aquecida</h4>
                  <p className="text-sm">Diversão garantida mesmo no friozinho</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🌿</div>
                  <h4 className="font-bold mb-2">Natureza Pura</h4>
                  <p className="text-sm">Ar puro e muito verde ao redor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}