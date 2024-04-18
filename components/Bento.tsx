"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Icons } from "@component/ui/Lucide";
import { BentoGrid, BentoGridItem } from "@component/ui/BentoGrid";

const Skeleton = () => (
  <div className="flex size-full min-h-[6rem] flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);

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
  };
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
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
        <div className="mr-auto h-4 w-full rounded-full pr-8">
          <p className="mx-2 truncate text-xs text-gray-500 dark:text-gray-400">
            0x7b98e476de2c50b6fa284dbd410dd516f9a72b30
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="relative ml-auto flex w-fit flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 pl-4 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full">
          <div className="h-4 w-full rounded-full">
            <p className="pr-8 text-xs text-gray-500 dark:text-gray-400 sm:hidden">
              0x625e7708f30ca75bfd92586e17077590c60...
            </p>
            <p className="hidden pr-8 text-xs text-gray-500 dark:text-gray-400 sm:block md:text-right">
              0x625e7708f30ca75bfd92586e17077590c60eb4cd
            </p>
          </div>
        </div>

        <div className="absolute right-2 ml-4 size-6 shrink-0 rounded-full bg-gradient-to-l from-yellow-400 to-orange-600 " />
      </motion.div>

      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
        <div className="mr-auto h-4 w-full rounded-full pr-8">
          <p className="mx-2 truncate text-xs text-gray-500 dark:text-gray-400">
            6fGrKBimG3YhVwngvPrwL68BS782A64MdTJK41StGyQe
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1 flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <Image
          src="/bento/arkham-data-logo.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm">
          Arkham Data
        </p>
        <p className="align-items-center mt-4 flex justify-center rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          300k <span className="hidden pl-1 sm:block">labels</span>
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
        <Image
          src="/bento/etherscan-logo.png"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm">
          Etherscan
        </p>
        <p className="align-items-center mt-4 flex justify-center rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
          7M <span className="hidden pl-1 sm:block">labels</span>
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <Image
          src="/bento/nansen-logo.png"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full"
        />
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-200 sm:text-sm">
          Nansen
        </p>
        <p className="align-items-center mt-4 flex justify-center rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
          2M <span className="hidden pl-1 sm:block">labels</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

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
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1 flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full  border border-neutral-100 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
        ></motion.div>
      ))}
    </motion.div>
  );
};

export const items = [
  {
    title: "Explore",
    description: "Discover the latest addresses labeled by our community.",
    header: <SkeletonOne />,
    icon: <Icons.farcaster className="size-4 text-neutral-500" />,
  },
  {
    title: "Earn",
    description: "Contribute new labels and get rewarded!",
    header: <SkeletonTwo />,
    icon: <Icons.search className="size-4 text-neutral-500" />,
  },
  {
    title: "Submit labels",
    description: "Help us improve our database by submitting new labels.",
    header: <SkeletonThree />,
    icon: <Icons.add className="size-4 text-neutral-500" />,
  },
];

export function Bento() {
  return (
    <BentoGrid className="grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
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
  );
}
