import { Label, columns } from "./columns";
import { DataTable } from "./data-table";
import { sociallabels_db1 } from "@prisma/client";

export async function getData(): Promise<Label[]> {
  return [];
}

interface DemoPageProps {
  data: sociallabels_db1[];
  pageCount: number;
}

export default function DemoPage({ data, pageCount }: DemoPageProps) {
  return (
    <div className="container !px-0  py-10">
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        searchableColumns={[
          {
            id: "name",
            title: "Name",
          },
        ]}
      />
    </div>
  );
}
