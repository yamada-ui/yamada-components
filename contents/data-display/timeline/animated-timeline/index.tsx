import type { FC } from "react"
import { RefreshCwIcon } from "@yamada-ui/lucide"
import {
  Container,
  Divider,
  Grid,
  GridItem,
  IconButton,
  List,
  ListItem,
  Motion,
} from "@yamada-ui/react"
import { useState } from "react"
import { items } from "./timeline"
import { TimelineItem } from "./timeline-item"
import {
  generateDesktopTemplateAreas,
  generateMobileTemplateAreas,
  generateTabletTemplateAreas,
} from "./utils"

const AnimatedTimeline: FC = () => {
  const [key, setKey] = useState(0)

  const restartAnimation = () => {
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <Container centerContent maxW="5xl" position="relative" pt={{ sm: "4xl" }}>
      <IconButton
        colorScheme="primary"
        mb="lg"
        position={{ base: "absolute", sm: "fixed" }}
        right="md"
        top="md"
        z="yamcha"
        onClick={restartAnimation}
      >
        <RefreshCwIcon />
      </IconButton>
      <Grid
        key={key}
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
        <GridItem
          as={ListItem}
          area="line"
          display={{ sm: "none" }}
          transform="translateX(-50%)"
        >
          <Divider
            borderColor="primary"
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
                  index % 2 === 0
                    ? `left-side-${index}`
                    : `right-side-${index}`,
                sm: undefined,
                lg: `left-side-${index}`,
              }}
              position="relative"
            >
              <Motion
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Motion whileHover={{ y: -5 }} whileTap={{ y: 5 }}>
                  <TimelineItem
                    latest={index === items.length - 1}
                    {...item}
                    side={index % 2 === 0 ? "left" : "right"}
                  />
                </Motion>
              </Motion>
            </GridItem>
            {index % 2 === 0 ? (
              <GridItem
                as={ListItem}
                area={{
                  base: `left-side-${index}`,
                  sm: `left-side-${index}`,
                  lg: `right-side-${index}`,
                }}
              />
            ) : (
              <GridItem
                as={ListItem}
                area={{
                  base: `right-side-${index}`,
                  lg: `left-side-${index}`,
                }}
              />
            )}
          </>
        ))}
      </Grid>
    </Container>
  )
}

export default AnimatedTimeline
