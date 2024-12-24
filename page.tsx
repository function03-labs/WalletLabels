import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeIcon, CreditCardIcon, BookOpenIcon, UsersIcon } from 'lucide-react'
import Link from "next/link"
import { ApiExampleSection } from "@/components/api-example-section"
import { PricingSection } from "@/components/pricing-section"
import { EndpointsSection } from "@/components/endpoints-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <Link href="/" className="text-blue-400 text-xl font-semibold">
          financial datasets
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/features" className="flex items-center gap-2">
            <CodeIcon className="h-4 w-4" />
            Features
          </Link>
          <Link href="/pricing" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            Pricing
          </Link>
          <Link href="/docs" className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4" />
            Documentation
          </Link>
          <Link href="/community" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Community
          </Link>
          <Button variant="outline" className="bg-white/5 text-white border-white/10 hover:bg-white/10">
            Dashboard
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 text-transparent bg-clip-text">
          Connect your LLM
          <br />
          to the <span className="text-blue-500">stock market</span>
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          Access rich financial data that is optimized for LLMs and AI agents.
          <br />
          Our data covers <span className="font-semibold text-white">30,000+</span> tickers and goes back <span className="font-semibold text-white">30+</span> years.
        </p>
        <Button size="lg" className="bg-white text-black hover:bg-white/90">
          Login
        </Button>

        {/* API Preview Card */}
        <ApiExampleSection />
        <EndpointsSection />
        <PricingSection />

        {/* API Preview Card */}
        <Card className="mt-16 p-6 bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 animate-gradient" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-blue-400">financial datasets</div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">Support</span>
                <Button variant="outline" size="sm" className="bg-white/5 text-white border-white/10">
                  Dashboard
                </Button>
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">Income Statements</h2>
              <p className="text-gray-400 mb-4">Get income statements for a ticker.</p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm">
                <code className="text-gray-300">
                  GET /financials/income-statements
                </code>
              </pre>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>financial datasets © 2024</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

