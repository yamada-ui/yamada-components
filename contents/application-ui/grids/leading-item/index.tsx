import { Grid, GridItem } from "@yamada-ui/react"

const LeadingItem = () => {
  return (
    <Grid
      templateAreas={{
        base: `
        "one one two two"
        "one one three four"
      `,
        sm: `
        "one one"
        "two two"
        "three four"
        `,
      }}
      gap="md"
      maxW="4xl"
      mx="auto"
    >
      <GridItem area="one" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="two" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="three" w="full" minH="4xs" rounded="md" bg="primary" />
      <GridItem area="four" w="full" minH="4xs" rounded="md" bg="primary" />
    </Grid>
  )
}

export default LeadingItem
