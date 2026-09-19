import { getSupabaseClient } from './supabase';

export interface UploadResult {
  fileName: string;
  fileSize: string;
  fileType: string;
  fileUrl?: string;
  storagePath?: string;
}

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', '.png', '.jpg', '.jpeg', '.webp'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Validate file client-side before attempting upload
 */
export function validateAttachmentFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10MB limit. Please upload a smaller file.`
    };
  }

  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `File format "${extension}" is not allowed. Permitted formats: PDF, Word, PPT, Excel, TXT, or images.`
    };
  }

  return { valid: true };
}

/**
 * Upload file to Supabase Storage bucket 'project-attachments'.
 * If Supabase is not configured, gracefully falls back to metadata reference.
 */
export async function uploadToStorageOrFallback(file: File, folder: string = 'inquiries'): Promise<UploadResult> {
  const validation = validateAttachmentFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const supabase = getSupabaseClient();
  const formattedSize = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : `${(file.size / 1024).toFixed(1)} KB`;

  // If client Supabase is connected, upload to storage
  if (supabase) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from('project-attachments')
        .upload(uniquePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.warn('Supabase storage upload notice, using file metadata:', error.message);
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('project-attachments')
          .getPublicUrl(uniquePath);

        return {
          fileName: file.name,
          fileSize: formattedSize,
          fileType: file.type || 'application/octet-stream',
          fileUrl: publicUrlData.publicUrl,
          storagePath: uniquePath
        };
      }
    } catch (storageErr) {
      console.warn('Storage upload error, using metadata reference:', storageErr);
    }
  }

  // Graceful fallback: return validated metadata
  return {
    fileName: file.name,
    fileSize: formattedSize,
    fileType: file.type || 'application/octet-stream'
  };
}
