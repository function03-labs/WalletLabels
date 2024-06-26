import { SVGProps } from "react"
import Image from "next/image"
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CirclePlus,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Laptop,
  Loader2,
  LoaderCircleIcon,
  LucideIcon,
  MailIcon,
  Monitor,
  Moon,
  MoreVertical,
  PencilIcon,
  PhoneIcon,
  Pizza,
  Plus,
  RefreshCw,
  Search,
  Settings,
  SunMedium,
  Trash,
  UserCircleIcon,
  UserCogIcon,
  X,
} from "lucide-react"
import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa"
import {
  MdOutlineDescription,
  MdOutlineIntegrationInstructions,
  MdOutlineMemory,
} from "react-icons/md"

export type Icon = LucideIcon

function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="transition"
      preserveAspectRatio="none"
      style={{
        borderRadius: 0,
        transform: "scale(1) rotate(0deg)",
      }}
      viewBox="0 0 500 500"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={35}
        d="m155.568 339.027 183.448-183.448M162.416 439.5h176.168c56.287 0 101.916-45.629 101.916-101.916V161.416c0-56.287-45.629-101.916-101.916-101.916H162.416C106.129 59.5 60.5 105.129 60.5 161.416v176.168c0 56.287 45.629 101.916 101.916 101.916Z"
      />
    </svg>
  )
}

function SolanaIcon({ className }: { className?: string }) {
  return (
    <Image
      src="https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
      alt={"solana"}
      className={className}
      width={30}
      height={30}
    />
  )
}

function ArbitrumIcon({ className }: { className?: string }) {
  return (
    <Image
      src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"
      alt={"arbitrum"}
      className={className}
      width={30}
      height={30}
    />
  )
}

function EthereumIcon({ className }: { className?: string }) {
  return (
    <Image
      src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
      alt={"ethereum"}
      className={className}
      width={30}
      height={30}
    />
  )
}

const Farcaster = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    viewBox="0 0 225 225"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M58 35H167V190H151V119H150.843C149.075 99.3773 132.583 84 112.5 84C92.4169 84 75.9253 99.3773 74.157 119H74V190H58V35Z"
      fill="currentColor"
    />
    <path
      d="M29 57L35.5 79H41V168C38.2386 168 36 170.239 36 173V179H35C32.2386 179 30 181.239 30 184V190H86V184C86 181.239 83.7614 179 81 179H80V173C80 170.239 77.7614 168 75 168H69V57H29Z"
      fill="currentColor"
    />
    <path
      d="M152 168C149.239 168 147 170.239 147 173V179H146C143.239 179 141 181.239 141 184V190H197V184C197 181.239 194.761 179 192 179H191V173C191 170.239 188.761 168 186 168V79H191.5L198 57H158V168H152Z"
      fill="currentColor"
    />
  </svg>
)

