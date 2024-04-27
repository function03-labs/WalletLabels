import React, { useState } from "react"
import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import {
  Avatar,
  AvatarGroup,
  AvatarGroupList,
  AvatarImage,
  AvatarOverflowIndicator,
} from "@/components/ui/avatarGroup"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import { useToast } from "@/components/ui/use-toast"

const ApiCreateDialog = ({ onSubmit, apiKeysCount }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      chain: "",
    },
  })
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const handleFormSubmit = async (data) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
      setShowDialog(false) // Close the dialog on successful key generation
    } catch (error) {
      console.error("Error generating API key:", error)
      toast({
        variant: "destructive",
        title: "Error generating API key",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
    <Dialog open={showDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setShowDialog(true)}>Create API Key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate API Key</DialogTitle>
        </DialogHeader>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <DialogClose asChild>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}{" "}
                Generate
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ApiCreateDialog
