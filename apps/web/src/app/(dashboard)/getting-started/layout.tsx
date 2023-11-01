import { FullscreenLayout } from '@app/features/common/layouts/fullscreen-layout'

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <FullscreenLayout>{children}</FullscreenLayout>
}
