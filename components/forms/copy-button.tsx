import { Check, Copy } from "@yamada-ui/lucide"
import type { ButtonProps } from "@yamada-ui/react"
import { forwardRef, IconButton, useClipboard, Tooltip } from "@yamada-ui/react"
import { memo } from "react"

export type CopyButtonProps = Omit<ButtonProps, "value"> & { value: string }

export const CopyButton = memo(
  forwardRef<CopyButtonProps, "button">(({ value, ...rest }, ref) => {
    const { hasCopied, onCopy } = useClipboard(value)

    return (
      <>
        <Tooltip
          label={hasCopied ? "Copied!" : "Copy the code"}
          placement="top"
          gutter={12}
          {...(hasCopied ? { bg: "success", color: "white" } : {})}
          display="inline-flex"
          alignItems="center"
        >
          <IconButton
            ref={ref}
            size="sm"
            aria-label="Copy the code"
            variant="ghost"
            color={hasCopied ? "success" : "muted"}
            fontSize="1em"
            {...(hasCopied
              ? {
                  _hover: {
                    color: "success",
                    borderColor: "success",
                    bg: "rgba(86, 92, 103, 0.12)",
                  },
                }
              : {})}
            icon={hasCopied ? <Check fontSize="lg" /> : <Copy fontSize="md" />}
            {...rest}
            onClick={onCopy}
          />
        </Tooltip>
      </>
    )
  }),
)
