import { Box, HStack, Link } from "@yamada-ui/react";
import { FC } from "react";

export const Header: FC = () => {
    return <HStack as="header" justify="space-between">
        <Box>アイコン</Box>
        <HStack>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
        </HStack>
    </HStack>
}