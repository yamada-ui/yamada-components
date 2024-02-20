import * as YamadaUI from "@yamada-ui/react";
import { readFileSync } from "fs";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import React from "react"
import { getAllComponents } from "@/data/components";
const { Box, Container, Text } = YamadaUI

interface PageProps {
    data: {
        path: string;
        component: string;
    };
}

interface PageParams extends ParsedUrlQuery {
    component: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllComponents().map((component) => ({ params: { component: component.slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
    // paramsオブジェクトからslugを取得
    const component = params!.component.split('-').join('');

    // ローカル上のファイルパス取得
    const filePath = path.join(process.cwd(), 'src', 'contents', component.toLowerCase(), 'index.tsx');

    // ファイルの読み込み
    const fileContent = readFileSync(filePath, 'utf8').split('\n').filter(line => !line.includes('export')).join('\n');

    const data: PageProps["data"] = {
        path: component.charAt(0).toUpperCase() + component.slice(1).toLowerCase(),
        component: fileContent,
    };

    return {
        props: {
            data
        }
    } as { props: PageProps };
}

const Page: NextPage<PageProps> = ({ data }) => {
    const transformCode = (code: string) => {
        const codeLines = code.split('\n');
        let codeSnippet = ''; // React Liveで表示させるコード
        let componentName = ''; // コンポーネント名

        for (const line of codeLines) {
            // import {} from "" を削除
            if (!line.includes('import')) {
                codeSnippet += line + '\n';
                if (codeSnippet.includes('const')) {
                    // const 変数名をcomponentNameに格納
                    const match = line.match(/const\s+(\w+)\s*:\s*FC\s*=\s*\(\s*\)\s*=>\s*{/);
                    if (match && match.length >= 2) {
                        componentName = match[1];
                    }
                }
            }
        }
        return `${codeSnippet}\nrender(<${componentName}/>)` 
    }
    return <Container>
        <Box>
            <Text>Component: {data.path}</Text>
            <LiveProvider code={data.component} scope={{ ...YamadaUI, ...React }} enableTypeScript noInline transformCode={transformCode} >
                <Box>
                    <LiveEditor />
                    <LivePreview />
                </Box>
                <LiveError />
            </LiveProvider>
        </Box>
    </Container>;
}

export default Page;
