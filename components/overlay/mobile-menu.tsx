import type { DrawerProps } from "@yamada-ui/react"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  VStack,
  useBreakpoint,
} from "@yamada-ui/react"
import { useRouter } from "next/router"
import type { FC, PropsWithChildren, ReactNode } from "react"
import { memo, useEffect } from "react"

export type MobileMenuProps = DrawerProps &
  PropsWithChildren<{ header?: ReactNode }>

export const MobileMenu: FC<MobileMenuProps> = memo(
  ({ isOpen, onClose, header, children, ...rest }) => {
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
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton={false}
        isFullHeight
        w="19.5rem"
        {...rest}
      >
        <DrawerHeader
          justifyContent="flex-end"
          pt="sm"
          fontSize="md"
          fontWeight="normal"
        >
          {header}
        </DrawerHeader>

        <DrawerBody position="relative" my="sm">
          <VStack as="nav" overflowY="auto" overscrollBehavior="contain">
            {children}
          </VStack>

          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            zIndex="kurillin"
            w="full"
            h="3"
            bgGradient={[
              "linear(to-t, rgba(255, 255, 255, 0), white)",
              "linear(to-t, rgba(0, 0, 0, 0), black)",
            ]}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            zIndex="kurillin"
            w="full"
            h="3"
            bgGradient={[
              "linear(to-b, rgba(255, 255, 255, 0), white)",
              "linear(to-b, rgba(0, 0, 0, 0), black)",
            ]}
          />
        </DrawerBody>
      </Drawer>
    )
  },
)

MobileMenu.displayName = "MobileMenu"
