import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Instagram, Facebook, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import { processSocialInput, processSocialInputAsync, type SocialProfile } from '@/utils/socialUtils';
import { addGuestToBaserow } from '@/services/baserowGuestService';
import { isBaserowConfigured } from '@/lib/baserow';

interface Guest {
  id: string;
  name: string;
  socialLink: string;
  username: string;
  platform: string;
  confirmed: boolean;
}

interface ConfirmPresenceProps {
  onGuestAdded: (guest: Guest) => void;
}

export function ConfirmPresence({ onGuestAdded }: ConfirmPresenceProps) {
  const [name, setName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [baserowEnabled, setBaserowEnabled] = useState(false);
  
  // Verificar se o Baserow está configurado
  useEffect(() => {
    setBaserowEnabled(isBaserowConfigured());
  }, []);

  const detectSocialPlatform = (url: string): string => {
    if (url.includes('instagram.com') || url.includes('instagram')) return 'Instagram';
    if (url.includes('facebook.com') || url.includes('facebook')) return 'Facebook';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    return 'Social';
  };



  const validateSocialLink = (url: string): boolean => {
    const socialPatterns = [
      /instagram\.com\/[a-zA-Z0-9_.]+/,
      /facebook\.com\/[a-zA-Z0-9_.]+/,
      /twitter\.com\/[a-zA-Z0-9_]+/,
      /x\.com\/[a-zA-Z0-9_]+/,
      /@[a-zA-Z0-9_.]+/ // Handle @username format
    ];
    
    return socialPatterns.some(pattern => pattern.test(url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Por favor, insira seu nome');
      return;
    }
    
    if (!socialLink.trim()) {
      toast.error('Por favor, insira o link da sua rede social');
      return;
    }
    
    if (!validateSocialLink(socialLink)) {
      toast.error('Por favor, insira um link válido de rede social');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process social media input - try async version first for better Instagram support
      let socialProfile: SocialProfile;
      
      try {
        // Try to get real profile image (async)
        socialProfile = await processSocialInputAsync(socialLink.trim(), name.trim());
      } catch {
        // Fallback to synchronous version
        socialProfile = processSocialInput(socialLink.trim(), name.trim());
      }
      
      const newGuest: Guest = {
        id: Date.now().toString(),
        name: name.trim(),
        socialLink: socialLink.trim(),
        username: socialProfile.username,
        platform: socialProfile.platform,
        confirmed: true
      };
      
      // Adicionar ao Baserow se estiver configurado
      if (baserowEnabled) {
        try {
          const success = await addGuestToBaserow({
            name: newGuest.name,
            socialLink: newGuest.socialLink,
            platform: newGuest.platform,
            profileImage: socialProfile.profileImage || ''
          });
          
          if (!success) {
            toast.warning('Não foi possível salvar no servidor, mas seu nome foi adicionado localmente.');
          }
        } catch (error) {
          console.error('Erro ao adicionar convidado ao Baserow:', error);
          toast.warning('Não foi possível salvar no servidor, mas seu nome foi adicionado localmente.');
        }
      }
      
      // Adicionar localmente
      onGuestAdded(newGuest);
      
      // Reset form
      setName('');
      setSocialLink('');
      
      toast.success(`🎉 Presença confirmada! Bem-vindo(a), ${name}!`);
    } catch (error) {
      toast.error('Erro ao confirmar presença. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-section="confirm-presence" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-6">
        <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-orange-600" />
              Confirmar Presença
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Adicione seu nome e rede social para confirmar sua presença!
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Seu Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social" className="text-sm font-medium text-gray-700">
                  Link da Rede Social
                </Label>
                <Input
                  id="social"
                  type="text"
                  placeholder="@seuusuario ou link completo"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  disabled={isSubmitting}
                />
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Instagram className="w-3 h-3" />
                  <Facebook className="w-3 h-3" />
                  <Twitter className="w-3 h-3" />
                  <span>Instagram, Facebook ou Twitter</span>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Confirmando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Confirmar Presença
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}