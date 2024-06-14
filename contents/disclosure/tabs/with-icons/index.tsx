import { Icon, Tab, Tabs } from "@yamada-ui/react"
import { Building2, CreditCard, UserRound, Users } from "lucide-react"
import type { FC } from "react"

const WithIcons: FC = () => {
  return (
    <Tabs>
      <Tab gap="sm">
        <Icon as={UserRound} />
        My Account
      </Tab>
      <Tab gap="sm">
        <Icon as={Building2} />
        Company
      </Tab>
      <Tab gap="sm">
        <Icon as={Users} />
        Team Members
      </Tab>
      <Tab gap="sm">
        <Icon as={CreditCard} />
        Billing
      </Tab>
    </Tabs>
  )
}

export default WithIcons
