import { cn } from "@/lib/utils"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 ",
        className
      )}
      data-oid="y:hn0c9"
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-black/[0.2] bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
      data-oid="zbr_f.b"
    >
      {header}
      <div
        className="transition duration-200 group-hover/bento:translate-x-2"
        data-oid="cwy-vfe"
      >
        {icon}
        <div
          className="my-2 font-sans font-bold text-neutral-600 dark:text-neutral-200"
          data-oid="6ou.j:n"
        >
          {title}
        </div>
        <div
          className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300"
          data-oid="ghatgsx"
        >
          {description}
        </div>
      </div>
    </div>
  )
}
