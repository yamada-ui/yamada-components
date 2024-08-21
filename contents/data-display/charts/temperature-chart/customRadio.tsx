import type { UseRadioGroupProps, UseRadioGroupReturn } from "@yamada-ui/react"
import {
  Box,
  HStack,
  Input,
  useRadio,
  useRadioGroup,
  Text,
} from "@yamada-ui/react"
import type { FC } from "react"

type CustomRadioProps = ReturnType<UseRadioGroupReturn["getRadioProps"]> & {
  currentTemperature: number
}

const CustomRadio: FC<CustomRadioProps> = ({
  currentTemperature,
  ...props
}) => {
  const { getInputProps, getIconProps } = useRadio(props)

  return (
    <Box as="label">
      <Input {...getInputProps()} />

      <Box
        {...getIconProps()}
        cursor="pointer"
        borderLeftWidth="1px"
        p="lg"
        _checked={{
          bg: ["blackAlpha.50", "whiteAlpha.100"],
        }}
      >
        <Text fontSize="md" color={["blackAlpha.700", "whiteAlpha.600"]}>
          {props.value}
        </Text>

        <Text fontWeight="bold" fontSize="2xl">
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
    <HStack gap={0} {...getContainerProps()}>
      {options.map(({ value, currentTemperature }, index) => (
        <CustomRadio
          key={index}
          currentTemperature={currentTemperature}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  )
}

export default CustomRadioGroup
