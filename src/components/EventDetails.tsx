import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function EventDetails() {
  const inclusions = [
    { icon: '🏡', title: 'Hospedagem', desc: 'Cama ou colchão para todos' },
    { icon: '🏊‍♂️', title: 'Piscina Aquecida', desc: 'Relaxe e se divirta!' },
    { icon: '🥖', title: 'Café da Manhã', desc: 'Completo todos os dias' },
    { icon: '🍝', title: 'Almoço', desc: 'Refeições deliciosas' },
    { icon: '🍗', title: 'Jantar', desc: 'Comida farta e saborosa' },
    { icon: '🍻', title: 'Bebidas Alcoólicas', desc: 'À vontade durante o evento' },
    { icon: '☕', title: 'Bebidas Não Alcoólicas', desc: 'Variedade de opções' },
    { icon: '🍹', title: 'Drinks Especiais', desc: 'Coquetéis temáticos' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
            Detalhes do Evento
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tudo organizado para você só se preocupar em se divertir! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Event Duration */}
          <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center">
                📅 Duração do Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-orange-400">
                3 DIAS
              </div>
              <p className="text-xl text-gray-300">
                De diversão completa
              </p>
              <div className="space-y-3">
                <div className="bg-orange-900/30 p-4 rounded-lg">
                  <p className="text-orange-200 text-lg">
                    <strong>Entrada:</strong> Sexta-feira (17/10) às 17:00<br/>
                    <strong>Saída:</strong> Domingo (19/10)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Highlights */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center">
                🎃 Destaques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-purple-900/30 rounded-lg">
                  <div className="text-3xl">🏊‍♂️</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Piscina Aquecida</h4>
                    <p className="text-purple-300">Diversão garantida!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-900/30 rounded-lg">
                  <div className="text-3xl">🎃</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Tema Halloween</h4>
                    <p className="text-blue-300">Fantasias bem-vindas!</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-indigo-900/30 rounded-lg">
                  <div className="text-3xl">👥</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Apenas 36 Vagas</h4>
                    <p className="text-indigo-300">Evento exclusivo!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What's Included */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-orange-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-4xl text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🎁 O que está incluso?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inclusions.map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                  <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Capacity Notice */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                🏡 Capacidade do Sítio
              </h3>
              <p className="text-lg text-red-200 mb-4">
                O sítio comporta <span className="font-bold text-red-400">36 pessoas</span> com acomodação garantida.
              </p>
              <p className="text-yellow-300 font-semibold">
                Após as 36 vagas, ainda é possível participar levando barraca ou colchão próprio.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}