import {
  Button,
  Dialog,
  Link,
  Tab,
  TabPanel,
  Tabs,
  Text,
  useDisclosure,
} from "@yamada-ui/react"
import { type FC, useState } from "react"
import { CategoryItem } from "./category-item"
import { cookieData } from "./data"

const ComplexCookieDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categoryCheck, setCategoryCheck] = useState<Record<number, boolean>>(
    cookieData.reduce(
      (acc, item) => {
        acc[item.id] = item.isChecked ?? false
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCategoryCheck((prev) => ({ ...prev, [id]: isChecked }))
  }

  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>

      <Dialog
        isOpen={isOpen}
        size="6xl"
        header="Yamada Components"
        cancel="Decline"
        onCancel={() => {
          onClose()
          setCategoryCheck({})
        }}
        success={{
          children: "Save & Accept",
          colorScheme: "info",
        }}
        onSuccess={onClose}
        blockScrollOnMount={false}
      >
        <Tabs variant="sticky" isFitted>
          <Tab fontWeight="600">Consent</Tab>
          <Tab fontWeight="600">Details</Tab>

          <TabPanel minH="sm">
            <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
              We use cookies to enhance your experience on our website. By
              managing your preferences, you can control the cookies that are
              set during your visit. Our cookies are categorized for your
              convenience, allowing you to adjust settings for different types
              of cookies independently. By clicking "Save & Accept", you agree
              to our use of cookies as per your settings. For more detailed
              information on each cookie category and to make informed choices,
              please review our{" "}
              <Link href="/privacy/cookie" onClick={(e) => e.preventDefault()}>
                Cookie Policy.
              </Link>
            </Text>
          </TabPanel>
          <TabPanel minH="sm">
            {cookieData.map((category) => (
              <CategoryItem
                key={category.id}
                isChecked={categoryCheck[category.id]}
                onCheckChange={(isChecked) =>
                  handleCheckChange(category.id, isChecked)
                }
                {...category}
              />
            ))}
          </TabPanel>
        </Tabs>
      </Dialog>
    </>
  )
}

export default ComplexCookieDialog
