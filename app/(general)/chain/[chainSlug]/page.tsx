import { redirect } from "next/navigation"
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
import { cp } from "fs"

async function getData({ params }: { params: { chainSlug: string } }) {
  try {
    const data = await fetch(
      `${env.NEXT_PUBLIC_SITE_URL}/api/chain/${params.chainSlug}`
    )
    return data.json()
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { chainSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const data = await getData({ params })

  return (
    <SearchWrapper chainSlug={params.chainSlug} data-oid="ntu9yol">
      <section
        className="md:py-17 container grid items-center gap-10 pb-8 pt-10"
        data-oid="16um.x4"
      >
        <div className="flex flex-col items-center gap-6" data-oid="9e79woe">
          <div className="flex justify-center text-center" data-oid="bd0lf0o">
            <HoverBorderGradient
              clockwise
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
              data-oid="o-:hhvv"
            >
              <div className="px-3 py-1 text-sm" data-oid="d-7sp3z">
                Check out our API endpoints.{" "}
                <a
                  href="https://docs.walletlabels.xyz/"
                  className="font-semibold text-blue-800 dark:text-white"
                  data-oid="696ccnp"
                >
                  Access now{" "}
                  <span aria-hidden="true" data-oid="j:ni_fk">
                    &rarr;
                  </span>
                </a>
              </div>
            </HoverBorderGradient>
          </div>
          <h1
            className="text-center text-3xl font-bold leading-tight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            data-oid="42:me07"
          >
            What would you like to{" "}
            <br className="hidden sm:inline" data-oid="h-_7ctj" />
            search today?
          </h1>
          <p
            id="search-box"
            className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl"
            data-oid="n:u2is1"
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
              data-oid="zy7:2dr"
            />
            addresses labeled for you to easily identify your{" "}
            <br className="hidden sm:inline" data-oid="dartiq7" />
            favorite wallets and exchanges.
          </p>
          <Bento data-oid="ljin4u_" />
          <div
            id="search-box"
            className="mt-3 w-full text-center sm:w-4/5"
            data-oid="mcc.taq"
          >
            <SearchBox
              params={params}
              searchParams={searchParams}
              data-oid="bo587_6"
            />

            <FindingFilter params={searchParams} data-oid="pitv5-y" />
          </div>
        </div>
      </section>
      <ActivityFilter data-oid="gmi::7e" />
      <div className="px-2 md:px-4 lg:px-12" data-oid="25rv4:5">
        {searchParams.query || searchParams.isRefined ? (
          <CustomHits chainSlug={params.chainSlug} data-oid="10p0569" />
        ) : (
          <Grid data={data} chainSlug={params.chainSlug} data-oid=":awgxv5" />
        )}
      </div>
    </SearchWrapper>
  )
}
