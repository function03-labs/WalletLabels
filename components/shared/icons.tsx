import Image from "next/image"
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Laptop,
  Loader2,
  LucideIcon,
  MailIcon,
  Monitor,
  Moon,
  MoreVertical,
  PencilIcon,
  PhoneIcon,
  Pizza,
  Plus,
  Search,
  Settings,
  SunMedium,
  Trash,
  UserCircleIcon,
  UserCogIcon,
  X,
} from "lucide-react"
import { FaDiscord, FaGithub } from "react-icons/fa"
import {
  MdOutlineDescription,
  MdOutlineIntegrationInstructions,
  MdOutlineMemory,
} from "react-icons/md"

export type Icon = LucideIcon

function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/favicons/android-chrome-192x192.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

export const Icons = {
  logo: LogoIcon,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: ImageIcon,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: UserCircleIcon,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  search: Search,
  twitter: X,
  check: Check,
  orderbook: BookOpenText,
  chevronsUpDown: ChevronsUpDown,
  phone: PhoneIcon,
  mail: MailIcon,
  pencil: PencilIcon,
  student: PencilIcon,
  teacher: UserCogIcon,
  monitor: Monitor,
  discord: FaDiscord,
  github: FaGithub,
  memory: MdOutlineMemory,
  integrationInstructions: MdOutlineIntegrationInstructions,
  description: MdOutlineDescription,
}
