import React from "react"
import { Controller, useForm } from "react-hook-form"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupList,
  AvatarImage,
  AvatarOverflowIndicator,
} from "@/components/ui/avatarGroup"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input" // Assuming shadcn provides these form components
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ApiCreateDialog = ({ onSubmit, apiKeysCount }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      chain: "",
    },
  })

  const chains = [
    "ethereum",
    "solana",
    "polygon",
    "optimism",
    "arbitrum",
    "avalanche",
    "fantom",
    "near",
    "celo",
  ]
  const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_`

  if (apiKeysCount >= 3) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create API Key</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader title="Generate an API Key" />
          <div>You cannot create more than 3 API keys.</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create API Key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate API Key</DialogTitle>
        </DialogHeader>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={() => alert("hello")}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "API Name is required" }}
            render={({ field }) => (
              <div className="mb-4">
                <Label htmlFor="api_name">API Name</Label>
                <Input
                  {...field}
                  placeholder="Enter a name for the API Key"
                  // error={errors.name && errors.name.message}
                />
              </div>
            )}
          />
          <Controller
            name="chain"
            control={control}
            render={({ field }) => (
              <Select>
                <SelectTrigger className="mb-4 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Chains</SelectLabel>
                    {/* {chains.map((chain) => (
                      <SelectItem key={chain.value} value={chain.value}>
                        {chain.label}
                      </SelectItem>
                    ))} */}
                    <SelectItem>
                      <div className="flex items-center justify-center gap-2 ">
                        {" "}
                        <AvatarGroup
                          limit={5}
                          className="flex scale-75 items-center justify-start"
                        >
                          <AvatarGroupList>
                            {chains.map((chain, i) => (
                              <Avatar key={i} className="size-8" fallback={""}>
                                <AvatarImage
                                  alt="@shadcn"
                                  key={chain}
                                  name={chain}
                                  src={iconUrl + chain + ".jpg"}
                                />
                              </Avatar>
                            ))}
                          </AvatarGroupList>
                          <AvatarOverflowIndicator />
                        </AvatarGroup>
                        <span className=" ml-2 text-base">All Chains</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <DialogFooter>
            <Button type="submit">Generate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ApiCreateDialog
