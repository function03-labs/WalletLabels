import { useState } from "react";

import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import {
  Configure,
  HierarchicalMenu,
  InstantSearch,
  RefinementList,
  Stats,
} from "react-instantsearch";
import CountUp from "react-countup";

import getHistory from "@lib/get-history";
import searchClient from "@lib/assemble-types";
import { connectToDatabase } from "@lib/mongodb";

import Footer from "@component/Footer";
import { Badge } from "@component/ui/Badge";
import { SiteHeader } from "@component/SiteHeader";
import CustomHitsTags, { CustomHits, SearchBox } from "@component/SearchBox";

import { badgeCategories } from "@config/badge-categories";

export const Grid = dynamic(() => import("@component/Grid"), { ssr: false });

async function getData() {
  let db = await connectToDatabase();
  let labels = await db.db
    .collection(process.env.CLC_NAME_WLBLS!)
    .find()
    .limit(30)
    .toArray();
  labels = labels.map((label) => {
    return {
      _id: label._id,
      address: label.address,
      address_name: label.address_name,
      label_type: label.label_type,
      label_subtype: label.label_subtype,
      label: label.label,
    };
  });

  let response = labels;

  const addresses = response.map((item) => item.address);

  const history = await getHistory(addresses);
  const data = response.map((item, index) => {
    item.balanceHistory = JSON.stringify(history[item["address"]]);
    return item;
  });

  return {
    data: data,
    revalidate: 60 * 60 * 24,
  };
}

export default async function IndexPage() {
  const { data } = await getData();

  const [searchInput, setSearchInput] = useState("");
  const [initialSearch, setinitialSearch] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <main>
      <SiteHeader />
      <InstantSearch
        indexName="labels_v2"
        searchClient={searchClient}
        insights={false}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.53 }}
          className="z-30 "
        >
          <Configure hitsPerPage={50} />
          <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10">
            <div className="flex flex-col items-center gap-6">
              <div className="hidden sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/30 hover:ring-gray-900/50 dark:text-gray-400 dark:ring-white/30 dark:hover:ring-white/50">
                  Check out our new API endpoints.{" "}
                  <a
                    href="https://docs.walletlabels.xyz/"
                    className="font-semibold text-blue-800 dark:text-white"
                  >
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
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
                  end={70}
                  duration={6}
                  decimals={0}
                  prefix=" "
                  suffix="M "
                  className="text-xl font-semibold text-slate-700 dark:text-slate-400"
                />
                addresses labeled for you to easily identify your{" "}
                <br className="hidden sm:inline" />
                favorite wallets and exchanges.
              </p>
              <div className="mt-3 w-full text-center sm:w-4/5">
                <SearchBox
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
                        {badgeCategories.map((category) => (
                          <Badge
                            key={category.label}
                            onClick={() => {
                              setSearchInput(category.label);
                              setinitialSearch(true);
                            }}
                            className="hover:border-green-300 hover:text-foreground"
                          >
                            {category.emoji + " " + category.label}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {<CustomHitsTags setSearchInput={setSearchInput} />}
                      </div>
                    )}
                  </Box>

                  <Stats
                    className="hidden whitespace-nowrap text-sm text-muted-foreground  sm:block"
                    translationds={{
                      stats(processingTimeMS: number) {
                        let hitCountPhrase;
                        return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`;
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
        <div className="mx-2 mb-24 flex flex-col items-center gap-2 md:mx-8">
          <div className="flex w-full auto-cols-auto">
            <div
              className={`w-1/4 ${isFilterVisible ? "mr-4 block" : "h-0 !w-0 opacity-0"} transition-opacity duration-200`}
            >
              <div className="flex flex-col justify-between">
                <div className="mt-2">
                  <div className="mr-4">
                    <h5 className="">Filter by Activity</h5>
                    <RefinementList
                      className="mt-3"
                      attribute="label_type"
                      limit={10}
                      showMore={true}
                      showMoreLimit={20}
                      searchablePlaceholder="Search by activity"
                      searchable={true}
                      onClick={() => setinitialSearch(true)}
                      transformItems={(items) =>
                        items.sort((a, b) => (a.count < b.count ? 1 : -1))
                      }
                    />
                    <h5 className="mt-5">Contract Type</h5>
                    <HierarchicalMenu
                      onClick={() => setinitialSearch(true)}
                      className="mt-3"
                      attributes={["label_subtype"]}
                      transformItems={(items) =>
                        items.sort((a, b) => (a.count < b.count ? 1 : -1))
                      }
                    />
                    <div className="mt-1">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex w-full flex-col transition-all">
              <div className="hidden w-full items-center justify-between sm:flex">
                <button
                  className="mb-0.5 w-auto rounded-md p-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-200"
                  onClick={toggleFilterVisibility}
                  aria-label="Open sidebar"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6H20M4 12H20M4 18H11"
                    ></path>
                  </svg>
                </button>
                <div>
                  <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                      <span className="text-xs">⌘</span>F
                    </kbd>
                    to search the table
                  </p>
                </div>
              </div>
              {initialSearch ? (
                <CustomHits />
              ) : data ? (
                <Grid data={data} />
              ) : (
                "Loading..."
              )}
            </div>
          </div>
        </div>
      </InstantSearch>
      <Footer />
    </main>
  );
}
