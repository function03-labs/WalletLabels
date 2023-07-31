import React from "react"
import { createBoard } from "@wixc3/react-board"
import { Select } from "../../../components/ui/select"

export default createBoard({
  name: "New Board",
  Board: () => (
    <div>
      <Select />
    </div>
  ),
})
