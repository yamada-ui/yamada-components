import { Grid, GridItem } from "@yamada-ui/react"

const LeadingItem = () => {
  return (
    <Grid
      gap="md"
      maxW="4xl"
      templateAreas={{
        base: `
          "one one two two"
          "one one three four"
        `,
        sm: `
          "one"
          "two"
          "three"
          "four"
        `,
        md: `
          "one one"
          "two two"
          "three four"
        `,
      }}
      w="full"
    >
      <GridItem area="one" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="two" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="three" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="four" bg="primary" minH="4xs" rounded="md" w="full" />
    </Grid>
  )
}

export default LeadingItem
