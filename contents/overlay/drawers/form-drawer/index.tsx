import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  HStack,
  Input,
  Textarea,
  useDisclosure,
} from "@yamada-ui/react"
import type { FC } from "react"

const FormDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>

      <Drawer isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <DrawerHeader>Contact Us</DrawerHeader>

        <DrawerBody>
          <HStack>
            <FormControl isRequired label="First Name">
              <Input placeholder="John" />
            </FormControl>
            <FormControl label="Last Name">
              <Input placeholder="Doe" />
            </FormControl>
          </HStack>
          <FormControl isRequired label="Email">
            <Input type="email" placeholder="test@example.com" />
          </FormControl>
          <FormControl isRequired label="Message">
            <Textarea h="180" placeholder="Your message..." />
          </FormControl>
        </DrawerBody>

        <DrawerFooter justifyContent="center">
          <Button w="100%" colorScheme="primary" onClick={onClose}>
            Send message
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
export default FormDrawer
