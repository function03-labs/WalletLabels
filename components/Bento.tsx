"use client";

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
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100  bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
        <div className="h-4 w-full rounded-full">
          <p className="text-gray-500">0x5cf09a7a69aae368aef6f3...</p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full">
          <p className="text-gray-500">0x8fd1a3ea61b6be38...</p>
        </div>
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
        <div className="h-4 w-full rounded-full">
          <p className="text-gray-500">6fGsWEvArGqpLKQwotfw31uP...</p>
        </div>
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
    description: "Contribute to the community by labeling addresses.",
    header: <Skeleton />,
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
  );
}
