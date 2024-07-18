import {
  Button,
  Dialog,
  Link,
  Tab,
  TabPanel,
  Tabs,
  useDisclosure,
} from "@yamada-ui/react"
import { type FC, useState } from "react"
import { CategoryItem } from "./category-item"
import { CookieData } from "./data"

const ComplexCookieDialog: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categoryCheck, setCategoryCheck] = useState<{
    [key: number]: boolean
  }>({})

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
        success="Save & Accept"
        onSuccess={onClose}
        blockScrollOnMount={false}
      >
        <Tabs variant="sticky" isFitted>
          <Tab>Consent</Tab>
          <Tab>Details</Tab>

          <TabPanel>
            We use cookies to enhance your experience on our website. By
            managing your preferences, you can control the cookies that are set
            during your visit. Our cookies are categorized for your convenience,
            allowing you to adjust settings for different types of cookies
            independently. By clicking "Save & Accept", you agree to our use of
            cookies as per your settings. For more detailed information on each
            cookie category and to make informed choices, please review our{" "}
            <Link href="/privacy/cookie" onClick={(e) => e.preventDefault()}>
              Cookie Policy.
            </Link>
          </TabPanel>
          <TabPanel>
            {CookieData.map((category) => (
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
