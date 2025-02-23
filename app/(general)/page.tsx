import { env } from "@/env.mjs"

import { getSession } from "@/lib/session"

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
    const data = await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/chain/ethereum`)
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
  const session = await getSession()

  return (
    <SearchWrapper chainSlug={"/"} data-oid="swk72tu">
      <section
        className="md:py-17 container grid items-center gap-10 pb-8 pt-10 "
        data-oid="cuee.gb"
      >
        <div className="flex flex-col items-center gap-6" data-oid="pu4if.y">
          {!session?.user ? (
            <div className="flex justify-center text-center" data-oid=".h9z7f5">
              <HoverBorderGradient
                clockwise
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
                data-oid="6mf6dav"
              >
                <div className="px-3 py-1 text-sm" data-oid="a-kgt7h">
                  Check out our API endpoints.{" "}
                  <a
                    href="https://docs.walletlabels.xyz/"
                    className="font-semibold text-blue-800 dark:text-white"
                    data-oid="68m_bm4"
                  >
                    Access now{" "}
                    <span aria-hidden="true" data-oid="9e.n5an">
                      &rarr;
                    </span>
                  </a>
                </div>
              </HoverBorderGradient>
            </div>
          ) : (
            <div className="flex justify-center text-center" data-oid="19s2s-r">
              <HoverBorderGradient
                clockwise
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
                data-oid="86mj6wd"
              >
                <div className="px-3 py-1 text-sm" data-oid="ryy7-rv">
                  Welcome back! Go to your{" "}
                  <a
                    href="/dashboard"
                    className="font-semibold text-blue-800 dark:text-white"
                    data-oid="4gttu8r"
                  >
                    Dashboard{" "}
                    <span aria-hidden="true" data-oid="ry1an3v">
                      &rarr;
                    </span>
                  </a>
                </div>
              </HoverBorderGradient>
            </div>
          )}
          <h1
            className="text-center text-3xl font-bold leading-tight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            data-oid="rwv:oum"
          >
            What would you like to{" "}
            <br className="hidden sm:inline" data-oid="k2973j." />
            search today?
          </h1>
          <p
            id="search-box"
            className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl"
            data-oid="eb0hkff"
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
              data-oid="xxwp70t"
            />
            addresses labeled for you to easily identify your{" "}
            <br className="hidden sm:inline" data-oid="yxyxuwo" />
            favorite wallets and exchanges.
          </p>
          <Bento data-oid="8woecy4" />
          <div
            id="search-box"
            className="mt-3 w-full text-center sm:w-4/5"
            data-oid="9-y7op-"
          >
            <SearchBox
              params={{ chainSlug: "ethereum" }}
              searchParams={searchParams}
              data-oid="x9m_eaf"
            />

            <FindingFilter params={searchParams} data-oid="u13czp5" />
          </div>
        </div>
      </section>
      <ActivityFilter data-oid="aowuu1l" />
      <div className="px-2 md:px-4 lg:px-12" data-oid="iovgb2.">
        {searchParams.query || searchParams.isRefined ? (
          <CustomHits chainSlug="ethereum" data-oid="q.5qk4o" />
        ) : (
          <Grid data={data} chainSlug="ethereum" data-oid="ccsgxzq" />
        )}
      </div>
    </SearchWrapper>
  )
}
