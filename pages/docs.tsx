import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
// theme mode from chakra
import { createSwaggerSpec } from "next-swagger-doc"
import { useTheme } from "next-themes"

import "swagger-ui-react/swagger-ui.css"
import { Layout } from "@/components/layout"
import swagger from "./api/swagger.json"

const SwaggerUI = dynamic<{
  spec: any
}>(import("swagger-ui-react"), { ssr: false })

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: swagger,
  })

  return {
    props: {
      spec,
    },
  }
}

export default function ApiPage({ spec }) {
  const { setTheme } = useTheme()
  //set theme light
  setTheme("light")
  return (
    <Layout>
      <div className="md:m-10">
        <SwaggerUI spec={spec} />
      </div>
    </Layout>
  )
}
