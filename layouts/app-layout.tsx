import { Center, VStack } from "@yamada-ui/react"
import { type FC, type PropsWithChildren } from "react"
import { Footer, Header } from "components/layouts"
import { SEO } from "components/media-and-icons"

type AppLayoutOptions = { title: string; description: string }

export type AppLayoutProps = PropsWithChildren & AppLayoutOptions

export const AppLayout: FC<AppLayoutProps> = ({
  title,
  description,
  children,
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
        >
          {children}
        </VStack>
      </Center>

      <Footer />
    </>
  )
}
