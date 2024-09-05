import { Icon, Motion } from "@yamada-ui/react"

export const Hangman = ({ wrongAttempts }: { wrongAttempts: number }) => (
  <Icon
    as="svg"
    width="200"
    height="250"
    viewBox="0 0 200 250"
    position="absolute"
    top="0"
    right="0"
    boxSize="20"
  >
    <Motion
      as="line"
      x1="20"
      y1="230"
      x2="100"
      y2="230"
      stroke="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
    />
    <Motion
      as="line"
      x1="60"
      y1="20"
      x2="60"
      y2="230"
      stroke="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
    />
    <Motion
      as="line"
      x1="60"
      y1="20"
      x2="140"
      y2="20"
      stroke="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
    />
    <Motion
      as="line"
      x1="140"
      y1="20"
      x2="140"
      y2="50"
      stroke="currentColor"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
    />
    {wrongAttempts > 0 && (
      <Motion
        as="circle"
        cx="140"
        cy="70"
        r="20"
        stroke="currentColor"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
    {wrongAttempts > 1 && (
      <Motion
        as="line"
        x1="140"
        y1="90"
        x2="140"
        y2="150"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
    {wrongAttempts > 2 && (
      <Motion
        as="line"
        x1="140"
        y1="120"
        x2="120"
        y2="100"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
    {wrongAttempts > 3 && (
      <Motion
        as="line"
        x1="140"
        y1="120"
        x2="160"
        y2="100"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
    {wrongAttempts > 4 && (
      <Motion
        as="line"
        x1="140"
        y1="150"
        x2="120"
        y2="180"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
    {wrongAttempts > 5 && (
      <Motion
        as="line"
        x1="140"
        y1="150"
        x2="160"
        y2="180"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    )}
  </Icon>
)
