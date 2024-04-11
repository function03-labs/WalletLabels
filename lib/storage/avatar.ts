/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { env } from "@/env.mjs"

import { supabase } from "@/lib/storage/supabase"

interface NamedBlob extends Blob {
  name: string
}

export async function uploadAvatar(file: File, userId: string) {
  return await supabase.storage
    .from("avatars")
    .upload(userId + "/avatar.png", file)
}

export async function deleteAvatar(userId: string) {
  return await supabase.storage.from("avatars").remove([userId + "/avatar.png"])
}

export async function getAvatarDownloadUrl(userId: string) {
  return await supabase.storage.from("avatars").list(userId)
}

export async function manageAvatare(file: File, userId: string) {
  if (
    await getAvatarDownloadUrl(userId).then(
      (res) => res.data && res.data.length > 0
    )
  ) {
    await deleteAvatar(userId)
  }

  await uploadAvatar(file, userId)

  const { data, error } = await getAvatarDownloadUrl(userId)
  if (error) {
    throw error
  }

  return (
    env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/avatars/" +
    userId +
    "/avatar.png"
  )
}

export async function manageAvatar(
  file: File,
  userId: string
): Promise<string> {
  if (
    await getAvatarDownloadUrl(userId).then(
      (res) => res.data && res.data.length > 0
    )
  ) {
    await deleteAvatar(userId)
  }

  await uploadAvatar(file, userId)

  const { data, error } = await getAvatarDownloadUrl(userId)
  if (error) {
    throw error
  }

  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${userId}/avatar.png`
}

export async function uploadFiles(files: NamedBlob[], folderName: string) {
  console.log(files)
  const uploadPromises = files.map((file) => {
    const filePath = `${folderName}/${file.name}`
    return supabase.storage.from("repositories").upload(filePath, file)
  })

  const uploadResults = await Promise.all(uploadPromises)

  const filePaths = uploadResults.map((result) => {
    if (result.data) {
      return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/repositories/${folderName}/${result.data.path}`
    }
    return null
  })

  return filePaths
}
