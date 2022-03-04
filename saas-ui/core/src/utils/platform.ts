type Platform = 'mac' | 'windows' | 'linux' | 'android' | 'ipad' | 'iphone'
interface PlatformSelect {
  mac?: any
  windows?: any
  linux?: any
  android?: any
  ipad?: any
  iphone?: any
}

export const platformSelect = (
  select: PlatformSelect,
  fallback: any,
  userAgent?: string,
) => {
  let ua = userAgent
  if (!ua && typeof window !== 'undefined') {
    ua = window.navigator.userAgent
  }

  if (!ua) return fallback

  const platforms: Record<string, RegExp> = {
    mac: /Mac/,
    windows: /Windows/,
    linux: /Linux|X11|OpenBSD/,
    android: /Android/,
    ipad: /iPad/,
    iphone: /iPhone/,
  }

  let platform: Platform | undefined
  for (const id in platforms) {
    if (platforms[id].test(ua)) {
      platform = id as Platform
      break
    }
  }

  if (platform && select[platform]) {
    return select[platform]
  }
  return fallback
}
