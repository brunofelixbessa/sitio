import React, { useState, useEffect } from 'react';
import { EventBanner } from '@/components/EventBanner';
import { VenueGallery } from '@/components/VenueGallery';
import { EventInfo } from '@/components/EventInfo';
import { GuestSection } from '@/components/GuestSection';
import { ConfirmPresence } from '@/components/ConfirmPresence';
import { Toaster, toast } from 'sonner';
import { fetchAllGuests } from '@/services/baserowGuestService';
import { isBaserowConfigured } from '@/lib/baserow';

interface Guest {
  id: string;
  name: string;
  socialLink: string;
  username: string;
  platform: string;
  profileImageUrl?: string;
  confirmed: boolean;
}

export default function Index() {
  const [dynamicGuests, setDynamicGuests] = useState<Guest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load guests from Baserow only
  useEffect(() => {
    const loadGuests = async () => {
      // Verifica se o Baserow está configurado
      if (isBaserowConfigured()) {
        try {
          // Carrega convidados do Baserow
          const baserowGuests = await fetchAllGuests();
          
          // Converte para o formato Guest com IDs
          const guestsWithIds = baserowGuests.map(guest => ({
            ...guest,
            id: guest.name, // Usar o nome como ID para simplificar
            username: guest.socialLink.startsWith('@') ? guest.socialLink.substring(1) : guest.socialLink,
            confirmed: true
          }));
          
          // Atualiza a lista de convidados
          setDynamicGuests(guestsWithIds);
        } catch (error) {
          console.error('Erro ao carregar dados do Baserow:', error);
          toast.error('Não foi possível carregar dados do servidor.');
          setDynamicGuests([]);
        }
      } else {
        // Se Baserow não estiver configurado, inicia com lista vazia
        setDynamicGuests([]);
      }
      setIsLoaded(true);
    };
    
    loadGuests();
  }, []);



  const handleGuestAdded = (guest: Guest) => {
    setDynamicGuests(prev => {
      const updatedGuests = [...prev, guest];
      return updatedGuests;
    });
  };

  const handleGuestRemoved = (guestId: string) => {
    setDynamicGuests(prev => {
      const updatedGuests = prev.filter(guest => guest.id !== guestId);
      return updatedGuests;
    });
  };

  const handleGuestsImported = (importedGuests: Guest[]) => {
    setDynamicGuests(importedGuests);
  };

  const reloadGuestsFromBaserow = async () => {
    if (isBaserowConfigured()) {
      try {
        const baserowGuests = await fetchAllGuests();
        const guestsWithIds = baserowGuests.map(guest => ({
          ...guest,
          id: guest.name,
          username: guest.socialLink.startsWith('@') ? guest.socialLink.substring(1) : guest.socialLink,
          confirmed: true
        }));
        setDynamicGuests(guestsWithIds);
      } catch (error) {
        console.error('Erro ao recarregar dados do Baserow:', error);
        toast.error('Não foi possível recarregar dados do servidor.');
      }
    }
  };

  // Show loading state while data is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <EventBanner />
      
      {/* Venue Gallery */}
      <VenueGallery />
      
      {/* Event Information */}
      <EventInfo />
      
      {/* Guest Section */}
      <GuestSection 
        dynamicGuests={dynamicGuests} 
        onGuestRemoved={handleGuestRemoved} 
        onGuestsImported={handleGuestsImported}
        onReloadGuests={reloadGuestsFromBaserow}
      />
      
      {/* Confirm Presence Form */}
      <ConfirmPresence onGuestAdded={handleGuestAdded} />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-4">
            <div className="pt-6 border-t border-gray-300">
              <p className="text-xs text-gray-500">
                Site criado com 🧡 para o evento mais especial do ano!
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}