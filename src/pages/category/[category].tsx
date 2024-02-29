import { ComponentPreview } from "@/components/ComponentPreview";
import { CATEGORIES_SLUGS, getCategoryData } from "@/data/categories";
import { ComponentInfo, getAllComponents, getComponentsByCategory } from "@/data/components";
import { Category } from "@/data/types";
import { Container, Heading, Link, List, ListItem, Text } from "@yamada-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";


interface PageProps {
    data: {
        category: Category | undefined
        components: ComponentInfo[]
        allComponents: ComponentInfo[]
    }
}

interface PageParams extends ParsedUrlQuery {
    category: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: CATEGORIES_SLUGS.map((slug) => ({ params: { category: slug } })),
    fallback: false,
})

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (context) => {
    const data: PageProps["data"] = {
        category: getCategoryData(context!.params!.category),
        components: (await getComponentsByCategory())[context!.params!.category],
        allComponents: await getAllComponents(),
    }
    return {
        props: { data }
    }
};

const Page: NextPage<PageProps> = ({ data }) => {
    return <>
        <Container>
            <Heading>カテゴリー：{data.category!.name}</Heading>
            <List>
                {data.components.map((e, i) => (
                    <ListItem key={`${e.component}-${i}`} display="flex" flexDir={"column"}>
                        <Text>{e.component}</Text>
                        <Link href={`/component/${e.slug}`}>{`/component/${e.slug}`}</Link>
                        <ComponentPreview path={e.component} code={e.code}/>
                    </ListItem>
                ))}
            </List>
        </Container>
    </>
}

export default Page