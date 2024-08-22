import type {
  StackProps,
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "@yamada-ui/react"
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

export type CustomRadioGroupProps = Omit<StackProps, "onChange"> &
  UseRadioGroupProps<string> & {
    options: { value: string; currentTemperature: number }[]
  }

const CustomRadioGroup = ({
  options,
  id,
  name,
  value,
  defaultValue,
  onChange,
  isNative,
  ...rest
}: CustomRadioGroupProps) => {
  const { getContainerProps, getRadioProps } = useRadioGroup<string>({
    id,
    name,
    value,
    defaultValue,
    onChange,
    isNative,
  })

  return (
    <Stack
      gap={0}
      direction={{ base: "row", sm: "column" }}
      {...getContainerProps()}
      {...rest}
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
