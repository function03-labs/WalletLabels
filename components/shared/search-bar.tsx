"use client"

import Image from "next/image"
import { ISearchProps } from "@/types"
import {
  Box,
  BoxProps,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const MotionBox = motion<BoxProps>(Box)

export function SearchBar({
  handleSearchLogin,
  inputRef,
  inputValue,
  chain,
}: ISearchProps): JSX.Element {
  const { colorMode } = useColorMode()

  const handleClick = () => {
    window.open('https://docs.walletlabels.xyz', '_blank', 'noopener,noreferrer');
  };

  return (
    <MotionBox w="full" zIndex={3}>
      <HStack
        spacing="2"
        w="full"
        h="100%"
        alignItems="flex-start"
        py="2"
        className="!w-full"
      >
        <div className={colorMode === "light" ? "!w-full" : "dark !w-full"}>
          <div className="vercel w-full">
            <div className="shadow-box shadow-primary-500/10" >
              <Tooltip
                label="🔍 Search functionality is available through our API - Click to view documentation"
                hasArrow
                placement="top"
                onClick={handleClick}
              >
                <InputGroup
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                  className="eth-input s !w-full"
                  zIndex={1}
                  size="lg"
                  variant="outline"
                  borderColor="gray.600"
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color={colorMode === "light" ? "gray.500" : "whiteAlpha.900"}
                    // eslint-disable-next-line react/no-children-prop
                    children={
                      <Image
                        src={
                          chain === "solana"
                            ? "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
                            : chain === "ethereum"
                            ? "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
                            : chain === "arbitrum"
                            ? "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"
                            : chain === "base"
                            ? "https://github.com/base-org/brand-kit/raw/main/logo/in-product/Base_Network_Logo.svg"
                            : chain === "bitcoin"
                            ? "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
                            : "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
                        }
                        alt="Ethereum"
                        width={20}
                        height={20}
                      />
                    }
                  />
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    isDisabled={true}
                    type="text"
                    placeholder="Search by address or name.."
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                    _disabled={{
                      opacity: 0.7,
                      cursor: 'pointer',
                    }}
                    _hover={{
                      borderColor: "purple.300",
                      opacity: 0.8,
                    }}
                    borderColor="gray.300"
                    borderRadius="xl"
                    focusBorderColor="purple.500"
                    textOverflow="ellipsis"
                    className="font-sans dark:text-white"
                    _placeholder={{
                      color: colorMode === "light" ? "gray.400" : "gray.400",
                      fontSize: "16px",
                      textOverflow: "ellipsis",
                    }}
                  />
                </InputGroup>
              </Tooltip>
            </div>
          </div>
        </div>
      </HStack>
    </MotionBox>
  )
}
