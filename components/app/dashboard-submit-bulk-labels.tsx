"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Papa from "papaparse"
import { DropzoneOptions } from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { uploadFileSchema } from "@/config/schema"
import { bulkCreateAddressLabel } from "@/lib/app/label"
import { useToast } from "@/lib/hooks/use-toast"
import { extractLabelData } from "@/lib/utils/label"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload"
import { Form, FormField, FormItem } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function SubmittedLabels({ length }: { length: number }) {
  return (
    <>
      <Icons.check className="mb-3 size-8 text-gray-500 dark:text-gray-400" />
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">
          <span className="text-gray-900 dark:text-gray-100">
            {length} labels submitted.{" "}
          </span>
        </span>
        We thank you for your contribution.
      </p>
    </>
  )
}

function FileSvgDraw() {
  return (
    <>
      <svg
        className="mb-3 size-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">
          <span className="text-gray-900 dark:text-gray-100">
            Choose a file{" "}
          </span>
        </span>
        or drag it here
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        We only accept CSV files.
      </p>
    </>
  )
}

export function DashboardSubmitBulkLabels({ userId }: { userId: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const [labels, setLabels] = React.useState<number>(0)
  const [progress, setProgress] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState<
    { line: number; columns: string[] }[]
  >([])

  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
  })

  const dropzone = {
    multiple: false,
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/vnd.ms-excel": [".csv"],
    },
  } satisfies DropzoneOptions

  const simulateUpload = () => {
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval)
          return prev
        }
        return prev + 15
      })
    }, 500)

    return interval
  }

  async function onSubmit(values: z.infer<typeof uploadFileSchema>) {
    setErrors([])
    setLoading(true)

    const file = values.files[0]
    const progress = simulateUpload()

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results: Papa.ParseResult<Record<string, string>>) => {
          const data = results.data.slice(2)
          const newErrors: { line: number; columns: string[] }[] = []

          data.forEach((row, index) => {
            const emptyColumns = Object.entries(row)
              .filter(([_, value]) => value.trim() === "")
              .map(([key]) => key)

            if (emptyColumns.length > 0) {
              newErrors.push({ line: index + 3, columns: emptyColumns })
            }
          })

          if (newErrors.length > 0) {
            setErrors(newErrors)
            clearInterval(progress)
            setProgress(0)
            setLoading(false)
            toast({
              title: "Please verify the CSV file",
              variant: "destructive",
            })
          } else {
            const extractedData = extractLabelData(data)
            const submittedLabels = await bulkCreateAddressLabel(
              extractedData,
              userId
            )
            setLabels(submittedLabels.count)
            setSubmitted(true)
          }
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 5000))
      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (errors.length === 0 && submitted) {
        toast({
          title: "Labels submitted successfully",
        })
        router.refresh()
      }

      form.reset({ files: [] })
    } catch (error) {
      console.error(error)
      toast({
        title: "An error occurred",
        variant: "destructive",
      })
    } finally {
      clearInterval(progress)
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" type="button">
          <Icons.upload className="mr-2 size-4" />
          Bulk Upload
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-white">Bulk Upload</DialogTitle>
          <DialogDescription>
            Upload a CSV file with multiple addresses to submit in bulk. Check
            out our template{" "}
            <Link
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1NAfxMJyUp8Yna4JlnFM0LzQQlF1NEr2vDFEh1V3TDl4/edit?usp=sharing"
              className="text-blue-500 underline"
            >
              here
            </Link>
            .
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col items-center justify-center gap-x-2 rounded-md px-2 pb-1 outline outline-1 outline-border">
              {submitted ? (
                <SubmittedLabels length={labels} />
              ) : (
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        dropzoneOptions={dropzone}
                        reSelect={true}
                        className="relative rounded-lg bg-background p-2"
                      >
                        <div className="flex w-full flex-col items-center justify-center">
                          <FileInput className="w-full outline-dashed outline-1 outline-white">
                            <div className="flex flex-col items-center justify-center pb-4 pt-3">
                              <FileSvgDraw />
                            </div>
                          </FileInput>

                          {field.value && field.value.length > 0 && (
                            <FileUploaderContent className="w-full text-center dark:text-white">
                              {field.value.map((file, i) => (
                                <FileUploaderItem
                                  uploading={loading}
                                  key={i}
                                  index={i}
                                >
                                  <Icons.paperclip className="size-4 stroke-current" />
                                  <span className="pr-8 dark:text-white">
                                    {file.name}
                                  </span>
                                </FileUploaderItem>
                              ))}
                              {progress !== 0 && (
                                <Progress
                                  value={progress}
                                  className="h-1 w-full bg-zinc-200"
                                />
                              )}
                            </FileUploaderContent>
                          )}
                        </div>
                      </FileUploader>
                    </FormItem>
                  )}
                />
              )}
            </div>
            {form.formState.errors && (
              <div className="text-sm text-destructive">
                {Object.values(form.formState.errors).map((error) => (
                  <p key={error.message}>{error.message}</p>
                ))}
              </div>
            )}
            {errors.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-secondary-foreground">
                  CSV Errors
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Line</TableHead>
                      <TableHead>Empty Columns</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-secondary-foreground/80">
                          {error.line + 1}
                        </TableCell>
                        <TableCell className="text-secondary-foreground/80">
                          Missing attributes
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="h-3" />
            {submitted ? (
              <DialogClose className="h-8 w-full py-2">
                <Button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setLabels(0)
                    setErrors([])
                  }}
                >
                  Close
                </Button>
              </DialogClose>
            ) : (
              <Button
                type="submit"
                className="h-8 w-full py-2"
                disabled={loading}
              >
                {loading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Upload labels
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
