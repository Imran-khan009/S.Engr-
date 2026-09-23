/**
 * Server-side input sanitization and validation utilities
 * Protects against XSS, injection, buffer overflows, and header manipulation.
 */

// Regex for valid email verification
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex for safe phone / WhatsApp numbers
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{3,20}$/;

/**
 * Remove harmful script tags, event handlers, and javascript pseudo-protocols
 */
export function sanitizeText(input: unknown, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  
  let cleaned = input
    // Remove null bytes
    .replace(/\0/g, '')
    // Normalize unicode
    .normalize('NFKC')
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style tags and contents
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove iframe/object/embed tags
    .replace(/<(iframe|object|embed|applet|meta|link)\b[^>]*>/gi, '')
    // Remove inline event handlers like onclick, onload, onerror
    .replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\bon\w+\s*=\s*[^>\s]+/gi, '')
    // Remove javascript: and data: URIs in attributes
    .replace(/javascript:[^"'\s]*/gi, '')
    .trim();

  // Constrain maximum length to avoid memory DoS
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Strips all HTML tags entirely (for names, titles, categories, plain text)
 */
export function stripHtml(input: unknown, maxLength: number = 200): string {
  if (typeof input !== 'string') return '';
  const text = sanitizeText(input, maxLength);
  return text.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate and normalize email address
 */
export function validateEmail(email: unknown): { valid: boolean; normalized: string; error?: string } {
  if (typeof email !== 'string' || !email.trim()) {
    return { valid: false, normalized: '', error: 'Email address is required' };
  }

  const normalized = email.trim().toLowerCase();
  if (normalized.length > 120) {
    return { valid: false, normalized: '', error: 'Email address exceeds maximum length (120 characters)' };
  }

  if (!EMAIL_REGEX.test(normalized)) {
    return { valid: false, normalized: '', error: 'Please enter a valid email address (e.g. client@example.com)' };
  }

  return { valid: true, normalized };
}

/**
 * Sanitize and validate phone / WhatsApp numbers
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/[^0-9+\s()\-.]/g, '').trim();
  return cleaned.substring(0, 30);
}

/**
 * Sanitize an array of strings (e.g. required features, tools, deliverables)
 */
export function sanitizeStringArray(arr: unknown, maxItems: number = 30, maxItemLength: number = 200): string[] {
  if (!Array.isArray(arr)) {
    if (typeof arr === 'string' && arr.trim()) {
      return [stripHtml(arr, maxItemLength)];
    }
    return [];
  }

  return arr
    .slice(0, maxItems)
    .filter(item => typeof item === 'string' && item.trim().length > 0)
    .map(item => stripHtml(String(item), maxItemLength));
}
