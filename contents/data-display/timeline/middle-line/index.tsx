import type { FC } from "react"
import { Divider, Grid, GridItem, List, ListItem } from "@yamada-ui/react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"
import {
  generateDesktopTemplateAreas,
  generateMobileTemplateAreas,
  generateTabletTemplateAreas,
} from "./utils"

const TimelineWithMiddleLine: FC = () => {
  return (
    <Grid
      as={List}
      gap="xl"
      gridTemplateAreas={{
        base: `
          ${generateDesktopTemplateAreas().join(" ")}
          `,
        sm: `
          ${generateMobileTemplateAreas().join(" ")}
          `,
        lg: `
          ${generateTabletTemplateAreas().join(" ")}`,
      }}
      maxW="4xl"
      pl={{ base: "lg", sm: "0" }}
      position="relative"
    >
      <GridItem as={ListItem} area="line" transform="translateX(-50%)">
        <Divider
          borderColor="primary"
          display={{ sm: "none" }}
          h="100%"
          orientation="vertical"
          w="1px"
        />
      </GridItem>
      {items.map((item, index) => (
        <>
          <GridItem
            key={index}
            as={ListItem}
            area={{
              base:
                index % 2 === 0 ? `left-side-${index}` : `right-side-${index}`,
              lg: `left-side-${index}`,
            }}
            position="relative"
          >
            <TimelineItem
              latest={index === items.length - 1}
              {...item}
              side={index % 2 === 0 ? "left" : "right"}
            />
          </GridItem>
          {index % 2 === 0 ? (
            <GridItem
              as={ListItem}
              area={{ base: `left-side-${index}`, lg: `right-side-${index}` }}
            />
          ) : (
            <GridItem
              as={ListItem}
              area={{ base: `right-side-${index}`, lg: `left-side-${index}` }}
            />
          )}
        </>
      ))}
    </Grid>
  )
}

export default TimelineWithMiddleLine
