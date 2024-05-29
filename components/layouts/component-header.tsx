import {
  Avatar,
  Center,
  CloseButton,
  forwardRef,
  handlerAll,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalHeader,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import type {
  IconButtonProps,
  ModalProps,
  StackProps,
  UseDisclosureReturn,
} from "@yamada-ui/react"
import { Download, Users } from "lucide-react"
import type { FC } from "react"
import { memo, useMemo } from "react"
import { ColorModeButton, ThemeSchemeButton } from "components/forms"
import {
  Github,
  Hamburger,
  LayoutHorizontal,
  LayoutVertical,
} from "components/media-and-icons"
import { NextLinkIconButton, Tree } from "components/navigation"
import { MobileMenu } from "components/overlay"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import { useI18n } from "contexts/i18n-context"
import { useDownload } from "hooks/use-download"
import type { CodeDirection } from "layouts/component-layout"

export type ComponentHeaderProps = StackProps & {
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodePreviewOpen: () => void
}

export const ComponentHeader = memo(
  forwardRef<ComponentHeaderProps, "div">(
    ({ codeDirection, isCodePreviewOpen, onCodePreviewOpen, ...rest }, ref) => {
      const { metadata } = useComponent()
      const { isOpen, onOpen, onClose } = useDisclosure()

      return (
        <>
          <HStack ref={ref} py="3" px={{ base: "lg", md: "md" }} {...rest}>
            <Heading fontSize="2xl" lineClamp={1} flex="1">
              {metadata?.title ?? "Untitled"}
            </Heading>

            <ButtonGroup
              {...{
                isOpen,
                onOpen,
                codeDirection,
                isCodePreviewOpen,
                onCodePreviewOpen,
              }}
            />
          </HStack>

          <MobileMenu
            isOpen={isOpen}
            onClose={onClose}
            header={
              <ButtonGroup
                isMobile
                {...{
                  isOpen,
                  onClose,
                  codeDirection,
                  isCodePreviewOpen,
                  onCodePreviewOpen,
                }}
              />
            }
          >
            <Tree py="sm" />
          </MobileMenu>
        </>
      )
    },
  ),
)

ComponentHeader.displayName = "ComponentHeader"

type ButtonGroupProps = Partial<UseDisclosureReturn> & {
  isMobile?: boolean
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodePreviewOpen: () => void
}

const ButtonGroup: FC<ButtonGroupProps> = memo(
  ({
    isMobile,
    codeDirection,
    isCodePreviewOpen,
    onCodePreviewOpen,
    isOpen,
    onOpen,
    onClose,
  }) => {
    const { name, slug, components } = useComponent()
    const files = useMemo(
      () => components.map(({ name, code }) => ({ path: name, data: code })),
      [components],
    )
    const { onDownload } = useDownload({ folderName: name, files })

    const isVertical = codeDirection === "vertical"

    return (
      <HStack gap="sm">
        {!isCodePreviewOpen || isMobile ? (
          <IconButton
            aria-label="Open source code"
            variant="ghost"
            color="muted"
            display={{
              base: "inline-flex",
              md: !isMobile ? "none" : undefined,
            }}
            icon={isVertical ? <LayoutVertical /> : <LayoutHorizontal />}
            onClick={handlerAll(
              onCodePreviewOpen,
              isMobile ? onClose : undefined,
            )}
          />
        ) : null}

        <AuthorsButton
          display={{ base: "inline-flex", md: !isMobile ? "none" : undefined }}
        />

        <IconButton
          aria-label="Download the files"
          variant="ghost"
          color="muted"
          display={{ base: "inline-flex", md: "none" }}
          icon={<Icon as={Download} fontSize="1.375em" />}
          onClick={() => onDownload()}
        />

        <ThemeSchemeButton
          display={{ base: "inline-flex", md: !isMobile ? "none" : undefined }}
        />

        <ColorModeButton />

        <NextLinkIconButton
          href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
          isExternal
          display={{ base: "inline-flex", md: !isMobile ? "none" : undefined }}
          aria-label="GitHub source code"
          variant="ghost"
          color="muted"
          icon={<Github />}
        />

        {!isOpen ? (
          <IconButton
            variant="ghost"
            aria-label="Open navigation menu"
            display={{ base: "none", md: "inline-flex" }}
            color="muted"
            onClick={onOpen}
            icon={<Hamburger />}
          />
        ) : (
          <CloseButton
            size="lg"
            aria-label="Close navigation menu"
            display={{ base: "none", md: "inline-flex" }}
            color="muted"
            onClick={onClose}
          />
        )}
      </HStack>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"

type AuthorsButtonProps = IconButtonProps & {
  modalProps?: ModalProps
}

const AuthorsButton: FC<AuthorsButtonProps> = memo(
  ({ modalProps, ...rest }) => {
    const { t } = useI18n()
    const { metadata } = useComponent()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <IconButton
          aria-label="Download the files"
          variant="ghost"
          color="muted"
          icon={<Icon as={Users} fontSize="1.375em" />}
          onClick={onOpen}
          {...rest}
        />

        <Modal isOpen={isOpen} onClose={onClose} size="md" {...modalProps}>
          <ModalHeader>{t("component.authors.description")}</ModalHeader>

          <ModalBody>
            {metadata.authors?.length ? (
              <VStack>
                {metadata.authors.map(({ id, login, avatar_url, html_url }) => (
                  <HStack key={id} as="a" target="_blank" href={html_url}>
                    <Avatar name={login} src={avatar_url} boxSize="10" />

                    <Text fontWeight="semibold">{login}</Text>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Center w="full" h="4xs">
                <Text color="muted">{t("component.authors.unknown")}</Text>
              </Center>
            )}
          </ModalBody>
        </Modal>
      </>
    )
  },
)

AuthorsButton.displayName = "AuthorsButton"
