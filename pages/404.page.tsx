import type { InferGetStaticPropsType, NextPage } from "next"
import { Text, VStack } from "@yamada-ui/react"
import { NextLinkButton } from "components/navigation"
import { AppProvider } from "contexts/app-context"
import { useI18n } from "contexts/i18n-context"
import { AppLayout } from "layouts/app-layout"
import { getStaticCommonProps } from "utils/next"

export const getStaticProps = getStaticCommonProps

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ componentTree }) => {
  const { t, tc } = useI18n()

  return (
    <AppProvider {...{ componentTree }}>
      <AppLayout
        description={t("not-found.description")}
        title={t("not-found.title")}
      >
        <VStack alignItems="center" gap="xl" py="3xl">
          <VStack alignItems="center">
            <Text
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "5xl", sm: "2xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="center"
            >
              {tc("not-found.heading")}
            </Text>

            <Text
              fontSize={{ base: "xl", sm: "lg" }}
              maxW="2xl"
              textAlign="center"
              w="full"
            >
              {tc("not-found.message")}
            </Text>
          </VStack>

          <NextLinkButton href="/" size="lg">
            {tc("not-found.back-to-app")}
          </NextLinkButton>
        </VStack>
      </AppLayout>
    </AppProvider>
  )
}

export default Page
