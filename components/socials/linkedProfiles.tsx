import { useEnsResolver } from "@/hooks/useEnsResolver";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tippy";

interface CellProps<T> {
  row: {
    original: T;
    getValue: (key: keyof T) => any;
  };
}

export interface Label {
  _id: string;
  id: string;
  name: string;
  ens: string;
  handle: string;
  followers: number;
  verified: boolean;
  updated: string;
  pfp: string; // URL to the profile picture
  labels: string[];
}

const LinkedProfilesCell: React.FC<CellProps<Label>> = ({ row }) => {
  const { ens } = row.original;
  const { address } = useEnsResolver(ens);
  const addressesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedAddresses, setFetchedAddresses] = useState<string[]>([]);
  const [fetchedAddressesCount, setFetchedAddressesCount] = useState<number>();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [formattedLinkedAddresses, setFormattedLinkedAddresses] =
    useState<string>("");

  const apiUrl = `https://www.onceupon.gg/api/neighbors/${address}?page=${currentPage}&per_page=${addressesPerPage}`;

  const showTooltip = () => {
    setIsTooltipOpen(true);
  };

  const hideTooltip = () => {
    setIsTooltipOpen(false);
  };

  useEffect(() => {
    async function fetchLinkedAddresses() {
      try {
        if (address && address !== null) {
          const response = await axios.get(apiUrl);
          console.log("error is ", response);
          const data = response.data;
          console.log(data.length);
          setFetchedAddressesCount(data.length);
          const formattedAddresses = data.map((item) => item._id).join(", ");
          setFormattedLinkedAddresses(formattedAddresses);
          setFetchedAddresses(formattedAddresses);
        }
      } catch (error) {
        console.error("Error fetching linked addresses:", error);
      }
    }

    fetchLinkedAddresses();
  }, [address, apiUrl]);

  return (
    <div className="custom-cursor">
      <span className="custom-span flex items-center gap-2">
        {fetchedAddressesCount ? (
          <span>
            <Tooltip
              title={formattedLinkedAddresses}
              position="top"
              trigger="mouseenter"
              open={isTooltipOpen}
              onRequestClose={hideTooltip}
              className="
              dark:text-gray-30 absolute top-[0px]
              right-5 bg-white
              text-gray-600 duration-200
              transition-opacity dark:bg-gray-800
            "
            ></Tooltip>
            <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
              {fetchedAddressesCount}
            </span>
          </span>
        ) : (
          <span>0</span>
        )}
      </span>
    </div>
  );
};

export default LinkedProfilesCell;
