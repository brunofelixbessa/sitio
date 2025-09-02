import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, UserX, MessageCircle, Sun } from 'lucide-react';

export default function ImportantRules() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-red-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-6">
            ⚠️ Regras Importantes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leia com atenção para garantir que tudo corra perfeitamente! 🎯
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Main Rule */}
          <Alert className="bg-gradient-to-r from-red-900/80 to-orange-900/80 border-red-500 backdrop-blur-sm">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <AlertDescription className="text-lg text-white">
              <strong className="text-red-400">LEMBRANDO QUE CONVIDADO NÃO CONVIDA!</strong>
              <br />
              O CONVITE É PRA VOCÊ! NÃO CHAME NINGUÉM...
              <br />
              <span className="text-yellow-300">CASO QUEIRA CHAMAR ALGUÉM, FALE COMIGO ANTES!!!</span>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Payment Rule */}
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-400 flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6" />
                  <span>Pagamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-yellow-200">
                  <strong>Vagas limitadas:</strong> Apenas 36 pessoas
                </p>
                <p className="text-yellow-200">
                  <strong>Critério:</strong> Quem pagar primeiro garante a vaga
                </p>
                <p className="text-yellow-200">
                  <strong>Exceções:</strong> Não há exceções, mesmo pagamento parcial antecipado
                </p>
                <div className="bg-yellow-900/30 p-4 rounded-lg">
                  <p className="text-sm text-yellow-100">
                    💡 <strong>Dica:</strong> Confirme o quanto antes para garantir sua vaga!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Accommodation Rule */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400 flex items-center space-x-2">
                  <UserX className="w-6 h-6" />
                  <span>Acomodação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-200">
                  <strong>36 vagas:</strong> Cama/colchão garantido
                </p>
                <p className="text-blue-200">
                  <strong>Após 36:</strong> Ainda pode ir, mas...
                </p>
                <p className="text-blue-200">
                  <strong>Traga:</strong> Barraca ou colchão próprio
                </p>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">
                    🏕️ <strong>Sem problemas:</strong> O importante é estar junto na festa!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Day Visit Rule */}
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400 flex items-center space-x-2">
                  <Sun className="w-6 h-6" />
                  <span>Visita Diária</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-green-200">
                  <strong>Só o dia:</strong> Não precisa pagar!
                </p>
                <p className="text-green-200">
                  <strong>Condição:</strong> Apenas comparecer
                </p>
                <p className="text-green-200">
                  <strong>Traga:</strong> Sua própria bebida
                </p>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <p className="text-sm text-green-100">
                    🍻 <strong>Importante:</strong> Quem vem só no dia deve trazer sua bebida!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400 flex items-center space-x-2 justify-center">
                <MessageCircle className="w-6 h-6" />
                <span>Contato e Dúvidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <div className="bg-green-900/30 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-green-300 mb-2">WhatsApp</h4>
                  <p className="text-2xl font-bold text-white">11986904544</p>
                  <p className="text-sm text-green-200">
                    Para confirmações, dúvidas e informações sobre pagamento
                  </p>
                </div>
                
                <div className="bg-teal-900/30 p-4 rounded-lg">
                  <p className="text-teal-200">
                    <strong>Lembre-se:</strong> Avise no WhatsApp quando fizer o PIX!
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-300 mb-4">
                  Bom é isso... kkkkkk 😄
                </p>
                <p className="text-xl font-bold text-orange-400">
                  Como eu disse, as vagas são limitadas! 🎃
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}