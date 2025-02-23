export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null

  return (
    <div
      className="fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-yellow-800 p-3 font-mono text-xs text-white"
      data-oid="bx0d-o6"
    >
      <div className="block sm:hidden" data-oid="5ue9vmk">
        xs
      </div>
      <div
        className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
        data-oid="2x6-kha"
      >
        sm
      </div>
      <div
        className="hidden md:block lg:hidden xl:hidden 2xl:hidden"
        data-oid=".my0i73"
      >
        md
      </div>
      <div className="hidden lg:block xl:hidden 2xl:hidden" data-oid="aynbt8x">
        lg
      </div>
      <div className="hidden xl:block 2xl:hidden" data-oid="5prpf-w">
        xl
      </div>
      <div className="hidden 2xl:block" data-oid="7tvgeh.">
        2xl
      </div>
    </div>
  )
}
