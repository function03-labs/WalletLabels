import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Center, Spinner } from '@chakra-ui/react'

function Home() {
  const [loading, setLoading] = React.useState(true)

  const onLoad = () => {
    setLoading(false)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
        <style type="text/css">
          {`html, body, #__next {
            height: 100%;
          }
           #header {
            -webkit-user-select: none;
            -webkit-app-region: drag;
          }`}
        </style>
      </Head>
      <div
        style={{
          background: 'var(--chakra-colors-gray-800);',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          id="header"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '20px',
            zIndex: 100,
          }}
        ></div>
        <div style={{ flex: 1 }}>
          <iframe
            src="http://localhost:3000"
            height="100%"
            width="100%"
            onLoad={onLoad}
          />

          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
