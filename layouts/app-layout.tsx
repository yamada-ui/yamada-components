import type { StackProps } from "@yamada-ui/react"
import { Center, VStack } from "@yamada-ui/react"
import { type FC } from "react"
import { Footer, Header } from "components/layouts"
import { SEO } from "components/media-and-icons"

type AppLayoutOptions = { title?: string; description?: string }

export type AppLayoutProps = StackProps & AppLayoutOptions

export const AppLayout: FC<AppLayoutProps> = ({
  title,
  description,
  children,
  ...rest
}) => {
  return (
    <>
      <SEO title={title} description={description} />

      <Header />

      <Center as="main">
        <VStack
          w="full"
          maxW="9xl"
          gap="0"
          py={{ base: "lg", md: "normal" }}
          px={{ base: "lg", md: "md" }}
          {...rest}
        >
          {children}
        </VStack>
      </Center>

      <Footer />
    </>
  )
}
