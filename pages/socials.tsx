import React from "react"
import { Chip } from "@nextui-org/react"
import { sociallabels_db1 } from "@prisma/client"
import CountUp from "react-countup"
import { MdVerified } from "react-icons/md"

import { connectToDatabase } from "@/lib/mongodb_social"
import prisma from "@/lib/prisma"
import { Layout } from "@/components/layout"
import { Shell } from "@/components/shells/shell"
import { TasksTableShell } from "@/components/shells/tasks-table-shell"
import { socialMediaProviders } from "@/components/socialMediaProviders"
import DemoPage from "@/components/socials/page"
import { socialIcons } from "../components/socialIcons"
import { fontMonoJetBrains } from "./_app"

interface SocialPageProps {
  query: {
    [key: string]: string | string[] | undefined
  }
}

// export async function getStaticProps() {
//   try {
//     let db = await connectToDatabase()
//     let labels = await db.db
//       .collection("sociallabels_db1")
//       .find()
//       .limit(30)
//       .toArray()

//     // Check if the response status is OK (200)
//     if (labels) {
//       // do not take _id from mongodb
//       const data = labels.map(({ _id, id, ...rest }) => rest)

//       // Return the data as props along with revalidate property set to 24 hours (in seconds)
//       return {
//         props: {
//           data,
//         },
//         revalidate: 86400, // 24 hours in seconds
//       }
//     } else {
//       // If the response status is not 200, handle the error or return an empty data array
//       return {
//         props: {
//           data: [],
//         },
//       }
//     }
//   } catch (error) {
//     // Handle any error that might occur during the API request
//     console.error(error)

//     // Return an empty data array or handle the error as you wish
//     return {
//       props: {
//         data: [],
//       },
//     }
//   }
// }

// getServersideProps to get data from prisma to get labelss from searchParams and pass it to DemoPage
export async function getServerSideProps({
  query: searchParams,
}: SocialPageProps) {
  const { page, per_page, sort, name, status, priority } = searchParams
  console.log(searchParams)

  // Number of items per page
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10
  // Number of items to skip
  const offset =
    typeof page === "string"
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0
  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof sociallabels_db1 | undefined,
          "asc" | "desc" | undefined
        ])
      : []

  const labels = await prisma.sociallabels_db1.findMany({
    take: limit,
    skip: offset,
    orderBy: column ? { [column]: order || "asc" } : undefined,
    where: {
      AND: [
        // Filter tasks by title
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
    // remove _id field
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
  })

  const totalLabels = await prisma.sociallabels_db1.count({
    where: {
      AND: [
        // Filter tasks by title
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
  })

  const pageCount = Math.ceil(totalLabels / limit)

  return {
    props: {
      data: labels,
      pageCount,
    },
  }
}

export default function SocialsPage({ data, pageCount }) {
  const [selectedProviders, setSelectedProviders] = React.useState([])
  const handleChipClick = name => {
    if (selectedProviders.includes(name)) {
      setSelectedProviders(prev => prev.filter(provider => provider !== name))
    } else {
      setSelectedProviders(prev => [...prev, name])
    }
  }

  return (
    <Layout>
      <section className="container items-center gap-10 pt-12 pb-8 md:py-14">
        <div className="flex flex-col items-center gap-4">
          <div className="hidden sm:flex sm:justify-center">
            <div
              className="relative rounded-full px-3 py-1 text-sm leading-6 text-green-600 ring-2 ring-green-400/20 hover:ring-green-400/30
             dark:text-green-400 dark:ring-green-100/10 dark:hover:ring-green-100/20">
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
            <CountUp
              className="inline-block font-bold text-gray-900 underline decoration-blue-300 decoration-dashed underline-offset-4 dark:text-gray-100 dark:decoration-blue-500"
              style={fontMonoJetBrains.style}
              end={120000}
              duration={2}
              separator=","
            />
            {"+ "}
            Ethereum addresses to their correlated social identities, making it
            easy to track, follow and interact with your favorite accounts.
          </p>
          {socialIcons}
          {/* Add select social media badges to pick from */}
          <div className="flex gap-1 mt-10 socials-btn-wrp ">
            <div className=" block custom-filter-platforms">
              Filter by platforms:
            </div>
            <div className="flex gap-1 custom-filter-platforms-icons">
              {socialMediaProviders.map(provider => (
                <Chip
                  key={provider.name}
                  startContent={<provider.icon size={18} className="mx-1" />}
                  className={` cursor-not-allowed duration-150 transition-all  hover:bg-gray-100 dark:hover:bg-gray-800
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
                  }}>
                  {provider.name}
                </Chip>
              ))}{" "}
            </div>
          </div>
          <DemoPage data={data} pageCount={pageCount} />
          {/* <Shell>
            <TasksTableShell data={data} pageCount={pageCount} />
          </Shell> */}
        </div>
      </section>
    </Layout>
  )
}
