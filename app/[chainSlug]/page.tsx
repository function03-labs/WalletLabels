import { redirect } from "next/navigation";

import { Grid } from "@component/Grid";
import { SearchBox } from "@component/SearchBox";
import { CustomHits } from "@component/CustomHits";
import { CountingUp } from "@component/CountingUp";
import { FindingFilter } from "@component/FindingFilter";
import { ActivityFilter } from "@component/ActivityFilter";
import { BentoGrid, BentoGridItem } from "@component/ui/BentoGrid";
import { HoverBorderGradient } from "@component/ui/HoverBorderGradient";

import { FramerWrapper } from "@component/wrapper/FramerWrapper";
import { SearchWrapper } from "@component/wrapper/SearchWrapper";

import { items } from "@config/grid";

async function getData({
  params,
  searchParams,
}: {
  params: { chainSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const data = await fetch(
      `${process.env.PUBLIC_URL}/api/${params.chainSlug}`
    );
    return data.json();
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { chainSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData({ params, searchParams });

  return (
    <FramerWrapper>
      <SearchWrapper>
        <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10 ">
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
              >
                <div className="px-3 py-1 text-sm">
                  Check out our new API endpoints.{" "}
                  <a
                    href="https://docs.walletlabels.xyz/"
                    className="font-semibold text-blue-800 dark:text-white"
                  >
                    Access now <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </HoverBorderGradient>
            </div>
            <h1 className="text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              What would you like to <br className="hidden sm:inline" />
              search today?
            </h1>
            <p className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              More than
              <CountingUp
                start={0}
                end={70}
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
            <BentoGrid className="mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
              ))}
            </BentoGrid>
            <div className="mt-3 w-full text-center sm:w-4/5">
              <SearchBox params={params} searchParams={searchParams} />
              <FindingFilter params={searchParams} />
            </div>
          </div>
        </section>
        <ActivityFilter />
        <div className="px-12">
          {searchParams.query ? (
            <CustomHits params={params} searchParams={searchParams} />
          ) : (
            <Grid data={data} />
          )}
        </div>
      </SearchWrapper>
    </FramerWrapper>
  );
}
