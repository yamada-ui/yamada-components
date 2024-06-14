import {
  LayoutList,
  PanelsTopLeft,
  Search as SearchIcon,
  ExternalLink,
} from "@yamada-ui/lucide"
import {
  ui,
  HStack,
  Kbd,
  Modal,
  ModalBody,
  Text,
  forwardRef,
  handlerAll,
  useDisclosure,
  isApple,
  Divider,
  VStack,
  ModalHeader,
  Highlight,
  dataAttr,
  useUpdateEffect,
  IconButton,
  Icon,
} from "@yamada-ui/react"
import type { StackProps, ModalProps, ButtonProps } from "@yamada-ui/react"
import { matchSorter } from "match-sorter"
import NextLink from "next/link"
import { useRouter } from "next/router"
import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import type { FC, KeyboardEvent, RefObject } from "react"
import scrollIntoView from "scroll-into-view-if-needed"
import { useI18n } from "contexts/i18n-context"
import { useEventListener } from "hooks/use-event-listener"

const ACTION_DEFAULT_KEY = "Ctrl"
const ACTION_APPLE_KEY = "⌘"

const useSearch = () => {
  const { events } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    events.on("routeChangeComplete", onClose)

    return () => {
      events.off("routeChangeComplete", onClose)
    }
  }, [onClose, events])

  return { isOpen, onOpen, onClose }
}

export type SearchProps = StackProps & {}

export const Search = memo(
  forwardRef<SearchProps, "button">(({ ...rest }, ref) => {
    const { tc } = useI18n()
    const { isOpen, onOpen, onClose } = useSearch()
    const [actionKey, setActionKey] = useState(ACTION_APPLE_KEY)

    useEffect(() => {
      if (!isApple()) setActionKey(ACTION_DEFAULT_KEY)
    }, [])

    useEventListener("keydown", (ev) => {
      if (
        ev.key.toLowerCase() !== "k" ||
        !ev[isApple() ? "metaKey" : "ctrlKey"]
      )
        return

      ev.preventDefault()

      isOpen ? onClose() : onOpen()
    })

    return (
      <>
        <HStack
          as="button"
          type="button"
          ref={ref}
          w="full"
          maxW="lg"
          h="10"
          px="3"
          outline="0"
          border="1px solid"
          bg={["white", "black"]}
          rounded="md"
          gap="sm"
          color={["blackAlpha.600", "whiteAlpha.400"]}
          _focusVisible={{ shadow: "outline" }}
          transitionProperty="common"
          transitionDuration="slower"
          {...rest}
          onClick={handlerAll(rest.onClick, onOpen)}
        >
          <SearchIcon fontSize="xl" />
          <Text flex="1">{tc("component.forms.search.message")}</Text>
          <Kbd>{actionKey} + K</Kbd>
        </HStack>

        <SearchModal isOpen={isOpen} onClose={onClose} />
      </>
    )
  }),
)

export type SearchButtonProps = ButtonProps & {}

export const SearchButton = memo(
  forwardRef<SearchButtonProps, "button">(({ ...rest }, ref) => {
    const { isOpen, onOpen, onClose } = useSearch()

    return (
      <>
        <IconButton
          type="button"
          ref={ref}
          color="muted"
          variant="ghost"
          _hover={{ bg: ["blackAlpha.100", "whiteAlpha.50"] }}
          icon={<SearchIcon fontSize="2xl" />}
          {...rest}
          onClick={handlerAll(rest.onClick, onOpen)}
        />

        <SearchModal isOpen={isOpen} onClose={onClose} />
      </>
    )
  }),
)

type SearchModalProps = ModalProps

