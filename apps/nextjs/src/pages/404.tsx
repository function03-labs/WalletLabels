import { useRouter } from 'next/router'
import { FiFrown } from 'react-icons/fi'
import { Button } from '@saas-ui/react'
import { ErrorPage } from '@saas-ui/pro'

export default function Error404() {
  const router = useRouter()

  return (
    <ErrorPage
      title="Oh dear, maybe something broke"
      description="Where do you want to go?"
      icon={FiFrown}
      actions={
        <>
          <Button
            label="Go back"
            colorScheme="primary"
            onClick={() => router.back()}
          />
          <Button label="Home" onClick={() => router.push('/app')} />
        </>
      }
    />
  )
}
