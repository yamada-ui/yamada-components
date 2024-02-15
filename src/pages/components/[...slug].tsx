import { Box, Container, Text, Textarea } from "@yamada-ui/react";
import { readFileSync } from "fs";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";

interface PageProps {
    data: {
        path: string;
        component: string;
    };
}

interface PageParams extends ParsedUrlQuery {
    slug: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { slug: ['header'] } },
            // { params: { slug: ['header', 'basic'] } },
            { params: { slug: ['navbar'] } },
            // 他の可能な値を追加
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
    // paramsオブジェクトからslugを取得
    const { slug } = params!;

    // ローカル上のファイルパス取得
    const filePath = path.join(process.cwd(), 'src', 'components', ...slug.map(part => part.toLowerCase()), 'index.tsx');
    console.log(filePath);

    // ファイルの読み込み
    const fileContent = readFileSync(filePath, 'utf8');
    console.log(fileContent);

    const data: PageProps["data"] = {
        path: slug.map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join("/"),
        component: fileContent
    };

    return {
        props: {
            data
        }
    } as { props: PageProps };
}

const Page: NextPage<PageProps> = ({ data }) => {
    return <Container>
        <Box>
            <Text>Component: {data.path}</Text>
            <Textarea resize={'block'} defaultValue={data.component} />
        </Box>
    </Container>;
}

export default Page;
