import { HTMLAttributes, useEffect, useState } from "react"
import { DateTime } from "luxon"

interface TimeFromEpochProps extends HTMLAttributes<HTMLSpanElement> {
  epoch?: number | string
}

export const TimeFromEpoch = ({
  className,
  epoch,
  ...props
}: TimeFromEpochProps) => {
  const [timestamp, setTimestamp] = useState<string>()
  useEffect(() => {
    if (epoch) {
      setTimestamp(
        DateTime.fromSeconds(Number(epoch)).toLocaleString(
          DateTime.DATETIME_MED
        )
      )
    }
  }, [])
  return (
    <span className={className} {...props} data-oid="nnsud_h">
      {timestamp}
    </span>
  )
}

export default TimeFromEpoch
