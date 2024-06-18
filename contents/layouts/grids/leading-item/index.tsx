import { Grid, GridItem } from "@yamada-ui/react"

const LeadingItem = () => {
  return (
    <Grid
      w="full"
      maxW="4xl"
      gap="md"
      templateAreas={`
        "one one two two"
        "one one three four"
      `}
      _container={[
        {
          maxW: "480px",
          css: {
            gridTemplateAreas: `
              "one one"
              "two two"
              "three four"
            `,
          },
        },
        {
          maxW: "300px",
          css: {
            gridTemplateAreas: `
              "one"
              "two"
              "three"
              "four"
            `,
          },
        },
      ]}
    >
      <GridItem area="one" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="two" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="three" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="four" w="full" minH="4xs" rounded="md" bg="primary" />
    </Grid>
  )
}

export default LeadingItem
