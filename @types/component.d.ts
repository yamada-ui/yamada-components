type DefaultLocale = "en"
type Locale = "en" | "ja"
type OtherLocale = Exclude<Locale, DefaultLocale>

type LocaleMetadata<Y> = { [key in DefaultLocale]: Y } & {
  [key in OtherLocale]?: Y
}

declare module "component" {
  type ComponentTree = Partial<SharedMetadata> & {
    name: string
    slug: string
    items?: ComponentTree[]
  }

  type SharedMetadata = {
    title: string
    description: string
  }

  type ComponentMetadata = LocaleMetadata<SharedMetadata>

  type CategoryMetadata = LocaleMetadata<SharedMetadata>

  type CategoryGroupMetadata = LocaleMetadata<SharedMetadata>
}
