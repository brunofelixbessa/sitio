import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            📍 Como Chegar
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Localização do sítio e rotas para facilitar sua chegada! 🗺️
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Google Maps */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400 flex items-center space-x-2 justify-center">
                <MapPin className="w-6 h-6" />
                <span>Google Maps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-blue-900/30 p-6 rounded-lg">
                <div className="text-4xl mb-4">🗺️</div>
                <h4 className="text-xl font-bold text-white mb-4">Navegação Detalhada</h4>
                <p className="text-blue-200 mb-6">
                  Use o Google Maps para a rota mais precisa e atualizada até o sítio
                </p>
                <Button 
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold"
                >
                  <a 
                    href="https://maps.app.goo.gl/JHgzWUzC5ytmMBH26" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Abrir no Google Maps</span>
                  </a>
                </Button>
              </div>
              
              <div className="text-sm text-blue-200">
                💡 Recomendado para navegação GPS precisa
              </div>
            </CardContent>
          </Card>

          {/* Waze */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400 flex items-center space-x-2 justify-center">
                <Navigation className="w-6 h-6" />
                <span>Waze</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-purple-900/30 p-6 rounded-lg">
                <div className="text-4xl mb-4">🚗</div>
                <h4 className="text-xl font-bold text-white mb-4">Rota Inteligente</h4>
                <p className="text-purple-200 mb-6">
                  Use o Waze para evitar trânsito e encontrar a melhor rota em tempo real
                </p>
                <Button 
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg font-semibold"
                >
                  <a 
                    href="https://waze.com/ul/h6gz6c8xvm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Abrir no Waze</span>
                  </a>
                </Button>
              </div>
              
              <div className="text-sm text-purple-200">
                🚦 Ideal para evitar trânsito e radares
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Location Info */}
        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-orange-400 text-center">
              🚨 Informações Importantes sobre Localização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-900/30 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span>Chegada</span>
                </h4>
                <ul className="space-y-2 text-orange-200">
                  <li>• <strong>Horário:</strong> A partir das 17:00 (sexta)</li>
                  <li>• <strong>Entrada:</strong> Apenas nomes cadastrados</li>
                  <li>• <strong>Veículos:</strong> Somente carros autorizados</li>
                </ul>
              </div>
              
              <div className="bg-red-900/30 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-red-400" />
                  <span>Dicas de Navegação</span>
                </h4>
                <ul className="space-y-2 text-red-200">
                  <li>• Use os dois apps para comparar rotas</li>
                  <li>• Chegue com antecedência</li>
                  <li>• Mantenha o celular carregado</li>
                  <li>• Tenha o WhatsApp para contato</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-yellow-200">
                  <strong>💬 Dúvidas sobre localização?</strong> Entre em contato pelo WhatsApp: 
                  <span className="font-bold text-yellow-300"> 11986904544</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">🚀 Acesso Rápido</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <a 
                href="https://maps.app.goo.gl/JHgzWUzC5ytmMBH26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Google Maps</span>
              </a>
            </Button>
            
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <a 
                href="https://waze.com/ul/h6gz6c8xvm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Navigation className="w-5 h-5" />
                <span>Waze</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}