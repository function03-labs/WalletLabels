import CountUp from "react-countup";
import { Configure, InstantSearch } from "react-instantsearch";

import { Footer } from "@component/Footer";
import { SearchBox } from "@component/SearchBox";
import { SiteHeader } from "@component/SiteHeader";
import { FindingFilter } from "@component/FindingFilter";
import { FramerWrapper } from "@/components/wrapper/FramerWrapper";
import { ActivityFilter } from "@component/ActivityFilter";

import { searchClient } from "@lib/assemble-types";

/* async function getData() {
  try {
    const data = await fetch("/api/db");
    return data.json();
  } catch (error) {
    console.error(error);
  }
} */

export default function Page(/* {
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
} */) {
  //const data = await getData();

  /* const [searchInput, setSearchInput] = useState("");
  const [initialSearch, setinitialSearch] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  }; */

  return (
    <main>
      <SiteHeader />

      <Footer />
    </main>
  );
}
