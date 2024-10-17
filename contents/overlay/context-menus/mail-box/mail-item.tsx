import type { Dispatch, FC, SetStateAction } from "react"
import { ArchiveIcon, ArchiveRestoreIcon, TrashIcon } from "@yamada-ui/lucide"
import {
  Center,
  ContextMenu,
  ContextMenuTrigger,
  HStack,
  MenuItem,
  MenuList,
  Text,
} from "@yamada-ui/react"

export const MailItem: FC<{
  id: number
  currentId: number
  description: string
  setCurrentId: Dispatch<SetStateAction<number>>
  time: string
  title: string
  handleArchive?: () => void
  handleDelete?: () => void
  isArchived?: boolean
}> = ({
  id,
  currentId,
  description,
  handleArchive,
  handleDelete,
  isArchived,
  setCurrentId,
  time,
  title,
}) => {
  return (
    <ContextMenu
      isOpen={id === currentId}
      onOpen={() => {
        setCurrentId(id)
      }}
    >
      <ContextMenuTrigger
        as={Center}
        bgColor={id === currentId ? ["blue.200", "blue.500"] : undefined}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        flexDir="row"
        justifyContent="space-between"
        p="md"
        w="full"
      >
        <HStack gap="md">
          <Text>{title}</Text>
          <Text>{description}</Text>
        </HStack>
        <Center>
          <Text>{time}</Text>
        </Center>
      </ContextMenuTrigger>

      <MenuList>
        <MenuItem icon={<TrashIcon color="danger" />} onClick={handleDelete}>
          Delete
        </MenuItem>
        <MenuItem
          icon={
            isArchived ? (
              <ArchiveRestoreIcon color="success" />
            ) : (
              <ArchiveIcon color="danger" />
            )
          }
          onClick={handleArchive}
        >
          {isArchived ? "Remove Archive" : "Archive"}
        </MenuItem>
      </MenuList>
    </ContextMenu>
  )
}