const Lens = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="35 54 107.37 68"
    stroke="currentColor"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M108.914 71.9026C113.315 68.2308 118.225 66.8338 122.934 67.187C127.957 67.5637 132.605 69.9182 136.077 73.3381C139.548 76.7582 141.933 81.3328 142.315 86.2698C142.7 91.2518 141.032 96.4698 136.634 101.049C136.232 101.471 135.821 101.887 135.401 102.298C115.453 121.948 88.9555 122 88.6844 122H88.6831C88.5476 122 61.966 121.999 41.9665 102.296L41.9622 102.291C41.5493 101.882 41.1427 101.47 40.7422 101.056L40.739 101.052C36.339 96.4767 34.6693 91.26 35.0533 86.278C35.4338 81.3418 37.8171 76.7667 41.2876 73.3454C44.7578 69.9243 49.4056 67.5679 54.4295 67.1896C59.1381 66.835 64.0491 68.2303 68.4523 71.9003C68.9258 66.2398 71.3925 61.8343 74.9732 58.8056C78.7921 55.5753 83.7688 54 88.6832 54C93.5977 54 98.5743 55.5753 102.393 58.8056C105.974 61.8347 108.441 66.241 108.914 71.9026ZM89.5964 120.008L89.5955 119.983L89.5971 119.983L89.5964 120.008ZM87.7701 120.008L87.7694 119.983L87.771 119.983L87.7701 120.008ZM103.67 92.7224C103.124 92.7224 102.935 93.4989 103.283 93.9102C103.899 94.6387 104.27 95.576 104.27 96.5986C104.27 98.919 102.361 100.8 100.006 100.8C97.6505 100.8 95.7411 98.919 95.7411 96.5986C95.7411 96.4745 95.5767 96.4128 95.5024 96.5134C94.8298 97.4235 94.3757 98.4452 94.1891 99.518C94.0841 100.122 93.5857 100.623 92.9594 100.623H92.6135C91.7961 100.623 91.1218 99.9697 91.2424 99.1787C92.0694 93.7577 97.4925 89.826 103.67 89.826C109.847 89.826 115.27 93.7577 116.097 99.1787C116.217 99.9697 115.543 100.623 114.726 100.623C113.908 100.623 113.261 99.9664 113.083 99.1857C112.275 95.6324 108.527 92.7224 103.67 92.7224ZM65.7998 96.5986C65.7998 96.4349 65.5844 96.347 65.483 96.4773C64.764 97.4016 64.2741 98.4484 64.0667 99.5516C63.9443 100.203 63.4062 100.745 62.729 100.745H62.4752C61.6578 100.745 60.9835 100.092 61.104 99.301C61.9306 93.8771 67.3543 89.9483 73.5313 89.9483C79.7082 89.9483 85.1319 93.8771 85.9585 99.301C86.0791 100.092 85.4047 100.745 84.5873 100.745C83.77 100.745 83.1227 100.089 82.9452 99.3081C82.1371 95.7526 78.3892 92.8447 73.5313 92.8447C73.0897 92.8447 72.9281 93.4555 73.2237 93.7764C73.9105 94.5222 74.329 95.5123 74.329 96.5986C74.329 98.919 72.4197 100.8 70.0644 100.8C67.7091 100.8 65.7998 98.919 65.7998 96.5986ZM93.4274 106.731C94.0051 106.165 94.8979 105.89 95.6152 106.273C96.3325 106.657 96.6046 107.547 96.0877 108.167C94.4041 110.184 91.6782 111.463 88.6718 111.463C85.667 111.463 82.9351 110.198 81.2493 108.165C80.7342 107.544 81.0097 106.654 81.7284 106.273C82.4471 105.892 83.3385 106.171 83.9154 106.737C85.0266 107.829 86.7129 108.567 88.6718 108.567C90.6256 108.567 92.3137 107.821 93.4274 106.731Z"
    />
  </svg>
)

