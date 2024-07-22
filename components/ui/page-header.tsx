export function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
      <p className="text-base text-gray-500 dark:text-gray-200">
        {description}
      </p>
    </div>
  )
}
