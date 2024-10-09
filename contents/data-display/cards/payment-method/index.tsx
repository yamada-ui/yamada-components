import type { FC } from "react"
import { CreditCardIcon } from "@yamada-ui/lucide"
import {
  Autocomplete,
  AutocompleteOption,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useRadioGroup,
} from "@yamada-ui/react"
import { AppleIcon } from "./apple"
import { CustomRadio } from "./custom-radio"
import { PaypalIcon } from "./paypal"

const PaymentMethod: FC = () => {
  const { getContainerProps, getRadioProps } = useRadioGroup<string>({
    defaultValue: "Card",
  })

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)

  return (
    <Card
      as="form"
      variant="outline"
      maxW="md"
      rounded="xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardHeader alignItems="flex-start" flexDirection="column" gap="0">
        <Heading as="h2" size="md">
          Payment method
        </Heading>

        <Text color="muted">Add a new payment method to your account.</Text>
      </CardHeader>

      <CardBody>
        <HStack gap="sm" w="full" {...getContainerProps()}>
          <CustomRadio
            {...getRadioProps({ value: "Card" })}
            icon={<CreditCardIcon boxSize={{ base: "8", sm: "6" }} />}
          />
          <CustomRadio
            {...getRadioProps({ value: "Paypal" })}
            icon={<PaypalIcon boxSize={{ base: "8", sm: "6" }} />}
          />
          <CustomRadio
            {...getRadioProps({ value: "Apple" })}
            icon={<AppleIcon boxSize={{ base: "8", sm: "6" }} />}
          />
        </HStack>

        <FormControl isRequired label="Name">
          <Input type="text" placeholder="First Last" />
        </FormControl>

        <FormControl isRequired label="Card number">
          <Input type="text" />
        </FormControl>

        <HStack
          flexDirection={{ base: "row", sm: "column" }}
          gap={{ base: "sm", sm: "md" }}
          w="full"
        >
          <FormControl isRequired label="Expires">
            <Autocomplete placeholder="Month" placement="top">
              {months.map((month) => (
                <AutocompleteOption key={month} value={month}>
                  {month}
                </AutocompleteOption>
              ))}
            </Autocomplete>
          </FormControl>

          <FormControl isRequired label="Year">
            <Autocomplete placeholder="Year" placement="top">
              {years.map((year) => (
                <AutocompleteOption key={year} value={year.toString()}>
                  {year.toString()}
                </AutocompleteOption>
              ))}
            </Autocomplete>
          </FormControl>

          <FormControl isRequired label="CVC">
            <Input type="text" placeholder="CVC" />
          </FormControl>
        </HStack>
      </CardBody>

      <CardFooter>
        <Button type="submit" colorScheme="primary" w="full">
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PaymentMethod
