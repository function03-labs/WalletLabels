import { Icons } from "@component/ui/Lucide";

const Skeleton = () => (
  <div className="flex size-full min-h-[6rem] flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);

export const items = [
  {
    title: "Explore",
    description: "Discover the latest addresses labeled by our community.",
    header: <Skeleton />,
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
    header: <Skeleton />,
    icon: <Icons.add className="size-4 text-neutral-500" />,
  },
];
