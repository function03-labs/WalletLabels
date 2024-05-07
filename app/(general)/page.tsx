import { env } from "@/env.mjs"

import { ActivityFilter } from "@/components/app/app-activity-filter"
import { CustomHits } from "@/components/app/app-custom-hits"
import { FindingFilter } from "@/components/app/app-finding-filter"
import { Grid } from "@/components/app/app-grid"
import { SearchWrapper } from "@/components/providers/search-wrapper"
import { Bento } from "@/components/shared/bento"
import { CountingUp } from "@/components/shared/counting-up"
import { SearchBox } from "@/components/shared/search-box"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

async function getData() {
  try {
    const data = await fetch(`${env.PUBLIC_URL}/api/chain/ethereum`)
    return data.json()
  } catch (error) {
    console.error(error)
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const data = await getData()

  return (
    <SearchWrapper chainSlug={"/"}>
      <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10 ">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center text-center">
            <HoverBorderGradient
              clockwise
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
            >
              <div className="px-3 py-1 text-sm">
                Check out our API endpoints.{" "}
                <a
                  href="https://docs.walletlabels.xyz/"
                  className="font-semibold text-blue-800 dark:text-white"
                >
                  Access now <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </HoverBorderGradient>
          </div>
          <h1 className="text-center text-3xl font-bold leading-tight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            What would you like to <br className="hidden sm:inline" />
            search today?
          </h1>
          <p
            id="search-box"
            className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl"
          >
            More than
            <CountingUp
              start={0}
              end={200}
              duration={2}
              decimals={0}
              prefix=" "
              suffix="M "
              className="text-xl font-semibold text-slate-700 dark:text-slate-400"
            />
            addresses labeled for you to easily identify your{" "}
            <br className="hidden sm:inline" />
            favorite wallets and exchanges.
          </p>
          <Bento />
          <div id="search-box" className="mt-3 w-full text-center sm:w-4/5">
            <SearchBox
              params={{ chainSlug: "ethereum" }}
              searchParams={searchParams}
            />
            <FindingFilter params={searchParams} />
          </div>
        </div>
      </section>
      <ActivityFilter />
      <div className="px-2 md:px-4 lg:px-12">
        {searchParams.query || searchParams.isRefined ? (
          <CustomHits />
        ) : (
          <Grid data={data} />
        )}
      </div>
    </SearchWrapper>
  )
}
