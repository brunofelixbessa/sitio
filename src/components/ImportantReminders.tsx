import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Car, Thermometer, Package } from 'lucide-react';

export default function ImportantReminders() {
  const essentialItems = [
    { icon: '🛏️', item: 'Roupa de cama', desc: 'Lençóis, travesseiros, cobertores' },
    { icon: '🍽️', item: 'Roupa de mesa', desc: 'Toalhas e utensílios pessoais se necessário' },
    { icon: '🛁', item: 'Roupa de banho', desc: 'Toalhas de banho e rosto' },
    { icon: '🧴', item: 'Produtos de higiene', desc: 'Shampoo, sabonete, escova de dentes, etc.' },
    { icon: '👕', item: 'Blusas e casacos', desc: 'À noite a temperatura cai um pouco' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-red-900 to-purple-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
            📝 Lembretes Importantes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Não esqueça desses itens essenciais para aproveitar ao máximo! 🎒
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* What to Bring */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-blue-400 flex items-center space-x-2 justify-center">
                <Package className="w-8 h-8" />
                <span>Precisa Levar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {essentialItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-900/30 rounded-lg hover:bg-blue-800/30 transition-colors">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{item.item}</h4>
                      <p className="text-sm text-blue-200">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temperature & Entry Info */}
          <div className="space-y-8">
            {/* Temperature Warning */}
            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-400 flex items-center space-x-2 justify-center">
                  <Thermometer className="w-6 h-6" />
                  <span>Clima</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-orange-900/30 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-white mb-2">🌙 À Noite</h4>
                  <p className="text-orange-200 text-lg">A temperatura cai um pouco</p>
                  <p className="text-orange-300 font-semibold mt-2">
                    👕 Leve blusas e casacos!
                  </p>
                </div>
                <div className="text-sm text-orange-200">
                  Melhor prevenir do que passar frio! 🧥
                </div>
              </CardContent>
            </Card>

            {/* Entry Information */}
            <Card className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border-green-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400 flex items-center space-x-2 justify-center">
                  <Car className="w-6 h-6" />
                  <span>Entrada no Sítio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h4 className="text-xl font-bold text-white mb-2">🕔 Horário</h4>
                  <p className="text-2xl font-bold text-green-300">17:00</p>
                  <p className="text-green-200">Sexta-feira (17/10)</p>
                </div>
                
                <div className="bg-yellow-900/30 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-yellow-300 mb-2">⚠️ Importante</h4>
                  <p className="text-yellow-200 text-sm">
                    Só será liberada a entrada de <strong>carros e nomes previamente cadastrados</strong>
                  </p>
                  <p className="text-yellow-100 text-xs mt-2">
                    Certifique-se de que seu nome está na lista!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Checklist */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-purple-400 text-center">
              ✅ Checklist Rápido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💰</div>
                <p className="text-white font-semibold">Pagamento confirmado</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🛏️</div>
                <p className="text-white font-semibold">Roupas de cama</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🧴</div>
                <p className="text-white font-semibold">Produtos de higiene</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">👕</div>
                <p className="text-white font-semibold">Roupas quentes</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🚗</div>
                <p className="text-white font-semibold">Nome cadastrado</p>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎃</div>
                <p className="text-white font-semibold">Fantasia Halloween</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}