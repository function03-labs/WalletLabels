export function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  )
}
