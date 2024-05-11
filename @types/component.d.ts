type DefaultLocale = "en"
type Locale = "en" | "ja"
type OtherLocale = Exclude<Locale, DefaultLocale>

type LocaleMetadata<Y> = { [key in DefaultLocale]: Y } & {
  [key in OtherLocale]?: Y
}

declare module "component" {
  type ComponentCode = {
    name: string
    path: string
    code: string
  }

  type ComponentPaths = {
    component: string
    theme: string
    config: string
  }

  type Component = {
    name: string
    slug: string
    paths: ComponentPaths
    components: ComponentCode[]
    metadata: SharedMetadata
  }

  type ComponentCategoryGroup = Partial<SharedMetadata> & {
    name: string
    slug: string
    items?: ComponentCategoryGroup[]
  }

  type ComponentCategory = Omit<ComponentCategoryGroup, "items"> & {
    items?: Component[]
  }

  type SharedMetadata = {
    title: string
    description: string
  }

  type ComponentMetadata = LocaleMetadata<SharedMetadata>

  type CategoryMetadata = LocaleMetadata<SharedMetadata>

  type CategoryGroupMetadata = LocaleMetadata<SharedMetadata>
}
