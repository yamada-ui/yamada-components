import { RefreshCwIcon } from "@yamada-ui/lucide"
import {
  Divider,
  List,
  Grid,
  GridItem,
  ListItem,
  Motion,
  IconButton,
  Container,
} from "@yamada-ui/react"
import type { FC } from "react"
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
    <Container centerContent position="relative" maxW="5xl" pt={{ sm: "4xl" }}>
      <IconButton
        onClick={restartAnimation}
        colorScheme="primary"
        mb="lg"
        position={{ base: "absolute", sm: "fixed" }}
        top="md"
        right="md"
        z="yamcha"
      >
        <RefreshCwIcon />
      </IconButton>
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
        key={key}
      >
        <GridItem
          area="line"
          transform="translateX(-50%)"
          as={ListItem}
          display={{ sm: "none" }}
        >
          <Divider
            orientation="vertical"
            borderColor="primary"
            w="1px"
            h="100%"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
