import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Instagram, Users } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  socialLink: string;
  username: string;
  platform: string;
  avatar: string;
  profileImageUrl?: string;
  confirmed: boolean;
}

interface GuestSectionProps {
  dynamicGuests?: Guest[];
}

export function GuestSection({ dynamicGuests = [] }: GuestSectionProps) {
  // Usar apenas convidados dinâmicos (reais)
  const allGuests = dynamicGuests;

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            👥 Lista de Convidados
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Galera confirmada para a festa! 🎉
          </p>
          
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{allGuests.length}</div>
              <div className="text-green-700">Confirmados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{36 - allGuests.length}</div>
              <div className="text-red-700">Vagas Restantes</div>
            </div>
          </div>
        </div>

        {/* Confirmed Guests */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-600 flex items-center justify-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Confirmados ✅</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {allGuests.map((guest) => (
                <div key={guest.id} className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div 
                    className="cursor-pointer" 
                    onClick={() => {
                      if (guest.socialLink) {
                        // Se o link já é uma URL completa, use diretamente
                        if (guest.socialLink.startsWith('http')) {
                          window.open(guest.socialLink, '_blank');
                        } else if (guest.socialLink.startsWith('@')) {
                          // Se é um username, construa a URL baseada na plataforma
                          const username = guest.socialLink.replace('@', '');
                          let url = '';
                          if (guest.platform === 'Instagram') {
                            url = `https://instagram.com/${username}`;
                          } else if (guest.platform === 'Facebook') {
                            url = `https://facebook.com/${username}`;
                          } else if (guest.platform === 'Twitter') {
                            url = `https://twitter.com/${username}`;
                          }
                          if (url) window.open(url, '_blank');
                        } else {
                          // Fallback: tente construir URL do Instagram
                          window.open(`https://instagram.com/${guest.socialLink}`, '_blank');
                        }
                      }
                    }}
                  >
                    <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-green-500 hover:ring-4 hover:ring-green-400 transition-all">
                      <AvatarImage src={guest.profileImageUrl || guest.avatar} alt={guest.name} />
                      <AvatarFallback className="bg-green-500 text-white text-lg">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h4 className="text-gray-800 font-semibold mb-1">{guest.name}</h4>
                  <div className="flex items-center justify-center space-x-1 text-sm text-green-600 cursor-pointer hover:text-green-800"
                       onClick={() => {
                         if (guest.socialLink) {
                           if (guest.socialLink.startsWith('http')) {
                             window.open(guest.socialLink, '_blank');
                           } else if (guest.socialLink.startsWith('@')) {
                             const username = guest.socialLink.replace('@', '');
                             let url = '';
                             if (guest.platform === 'Instagram') {
                               url = `https://instagram.com/${username}`;
                             } else if (guest.platform === 'Facebook') {
                               url = `https://facebook.com/${username}`;
                             } else if (guest.platform === 'Twitter') {
                               url = `https://twitter.com/${username}`;
                             }
                             if (url) window.open(url, '_blank');
                           } else {
                             window.open(`https://instagram.com/${guest.socialLink}`, '_blank');
                           }
                         }
                       }}>
                    <Instagram className="w-4 h-4" />
                    <span>{guest.username || guest.socialLink}</span>
                  </div>
                  <Badge className="bg-green-500 text-white mt-2">
                    Confirmado
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Contact for Guest List */}

      </div>
    </section>
  );
}