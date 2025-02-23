export function PricingLoading({ isDashboard }: { isDashboard: boolean }) {
  return (
    <section
      className="md:py-17 container grid items-center gap-10 pb-8 pt-10 duration-500 animate-in fade-in-50"
      data-oid="cyc.2pg"
    >
      <div
        className={`container mt-4 grid items-center gap-5 rounded-3xl border ${
          isDashboard ? "bg-card" : ""
        } py-8 text-card-foreground shadow`}
        data-oid=".77gs89"
      >
        {" "}
        <div
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4"
          data-oid="4u0:pi2"
        >
          <div
            className="h-12 w-48 animate-pulse rounded-lg bg-muted"
            data-oid="y255.qb"
          />

          <div
            className="h-6 w-96 animate-pulse rounded-lg bg-muted"
            data-oid="mrxq7h2"
          />
        </div>
        <div className="mx-auto w-full max-w-md" data-oid="x1yqwzn">
          <div
            className="h-10 animate-pulse rounded-lg bg-muted"
            data-oid="uv1_dhk"
          />
        </div>
        <div className="grid gap-8 lg:grid-cols-3" data-oid="nlkk2zb">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-3xl p-8 ring-1 ring-secondary"
              data-oid="-pd5mn2"
            >
              <div
                className="h-6 w-24 animate-pulse rounded-lg bg-muted"
                data-oid="-:gmbu4"
              />

              <div
                className="h-4 w-full animate-pulse rounded-lg bg-muted"
                data-oid="e3:_fc."
              />

              <div
                className="h-8 w-20 animate-pulse rounded-lg bg-muted"
                data-oid=".74p_2e"
              />

              <div
                className="h-10 w-full animate-pulse rounded-lg bg-muted"
                data-oid="z79.7yi"
              />

              <div className="space-y-3 pt-4" data-oid="7f4n_0s">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-full animate-pulse rounded-lg bg-muted"
                    data-oid="pkndtnu"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
