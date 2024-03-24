import {
  Box,
  BoxProps,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ISearchProps } from "@/types";

import { Icons } from "@component/ui/Lucide";

const MotionBox = motion<BoxProps>(Box);

export default function SearchComponent({
  handleSearchLogin,
  inputRef,
  inputValue,
}: ISearchProps): JSX.Element {
  const { colorMode } = useColorMode();

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
            <div className="shadow-box shadow-primary-500/10">
              <InputGroup
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
                  children={<Icons.ethereum size="1.5rem" />}
                />
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => handleSearchLogin(e.target.value)}
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
                    textOverflow: "ellipsis",
                  }}
                  _hover={{ borderColor: "purple.300" }}
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </HStack>
    </MotionBox>
  );
}