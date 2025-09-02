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
 * Uses web scraping to extract profile image from Instagram page
 */
export async function getRealInstagramProfileImage(username: string): Promise<string> {
  const cleanUsername = username.replace('@', '');
  
  try {
    // Method 1: Scrape Instagram profile page
    const response = await fetch(`https://www.instagram.com/${cleanUsername}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (response.ok) {
      const html = await response.text();
      
      // Extract profile image URL from meta tags
      const metaImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
      if (metaImageMatch && metaImageMatch[1]) {
        return metaImageMatch[1];
      }
      
      // Extract from JSON-LD structured data
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/i);
      if (jsonLdMatch) {
        try {
          const jsonData = JSON.parse(jsonLdMatch[1]);
          if (jsonData.image) {
            return jsonData.image;
          }
        } catch (e) {
          console.log('Failed to parse JSON-LD data');
        }
      }
      
      // Extract from inline JavaScript (profile_pic_url pattern)
      const profilePicMatch = html.match(/"profile_pic_url":"([^"]+)"/i);
      if (profilePicMatch && profilePicMatch[1]) {
        return profilePicMatch[1].replace(/\\u0026/g, '&');
      }
      
      // Extract from any fbcdn.net URL pattern (like the one provided)
      const fbcdnMatch = html.match(/(https:\/\/[^"\s]+\.fbcdn\.net[^"\s]+)/i);
      if (fbcdnMatch && fbcdnMatch[1]) {
        return fbcdnMatch[1];
      }
    }
  } catch (error) {
    console.log('Instagram scraping failed:', error);
  }
  
  // Method 2: Try Instagram API endpoints as fallback
  try {
    const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data?.data?.user?.profile_pic_url_hd) {
        return data.data.user.profile_pic_url_hd;
      }
      if (data?.data?.user?.profile_pic_url) {
        return data.data.user.profile_pic_url;
      }
    }
  } catch (error) {
    console.log('Instagram API method failed');
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
 * Check if input is a direct profile image URL
 */
export function isDirectImageUrl(input: string): boolean {
  const imageUrlPatterns = [
    /fbcdn\.net.*\.(jpg|jpeg|png|webp)/i,
    /cdninstagram\.com.*\.(jpg|jpeg|png|webp)/i,
    /scontent.*\.(jpg|jpeg|png|webp)/i,
    /profile.*pic.*\.(jpg|jpeg|png|webp)/i
  ];
  
  return imageUrlPatterns.some(pattern => pattern.test(input));
}

/**
 * Process social media input and return structured data (async version)
 */
export async function processSocialInputAsync(input: string, name: string): Promise<SocialProfile> {
  // Check if input is a direct image URL
  if (isDirectImageUrl(input)) {
    return {
      username: `@${name.toLowerCase().replace(/\s+/g, '')}`,
      platform: 'Instagram', // Assume Instagram for fbcdn URLs
      profileImageUrl: input
    };
  }
  
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
  // Check if input is a direct image URL
  if (isDirectImageUrl(input)) {
    return {
      username: `@${name.toLowerCase().replace(/\s+/g, '')}`,
      platform: 'Instagram', // Assume Instagram for fbcdn URLs
      profileImageUrl: input
    };
  }
  
  const username = extractUsername(input);
  const platform = detectPlatform(input);
  const profileImageUrl = getProfileImage(username, platform, name);
  
  return {
    username,
    platform,
    profileImageUrl
  };
}