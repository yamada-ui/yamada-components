import type { StackProps } from "@yamada-ui/react"
import type { FC } from "react"
import { Center, VStack } from "@yamada-ui/react"
import { Footer, Header } from "components/layouts"
import { Seo } from "components/media-and-icons"

interface AppLayoutOptions {
  description?: string
  title?: string
}

export type AppLayoutProps = AppLayoutOptions & StackProps

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  description,
  title,
  ...rest
}) => {
  return (
    <>
      <Seo description={description} title={title} />

      <Header />

      <Center as="main">
        <VStack
          gap="0"
          maxW="9xl"
          px={{ base: "lg", md: "md" }}
          py={{ base: "lg", md: "normal" }}
          w="full"
          {...rest}
        >
          {children}
        </VStack>
      </Center>

      <Footer />
    </>
  )
}
