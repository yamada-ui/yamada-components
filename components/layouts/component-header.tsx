import type {
  IconButtonProps,
  ModalProps,
  StackProps,
  UseDisclosureReturn,
} from "@yamada-ui/react"
import type { CodeDirection } from "layouts/component-layout"
import type { FC } from "react"
import { DownloadIcon, MenuIcon, UsersIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  Center,
  CloseButton,
  forwardRef,
  handlerAll,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalHeader,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react"
import { ColorModeButton, ThemeSchemeButton } from "components/forms"
import {
  Github,
  LayoutHorizontal,
  LayoutVertical,
} from "components/media-and-icons"
import { NextLinkIconButton, Tree } from "components/navigation"
import { MobileMenu } from "components/overlay"
import { CONSTANT } from "constant"
import { useComponent } from "contexts/component-context"
import { useI18n } from "contexts/i18n-context"
import { useDownload } from "hooks/use-download"
import { memo, useMemo } from "react"

export type ComponentHeaderProps = {
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodePreviewOpen: () => void
} & StackProps

export const ComponentHeader = memo(
  forwardRef<ComponentHeaderProps, "div">(
    ({ codeDirection, isCodePreviewOpen, onCodePreviewOpen, ...rest }, ref) => {
      const { metadata } = useComponent()
      const { isOpen, onClose, onOpen } = useDisclosure()

      return (
        <>
          <HStack ref={ref} px={{ base: "lg", md: "md" }} py="3" {...rest}>
            <Heading flex="1" fontSize="2xl" lineClamp={1}>
              {metadata?.title ?? "Untitled"}
            </Heading>

            <ButtonGroup
              {...{
                codeDirection,
                isCodePreviewOpen,
                isOpen,
                onCodePreviewOpen,
                onOpen,
              }}
            />
          </HStack>

          <MobileMenu
            header={
              <ButtonGroup
                isMobile
                {...{
                  codeDirection,
                  isCodePreviewOpen,
                  isOpen,
                  onClose,
                  onCodePreviewOpen,
                }}
              />
            }
            isOpen={isOpen}
            onClose={onClose}
          >
            <Tree py="sm" />
          </MobileMenu>
        </>
      )
    },
  ),
)

ComponentHeader.displayName = "ComponentHeader"

type ButtonGroupProps = {
  codeDirection: CodeDirection
  isCodePreviewOpen: boolean
  onCodePreviewOpen: () => void
  isMobile?: boolean
} & Partial<UseDisclosureReturn>

const ButtonGroup: FC<ButtonGroupProps> = memo(
  ({
    codeDirection,
    isCodePreviewOpen,
    isMobile,
    isOpen,
    onClose,
    onCodePreviewOpen,
    onOpen,
  }) => {
    const { name, components, slug } = useComponent()
    const files = useMemo(
      () => components.map(({ name, code }) => ({ data: code, path: name })),
      [components],
    )
    const { onDownload } = useDownload({ files, folderName: name })

    const isVertical = codeDirection === "vertical"

    return (
      <HStack gap="sm">
        {!isCodePreviewOpen || isMobile ? (
          <IconButton
            variant="ghost"
            aria-label="Open source code"
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
          variant="ghost"
          aria-label="Download the files"
          color="muted"
          display={{ base: "inline-flex", md: "none" }}
          icon={<DownloadIcon fontSize="2xl" />}
          onClick={async () => onDownload()}
        />

        <ThemeSchemeButton
          display={{ base: "inline-flex", md: !isMobile ? "none" : undefined }}
        />

        <ColorModeButton />

        <NextLinkIconButton
          href={`${CONSTANT.SNS.GITHUB.EDIT_URL}${slug}`}
          variant="ghost"
          aria-label="GitHub source code"
          color="muted"
          display={{ base: "inline-flex", md: !isMobile ? "none" : undefined }}
          icon={<Github />}
          isExternal
        />

        {!isOpen ? (
          <IconButton
            variant="ghost"
            aria-label="Open navigation menu"
            color="muted"
            display={{ base: "none", md: "inline-flex" }}
            icon={<MenuIcon fontSize="2xl" />}
            onClick={onOpen}
          />
        ) : (
          <CloseButton
            size="lg"
            aria-label="Close navigation menu"
            color="muted"
            display={{ base: "none", md: "inline-flex" }}
            onClick={onClose}
          />
        )}
      </HStack>
    )
  },
)

ButtonGroup.displayName = "ButtonGroup"

type AuthorsButtonProps = {
  modalProps?: ModalProps
} & IconButtonProps

const AuthorsButton: FC<AuthorsButtonProps> = memo(
  ({ modalProps, ...rest }) => {
    const { t } = useI18n()
    const { metadata } = useComponent()
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
      <>
        <IconButton
          variant="ghost"
          aria-label="Download the files"
          color="muted"
          icon={<UsersIcon fontSize="2xl" />}
          onClick={onOpen}
          {...rest}
        />

        <Modal size="md" isOpen={isOpen} onClose={onClose} {...modalProps}>
          <ModalHeader>{t("component.authors.description")}</ModalHeader>

          <ModalBody>
            {metadata?.authors?.length ? (
              <VStack>
                {metadata.authors.map(({ id, avatar_url, html_url, login }) => (
                  <HStack key={id} as="a" href={html_url} target="_blank">
                    <Avatar name={login} src={avatar_url} boxSize="10" />

                    <Text fontWeight="semibold">{login}</Text>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Center h="4xs" w="full">
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
