// import dynamic grid

import { useState } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"
import { useLabels } from "@/hooks/searchQuery"
import axios from "axios"
import { Search } from "lucide-react"
// import mongp from "mongodb"
import { MongoClient } from "mongodb"
import CountUp from "react-countup"

import { siteConfig } from "@/config/site"
import getHistory from "@/lib/getHistory"
import { Layout } from "@/components/layout"
import { Button, buttonVariants } from "@/components/ui/button"
import { connectToDatabase } from "../lib/mongodb"

const Grid = dynamic(() => import("@/components/Grid"), { ssr: false })

//feetch initial data from api
export async function getStaticProps() {
  // const res: any = await fetch(
  //   "http://localhost:3000/api/query?query=&limit=10"
  // )

  //replace api with mongodb
  let db = await connectToDatabase()
  const labels = await db.db.collection("labels").find().limit(10).toArray()
  // console.log("labels", labels, "versus res", await res.json())
  // get addresses from response
  let response = labels
    // drop _id property
    .map((item) => {
      delete item._id
      return item
    })

  // drop
  const addresses = response.map((item) => item.address)

  // get history
  const history = await getHistory(addresses)
  // console.log("history is", history)
  //get data from fetch
  //return data
  // add a balanceHistory property to each item in the data array
  const data = response.map((item, index) => {
    // console.log(history[item["address"]], "history")
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
  const [searchInput, setSearchInput] = useState("")
  const { data, isLoading, isError, error } = useLabels(searchInput, props)

  console.log("data returned to table: ", isLoading, isError, error, data)
  const handleSearch = (e) => {
    e.preventDefault()
    //show value of input field
    // get value of input from for
    console.log(e.target.query.value)
    setSearchInput(e.target.query.value)
  }

  return (
    <Layout>
      <Head>
        <title>WalletLabels</title>
        <meta
          name="description"
          content="Wallet Labels - Easily identify your favorite wallets and exchanges with more than 7.5M labeled addressesS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-10 pt-12 pb-8 md:py-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl font-semibold leading-tight sm:text-xl md:text-5xl lg:text-6xl">
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
            target="_blank"
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
      <div className="mx-8 mb-32 flex flex-col items-center gap-2">
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
    </Layout>
  )
}
