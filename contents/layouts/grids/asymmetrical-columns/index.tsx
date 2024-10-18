import { Grid, GridItem } from "@yamada-ui/react"

const GridAsymmetrical = () => {
  return (
    <Grid
      gap="md"
      maxW="4xl"
      templateAreas={{
        base: `
          "one one two two two"
          "three three three four four"
          "five six seven seven seven"
        `,
        md: `
          "one"
          "two"
          "three"
          "four"
          "five"
          "six"
          "seven"
        `,
      }}
      w="full"
    >
      <GridItem area="one" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="two" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="three" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="four" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="five" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="six" bg="primary" minH="4xs" rounded="md" w="full" />
      <GridItem area="seven" bg="primary" minH="4xs" rounded="md" w="full" />
    </Grid>
  )
}

export default GridAsymmetrical
