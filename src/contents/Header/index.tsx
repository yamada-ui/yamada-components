import { Box, HStack, Heading, Link } from "@yamada-ui/react";
import { FC } from "react";

const Header: FC = () => {
    return <HStack as="header" justify="space-between">
        <Box><Heading>アイコン</Heading></Box>
        <HStack>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
            <Link href="/">リンク</Link>
        </HStack>
    </HStack>
}

export default Header