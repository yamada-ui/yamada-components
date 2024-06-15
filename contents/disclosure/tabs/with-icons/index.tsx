import { Building2, CreditCard, UserRound, Users } from "@yamada-ui/lucide"
import { Tab, Tabs } from "@yamada-ui/react"
import type { FC } from "react"

const WithIcons: FC = () => {
  return (
    <Tabs>
      <Tab gap="sm">
        <UserRound />
        My Account
      </Tab>
      <Tab gap="sm">
        <Building2 />
        Company
      </Tab>
      <Tab gap="sm">
        <Users />
        Team Members
      </Tab>
      <Tab gap="sm">
        <CreditCard />
        Billing
      </Tab>
    </Tabs>
  )
}

export default WithIcons
