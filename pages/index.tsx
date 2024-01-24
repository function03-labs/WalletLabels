// import dynamic grid

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useLabels } from "@/hooks/searchQuery"
import { Box, Kbd } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { ChevronRightIcon, Search } from "lucide-react"
// import mongp from "mongodb"
import { useTheme } from "next-themes"
import CountUp from "react-countup"
import {
  Configure,
  InstantSearch,
  // RatingMenu,
  RefinementList,
  Stats,
} from "react-instantsearch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';


import { badgeCategories } from "@/config/badge_categories"
// imprt color mode from config

import { siteConfig } from "@/config/site"
import searchClient from "@/lib/assembleTypese"
import getHistory from "@/lib/getHistory"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import CustomHitsTags, {
  CustomHits,
  CustomSearchBox,
} from "../lib/CustomSearchBox"
import { connectToDatabase } from "../lib/mongodb"
import Footer from "./Footer"
import header from "./header"
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

export const Grid = dynamic(() => import("@/components/Grid"), { ssr: false })
//feetch initial data from api

export async function getStaticProps() {
  let db = await connectToDatabase()
  let labels = await db.db
    .collection(process.env.CLC_NAME_WLBLS)
    .find()
    .limit(30)
    .toArray()
  labels = labels.map(label => {
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
  const addresses = response.map(item => item.address)

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
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  // const { data, isLoading, isError, error } = useLabels(searchInput, props)
  const [initialSearch, setinitialSearch] = useState(false)
  const [nbHits, setnbHits] = useState(0)
  // const last_txs = props.data_txs ? props.data_txs :  null
  const handleSearch = e => {
    e.preventDefault()
    //show value of input field
    setSearchInput(e.target.query.value)
  }
  const toggleFilterVisibility = () => {
    setIsFilterVisible(prevState => !prevState); // Toggle the state
  };
  // Mock data, replace with your actual data
  const activities = [
    { label_type: 'Activity 1', count: 10 },
    { label_type: 'Activity 2', count: 20 },
    // ... other activities
  ];

  const contractTypes = [
    { label_subtype: 'Contract Type 1', count: 5 },
    { label_subtype: 'Contract Type 2', count: 8 },
    // ... other contract types
  ];

  // Function to sort items based on count
  const transformAndSortItems = (items, attribute) => {
    return items.sort((a, b) => (a[attribute] < b[attribute] ? 1 : -1));
  };

  const OldSearchBar = (
    <div className="flex w-full  items-end  justify-between">
      <div className="w-full sm:w-auto">
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
    </div>
  )
  return (
    <Layout>
      {header()}
      <InstantSearch
        indexName="labels"
        searchClient={searchClient}
        insights={false}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.53 }}
          className="z-30 "
        // key={currentIndex}
        >
          <Configure hitsPerPage={50} />
          <section className="md:py-17 container grid items-center gap-10 pt-10 pb-8">
            <div className="flex flex-col items-center gap-6">
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
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/30 hover:ring-gray-900/50 dark:text-gray-400 dark:ring-white/30 dark:hover:ring-white/50">
                  Check out our new API endpoints.{" "}
                  <a
                    href="https://docs.walletlabels.xyz/"
                    className="font-semibold text-blue-800 dark:text-white">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"></span>
                    Access now <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>

              <h1 className="text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                What would you like to <br className="hidden sm:inline" />
                search today?
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
                addresses labeled for you to easily identify your{" "}
                <br className="hidden sm:inline" />
                favorite wallets and exchanges.
              </p>
              <div className="mt-3 w-full text-center sm:w-4/5">
                {/* <SearchComponent
                  handleSearchLogin={handleSearch}
                  disabled={false}
                  // togglePalette={togglePalette}
                /> */}
                <CustomSearchBox
                  initialQuery={searchInput}
                  setinitialSearch={setinitialSearch}
                />
                <div className=" flex justify-between">
                  <Box className=" align-start flex gap-2  text-sm text-muted-foreground">
                    <div className="hidden whitespace-nowrap  sm:block">
                      Interesting finds:
                    </div>
                    {!initialSearch ? (
                      <div className="flex flex-wrap gap-1">
                        {badgeCategories.map(category => (
                          <Badge
                            key={category.label}
                            onClick={() => {
                              setSearchInput(category.label)
                              setinitialSearch(true)
                            }}
                            // @ts-ignore
                            variant="none"
                            className="hover:border-green-300 hover:text-foreground ">
                            {category.emoji + " " + category.label}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      // <Hits
                      //   classNames={{
                      //     root: "mr-4",
                      //     list: "flex flex-wrap gap-x-1 gap-y-1 ",
                      //   }}
                      //   hitComponent={({ hit }) => (
                      //     <Badge
                      //       onClick={() => {
                      //         setSearchInput(hit.label)
                      //       }}
                      //       variant="solid"
                      //       className="hover:text-foreground hover:border-green-300">
                      //       {hit.label}
                      //     </Badge>
                      //   )}
                      // />
                      <div>
                        {<CustomHitsTags setSearchInput={setSearchInput} />}
                      </div>
                    )}

                    {/* <Badge variant="outline">mev</Badge>{" "}
           <Badge variant="solid">arbitrage</Badge>{" "}
           <Badge variant="solid">defi</Badge>{" "} */}
                  </Box>

                  <Stats
                    className="hidden whitespace-nowrap text-sm text-muted-foreground  sm:block"
                    translationds={{
                      stats(nbHits, processingTimeMS) {
                        let hitCountPhrase
                        setnbHits(hitCountPhrase)
                        return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 sm:gap-4">
              {/* <Link
            href={siteConfig.links.docs}
            target="/docs"
            rel="noreferrer"
            className={buttonVariants({ size: "lg" })}>
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}>
            GitHub
          </Link> */}
            </div>
          </section>
        </motion.div>
        <div className="relative mx-2 mb-24 flex flex-col items-center  md:mx-8 ">
          <div className="hidden w-full items-center justify-between sm:flex">
            <div>
              <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                {/* Number of entries: {data ? data.length : "Loading"} */}
                {/* Number of entries: {nbHits} */}
              </p>
              <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                  <span className="text-xs">⌘</span>F
                </kbd>
                to search the table
              </p>
            </div>
            <button
              className="mb-0.5 flex items-center justify-center gap-2 rounded-md p-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-200"
              onClick={toggleFilterVisibility}
              aria-label="Open sidebar">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6H20M4 12H20M4 18H11"></path>
              </svg>
              Filter
            </button>
          </div>
          {/* {OldSearchBar} */}
          <div className="flex w-full auto-cols-auto flex-col">
            {/* add vertical navbar */}
            <div
              className={` 
        ${isFilterVisible ? " block" : "hidden"}
         m-2 w-auto  
        min-w-[16rem]
        overflow-hidden duration-200 
        transition-opacity
        
      `}
            >
              <div className=" m-2 flex flex-row items-center ">
                <div className=" mr-4 flex flex-col">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border-0 bg-gray-200 px-4 text-xs font-semibold leading-5 text-black"
                        onClick={() => setinitialSearch(true)}
                      >Activity</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="fixed left-0 top-0 z-50 mt-1 w-auto min-w-max origin-top-left rounded-md bg-white shadow-lg"
                      style={{
                        transform: 'translate3d(-35px, 0px, 0px)'
                      }}
                    >                      <RefinementList
                        className="mt-3"
                        attribute="label_type"
                        searchable={true}
                        limit={20}
                        searchablePlaceholder="Search by activity"
                        onClick={() => setinitialSearch(true)}
                        transformItems={items => items.sort((a, b) => a.count < b.count ? 1 : -1)}
                        classNames={{
                          checkbox: 'hidden',
                          list: 'max-h-60 overflow-auto w-59 dropdown-menu-scrollbar  ',
                          item: 'mb-2 text-left pl-2  hover:bg-gray-200 rounded-md', // Align text to the left
                          selectedItem: 'font-bold bg-gray-200 rounded-md ',
                          label: 'text-xl',
                          count: 'invisible',
                          searchBox: ' w-full rounded-md border border-input bg-background  text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>


                <div className="flex flex-col">

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border-0 bg-gray-200 px-4 text-xs font-semibold leading-5 text-black"
                        onClick={() => setinitialSearch(true)}
                      >
                        Contract Type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="mt-1 w-auto min-w-max rounded-md bg-white p-2 shadow-lg duration-300 transition-opacity"
                      style={{
                        transform: 'translate3d(47px, 0px, 0px)'
                      }}
                    >
                      <RefinementList
                        className="mt-3"
                        attribute="label_subtype"
                        searchable={true}
                        limit={20}
                        searchablePlaceholder="Search by type"
                        onClick={() => setinitialSearch(true)}
                        transformItems={items => items.sort((a, b) => a.count < b.count ? 1 : -1)}
                        classNames={{
                          checkbox: 'hidden',
                          list: 'max-h-60 overflow-auto w-59 dropdown-menu-scrollbar  ',
                          item: 'mb-2 text-left pl-2  hover:bg-gray-200 rounded-md', // Align text to the left
                          selectedItem: 'font-bold bg-gray-200 rounded-md ',
                          label: 'text-xl',
                          count: 'invisible',
                          searchBox: ' w-full rounded-md border border-input bg-background  text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>
              </div>



            </div>

            <div className=" flex w-full flex-col transition-all">

              {initialSearch ? (
                <CustomHits />
              ) : props.data ? (
                <Grid data={props.data} />
              ) : (
                "Loading..."
              )}
            </div>
          </div>
        </div>
      </InstantSearch>

      <Footer />
    </Layout>
  )
}
