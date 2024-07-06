import { ArchiveIcon, ArchiveRestoreIcon, TrashIcon } from "@yamada-ui/lucide"
import {
  Center,
  Text,
  Tabs,
  Tab,
  TabPanel,
  ContextMenu,
  ContextMenuTrigger,
  MenuList,
  MenuItem,
  HStack,
} from "@yamada-ui/react"
import { type Dispatch, type SetStateAction, type FC, useState } from "react"

const mailsData = [
  {
    id: 1,
    title: "GitHub",
    description: "You assigned on review. #905",
    time: "19:20",
  },
  {
    id: 2,
    title: "GitHub",
    description: "You assigned on review. #904",
    time: "19:13",
  },
  {
    id: 3,
    title: "GitHub",
    description: "You assigned on review. #903",
    time: "19:10",
  },
  {
    id: 4,
    title: "GitHub",
    description: "You assigned on review. #902",
    time: "19:00",
  },
  {
    id: 5,
    title: "GitHub",
    description: "You assigned on review. #901",
    time: "18:55",
  },
]

const MailItem: FC<{
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

const MailBox: FC = () => {
  const [mainMails, setMainMails] = useState<typeof mailsData>(mailsData)
  const [archiveMails, setArchiveMails] = useState<typeof mailsData>([])

  const [currentId, setCurrentId] = useState<number>(0)

  return (
    <Tabs
      w="full"
      h="full"
      tabPanelsProps={{
        w: "full",
        h: "full",
      }}
      onChange={() => setCurrentId(0)}
    >
      <Tab>Main</Tab>
      <Tab>Archive</Tab>
      <TabPanel p={0} w="full" h="full" onClick={() => setCurrentId(0)}>
        {mainMails.length > 0 ? (
          mainMails.map((mail) => (
            <MailItem
              key={mail.id}
              {...mail}
              handleArchive={() => {
                setMainMails((prev) =>
                  prev.filter((prevMail) => prevMail.id !== mail.id),
                )
                setArchiveMails((prev) => [...prev, mail])
                setCurrentId(0)
              }}
              handleDelete={() => {
                setMainMails((prev) =>
                  prev.filter((prevMail) => prevMail.id !== mail.id),
                )
              }}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          ))
        ) : (
          <Center w="full" h="full">
            <Text>No email.</Text>
          </Center>
        )}
      </TabPanel>
      <TabPanel p={0} w="full" h="full" onClick={() => setCurrentId(0)}>
        {archiveMails.length > 0 ? (
          archiveMails.map((mail) => (
            <MailItem
              key={mail.id}
              {...mail}
              handleArchive={() => {
                setArchiveMails((prev) =>
                  prev.filter((prevMail) => prevMail.id !== mail.id),
                )
                setMainMails((prev) => [...prev, mail])
                setCurrentId(0)
              }}
              handleDelete={() => {
                setArchiveMails((prev) =>
                  prev.filter((prevMail) => prevMail.id !== mail.id),
                )
              }}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isArchived
            />
          ))
        ) : (
          <Center w="full" h="full">
            <Text>No email.</Text>
          </Center>
        )}
      </TabPanel>
    </Tabs>
  )
}

export default MailBox
