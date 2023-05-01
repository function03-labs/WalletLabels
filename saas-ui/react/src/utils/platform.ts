type Platform = 'mac' | 'windows' | 'linux' | 'android' | 'ipad' | 'iphone'

type PlatformSelect<ReturnType> = Partial<Record<Platform, ReturnType>>

export const platformSelect = <ReturnType>(
  select: PlatformSelect<ReturnType>,
  fallback: ReturnType,
  userAgent?: string,
) => {
  let ua = userAgent
  if (!ua && typeof window !== 'undefined') {
    ua = window.navigator.userAgent
  }

  if (!ua) return fallback

  const platforms: Record<Platform, RegExp> = {
    mac: /Mac/,
    windows: /Windows/,
    linux: /Linux|X11|OpenBSD/,
    android: /Android/,
    ipad: /iPad/,
    iphone: /iPhone/,
  }

  let platform: Platform | undefined
  for (const id in platforms) {
    if (platforms[id as Platform].test(ua)) {
      platform = id as Platform
      break
    }
  }

  if (platform && select[platform]) {
    return select[platform] || fallback
  }

  return fallback
}
