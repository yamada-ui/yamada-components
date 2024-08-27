import type { UseRadioGroupProps, UseRadioGroupReturn } from "@yamada-ui/react"
import {
  Box,
  Input,
  useRadio,
  useRadioGroup,
  Text,
  Stack,
} from "@yamada-ui/react"
import type { FC } from "react"

type CustomRadioProps = ReturnType<UseRadioGroupReturn["getRadioProps"]> & {
  currentTemperature: number
}

const CustomRadio: FC<CustomRadioProps> = ({
  currentTemperature,
  ...props
}) => {
  const { getInputProps, getIconProps, getContainerProps } = useRadio(props)

  return (
    <Box
      as="label"
      w="full"
      borderLeftWidth={{ base: "1px", lg: 0 }}
      borderTopWidth={{ base: 0, lg: "1px" }}
      {...getContainerProps()}
    >
      <Input {...getInputProps()} />

      <Box
        {...getIconProps()}
        cursor="pointer"
        py={{ base: "lg", sm: "sm" }}
        px={{ base: "lg", sm: "md" }}
        _checked={{
          bg: ["blackAlpha.50", "whiteAlpha.100"],
        }}
      >
        <Text fontSize="md" color={["blackAlpha.700", "whiteAlpha.600"]}>
          {props.value}
        </Text>

        <Text fontWeight="bold" fontSize="2xl" minW="5xs">
          {currentTemperature}℃
        </Text>
      </Box>
    </Box>
  )
}

export type CustomRadioGroupProps = UseRadioGroupProps<string> & {
  options: { value: string; currentTemperature: number }[]
}

const CustomRadioGroup = ({ options, ...props }: CustomRadioGroupProps) => {
  const { getContainerProps, getRadioProps } = useRadioGroup<string>(props)

  return (
    <Stack
      w="full"
      gap={0}
      direction={{ base: "row", sm: "column" }}
      {...getContainerProps()}
    >
      {options.map(({ value, currentTemperature }, index) => (
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
