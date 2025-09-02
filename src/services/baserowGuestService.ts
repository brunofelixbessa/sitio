import { Guest } from '../utils/storageUtils';
import { BASEROW_API_URL, BASEROW_TABLE_ID, getBaserowHeaders, isBaserowConfigured } from '../lib/baserow';

// Interface for Baserow guest record
interface BaserowGuest {
  id: number;
  name: string;
  socialLink: string;
  platform: string;
  profileImage: string;
  pago?: boolean;
}

// Convert Baserow guest record to local Guest format
function convertBaserowToGuest(baserowGuest: BaserowGuest): Guest {
  return {
    id: baserowGuest.id.toString(),
    name: baserowGuest.name,
    socialLink: baserowGuest.socialLink,
    username: baserowGuest.socialLink.replace('@', ''),
    platform: baserowGuest.platform,
    profileImageUrl: baserowGuest.profileImage,
    confirmed: true, // Guests in Baserow are considered confirmed
    pago: baserowGuest.pago || false,
  };
}

// Convert local Guest to Baserow format
function convertGuestToBaserow(guest: Guest): Omit<BaserowGuest, 'id'> {
  return {
    name: guest.name,
    socialLink: guest.socialLink,
    platform: guest.platform,
    profileImage: guest.profileImageUrl || '',
    pago: guest.pago || false,
  };
}

// Fetch all guests from Baserow
export async function fetchAllGuests(): Promise<Guest[]> {
  if (!isBaserowConfigured()) {
    console.warn('Baserow is not configured. Using local storage only.');
    return [];
  }

  try {
    const response = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`,
      {
        method: 'GET',
        headers: getBaserowHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch guests: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map(convertBaserowToGuest);
  } catch (error) {
    console.error('Error fetching guests from Baserow:', error);
    return [];
  }
}

// Add a new guest to Baserow
export async function addGuestToBaserow(guest: Guest): Promise<boolean> {
  if (!isBaserowConfigured()) {
    console.warn('Baserow is not configured. Using local storage only.');
    return false;
  }

  try {
    const baserowGuest = convertGuestToBaserow(guest);
    const response = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`,
      {
        method: 'POST',
        headers: getBaserowHeaders(),
        body: JSON.stringify({
          name: baserowGuest.name,
          socialLink: baserowGuest.socialLink,
          platform: baserowGuest.platform,
          profileImage: baserowGuest.profileImage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add guest: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error adding guest to Baserow:', error);
    return false;
  }
}

// Remove a guest from Baserow by name
export async function removeGuestFromBaserow(guestName: string): Promise<boolean> {
  if (!isBaserowConfigured()) {
    console.warn('Baserow is not configured. Using local storage only.');
    return false;
  }

  try {
    // First, find the guest by name to get the ID
    const response = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true&filter__name__equal=${encodeURIComponent(guestName)}`,
      {
        method: 'GET',
        headers: getBaserowHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to find guest: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.results.length === 0) {
      console.warn(`Guest with name ${guestName} not found in Baserow`);
      return false;
    }

    // Delete the guest using the ID
    const guestId = data.results[0].id;
    const deleteResponse = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${BASEROW_TABLE_ID}/${guestId}/`,
      {
        method: 'DELETE',
        headers: getBaserowHeaders(),
      }
    );

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete guest: ${deleteResponse.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error removing guest from Baserow:', error);
    return false;
  }
}

// Synchronize local guests with Baserow
export async function syncLocalGuestsWithBaserow(localGuests: Guest[]): Promise<void> {
  if (!isBaserowConfigured()) {
    console.warn('Baserow is not configured. Cannot sync guests.');
    return;
  }

  try {
    // Get all guests from Baserow
    const baserowGuests = await fetchAllGuests();
    
    // Find guests that are in local storage but not in Baserow
    const guestsToAdd = localGuests.filter(localGuest => 
      !baserowGuests.some(baserowGuest => baserowGuest.name === localGuest.name)
    );

    // Add each missing guest to Baserow
    for (const guest of guestsToAdd) {
      await addGuestToBaserow(guest);
    }

    console.log(`Synchronized ${guestsToAdd.length} guests with Baserow`);
  } catch (error) {
    console.error('Error synchronizing guests with Baserow:', error);
  }
}