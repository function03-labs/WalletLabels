import { useRouter } from 'next/router'
import { Loading } from '@saas-ui/react'
import { useTenant } from '@saas-ui/pro'
import { useEffect } from 'react'

export default () => {
  const router = useRouter()
  const tenant = useTenant()

  useEffect(() => {
    if (tenant) {
      router.replace(`/app/${tenant}`)
    } else {
      router.replace('/app/getting_started')
    }
  }, [])

  return <Loading />
}
