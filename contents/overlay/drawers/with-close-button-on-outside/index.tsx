import {
  useDisclosure,
  Button,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@yamada-ui/react"
import type { FC } from "react"

const WithCloseButtonOnOutside: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerHeader>Title</DrawerHeader>

        <DrawerBody>Content</DrawerBody>

        <DrawerFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export default WithCloseButtonOnOutside
