/* eslint-disable @typescript-eslint/restrict-plus-operands */
"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Icons } from "@/components/shared/icons"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col space-y-2"
      data-oid="eb:o0j6"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
        data-oid="gc6n6i:"
      >
        <div
          className="size-6 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-500"
          data-oid="4a5ztgv"
        />

        <div
          className="mr-auto h-4 w-full rounded-full pr-8"
          data-oid="v_bf:e0"
        >
          <p
            className="mx-2 truncate text-xs text-gray-500 dark:text-gray-400"
            data-oid="1q0_nl7"
          >
            0x7b98e476de2c50b6fa284dbd410dd516f9a72b30
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="relative ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
        data-oid="lhdvo79"
      >
        <div className="h-4 w-full rounded-full" data-oid="f68ughx">
          <p
            className="truncate pr-5 text-xs text-gray-500 dark:text-gray-400"
            data-oid="ek53hyp"
          >
            0x625e7708f30ca75bfd92586e17077590c60eb4cd
          </p>
        </div>

        <div
          className="absolute right-2 size-6 shrink-0 rounded-full bg-gradient-to-l from-yellow-400 to-orange-600"
          data-oid="y9-3i8u"
        />
      </motion.div>

      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
        data-oid="morvo7f"
      >
        <div
          className="size-6 shrink-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500"
          data-oid="4no3_ha"
        />

        <div
          className="mr-auto h-4 w-full rounded-full pr-8"
          data-oid="_s5v08k"
        >
          <p
            className="mx-2 truncate text-xs text-gray-500 dark:text-gray-400"
            data-oid="ln731q:"
          >
            6fGrKBimG3YhVwngvPrwL68BS782A64MdTJK41StGyQe
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const SkeletonTwo = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-row space-x-2"
      data-oid="nqcd0f_"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
        data-oid="-46j.km"
      >
        <Image
          src="/bento/arkham-data-logo.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
          data-oid="nubku4e"
        />

        <p
          className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm"
          data-oid="8lq4300"
        >
          Arkham Data
        </p>
        <p
          className="align-items-center mt-4 flex justify-center rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20"
          data-oid="95.js1j"
        >
          300k{" "}
          <span className="hidden pl-1 sm:block" data-oid="jqhi:3w">
            labels
          </span>
        </p>
      </motion.div>
      <motion.div
        className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
        data-oid="kpuh9cf"
      >
        <Image
          src="/bento/etherscan-logo.png"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
          data-oid="q1.nins"
        />

        <p
          className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm"
          data-oid="c58.w4y"
        >
          Etherscan
        </p>
        <p
          className="align-items-center mt-4 flex justify-center rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20"
          data-oid="-2p7vw4"
        >
          7M{" "}
          <span className="hidden pl-1 sm:block" data-oid="35rm10w">
            labels
          </span>
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
        data-oid="zdw08ph"
      >
        <Image
          src="/bento/nansen-logo.png"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
          data-oid="rrl0g1o"
        />

        <p
          className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm"
          data-oid="tl2nsj0"
        >
          Nansen
        </p>
        <p
          className="align-items-center mt-4 flex justify-center rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20"
          data-oid="5c75i4p"
        >
          2M{" "}
          <span className="hidden pl-1 sm:block" data-oid="4mtmqf7">
            labels
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

const SkeletonThree = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  }
  const arr = new Array(6).fill(0)
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col space-y-2"
      data-oid="kqk2-b4"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full  border border-neutral-100 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
          data-oid="d.iwob_"
        ></motion.div>
      ))}
    </motion.div>
  )
}

export const items = [
  {
    title: "Explore",
    description: "Discover the latest addresses labeled by our community.",
    header: <SkeletonOne data-oid="tig8v:n" />,
    icon: (
      <Icons.farcaster className="size-4 text-neutral-500" data-oid="ms668gd" />
    ),
  },
  {
    title: "Earn",
    description: "Contribute new labels and get rewarded!",
    header: <SkeletonTwo data-oid="7.8kmt:" />,
    icon: (
      <Icons.search className="size-4 text-neutral-500" data-oid="xotycqu" />
    ),
  },
  {
    title: "Submit labels",
    description: "Help us improve our database by submitting new labels.",
    header: <SkeletonThree data-oid=".sd6qt3" />,
    icon: <Icons.add className="size-4 text-neutral-500" data-oid="fp.z3c9" />,
  },
]

export function Bento() {
  return (
    <BentoGrid
      className="grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3"
      data-oid="ki7-s1s"
    >
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          data-oid="w6m1syn"
        />
      ))}
    </BentoGrid>
  )
}
