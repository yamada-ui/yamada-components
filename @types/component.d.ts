import type { HTMLUIProps } from "@yamada-ui/react"

type DefaultLocale = "en"
type Locale = "en" | "ja"
type OtherLocale = Exclude<Locale, DefaultLocale>

type LocaleMetadata<Y> = {
  [key in Locale]: key extends DefaultLocale ? Y : undefined | Y
}

declare module "component" {
  type ContentType = "category" | "categoryGroup" | "component"

  interface Author {
    id: number
    avatar_url: string
    html_url: string
    login: string
  }

  interface ComponentCode {
    name: string
    code: string
    path: string
  }

  interface ComponentPaths {
    component: string
    config: null | string
    theme: null | string
  }

  interface Component {
    name: string
    components: ComponentCode[]
    metadata: ComponentMetadata | null
    paths: ComponentPaths
    slug: string
  }

  type ComponentCategoryGroup = {
    name: string
    isExpanded: boolean
    slug: string
    icon?: null | string
    items?: ComponentCategoryGroup[]
  } & Partial<Metadata>

  type ComponentCategory = {
    items?: Component[]
  } & Omit<ComponentCategoryGroup, "items">

  type ComponentContainerProps = {
    centerContent?: boolean
  } & HTMLUIProps

  interface MetadataOptions {
    ignore: boolean
    container?: ComponentContainerProps
    files?: {
      order?: string[]
    }
    iframe?: boolean
  }

  interface SharedMetadata {
    authors?: Author[] | null
    icon?: null | string
    labels?: null | string[]
    options?: MetadataOptions | null
  }

  interface CommonMetadata {
    description: string
    title: string
  }

  type OriginMetadata = LocaleMetadata<CommonMetadata> & SharedMetadata

  type ComponentMetadata = CommonMetadata & SharedMetadata

  type CategoryMetadata = CommonMetadata & SharedMetadata

  type CategoryGroupMetadata = CommonMetadata & SharedMetadata

  type Metadata = CategoryGroupMetadata | CategoryMetadata | ComponentMetadata
}
