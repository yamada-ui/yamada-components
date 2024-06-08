import { Badge, Tab, Tabs } from "@yamada-ui/react"
import { useState, type FC } from "react"

const WithBadges: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Tabs>
      <Tab gap="sm" onClick={() => setSelectedTab(0)}>
        Applied
        <Badge colorScheme={selectedTab === 0 ? "blue" : "neutral"}>52</Badge>
      </Tab>
      <Tab gap="sm" onClick={() => setSelectedTab(1)}>
        Phone Screening
        <Badge colorScheme={selectedTab === 1 ? "blue" : "neutral"}>6</Badge>
      </Tab>
      <Tab gap="sm" onClick={() => setSelectedTab(2)}>
        Interview
        <Badge colorScheme={selectedTab === 2 ? "blue" : "neutral"}>4</Badge>
      </Tab>
      <Tab gap="sm" onClick={() => setSelectedTab(3)}>
        Offer
      </Tab>
      <Tab gap="sm" onClick={() => setSelectedTab(4)}>
        Disqualified
      </Tab>
    </Tabs>
  )
}

export default WithBadges
