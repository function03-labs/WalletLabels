import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { datasets } from "@/data/datasets"

export default function DatasetsPage() {
  return (
    <section className="w-full py-4 sm:p-10">
      <h1 className="text-3xl font-bold mb-6">Curated Datasets</h1>
      <BentoGrid>
        {datasets.map((dataset) => (
          <BentoGridItem
            key={dataset.id}
            title={dataset.title}
            description={dataset.description}
            header={<img src={dataset.image} alt={dataset.title} />}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
