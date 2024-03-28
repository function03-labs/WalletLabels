import React from "react";
import Image from "next/image";
import { Chip } from "@nextui-org/react";
import { MdVerified } from "react-icons/md";

import prisma from "@lib/prisma";
import { sociallabels_db1 } from "@prisma/client";

import { CountingUp } from "@component/CountingUp";
import { socialMediaProviders } from "@component/SocialMediaProviders";

/* import DemoPage from "@/components/socials/page";
 */

interface SocialPageProps {
  query: {
    [key: string]: string | string[] | undefined;
  };
}

const socialIcons = (
  <div className="flex -space-x-4">
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1681393223447760896/sV5elUdO_400x400.jpg"
      alt=""
    />
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1580135504313724928/uPHa5dQi_400x400.png"
      alt=""
    />
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1444398863268339717/2jQUsbjB_400x400.jpg"
      alt=""
    />
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1656068195957059585/v0TLH4E6_400x400.jpg"
      alt=""
    />
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1680265592102592518/ixkD0LCJ_400x400.jpg"
      alt=""
    />
    <Image
      width="40"
      height="40"
      className="size-10 rounded-full border-2 border-white transition-transform hover:z-10 hover:-translate-y-1 dark:border-gray-800"
      src="https://pbs.twimg.com/profile_images/1622150019783565312/YuAqw3kL_400x400.jpg"
      alt=""
    />

    <a
      className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800"
      href="#"
    >
      +99
    </a>
  </div>
);

/* export async function getServerSideProps({
  query: searchParams,
}: SocialPageProps) {
  const { page, per_page, sort, name, status, priority } = searchParams;
  console.log(searchParams);

  const limit =
    typeof per_page === "string" ? Math.min(parseInt(per_page), 40) : 10;
  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0;
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof sociallabels_db1 | undefined,
          "asc" | "desc" | undefined,
        ])
      : [];

  const labels = await prisma.sociallabels_db1.findMany({
    take: limit,
    skip: offset,
    orderBy: column ? { [column]: order || "asc" } : undefined,
    where: {
      AND: [
        typeof name === "string"
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { handle: { contains: name, mode: "insensitive" } },
              ],
            }
          : undefined,
        typeof status === "string"
          ? {
              OR: [
                { name: { contains: status, mode: "insensitive" } },
                { handle: { contains: status, mode: "insensitive" } },
              ],
            }
          : undefined,
      ],
    },
    select: {
      id: true,
      ens: true,
      followers: true,
      handle: true,
      id_: false,
      name: true,
      pfp: true,
      ranking: true,
      updated: true,
      verified: true,
    },
  });

  const totalLabels = await prisma.sociallabels_db1.count({
    where: {
      AND: [
        typeof name === "string"
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { handle: { contains: name, mode: "insensitive" } },
              ],
            }
          : undefined,
        // Filter tasks by status
        typeof status === "string"
          ? {
              OR: [
                { name: { contains: status, mode: "insensitive" } },
                { handle: { contains: status, mode: "insensitive" } },
              ],
            }
          : undefined,
      ],
    },
  });

  const pageCount = Math.ceil(totalLabels / limit);

  return {
    props: {
      data: labels,
      pageCount,
    },
  };
} */
export default function SocialsPage({
  data,
  pageCount,
}: {
  data: sociallabels_db1[];
  pageCount: number;
}) {
  return (
    <section className="container items-center gap-10 pb-8 pt-12 md:py-14">
      <div className="flex flex-col items-center gap-4">
        <div className="hidden sm:flex sm:justify-center">
          <div
            className="relative rounded-full px-3 py-1 text-sm leading-6 text-green-600 ring-2 ring-green-400/20 hover:ring-green-400/30
             dark:text-green-400 dark:ring-green-100/10 dark:hover:ring-green-100/20"
          >
            Recently Added
          </div>
        </div>
        <div className="relative flex items-center">
          <h1 className="z-10 text-center text-2xl font-semibold leading-tight sm:text-xl md:text-5xl lg:text-5xl">
            Social Labels <br className="hidden sm:inline" />
          </h1>
          <div className="absolute bottom-[-15px] right-[-30px] text-blue-500   opacity-40 hover:animate-ping ">
            <MdVerified size={52} />
          </div>
        </div>
        <p className="max-w-[700px] text-center text-lg text-slate-700 dark:text-slate-400 sm:text-lg">
          Map{" "}
          <CountingUp
            className="inline-block font-bold text-gray-900 underline decoration-blue-300 decoration-dashed underline-offset-4 dark:text-gray-100 dark:decoration-blue-500"
            end={120000}
            duration={2}
            seperator=","
            decimals={0}
            prefix=" "
            suffix=" "
            start={0}
          />
          {"+ "}
          Ethereum addresses to their correlated social identities, making it
          easy to track, follow and interact with your favorite accounts.
        </p>
        {socialIcons}
        <div className="socials-btn-wrp mt-10 flex gap-1 ">
          <div className=" custom-filter-platforms block">
            Filter by platforms:
          </div>
          <div className="custom-filter-platforms-icons flex gap-1">
            {/*   {socialMediaProviders.map((provider, index) => (
              <Chip
                key={provider.name}
                startContent={<provider.icon size={18} className="mx-1" />}
                className={` cursor-not-allowed transition-all duration-150  hover:bg-gray-100 dark:hover:bg-gray-800
                ${provider.textColor} 
                ${
                  selectedProviders.includes(provider.name)
                    ? provider.textColor
                    : ""
                }  
                ${
                  selectedProviders.includes(provider.name)
                    ? provider.bgColor
                    : ""
                }
                `}
                variant={
                  selectedProviders.includes(provider.name) ? "faded" : "dot"
                }
                onClick={() => {
                  // handleChipClick(provider.name)
                }}
              >
                {provider.name}
              </Chip>
            ))}{" "} */}
          </div>
        </div>
        {/*  <DemoPage data={data} pageCount={pageCount} /> */}
        {/* <Shell>
            <TasksTableShell data={data} pageCount={pageCount} />
          </Shell> */}
      </div>
    </section>
  );
}