const SearchModal: FC<SearchModalProps> = memo(
  ({ isOpen, onClose, ...rest }) => {
    const [query, setQuery] = useState<string>("")
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const { t, contents } = useI18n()
    const router = useRouter()
    const eventRef = useRef<"mouse" | "keyboard" | null>(null)
    const directionRef = useRef<"up" | "down">("down")
    const compositionRef = useRef<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Map<number, RefObject<HTMLDivElement>>>(new Map())

    const hits = useMemo(() => {
      if (query.length < 1) return []

      return matchSorter(contents, query, {
        keys: [
          "hierarchy.categoryGroup",
          "hierarchy.category",
          "hierarchy.component",
          "description",
          "title",
        ],
      }).slice(0, 20)
    }, [query, contents])

    const onKeyDown = useCallback(
      (ev: KeyboardEvent<HTMLInputElement>) => {
        if (compositionRef.current) return

        eventRef.current = "keyboard"

        const actions: Record<string, Function | undefined> = {
          ArrowDown: () => {
            if (selectedIndex + 1 === hits.length) return

            directionRef.current = "down"
            setSelectedIndex(selectedIndex + 1)
          },
          ArrowUp: () => {
            if (selectedIndex === 0) return

            directionRef.current = "up"
            setSelectedIndex(selectedIndex - 1)
          },
          Enter: () => {
            if (!hits.length) return

            const { type, slug } = hits[selectedIndex]

            if (type === "component") {
              window.open(slug, "_blank")
            } else {
              onClose?.()
              router.push(slug)
            }
          },
          Home: () => {
            directionRef.current = "up"
            setSelectedIndex(0)
          },
          End: () => {
            directionRef.current = "down"
            setSelectedIndex(hits.length - 1)
          },
        }

        const action = actions[ev.key]

        if (!action) return

        ev.preventDefault()
        ev.stopPropagation()

        action(ev)
      },
      [hits, onClose, selectedIndex, router],
    )

    useEffect(() => {
      if (isOpen) return

      setQuery("")
    }, [isOpen])

    useUpdateEffect(() => {
      setSelectedIndex(0)
    }, [query])

    useUpdateEffect(() => {
      if (!containerRef.current || eventRef.current === "mouse") return

      const itemRef = itemRefs.current.get(selectedIndex)

      if (!itemRef?.current) return

      scrollIntoView(itemRef.current, {
        behavior: (actions) =>
          actions.forEach(({ el, top }) => {
            if (directionRef.current === "down") {
              el.scrollTop = top + 16
            } else {
              el.scrollTop = top - 17
            }
          }),
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest",
        boundary: containerRef.current,
      })
    }, [selectedIndex])

    return (
      <Modal
        size="3xl"
        withCloseButton={false}
        placement="top"
        isOpen={isOpen}
        onClose={onClose}
        {...rest}
      >
        <ModalHeader fontWeight="normal" fontSize="md" pb="md">
          <HStack position="relative" w="full">
            <ui.input
              flex="1"
              pl="lg"
              placeholder={t("component.forms.search.placeholder") as string}
              maxLength={64}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              onKeyDown={onKeyDown}
              onCompositionStart={() => {
                compositionRef.current = true
              }}
              onCompositionEnd={() => {
                compositionRef.current = false
              }}
            />

            <SearchIcon
              fontSize="2xl"
              position="absolute"
              top="50%"
              left="0"
              transform="translateY(-50%)"
              color={["blackAlpha.700", "whiteAlpha.600"]}
              pointerEvents="none"
            />
          </HStack>
        </ModalHeader>

        {hits.length ? (
          <ModalBody ref={containerRef} my="0" pb="md">
            <Divider />

            <VStack as="ul" gap="sm">
              {hits.map(({ title, type, slug, hierarchy }, index) => {
                const isSelected = index === selectedIndex
                const ref = createRef<HTMLDivElement>()

                itemRefs.current.set(index, ref)

                return (
                  <HStack
                    as={type === "component" ? "a" : NextLink}
                    target={type === "component" ? "_blank" : undefined}
                    rel={type === "component" ? "noopener" : undefined}
                    ref={ref}
                    key={slug}
                    href={slug}
                    gap="2"
                    borderWidth="1px"
                    rounded="md"
                    minH="16"
                    py="sm"
                    px="md"
                    data-selected={dataAttr(isSelected)}
                    bg={["blackAlpha.50", "whiteAlpha.50"]}
                    transitionProperty="colors"
                    transitionDuration="normal"
                    _focus={{ outline: "none" }}
                    _focusVisible={{ boxShadow: "outline" }}
                    _hover={{ boxShadow: "outline" }}
                    _selected={{ boxShadow: "outline" }}
                    _active={{}}
                    onClick={type !== "component" ? onClose : undefined}
                    onMouseEnter={() => {
                      eventRef.current = "mouse"
                      setSelectedIndex(index)
                    }}
                  >
                    {type === "component" ? (
                      <Icon
                        as={PanelsTopLeft}
                        fontSize="2xl"
                        color={["blackAlpha.700", "whiteAlpha.600"]}
                      />
                    ) : (
                      <Icon
                        as={LayoutList}
                        fontSize="2xl"
                        color={["blackAlpha.700", "whiteAlpha.600"]}
                      />
                    )}

                    <VStack flex="1" gap="0">
                      {type === "category" || type === "component" ? (
                        <HStack gap="xs">
                          <Highlight
                            fontSize="xs"
                            color="muted"
                            lineClamp={1}
                            query={query}
                            markProps={{ variant: "text-accent" }}
                          >
                            {hierarchy.categoryGroup}
                          </Highlight>

                          {type === "component" ? (
                            <>
                              <Text
                                lineHeight={1.2}
                                color="muted"
                                fontSize="xs"
                              >
                                /
                              </Text>

                              <Highlight
                                fontSize="xs"
                                color="muted"
                                lineClamp={1}
                                query={query}
                                markProps={{ variant: "text-accent" }}
                              >
                                {hierarchy.category}
                              </Highlight>
                            </>
                          ) : null}
                        </HStack>
                      ) : null}

                      <Highlight
                        query={query}
                        markProps={{ variant: "text-accent" }}
                        lineClamp={1}
                      >
                        {title}
                      </Highlight>
                    </VStack>

                    {type === "component" ? (
                      <ExternalLink
                        fontSize="xl"
                        color={["blackAlpha.700", "whiteAlpha.600"]}
                      />
                    ) : null}
                  </HStack>
                )
              })}
            </VStack>
          </ModalBody>
        ) : null}
      </Modal>
    )
  },
)

SearchModal.displayName = "SearchModal"
