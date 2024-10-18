import type { ButtonProps } from "@yamada-ui/react"
import { CheckIcon, CopyIcon } from "@yamada-ui/lucide"
import { forwardRef, IconButton, Tooltip, useClipboard } from "@yamada-ui/react"
import { memo } from "react"

export type CopyButtonProps = { value: string } & Omit<ButtonProps, "value">

export const CopyButton = memo(
  forwardRef<CopyButtonProps, "button">(({ value, ...rest }, ref) => {
    const { hasCopied, onCopy } = useClipboard(value)

    return (
      <Tooltip
        gutter={12}
        label={hasCopied ? "Copied!" : "Copy the code"}
        placement="top"
        {...(hasCopied ? { bg: "success", color: "white" } : {})}
        alignItems="center"
        display="inline-flex"
      >
        <IconButton
          ref={ref}
          size="sm"
          variant="ghost"
          aria-label="Copy the code"
          color={hasCopied ? "success" : "muted"}
          fontSize="1em"
          {...(hasCopied
            ? {
                _hover: {
                  bg: "rgba(86, 92, 103, 0.12)",
                  borderColor: "success",
                  color: "success",
                },
              }
            : {})}
          icon={
            hasCopied ? <CheckIcon fontSize="lg" /> : <CopyIcon fontSize="md" />
          }
          {...rest}
          onClick={onCopy}
        />
      </Tooltip>
    )
  }),
)
