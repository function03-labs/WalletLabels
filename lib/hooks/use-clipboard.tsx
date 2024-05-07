import { useState } from "react"

const useClipboard = (text: string, timeout = 1500) => {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), timeout)
      },
      (err) => {
        console.error("Error copying text: ", err)
        setHasCopied(false)
      }
    )
  }

  return { hasCopied, onCopy }
}

export default useClipboard
