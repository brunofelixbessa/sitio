// Utility functions for sharing guest data

import { Guest, loadGuestsFromStorage, saveGuestsToStorage } from './storageUtils';

/**
 * Export guests list to a shareable format
 */
export function exportGuestList(guests: Guest[]): string {
  try {
    // Create a data object with guests and metadata
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      guests: guests
    };
    
    // Convert to JSON string and encode for sharing
    const jsonData = JSON.stringify(exportData);
    return btoa(jsonData);
  } catch (error) {
    console.error('Erro ao exportar lista de convidados:', error);
    throw new Error('Não foi possível exportar a lista de convidados');
  }
}

/**
 * Import guests from a shared data string
 */
export function importGuestList(sharedData: string): Guest[] {
  try {
    // Decode and parse the shared data
    const jsonData = atob(sharedData);
    const importedData = JSON.parse(jsonData);
    
    // Validate the imported data
    if (!importedData.guests || !Array.isArray(importedData.guests)) {
      throw new Error('Formato de dados inválido');
    }
    
    // Return the guests array
    return importedData.guests as Guest[];
  } catch (error) {
    console.error('Erro ao importar lista de convidados:', error);
    throw new Error('Não foi possível importar a lista de convidados. Verifique se o código compartilhado está correto.');
  }
}

/**
 * Merge imported guests with existing guests
 */
export function mergeGuestLists(existingGuests: Guest[], importedGuests: Guest[]): Guest[] {
  // Create a map of existing guest IDs for quick lookup
  const existingIds = new Set(existingGuests.map(guest => guest.id));
  
  // Filter out duplicates from imported guests
  const newGuests = importedGuests.filter(guest => !existingIds.has(guest.id));
  
  // Merge the lists
  return [...existingGuests, ...newGuests];
}

/**
 * Import and merge guests from shared data
 */
export function importAndMergeGuests(sharedData: string): Guest[] {
  // Load existing guests
  const existingGuests = loadGuestsFromStorage();
  
  // Import new guests
  const importedGuests = importGuestList(sharedData);
  
  // Merge the lists
  const mergedGuests = mergeGuestLists(existingGuests, importedGuests);
  
  // Save the merged list
  saveGuestsToStorage(mergedGuests);
  
  return mergedGuests;
}