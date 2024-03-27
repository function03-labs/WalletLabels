import * as z from "zod";
import prisma from "@lib/prisma";
import { sociallabels_db1 } from "@prisma/client";

const routeContextSchema = z.object({
  params: z.object({
    action: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { page, per_page, sort, name, status, priority } = await req.json();

  const limit =
    typeof per_page === "string" ? Math.min(parseInt(per_page), 40) : 10;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof sociallabels_db1 | undefined,
          "asc" | "desc" | undefined,
        ])
      : [];

  const labels = await prisma.sociallabels_db1.findMany({
    take: limit,
    skip: offset,
    orderBy: column ? { [column]: order || "asc" } : undefined,
    where: {
      AND: [
        typeof name === "string"
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { handle: { contains: name, mode: "insensitive" } },
              ],
            }
          : undefined,
        typeof status === "string"
          ? {
              OR: [
                { name: { contains: status, mode: "insensitive" } },
                { handle: { contains: status, mode: "insensitive" } },
              ],
            }
          : undefined,
      ],
    },
    select: {
      id: true,
      ens: true,
      followers: true,
      handle: true,
      id_: false,
      name: true,
      pfp: true,
      ranking: true,
      updated: true,
      verified: true,
    },
  });

  const totalLabels = await prisma.sociallabels_db1.count({
    where: {
      AND: [
        typeof name === "string"
          ? {
              OR: [
                { name: { contains: name, mode: "insensitive" } },
                { handle: { contains: name, mode: "insensitive" } },
              ],
            }
          : undefined,
        typeof status === "string"
          ? {
              OR: [
                { name: { contains: status, mode: "insensitive" } },
                { handle: { contains: status, mode: "insensitive" } },
              ],
            }
          : undefined,
      ],
    },
  });

  const pageCount = Math.ceil(totalLabels / limit);

  return new Response(JSON.stringify({ data: labels, pageCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
