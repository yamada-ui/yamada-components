import { Text, VStack } from "@yamada-ui/react"
import type { InferGetStaticPropsType, NextPage } from "next"
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
        title={t("not-found.title")}
        description={t("not-found.description")}
      >
        <VStack alignItems="center" py="3xl" gap="xl">
          <VStack alignItems="center">
            <Text
              as="h1"
              fontSize={{ base: "5xl", md: "3xl", sm: "2xl" }}
              fontFamily="heading"
              fontWeight="bold"
              textAlign="center"
            >
              {tc("not-found.heading")}
            </Text>

            <Text
              w="full"
              maxW="2xl"
              fontSize={{ base: "xl", sm: "lg" }}
              textAlign="center"
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
