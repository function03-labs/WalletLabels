export function PricingLoading({ isDashboard }: { isDashboard: boolean }) {
  return (
    <section className="md:py-17 container grid items-center gap-10 pb-8 pt-10 duration-500 animate-in fade-in-50">
      <div
        className={`container mt-4 grid items-center gap-5 rounded-3xl border ${
          isDashboard ? "bg-card" : ""
        } py-8 text-card-foreground shadow`}
      >
        {" "}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4">
          <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-6 w-96 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-3xl p-8 ring-1 ring-secondary"
            >
              <div className="h-6 w-24 animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              <div className="space-y-3 pt-4">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-full animate-pulse rounded-lg bg-muted"
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
