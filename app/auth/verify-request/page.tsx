export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-black dark:to-black">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all dark:border-slate-800 dark:bg-black/70">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Check your email
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            A sign in link has been sent to your email address. Please check
            your inbox to continue.
          </p>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Can't find the email? Check your spam folder or request a new link.
          </div>
        </div>
      </div>
    </div>
  )
}
