import type { UseRadioGroupProps, UseRadioGroupReturn } from "@yamada-ui/react"
import type { FC } from "react"
import {
  Box,
  Input,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from "@yamada-ui/react"

type CustomRadioProps = {
  currentTemperature: number
} & ReturnType<UseRadioGroupReturn["getRadioProps"]>

const CustomRadio: FC<CustomRadioProps> = ({
  currentTemperature,
  ...props
}) => {
  const { getContainerProps, getIconProps, getInputProps } = useRadio(props)

  return (
    <Box
      as="label"
      borderLeftWidth={{ base: "1px", lg: 0 }}
      borderTopWidth={{ base: 0, lg: "1px" }}
      w="full"
      {...getContainerProps()}
    >
      <Input {...getInputProps()} />

      <Box
        {...getIconProps()}
        cursor="pointer"
        px={{ base: "lg", sm: "md" }}
        py={{ base: "lg", sm: "sm" }}
        _checked={{
          bg: ["blackAlpha.50", "whiteAlpha.100"],
        }}
      >
        <Text color={["blackAlpha.700", "whiteAlpha.600"]} fontSize="md">
          {props.value}
        </Text>

        <Text fontSize="2xl" fontWeight="bold" minW="5xs">
          {currentTemperature}℃
        </Text>
      </Box>
    </Box>
  )
}

export type CustomRadioGroupProps = {
  options: { currentTemperature: number; value: string }[]
} & UseRadioGroupProps

const CustomRadioGroup = ({ options, ...props }: CustomRadioGroupProps) => {
  const { getContainerProps, getRadioProps } = useRadioGroup<string>(props)

  return (
    <Stack
      direction={{ base: "row", sm: "column" }}
      gap={0}
      w="full"
      {...getContainerProps()}
    >
      {options.map(({ currentTemperature, value }, index) => (
        <CustomRadio
          key={index}
          currentTemperature={currentTemperature}
          {...getRadioProps({ value })}
        />
      ))}
    </Stack>
  )
}

export default CustomRadioGroup
