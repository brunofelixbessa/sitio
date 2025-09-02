// Utility functions for localStorage management

export interface Guest {
  id: string;
  name: string;
  socialLink: string;
  username: string;
  platform: string;
  profileImageUrl?: string;
  confirmed: boolean;
  pago?: boolean;
}

const STORAGE_KEY = 'halloween-guests';

/**
 * Save guests list to localStorage
 */
export function saveGuestsToStorage(guests: Guest[]): void {
  try {
    const guestsData = JSON.stringify(guests);
    localStorage.setItem(STORAGE_KEY, guestsData);
  } catch (error) {
    console.error('Erro ao salvar convidados no localStorage:', error);
  }
}

/**
 * Load guests list from localStorage
 */
export function loadGuestsFromStorage(): Guest[] {
  try {
    const guestsData = localStorage.getItem(STORAGE_KEY);
    if (guestsData) {
      return JSON.parse(guestsData) as Guest[];
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar convidados do localStorage:', error);
    return [];
  }
}

/**
 * Clear all guests from localStorage
 */
export function clearGuestsFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar convidados do localStorage:', error);
  }
}

/**
 * Initialize with empty guest list (clear existing data)
 */
export function initializeEmptyGuestList(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Erro ao inicializar lista vazia:', error);
  }
}

/**
 * Add a single guest to storage
 */
export function addGuestToStorage(guest: Guest): Guest[] {
  const currentGuests = loadGuestsFromStorage();
  const updatedGuests = [...currentGuests, guest];
  saveGuestsToStorage(updatedGuests);
  return updatedGuests;
}

/**
 * Remove a guest from storage by ID
 */
export function removeGuestFromStorage(guestId: string): Guest[] {
  const currentGuests = loadGuestsFromStorage();
  const updatedGuests = currentGuests.filter(guest => guest.id !== guestId);
  saveGuestsToStorage(updatedGuests);
  return updatedGuests;
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}