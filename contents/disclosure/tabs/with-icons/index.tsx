import {
  Building2Icon,
  CreditCardIcon,
  UserRoundIcon,
  UsersIcon,
} from "@yamada-ui/lucide"
import { Tab, Tabs } from "@yamada-ui/react"
import type { FC } from "react"

const WithIcons: FC = () => {
  return (
    <Tabs>
      <Tab gap="sm">
        <UserRoundIcon />
        My Account
      </Tab>
      <Tab gap="sm">
        <Building2Icon />
        Company
      </Tab>
      <Tab gap="sm">
        <UsersIcon />
        Team Members
      </Tab>
      <Tab gap="sm">
        <CreditCardIcon />
        Billing
      </Tab>
    </Tabs>
  )
}

export default WithIcons
