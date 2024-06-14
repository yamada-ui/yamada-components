import { Tabs, Tab } from "@yamada-ui/react"
import type { FC } from "react"

const WithFullWidth: FC = () => {
  return (
    <Tabs isFitted>
      <Tab>My Account</Tab>
      <Tab>Company</Tab>
      <Tab>Team Members</Tab>
      <Tab>Billing</Tab>
    </Tabs>
  )
}

export default WithFullWidth
