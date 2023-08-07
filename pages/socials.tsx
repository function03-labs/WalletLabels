/* eslint-disable @next/next/no-img-element */

import React from "react"
import Link from "next/link"
import axios from "axios"
import CountUp from "react-countup"
import { FaTwitter } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import Page, { getData } from "@/components/payments/page"
import DemoPage from "@/components/payments/page"
import { buttonVariants } from "@/components/ui/button"
import { socialIcons } from "../components/socialIcons"

export async function getStaticProps() {
  try {
    const apiUrl = "http://localhost:3000/api/query_socials?query=" // The API endpoint you've set up
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Check if the response status is OK (200)
    if (response.status === 200) {
      const data = response.data.data // Assuming your API response has a "data" property

      // Return the data as props along with revalidate property set to 24 hours (in seconds)
      return {
        props: {
          data,
        },
        revalidate: 86400, // 24 hours in seconds
      }
    } else {
      // If the response status is not 200, handle the error or return an empty data array
      return {
        props: {
          data: [],
        },
      }
    }
  } catch (error) {
    // Handle any error that might occur during the API request
    console.error(error)

    // Return an empty data array or handle the error as you wish
    return {
      props: {
        data: [],
      },
    }
  }
}

export default function SocialsPage({ data }) {
  // const [data, setData] = React.useState([])
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const response = await getData()
  //     setData(response)
  //   }
  //   fetchData()
  // }, [])

  return (
    <Layout>
      <section className="container grid items-center gap-10 pt-12 pb-8 md:py-14">
        <div className="flex flex-col items-center gap-4">
          <div className="hidden sm:flex sm:justify-center">
            <div
              className="relative rounded-full px-3 py-1 text-sm leading-6 text-green-600 ring-2 ring-green-400/20 hover:ring-green-400/30
             dark:text-green-400 dark:ring-green-100/10 dark:hover:ring-green-100/20"
            >
              Recently Added
            </div>
          </div>
          <div className="relative flex items-center">
            <h1 className="z-10 text-center text-2xl font-semibold leading-tight sm:text-xl md:text-5xl lg:text-5xl">
              Social Labels <br className="hidden sm:inline" />
            </h1>
            <div className="absolute bottom-[-15px] right-[-30px] text-blue-500   opacity-40 hover:animate-ping ">
              <MdVerified size={52} />
            </div>
          </div>
          <p className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-lg">
            Map Ethereum addresses to their correlated social identities, making
            it easy to track, follow and interact with your favorite accounts.
          </p>
          {socialIcons}
          <DemoPage data={data} />
        </div>
      </section>
    </Layout>
  )
}
