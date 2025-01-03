export function SubscriptionLoading() {
  return (
    <div
      className={`container mt-4 grid items-center gap-5 rounded-3xl border bg-card py-8 text-card-foreground shadow`}
    >
      <div className="container mx-auto p-6">
        {/* Main header section */}
        {/* Main header section */}
        <div className="mb-8 space-y-4 text-center">
          <div className="mx-auto h-14 w-[500px] animate-pulse rounded-lg bg-muted" />
          <div className="mx-auto h-6 w-[300px] animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Subscription card */}
        <div className="mx-auto max-w-[800px] space-y-6 rounded-3xl border bg-card p-8">
          {/* Plan header and status */}
          <div className="mb-2 flex items-center justify-between">
            <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
          </div>

          {/* Billing info */}
          <div className="mb-8 h-6 w-64 animate-pulse rounded-lg bg-muted" />

          {/* Plan Features section */}
          <div className="space-y-6">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
              </div>
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
              </div>
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
              </div>
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
              </div>
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t pt-6">
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
            <div className="size-8 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
