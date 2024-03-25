import { CustomHits, SearchBox } from "@component/SearchBox";
import { HierarchicalMenu, RefinementList } from "react-instantsearch";

export function ActivityFilter({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  return (
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
  );
}
