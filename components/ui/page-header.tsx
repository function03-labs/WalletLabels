export function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-1" data-oid="tzmq06d">
      <h2 className="text-2xl font-bold dark:text-white" data-oid="60:65gb">
        {title}
      </h2>
      <p
        className="text-base text-gray-500 dark:text-gray-200"
        data-oid="knld0t9"
      >
        {description}
      </p>
    </div>
  )
}