const Opensea = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
  >
    <g fill="none" transform="scale(.6325)">
      <path
        fill="currentColor"
        d="m24.6679 51.6801.2157-.3391 13.007-20.3478c.1901-.2979.637-.2671.7808.0565 2.173 4.8699 4.048 10.9265 3.1696 14.6971-.375 1.5514-1.4024 3.6524-2.5583 5.5942-.1489.2826-.3133.56-.488.8271-.0822.1233-.2209.1952-.3699.1952H25.048c-.3596 0-.5702-.3904-.3801-.6832z"
      />
      <path
        fill="currentColor"
        d="M82.6444 55.461v3.2209c0 .1849-.113.3493-.2774.4212-1.0068.4315-4.4538 2.0137-5.887 4.0069-3.6576 5.0908-6.4521 12.37-12.6988 12.37H37.721C28.4847 75.48 21 67.9697 21 58.7024v-.2979c0-.2466.2003-.4469.4469-.4469h14.5276c.2876 0 .4982.2671.4726.5496-.1028.9452.0719 1.911.5188 2.7894.863 1.7518 2.6507 2.846 4.5822 2.846H48.74v-5.6148h-7.1097c-.3647 0-.5804-.4213-.3698-.7192.077-.1182.1644-.2414.2568-.3801.673-.9555 1.6336-2.4401 2.5891-4.1302.6524-1.1404 1.2842-2.3579 1.7928-3.5805.1028-.2209.1849-.447.2671-.6679.1387-.3904.2826-.7551.3853-1.1198.1028-.3083.1849-.6319.2671-.935.2415-1.0377.3442-2.137.3442-3.2774 0-.4469-.0205-.9144-.0616-1.3613-.0206-.488-.0822-.9761-.1439-1.4641-.0411-.4315-.1181-.8579-.2003-1.3048-.1027-.6524-.2466-1.2996-.411-1.9521l-.0565-.2465c-.1233-.447-.226-.8733-.3698-1.3202-.4059-1.4025-.8733-2.7689-1.3665-4.048-.1798-.5086-.3853-.9966-.5908-1.4846-.303-.7346-.6113-1.4024-.8938-2.0343-.1438-.2877-.2671-.5497-.3904-.8168-.1387-.3031-.2825-.6062-.4264-.8938-.1027-.2209-.2209-.4264-.3031-.6319l-.8784-1.6233c-.1233-.2209.0822-.4829.3236-.4161l5.4967 1.4897h.0154c.0102 0 .0154.0052.0205.0052l.7243.2003.7963.2261.2928.0821v-3.2671C48.74 21.2791 50.0037 20 51.5654 20c.7808 0 1.4897.3185 1.9983.8373.5085.5189.827 1.2278.827 2.0189v4.8494l.5857.1643c.0462.0155.0924.036.1335.0668.1439.1079.3493.2671.6113.4624.2055.1643.4264.3647.6935.5702.5291.4263 1.161.976 1.8545 1.6079.1849.1592.3647.3236.5291.488.8939.8322 1.8956 1.8082 2.8511 2.887.2671.3031.5291.6113.7962.9349.2671.3288.5497.6524.7962.9761.3237.4315.673.8784.9761 1.3459.1438.2209.3082.4469.4469.6678.3904.5907.7346 1.2021 1.0634 1.8134.1387.2825.2825.5907.4058.8938.3647.8168.6524 1.649.8373 2.4812.0565.1798.0976.375.1182.5497v.0411c.0616.2465.0822.5085.1027.7756.0822.8528.0411 1.7055-.1438 2.5634-.0771.3648-.1798.7089-.3031 1.0737-.1233.3493-.2466.714-.4058 1.0582-.3082.714-.673 1.4281-1.1045 2.0959-.1387.2466-.3031.5086-.4675.7552-.1798.2619-.3647.5085-.5291.75-.226.3082-.4674.6318-.714.9195-.2209.3031-.4469.6062-.6935.8733-.3442.4058-.673.7911-1.0172 1.161-.2054.2414-.4263.488-.6524.7089-.2208.2465-.4469.4674-.6524.6729-.3441.3442-.6318.6113-.8733.8322l-.565.5189c-.0822.0719-.1901.113-.3031.113h-4.3768v5.6148h5.5069c1.2329 0 2.4042-.4367 3.3494-1.2381.3236-.2825 1.7363-1.5051 3.4058-3.3493.0565-.0617.1285-.1079.2107-.1284l15.2107-4.3973c.2826-.0822.5702.1335.5702.4315z"
      />
    </g>
  </svg>
)

export const Icons = {
  logo: LogoIcon,
  close: X,
  refresh: RefreshCw,
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
  ethereum: EthereumIcon,
  arbitrum: ArbitrumIcon,
  solana: SolanaIcon,
  telegram: FaTelegram,
  farcaster: Farcaster,
  addCircle: CirclePlus,
  loading: LoaderCircleIcon
}
