import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Smartphone } from 'lucide-react';

export default function PaymentSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">
            💰 Informações de Pagamento
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Detalhes sobre investimento e formas de pagamento 💸
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Pricing Card */}
          <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center">
                💸 Investimento 💸
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-orange-400">
                R$ 250,00
              </div>
              <p className="text-xl text-gray-300">
                👦🏿👨🏻👩🏾👩🏻 Por pessoa
              </p>
              <div className="space-y-3">
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <p className="text-green-200">
                    <strong>Inclui:</strong> Hospedagem, todas as refeições, bebidas e piscina aquecida
                  </p>
                </div>
                <p className="text-gray-300">
                  Sexta-feira (17/10) à noite até Domingo (19/10)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center">
                💳 Formas de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-green-900/30 rounded-lg">
                <Smartphone className="w-8 h-8 text-green-400" />
                <div>
                  <h4 className="text-xl font-bold text-white">PIX</h4>
                  <p className="text-green-300 text-lg font-bold">11986904544</p>
                  <p className="text-sm text-gray-400">Avise no WhatsApp quando transferir</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-blue-900/30 rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-400" />
                <div>
                  <h4 className="text-xl font-bold text-white">Cartão de Crédito</h4>
                  <p className="text-blue-300">Disponível com taxa</p>
                  <p className="text-sm text-gray-400">Avise para enviar o link</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Payment Notice */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                🔊🔊 IMPORTANTE - PAGAMENTO
              </h3>
              <p className="text-lg text-red-200 mb-4">
                O sítio só tem <span className="font-bold text-red-400">36 vagas</span> então serão destinadas às pessoas que 
                <span className="font-bold text-red-400"> pagarem primeiro</span> sem exceção, nem que seja uma parte do valor com antecedência.
              </p>
              <p className="text-yellow-300 font-semibold">
                Como eu disse, as vagas são limitadas! Confirme o quanto antes! 🎃
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}