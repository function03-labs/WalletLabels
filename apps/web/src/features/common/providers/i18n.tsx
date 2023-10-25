import { I18nProvider as BaseI18nProvider } from '@common/i18n'
import { useCurrentUser } from '../hooks/use-current-user'

/**
 * This provider gets the configured locale from the current user
 * and passes it to the i18n provider.
 */
export const I18nProvider: React.FC<React.PropsWithChildren> = (props) => {
  const user = useCurrentUser()

  return (
    <BaseI18nProvider locale={user?.locale}>{props.children}</BaseI18nProvider>
  )
}
