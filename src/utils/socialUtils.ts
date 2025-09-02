// Utility functions for social media processing

export interface SocialProfile {
  username: string;
  platform: string;
  profileImageUrl?: string;
}

/**
 * Extract username from social media URLs or handles
 */
export function extractUsername(input: string): string {
  // Remove whitespace
  const cleaned = input.trim();
  
  // If it already starts with @, return as is
  if (cleaned.startsWith('@')) {
    return cleaned;
  }
  
  // Extract from Instagram URLs
  const instagramMatch = cleaned.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)\/?/);
  if (instagramMatch) {
    return `@${instagramMatch[1]}`;
  }
  
  // Extract from Facebook URLs
  const facebookMatch = cleaned.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/([a-zA-Z0-9_.]+)\/?/);
  if (facebookMatch) {
    return `@${facebookMatch[1]}`;
  }
  
  // Extract from Twitter/X URLs
  const twitterMatch = cleaned.match(/(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/?/);
  if (twitterMatch) {
    return `@${twitterMatch[1]}`;
  }
  
  // If no URL pattern matches, assume it's a username and add @
  const usernameOnly = cleaned.replace(/^@/, ''); // Remove existing @ if any
  return `@${usernameOnly}`;
}

/**
 * Detect social media platform from URL or handle
 */
export function detectPlatform(input: string): string {
  const cleaned = input.toLowerCase().trim();
  
  if (cleaned.includes('instagram.com') || cleaned.includes('instagram')) {
    return 'Instagram';
  }
  if (cleaned.includes('facebook.com') || cleaned.includes('facebook')) {
    return 'Facebook';
  }
  if (cleaned.includes('twitter.com') || cleaned.includes('x.com') || cleaned.includes('twitter')) {
    return 'Twitter';
  }
  
  return 'Social';
}

/**
 * Attempt to get real Instagram profile image
 * Uses Instagram's public endpoints when possible
 */
export async function getRealInstagramProfileImage(username: string): Promise<string> {
  const cleanUsername = username.replace('@', '');
  
  try {
    // Method 1: Try to fetch from Instagram's public API endpoint
    const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data?.data?.user?.profile_pic_url) {
        return data.data.user.profile_pic_url;
      }
    }
  } catch (error) {
    console.log('Instagram API method failed, using fallback');
  }
  
  // Method 2: Try alternative Instagram endpoint
  try {
    const response = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`);
    if (response.ok) {
      const data = await response.json();
      if (data?.data?.user?.profile_pic_url_hd) {
        return data.data.user.profile_pic_url_hd;
      }
    }
  } catch (error) {
    console.log('Alternative Instagram method failed');
  }
  
  // Fallback: Use avatar generator with Instagram theme
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=E1306C&backgroundType=gradientLinear`;
}

/**
 * Generate Instagram profile image URL (synchronous fallback)
 * Uses realistic avatar generator with Instagram styling
 */
export function getInstagramProfileImage(username: string): string {
  const cleanUsername = username.replace('@', '');
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=E1306C&backgroundType=gradientLinear`;
}

/**
 * Generate Facebook profile image URL (public profiles only)
 * Note: This is a simplified approach. Real implementation would need Facebook Graph API
 */
export function getFacebookProfileImage(username: string): string {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For demo purposes, we'll use a placeholder service
  // In a real app, you'd need Facebook Graph API
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=blue`;
}

/**
 * Get profile image based on platform
 */
export function getProfileImage(username: string, platform: string, fallbackName: string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return getInstagramProfileImage(username);
    case 'facebook':
      return getFacebookProfileImage(username);
    case 'twitter':
      // Twitter API requires authentication, using fallback
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}&backgroundColor=lightblue`;
    default:
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}`;
  }
}

/**
 * Process social media input and return structured data (async version)
 */
export async function processSocialInputAsync(input: string, name: string): Promise<SocialProfile> {
  const username = extractUsername(input);
  const platform = detectPlatform(input);
  
  let profileImageUrl: string;
  
  // Try to get real profile image for Instagram
  if (platform.toLowerCase() === 'instagram') {
    try {
      profileImageUrl = await getRealInstagramProfileImage(username);
    } catch {
      profileImageUrl = getProfileImage(username, platform, name);
    }
  } else {
    profileImageUrl = getProfileImage(username, platform, name);
  }
  
  return {
    username,
    platform,
    profileImageUrl
  };
}

/**
 * Process social media input and return structured data (synchronous version)
 */
export function processSocialInput(input: string, name: string): SocialProfile {
  const username = extractUsername(input);
  const platform = detectPlatform(input);
  const profileImageUrl = getProfileImage(username, platform, name);
  
  return {
    username,
    platform,
    profileImageUrl
  };
}