import { Label, columns } from "./columns";
import { DataTable } from "./data-table";

export async function getData(): Promise<Label[]> {
  return [];
  // return [
  //     {
  //         id: "728ed52f",
  //         amount: 100,
  //         status: "pending",
  //         email: "m@example.com",
  //     },
  //     // ...
  // ]
}

export default function DemoPage({ data }: { data: Label[] }) {
  return (
    <div className="container !px-0  py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
