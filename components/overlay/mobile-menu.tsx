import type { DrawerProps } from "@yamada-ui/react"
import type { FC, PropsWithChildren, ReactNode } from "react"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  useBreakpoint,
  VStack,
} from "@yamada-ui/react"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"

export type MobileMenuProps = DrawerProps &
  PropsWithChildren<{ header?: ReactNode }>

export const MobileMenu: FC<MobileMenuProps> = memo(
  ({ children, header, isOpen, onClose, ...rest }) => {
    const { events } = useRouter()
    const breakpoint = useBreakpoint()

    useEffect(() => {
      if (!["lg", "md", "sm"].includes(breakpoint)) onClose?.()
    }, [breakpoint, onClose])

    useEffect(() => {
      events.on("routeChangeComplete", () => onClose?.())

      return () => {
        events.off("routeChangeComplete", () => onClose?.())
      }
    }, [events, onClose])

    return (
      <Drawer
        isFullHeight
        isOpen={isOpen}
        w="19.5rem"
        withCloseButton={false}
        onClose={onClose}
        {...rest}
      >
        <DrawerHeader
          fontSize="md"
          fontWeight="normal"
          justifyContent="flex-end"
          pt="sm"
        >
          {header}
        </DrawerHeader>

        <DrawerBody my="sm" position="relative">
          <VStack as="nav" overflowY="auto" overscrollBehavior="contain">
            {children}
          </VStack>

          <Box
            bgGradient={[
              "linear(to-t, rgba(255, 255, 255, 0), white)",
              "linear(to-t, rgba(0, 0, 0, 0), black)",
            ]}
            h="3"
            left="0"
            position="absolute"
            right="0"
            top="0"
            w="full"
            zIndex="kurillin"
          />
          <Box
            bgGradient={[
              "linear(to-b, rgba(255, 255, 255, 0), white)",
              "linear(to-b, rgba(0, 0, 0, 0), black)",
            ]}
            bottom="0"
            h="3"
            left="0"
            position="absolute"
            right="0"
            w="full"
            zIndex="kurillin"
          />
        </DrawerBody>
      </Drawer>
    )
  },
)

MobileMenu.displayName = "MobileMenu"
