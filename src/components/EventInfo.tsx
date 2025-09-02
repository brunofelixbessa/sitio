import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, MapPin, Navigation, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EventInfo() {
  const inclusions = [
    { icon: '🏡', title: 'Hospedagem', desc: 'Cama ou colchão para todos' },
    { icon: '🏊‍♂️', title: 'Piscina Aquecida', desc: 'Diversão garantida!' },
    { icon: '🍽️', title: 'Todas as Refeições', desc: 'Café, almoço e jantar' },
    { icon: '🍻', title: 'Bebidas Incluídas', desc: 'Alcoólicas e não alcoólicas' }
  ];

  const essentialItems = [
    { icon: '🛏️', item: 'Roupa de cama, mesa e banho' },
    { icon: '🧴', item: 'Produtos de higiene pessoal' },
    { icon: '👕', item: 'Roupas quentes (noite esfria)' },
    { icon: '🎃', item: 'Fantasia Halloween (opcional)' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="container mx-auto px-6">
        {/* What's Included */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            🎁 O que está incluso
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {inclusions.map((item, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="text-center p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* What to Bring */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 text-center">
                🎒 O que levar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {essentialItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl">{item.icon}</div>
                    <p className="text-gray-700 text-sm">{item.item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Entry */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 text-center">
                ⏰ Horários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-800">Entrada</h4>
                <p className="text-green-700">Sexta 17:00</p>
                <p className="text-sm text-gray-600">Apenas nomes cadastrados</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-gray-800">Saída</h4>
                <p className="text-red-700">Domingo</p>
                <p className="text-sm text-gray-600">Horário flexível</p>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 text-center">
                📍 Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button 
                  asChild
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <a 
                    href="https://maps.app.goo.gl/JHgzWUzC5ytmMBH26" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Google Maps</span>
                  </a>
                </Button>
                
                <Button 
                  asChild
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <a 
                    href="https://waze.com/ul/h6gz6c8xvm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Waze</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Rules */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-100 to-orange-100 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                ⚠️ Regra Importante
              </h3>
              <p className="text-lg text-red-600 mb-2">
                <strong>CONVIDADO NÃO CONVIDA!</strong>
              </p>
              <p className="text-red-600">
                O convite é pessoal. Quer chamar alguém? Fale comigo antes!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                💰 Investimento: R$ 250,00
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-800">PIX</h4>
                  <p className="text-2xl font-bold text-green-600">11986904544</p>
                  <p className="text-sm text-gray-600 mt-2">Avise no WhatsApp quando transferir</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-gray-800">Cartão</h4>
                  <p className="text-blue-600">Disponível com taxa</p>
                  <p className="text-sm text-gray-600 mt-2">Solicite o link pelo WhatsApp</p>
                </div>
              </div>
              
              <div className="mt-6 text-center bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-700 font-semibold">
                  🏃‍♂️ Apenas 36 vagas! Quem pagar primeiro garante o lugar!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}