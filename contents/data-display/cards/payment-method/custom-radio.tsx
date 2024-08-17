import {
  Text,
  VStack,
  ui,
  useRadio,
  Box,
  Center,
  type UseRadioGroupReturn,
} from "@yamada-ui/react"
import type { FC, ReactNode } from "react"

export const CustomRadio: FC<
  ReturnType<UseRadioGroupReturn["getRadioProps"]> & { icon: ReactNode }
> = ({ icon, value, ...rest }) => {
  const { getInputProps, getIconProps } = useRadio({ value, ...rest })

  return (
    <Box as="label" w="full">
      <ui.input {...getInputProps()} />

      <Box
        as={VStack}
        {...getIconProps()}
        cursor="pointer"
        py={{ base: "md", sm: "sm" }}
        px={{ base: "lg", sm: "md" }}
        rounded="md"
        gap="xs"
        borderWidth="3px"
        borderColor={["blackAlpha.200", "whiteAlpha.100"]}
        _checked={{
          borderColor: ["primary", "primary"],
        }}
        _hover={{
          bg: ["blackAlpha.50", "whiteAlpha.50"],
          _checked: {
            bg: ["transparent", "transparent"],
          },
        }}
        transitionProperty="background"
        transitionDuration="slow"
      >
        <Center>{icon}</Center>

        <Text as="span" textAlign="center" fontSize={{ base: "md", sm: "xs" }}>
          {value}
        </Text>
      </Box>
    </Box>
  )
}
