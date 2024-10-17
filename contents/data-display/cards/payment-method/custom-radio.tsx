import type { UseRadioGroupReturn } from "@yamada-ui/react"
import type { FC, ReactNode } from "react"
import { Box, Center, Text, ui, useRadio, VStack } from "@yamada-ui/react"

export const CustomRadio: FC<
  { icon: ReactNode } & ReturnType<UseRadioGroupReturn["getRadioProps"]>
> = ({ icon, value, ...rest }) => {
  const { getIconProps, getInputProps } = useRadio({ value, ...rest })

  return (
    <Box as="label" w="full">
      <ui.input {...getInputProps()} />

      <Box
        as={VStack}
        {...getIconProps()}
        borderColor={["blackAlpha.200", "whiteAlpha.100"]}
        borderWidth="3px"
        cursor="pointer"
        gap="xs"
        px={{ base: "lg", sm: "md" }}
        py={{ base: "md", sm: "sm" }}
        rounded="md"
        transitionDuration="slow"
        transitionProperty="background"
        _checked={{
          borderColor: ["primary", "primary"],
        }}
        _hover={{
          bg: ["blackAlpha.50", "whiteAlpha.50"],
          _checked: {
            bg: ["transparent", "transparent"],
          },
        }}
      >
        <Center>{icon}</Center>

        <Text as="span" fontSize={{ base: "md", sm: "xs" }} textAlign="center">
          {value}
        </Text>
      </Box>
    </Box>
  )
}
