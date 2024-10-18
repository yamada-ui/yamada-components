import type { FC } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  Box,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@yamada-ui/react"
import { CookieTable } from "./table"

export const CategoryItem: FC<{
  description: string
  isChecked: boolean
  title: string
  onCheckChange: (isChecked: boolean) => void
  isDisabled?: boolean
  tableData?: {
    cookie: string
    description: string
    domain: string
    expiration: string
    provider: string
  }[]
}> = ({
  description,
  isChecked,
  isDisabled,
  tableData,
  title,
  onCheckChange,
}) => {
  return (
    <Accordion variant="unstyled" isToggle>
      <AccordionItem
        borderBottom="1px solid"
        borderColor={["blackAlpha.300", "whiteAlpha.300"]}
      >
        <AccordionLabel p="0">
          {title}
          <Spacer />
          <Switch
            isChecked={isChecked}
            isDisabled={isDisabled}
            px="2"
            py="4"
            onChange={(e) => {
              onCheckChange(e.target.checked)
            }}
          />
        </AccordionLabel>
        <AccordionPanel>
          <VStack>
            <Text color={["blackAlpha.700", "whiteAlpha.700"]}>
              {description}
            </Text>
            {tableData === undefined ? (
              <Box
                border="1px solid"
                borderColor={["blackAlpha.300", "whiteAlpha.300"]}
                fontSize="sm"
                p="2"
              >
                We do not use cookies of this type.
              </Box>
            ) : (
              <Box
                color={["blackAlpha.700", "whiteAlpha.700"]}
                overflowX="auto"
              >
                <CookieTable tableData={tableData} />
              </Box>
            )}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
