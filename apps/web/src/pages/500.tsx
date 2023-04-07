import { useRouter } from 'next/router'

import { FiFrown } from 'react-icons/fi'

import { Button } from '@chakra-ui/react'
import { ErrorPage } from '@saas-ui-pro/react'

export default function Error500() {
  const router = useRouter()

  return (
    <ErrorPage
      title="Oh dear, something isn't looking right"
      description="Where do you want to go?"
      icon={FiFrown}
      actions={
        <>
          <Button colorScheme="primary" onClick={() => router.back()}>
            Go back
          </Button>
          <Button onClick={() => router.push('/app')}>Home</Button>
        </>
      }
    />
  )
}
