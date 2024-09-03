import { Divider, List, Grid, GridItem, ListItem } from "@yamada-ui/react"
import type { FC } from "react"
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
      position="relative"
      pl={{ base: "lg", sm: "0" }}
      maxW="4xl"
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
      gap="xl"
    >
      <GridItem area="line" transform="translateX(-50%)" as={ListItem}>
        <Divider
          orientation="vertical"
          borderColor="primary"
          w="1px"
          h="100%"
          display={{ sm: "none" }}
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
