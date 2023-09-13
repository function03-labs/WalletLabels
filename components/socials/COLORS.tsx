export function stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to a 32-bit integer
    }
    return hash;
}
export const COLORS = [
    "fill-red-500 dark:fill-red-400",
    "fill-yellow-500 dark:fill-yellow-400",
    "fill-green-500     dark:fill-green-400",
    "fill-blue-500    dark:fill-blue-400",
    "fill-indigo-500    dark:fill-indigo-400",
    "fill-purple-500    dark:fill-purple-400",
    "fill-pink-500  dark:fill-pink-400",
];
