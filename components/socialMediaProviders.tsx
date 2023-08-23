import { FaTwitter, FaRedditAlien } from "react-icons/fa";
import Lens from "./icons-social/lensIcon";
import Farcaster from "./icons-social/farcasterIcon";
import OpenSea from "./icons-social/openseaIcon";
export const socialMediaProviders = [
    {
        name: "Twitter",
        icon: FaTwitter,
        bgColor: "bg-blue-200",
        hoverBgColor: "bg-blue-500",
        textColor: "text-blue-700",
        hoverTextColor: "text-white",
    },
    {
        name: "Reddit",
        icon: FaRedditAlien,
        bgColor: "bg-orange-200",
        hoverBgColor: "bg-orange-500",
        textColor: "text-orange-700",
        hoverTextColor: "text-white",
    },
    {
        name: "Lens",
        icon: Lens,
        bgColor: "bg-green-200",
        hoverBgColor: "bg-green-500",
        textColor: "text-green-700",
        hoverTextColor: "text-white",
    },
    {
        name: "Farcaster",
        icon: Farcaster,
        bgColor: "bg-purple-200",
        hoverBgColor: "hover:bg-purple-500",
        textColor: "text-purple-700",
        hoverTextColor: "hover:text-white",
    },
    {
        name: "OpenSea",
        icon: OpenSea,
        bgColor: "bg-blue-100",
        hoverBgColor: "bg-blue-500",
        textColor: "text-blue-700",
        hoverTextColor: "text-white",
    },


    // ... (other providers with their respective colors and hover colors)
];
