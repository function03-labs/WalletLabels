import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
// --- Chakra-UI ---

// --- Chakra-UI ---
import {
  Avatar,
  Box,
  BoxProps,
  FormControl,
  HStack,
  Highlight,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
// import { Command } from "cmdk"
import { FaEthereum } from "react-icons/fa"
// --- Motion Components ---
// // --- Form and Validations ---
// import { useForm, useFormState } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// --- Icons ---
import { FiSearch } from "react-icons/fi"

// import { VercelCMDK } from "../cmdk_palette/vercel"

// --- Component Props Interface ---
interface ISearchProps {
  handleSearchLogin: (ETHquery?: string) => void
  disabled?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  togglePalette?: Function
  inputValue?: string
}

const MotionBox = motion<BoxProps>(Box)

export default function SearchComponent({
  handleSearchLogin,
  inputRef,
  inputValue,
  disabled = false,
  togglePalette,
}: ISearchProps): JSX.Element {
  // const [inputValue, setInputValue] = useState("")
  // const [keyPressed, setKeyPressed] = useState<KeyboardEvent>(null)
  // const [searchBar, setSearchBar_o] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  // const setSearchBar = (bool: boolean) => {
  //   togglePalette(bool)
  //   setSearchBar_o(bool)
  // }

  // if (inputValue.length >= 1 && !searchBar) {
  //   // togglePalette(true);
  //   setSearchBar(true)
  //   if (inputValue == "/") {
  //     setInputValue("")
  //   } else {
  //     setInputValue(inputValue)
  //   }
  // }

  // const onSubmit = ({ ETHquery }) =>
  //   new Promise(() => setTimeout(() => handleSearchLogin(ETHquery), 500))

  // function SearchButton(): React.ReactNode {
  //   return (
  //     <IconButton
  //       icon={<FiSearch />}
  //       type="submit"
  //       aria-label="Search"
  //       // isLoading={isSubmitting}
  //       size="lg"
  //       borderRadius="xl"
  //       colorScheme="purple"
  //     />
  //   )
  // }

  return (
    // <form onSubmit={handleSubmit(onSubmit)} onKeyDown={e => console.log(e.key)}>
    // {" "}
    // {tagMap(tags, colorMode, setTags)}
    <MotionBox w="full" zIndex={3}>
      <HStack
        spacing="2"
        w="full"
        h="100%"
        alignItems="flex-start"
        py="2"
        className="!w-full">
        <div className={colorMode === "light" ? "!w-full" : "!w-full dark"}>
          <div className="vercel w-full">
            <div className="shadow-box shadow-primary-500/10">
              <InputGroup
                className="eth-input s !w-full"
                zIndex={1}
                size="lg"
                variant="outline"
                borderColor="gray.600">
                <InputLeftElement
                  pointerEvents="none"
                  color={colorMode === "light" ? "gray.500" : "whiteAlpha.900"}
                  // eslint-disable-next-line react/no-children-prop
                  children={<FaEthereum size="1.5rem" />}
                />
                {/* Add a dropdown to Ethereum logo to show Uniswap logo below */}
                <Input
                  // disabled={disabled}
                  // onKeyDown={e => {
                  //   // e.preventDefault();
                  //   setKeyPressed(e.nativeEvent)
                  //   // if command + enter is pressed at the same time, submit the form
                  //   if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  //     // handleSubmit(onSubmit)()
                  //   }
                  // }}
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => handleSearchLogin(e.target.value)}
                  type="text"
                  placeholder="Search by address or name.."
                  color={colorMode === "light" ? "gray.600" : "whitesmoke"}
                  bg={colorMode === "light" ? "" : "gray.900"}
                  borderColor="gray.300"
                  borderRadius="xl"
                  focusBorderColor="purple.500"
                  textOverflow="ellipsis"
                  className="font-sans"
                  _placeholder={{
                    color: colorMode === "light" ? "gray.400" : "gray.400",
                    fontSize: "16px",

                    // ellipsis truncate
                    textOverflow: "ellipsis",
                  }}
                  _hover={{ borderColor: "purple.300" }}
                />

                {/* using chakra-react-select, add a dropdown list that comes down when the user types @ */}
              </InputGroup>
            </div>
          </div>
        </div>
        {/* {!errors.ETHquery ? formHelperText(searchBar) : formErrorText(errors)} */}
        {/* </FormControl> */}

        {/* {!disabled && SearchButton()} */}
      </HStack>
    </MotionBox>
    // </form>
  )
}
