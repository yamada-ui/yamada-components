import { Accordion, AccordionItem, VStack, Heading } from "@yamada-ui/react"

const Simple = () => {
  return (
    <VStack gap="lg" py="xl" px="md">
      <Heading textAlign="center">Frequently Asked Questions</Heading>
      <Accordion variant="card" isToggle maxW="2xl" mx="auto">
        <AccordionItem label="How can I reset my password?">
          It can't help but hear a pin drop from over half a mile away, so it
          lives deep in the mountains where there aren't many people or
          Pokémon.It was born from sludge on the ocean floor. In a sterile
          environment, the germs within its body can't multiply, and it dies.It
          has no eyeballs, so it can't see. It checks its surroundings via the
          ultrasonic waves it emits from its mouth.
        </AccordionItem>

        <AccordionItem label="Can I create more than one account?">
          It can't help but hear a pin drop from over half a mile away, so it
          lives deep in the mountains where there aren't many people or
          Pokémon.It was born from sludge on the ocean floor. In a sterile
          environment, the germs within its body can't multiply, and it dies.It
          has no eyeballs, so it can't see. It checks its surroundings via the
          ultrasonic waves it emits from its mouth.
        </AccordionItem>

        <AccordionItem label="How can I subscribe to monthly newsletter?">
          It can't help but hear a pin drop from over half a mile away, so it
          lives deep in the mountains where there aren't many people or
          Pokémon.It was born from sludge on the ocean floor. In a sterile
          environment, the germs within its body can't multiply, and it dies.It
          has no eyeballs, so it can't see. It checks its surroundings via the
          ultrasonic waves it emits from its mouth.
        </AccordionItem>

        <AccordionItem label="Do you store credit card information securely?">
          It can't help but hear a pin drop from over half a mile away, so it
          lives deep in the mountains where there aren't many people or
          Pokémon.It was born from sludge on the ocean floor. In a sterile
          environment, the germs within its body can't multiply, and it dies.It
          has no eyeballs, so it can't see. It checks its surroundings via the
          ultrasonic waves it emits from its mouth.
        </AccordionItem>

        <AccordionItem label="What payment systems to you work with?">
          It can't help but hear a pin drop from over half a mile away, so it
          lives deep in the mountains where there aren't many people or
          Pokémon.It was born from sludge on the ocean floor. In a sterile
          environment, the germs within its body can't multiply, and it dies.It
          has no eyeballs, so it can't see. It checks its surroundings via the
          ultrasonic waves it emits from its mouth.
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}

export default Simple
