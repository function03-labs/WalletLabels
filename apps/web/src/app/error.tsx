'use client'

import { FiFrown } from 'react-icons/fi'

import { Button } from '@chakra-ui/react'
import { ErrorPage } from '@saas-ui-pro/react'
import { useRouter } from '@app/nextjs'

export default function Error() {
  const router = useRouter()

  return (
    <ErrorPage
      title="Oh dear, something isn't looking right"
      description="Where do you want to go?"
      icon={FiFrown}
      h="$100vh"
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
