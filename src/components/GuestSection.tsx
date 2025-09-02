import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Users, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ShareGuestList } from './ShareGuestList';

interface Guest {
  id: string;
  name: string;
  socialLink: string;
  username: string;
  platform: string;
  confirmed: boolean;
}

interface GuestSectionProps {
  dynamicGuests?: Guest[];
  onGuestRemoved?: (guestId: string) => void;
  onGuestsImported?: (guests: Guest[]) => void;
}

export function GuestSection({ dynamicGuests = [], onGuestRemoved, onGuestsImported }: GuestSectionProps) {
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
                <div key={guest.id} className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors relative">
                  {onGuestRemoved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 w-6 h-6 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-60 hover:opacity-100 transition-all"
                      onClick={() => {
                        if (window.confirm(`Tem certeza que deseja remover ${guest.name} da lista de convidados?`)) {
                          onGuestRemoved(guest.id);
                          toast.success(`${guest.name} foi removido da lista de convidados.`);
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                  <div className="w-20 h-20 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {guest.name.split(' ').map(n => n[0]).join('')}
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



        {/* Share Guest List */}
        <ShareGuestList 
          guests={allGuests} 
          onGuestsImported={onGuestsImported || (() => {})} 
        />

      </div>
    </section>
  );
}