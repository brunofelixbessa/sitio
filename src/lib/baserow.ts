// Baserow API configuration

// Baserow API URL
export const BASEROW_API_URL = import.meta.env.VITE_BASEROW_API_URL || 'https://api.baserow.io';

// Baserow API token
export const BASEROW_API_TOKEN = import.meta.env.VITE_BASEROW_API_TOKEN || '';

// Baserow table ID for guests
export const BASEROW_TABLE_ID = import.meta.env.VITE_BASEROW_TABLE_ID || '';

// Check if Baserow is properly configured
export function isBaserowConfigured(): boolean {
  return Boolean(BASEROW_API_URL && BASEROW_API_TOKEN && BASEROW_TABLE_ID);
}

// Helper function to get Baserow API headers
export function getBaserowHeaders() {
  return {
    'Authorization': `Token ${BASEROW_API_TOKEN}`,
    'Content-Type': 'application/json'
  };
}