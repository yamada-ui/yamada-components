import type { FC } from "react"
import { Center, Tab, TabPanel, Tabs, Text } from "@yamada-ui/react"
import { useState } from "react"
import { MailItem } from "./mail-item"

const mailsData = [
  {
    id: 1,
    description: "Your review was requested on #905",
    time: "19:20",
    title: "GitHub",
  },
  {
    id: 2,
    description: "Your review was requested on #904",
    time: "19:13",
    title: "GitHub",
  },
  {
    id: 3,
    description: "Your review was requested on #903",
    time: "19:10",
    title: "GitHub",
  },
  {
    id: 4,
    description: "Your review was requested on #902",
    time: "19:00",
    title: "GitHub",
  },
  {
    id: 5,
    description: "Your review was requested on #901",
    time: "18:55",
    title: "GitHub",
  },
]

const MailBox: FC = () => {
  const [mainMails, setMainMails] = useState<typeof mailsData>(mailsData)
  const [archiveMails, setArchiveMails] = useState<typeof mailsData>([])

  const [currentId, setCurrentId] = useState<number>(0)

  return (
    <Tabs
      h="full"
      w="full"
      tabPanelsProps={{
        h: "full",
        w: "full",
      }}
      onChange={() => setCurrentId(0)}
    >
      <Tab>Main</Tab>
      <Tab>Archive</Tab>
      <TabPanel h="full" p={0} w="full" onClick={() => setCurrentId(0)}>
        {mainMails.length > 0 ? (
          mainMails.map((mail) => (
            <MailItem
              key={mail.id}
              {...mail}
              currentId={currentId}
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
              setCurrentId={setCurrentId}
            />
          ))
        ) : (
          <Center h="full" w="full">
            <Text>No email.</Text>
          </Center>
        )}
      </TabPanel>
      <TabPanel h="full" p={0} w="full" onClick={() => setCurrentId(0)}>
        {archiveMails.length > 0 ? (
          archiveMails.map((mail) => (
            <MailItem
              key={mail.id}
              {...mail}
              currentId={currentId}
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
              isArchived
              setCurrentId={setCurrentId}
            />
          ))
        ) : (
          <Center h="full" w="full">
            <Text>No email.</Text>
          </Center>
        )}
      </TabPanel>
    </Tabs>
  )
}

export default MailBox
