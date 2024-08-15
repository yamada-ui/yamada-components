import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  Heading,
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

      <Drawer
        as="form"
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <DrawerHeader>
          <Heading as="h3" size="md">
            Contact Us
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <HStack>
            <FormControl isRequired label="First Name">
              <Input placeholder="Hirotomo" />
            </FormControl>
            <FormControl isRequired label="Last Name">
              <Input placeholder="Yamada" />
            </FormControl>
          </HStack>
          <FormControl isRequired label="Email">
            <Input type="email" placeholder="test@example.com" />
          </FormControl>
          <FormControl isRequired label="Message">
            <Textarea h="xs" placeholder="Your message..." />
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button type="submit" w="full" colorScheme="primary">
            Send message
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
export default FormDrawer
