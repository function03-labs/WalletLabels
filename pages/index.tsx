// import dynamic grid

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useLabels } from "@/hooks/searchQuery"
import { ChevronRightIcon, Search } from "lucide-react"
// import mongp from "mongodb"
import { useTheme } from "next-themes"
import CountUp from "react-countup"

// imprt color mode from config

import { siteConfig } from "@/config/site"
import getHistory from "@/lib/getHistory"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"
import { connectToDatabase } from "../lib/mongodb"
import { header } from "./header"
import { Footer } from "./Footer"

const Grid = dynamic(() => import("@/components/Grid"), { ssr: false })

//feetch initial data from api
export async function getStaticProps() {
  let db = await connectToDatabase()
  let labels = await db.db.collection("labels").find().limit(30).toArray()
  labels = labels.map((label) => {
    return {
      address: label.address,
      address_name: label.address_name,
      label_type: label.label_type,
      label_subtype: label.label_subtype,
      label: label.label,
    }
  })

  // get addresses from response
  let response = labels

  // drop
  const addresses = response.map((item) => item.address)

  // get history
  const history = await getHistory(addresses)
  //get data from fetch
  //return data
  // add a balanceHistory property to each item in the data array
  const data = response.map((item, index) => {
    item.balanceHistory = JSON.stringify(history[item["address"]])
    return item
  })

  return {
    props: {
      data: data,
    },

    // revalidate every 24 hours
    revalidate: 60 * 60 * 24,
  }
}

export default function IndexPage(props) {
  const { theme } = useTheme()
  const [searchInput, setSearchInput] = useState("")
  const { data, isLoading, isError, error } = useLabels(searchInput, props)

  // const last_txs = props.data_txs ? props.data_txs : null
  const handleSearch = (e) => {
    e.preventDefault()
    //show value of input field
    setSearchInput(e.target.query.value)
  }

  return (
    <Layout>
      {header()}
      <section className="container grid items-center gap-10 pt-12 pb-8 md:py-20">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </span>
            </a>
          </div> */}
          <div className="hidden sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
              Announcing Social Labels. <a href="#" className="font-semibold text-blue-800 dark:text-white"><span className="absolute inset-0" aria-hidden="true"></span>Access now <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>

          <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Wallet Labels <br className="hidden sm:inline" />
            for Popular Addresses
          </h1>
          <p className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            More than
            <CountUp
              start={0}
              end={7.5}
              duration={3}
              decimals={1}
              prefix=" "
              suffix="M "
              className="text-xl font-semibold text-slate-700 dark:text-slate-400"
            />
            addresses labeled for you to easily identify your
            <br className="hidden sm:inline" />
            favorite wallets and exchanges.
          </p>
        </div>
        <div className="flex justify-center gap-4 sm:gap-4">
          <Link
            href={siteConfig.links.docs}
            target="/docs"
            rel="noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            GitHub
          </Link>
        </div>
      </section>
      <div className="mx-2 mb-24 flex flex-col items-center gap-2 md:mx-8">
        {/* align normal  tailwind */}{" "}
        <div className="flex w-full  items-end  justify-between">
          <div className="w-full sm:w-auto">
            {/*  width 100% if mobile device only tailwind */}
            <div className=" relative mt-2 rounded-md shadow-sm dark:bg-zinc-900">
              <div className="pointer-events-none absolute inset-y-0 left-0  flex items-center pl-3">
                <Search
                  className="h-5 w-5 text-gray-400 dark:text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="price"
                  id="query"
                  // submit when press enter
                  className="text-md mr-10	block	w-full truncate rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 dark:bg-zinc-900 dark:text-slate-400 dark:ring-gray-800 sm:text-sm sm:leading-6"
                  placeholder="Search by address or name.."
                />
              </form>
            </div>
          </div>
          <div>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              Number of entries: {data ? data.length : "Loading"}
            </p>
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                <span className="text-xs">⌘</span>F
              </kbd>
              to search the table
            </p>
          </div>
        </div>
        {isLoading ? "Loading" : <Grid data={data} />}
      </div>
      <Footer />
    </Layout>
  )
}


