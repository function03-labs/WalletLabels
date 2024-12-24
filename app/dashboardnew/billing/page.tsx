"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CreditCard,
  Download,
  Receipt,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const currentPlan = {
  name: "Pro Plan",
  price: "$299",
  period: "month",
  usage: {
    current: 1560000,
    limit: 2400000,
    percentage: 65,
  },
  renewalDate: "Feb 12, 2024",
  features: [
    "5M API requests/month",
    "Real-time + Historical data",
    "Advanced analytics",
    "Priority support",
  ],
}

const billingHistory = [
  {
    id: "INV-001",
    date: "Jan 1, 2024",
    amount: "$299.00",
    status: "Paid",
    period: "Jan 1 - Jan 31",
  },
  {
    id: "INV-002",
    date: "Dec 1, 2023",
    amount: "$299.00",
    status: "Paid",
    period: "Dec 1 - Dec 31",
  },
  {
    id: "INV-003",
    date: "Nov 1, 2023",
    amount: "$299.00",
    status: "Paid",
    period: "Nov 1 - Nov 30",
  },
]

export default function BillingPage() {
  const router = useRouter()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleChangePlan = () => {
    router.push("/dashboardnew/billing/plans")
  }

  const handleUpdatePayment = () => {
    router.push("/dashboardnew/billing/payment")
  }

  const handleViewInvoice = (invoiceId: string) => {
    router.push(`/dashboardnew/billing/invoices/${invoiceId}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-gray-400">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/10 bg-black/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-blue-400" />
              <h2 className="font-semibold text-white">Current Plan</h2>
            </div>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              onClick={handleChangePlan}
            >
              Change Plan
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {currentPlan.name}
                </h3>
                <div>
                  <span className="text-2xl font-bold text-white">
                    {currentPlan.price}
                  </span>
                  <span className="text-sm text-gray-400">
                    /{currentPlan.period}
                  </span>
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-400">
                Renews on {currentPlan.renewalDate}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {currentPlan.usage.current.toLocaleString()}/
                  {currentPlan.usage.limit.toLocaleString()} requests
                </span>
                <span className="text-gray-400">
                  {currentPlan.usage.percentage}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${currentPlan.usage.percentage}%` }}
                />
              </div>
            </div>

            <ul className="space-y-2">
              {currentPlan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="size-1 rounded-full bg-blue-500" />
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm">
            <AlertCircle className="size-4 text-yellow-400" />
            <p className="text-yellow-400">
              You have used 65% of your monthly request limit
            </p>
          </div>
        </Card>

        <Card className="border-white/10 bg-black/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-5 text-blue-400" />
              <h2 className="font-semibold text-white">Payment Method</h2>
            </div>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              onClick={handleUpdatePayment}
            >
              Update
            </Button>
          </div>

          <div className="mb-6 rounded-lg border border-white/10 bg-black/50 p-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600" />
              <div>
                <div className="font-medium text-white">
                  •••• •••• •••• 4242
                </div>
                <div className="text-sm text-gray-400">Expires 12/25</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Next payment</span>
              <span className="text-white">$299.00</span>
            </div>
            <div className="flex justify-between">
              <span>Billing cycle</span>
              <span className="text-white">Monthly</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Billing History */}
      <Card className="border-white/10 bg-black/50">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="font-semibold text-white">Billing History</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Download className="mr-2 size-4" />
            Download All
          </Button>
        </div>
        <div className="divide-y divide-white/5">
          {billingHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-500/10 p-2 text-blue-400">
                  <Receipt className="size-4" />
                </div>
                <div>
                  <div className="font-medium text-white">{invoice.id}</div>
                  <div className="text-sm text-gray-400">{invoice.period}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="font-medium text-white">{invoice.amount}</div>
                  <div className="text-sm text-gray-400">{invoice.date}</div>
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    invoice.status === "Paid"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {invoice.status}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => handleViewInvoice(invoice.id)}
                >
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
