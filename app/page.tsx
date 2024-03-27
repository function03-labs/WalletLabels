import { SearchBox } from "@component/SearchBox";
import { FindingFilter } from "@component/FindingFilter";
import { ActivityFilter } from "@component/ActivityFilter";

import { CountingUp } from "@component/CountingUp";

import { FramerWrapper } from "@component/wrapper/FramerWrapper";
import { SearchWrapper } from "@component/wrapper/SearchWrapper";

/* async function getData() {
  try {
    const data = await fetch("/api/db");
    return data.json();
  } catch (error) {
    console.error(error);
  }
} */

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //const data = await getData();

  /* const [searchInput, setSearchInput] = useState("");
  const [initialSearch, setinitialSearch] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  }; */

  return (
    <FramerWrapper>
      <SearchWrapper>
        <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10 ">
          <div className="flex flex-col items-center gap-6">
            <div className="hidden sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/30 hover:ring-gray-900/50 dark:text-gray-400 dark:ring-white/30 dark:hover:ring-white/50">
                Check out our new API endpoints.{" "}
                <a
                  href="https://docs.walletlabels.xyz/"
                  className="font-semibold text-blue-800 dark:text-white"
                >
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
              <CountingUp />
              addresses labeled for you to easily identify your{" "}
              <br className="hidden sm:inline" />
              favorite wallets and exchanges.
            </p>
            <div className="mt-3 w-full text-center sm:w-4/5">
              <SearchBox params={searchParams} />
              <FindingFilter params={searchParams} />
            </div>
          </div>
        </section>
        <ActivityFilter params={searchParams} />
      </SearchWrapper>
    </FramerWrapper>
  );
}
