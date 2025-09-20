import { createClient } from './client'
import type { SupabaseClient } from '@supabase/supabase-js'

export async function uploadProfileImage(
  file: File,
  userId: string
): Promise<string | null> {
  const supabase: SupabaseClient = createClient()

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB')
  }

  // Create unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  console.log('Uploading file:', `${userId}/${fileName}`)
  console.log('File size:', file.size)
  console.log('File type:', file.type)

  // Upload file to user's folder in Supabase Storage
  const { error } = await supabase.storage
    .from('ux')
    .upload(`${userId}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
      metadata: {
        user_id: userId,
      },
    })

  if (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }

  // Get signed URL (private access)
  const { data: urlData, error: urlError } = await supabase.storage
    .from('ux')
    .createSignedUrl(`${userId}/${fileName}`, 3600) // 1 hour expiry

  if (urlError) {
    console.error('Error generating signed URL:', urlError)
    throw new Error('Failed to generate image URL')
  }

  console.log('Generated signed URL:', urlData.signedUrl)
  return urlData.signedUrl
}

export async function deleteProfileImage(imageUrl: string): Promise<void> {
  const supabase: SupabaseClient = createClient()

  // Extract file path from URL
  const urlParts = imageUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const userId = urlParts[urlParts.length - 2] // Get user ID from path
  const filePath = `${userId}/${fileName}`

  const { error } = await supabase.storage.from('ux').remove([filePath])

  if (error) {
    console.error('Error deleting image:', error)
    throw new Error('Failed to delete image')
  }
}

export async function deleteAllUserFiles(userId: string): Promise<void> {
  const supabase: SupabaseClient = createClient()

  // List all files in the user's folder
  const { data: files, error: listError } = await supabase.storage
    .from('ux')
    .list(userId)

  if (listError) {
    console.error('Error listing user files:', listError)
    throw new Error('Failed to list user files')
  }

  if (files && files.length > 0) {
    // Delete all files belonging to the user
    const filePaths = files.map((file) => `${userId}/${file.name}`)
    const { error: deleteError } = await supabase.storage
      .from('ux')
      .remove(filePaths)

    if (deleteError) {
      console.error('Error deleting user files:', deleteError)
      throw new Error('Failed to delete user files')
    }
  }
}

// Debug function to list all files in the bucket
export async function listAllFiles(): Promise<void> {
  const supabase: SupabaseClient = createClient()

  const { data: files, error } = await supabase.storage.from('ux').list('')

  if (error) {
    console.error('Error listing files:', error)
    return
  }

  console.log('All files in bucket:', files)
}
