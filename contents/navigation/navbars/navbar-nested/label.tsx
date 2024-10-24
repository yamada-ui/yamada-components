import type { IconProps } from "@yamada-ui/lucide"
import type { FC, StackProps } from "@yamada-ui/react"
import { Center, HStack, Icon, Tag, Text } from "@yamada-ui/react"

interface LabelProps extends StackProps {
  name: string
  icon: IconProps["as"]
}

export const Label: FC<LabelProps> = ({ name, icon, ...props }) => {
  return (
    <HStack px="md" {...props}>
      <Tag
        as={Center}
        sx={{
          span: {
            alignItems: "center",
            display: "flex",
          },
        }}
        p="sm"
      >
        <Icon as={icon} />
      </Tag>
      <Text fontSize="sm">{name}</Text>
    </HStack>
  )
}

Label.displayName = "Label"
