/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import CountUp from "react-countup"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"

import { FaTwitter } from "react-icons/fa"
import Page, { getData } from "@/components/payments/page"
import DemoPage from "@/components/payments/page"
import React from "react"
export default function SocialsPage(props) {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const response = await getData()
      setData(response)
    }
    fetchData()
  }, [])


  return (
    <Layout>
      <section className="container grid items-center gap-10 pt-12 pb-8 md:py-14">
        <div className="flex flex-col items-center gap-4">
          <div className="hidden sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-green-600 ring-2 ring-green-400/20 hover:ring-green-400/30
             dark:text-green-400 dark:ring-green-100/10 dark:hover:ring-green-100/20">
              Recently Added
            </div>
          </div>
          <div className="relative flex items-center">
            <h1 className="z-10 text-center text-2xl font-semibold leading-tight sm:text-xl md:text-5xl lg:text-5xl">
              Social Labels <br className="hidden sm:inline" />
            </h1>
            <div className="absolute bottom-[-15px] right-[-30px] text-blue-500   opacity-40 hover:animate-ping ">
              <FaTwitter size={52} />
            </div>
          </div>
          <p className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-lg">
            Map Ethereum addresses to their correlated social
            identities, making it easy to track, follow and
            interact with your favorite accounts.
          </p>
          <div className="flex -space-x-4">
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1681393223447760896/sV5elUdO_400x400.jpg" alt="" />
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1580135504313724928/uPHa5dQi_400x400.png" alt="" />
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1444398863268339717/2jQUsbjB_400x400.jpg" alt="" />
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1656068195957059585/v0TLH4E6_400x400.jpg" alt="" />
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1680265592102592518/ixkD0LCJ_400x400.jpg" alt="" />
            <img className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1622150019783565312/YuAqw3kL_400x400.jpg" alt="" />

            <a className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
          </div>
          <DemoPage data={data} />

        </div>

      </section>
    </Layout>
  )
}
