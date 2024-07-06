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
import type { Dispatch, FC, SetStateAction } from "react"

export const MailItem: FC<{
  id: number
  currentId: number
  title: string
  description: string
  time: string
  isArchived?: boolean
  handleDelete?: () => void
  handleArchive?: () => void
  setCurrentId: Dispatch<SetStateAction<number>>
}> = ({
  id,
  currentId,
  time,
  description,
  title,
  isArchived,
  handleArchive,
  handleDelete,
  setCurrentId,
}) => {
  return (
    <ContextMenu
      onOpen={() => {
        setCurrentId(id)
      }}
      isOpen={id === currentId}
    >
      <ContextMenuTrigger
        as={Center}
        w="full"
        p="md"
        flexDir="row"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        bgColor={id === currentId ? "primary" : undefined}
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
