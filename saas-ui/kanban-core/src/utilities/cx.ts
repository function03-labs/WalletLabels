export const cx = (
  ...classNames: (string | undefined | null | false)[]
): string => {
  return classNames.filter(Boolean).join(' ')
}
