import type { IconProps } from "@yamada-ui/lucide"
import {
  CalendarIcon,
  ChartBarIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  SettingsIcon,
  ShieldIcon,
} from "@yamada-ui/lucide"

export interface LinksProps {
  name: string
  href?: string
  icon?: IconProps["as"]
  items?: LinksProps[]
}

export const links = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Market news",
    icon: NewspaperIcon,
    items: [
      {
        href: "/news",
        name: "Overview",
      },
      {
        href: "/forecasts",
        name: "Forecasts",
      },
      {
        href: "/outlook",
        name: "Outlook",
      },
      {
        href: "/real-time",
        name: "Real time",
      },
    ],
  },
  {
    name: "Releases",
    icon: CalendarIcon,
    items: [
      {
        href: "/releases",
        name: "Upcoming releases",
      },
      {
        href: "/previous-releases",
        name: "Previous releases",
      },
      {
        href: "/releases-schedule",
        name: "Releases schedule",
      },
    ],
  },
  {
    href: "/analytics",
    name: "Analytics",
    icon: ChartBarIcon,
  },
  {
    href: "/contracts",
    name: "Contracts",
    icon: FileTextIcon,
  },
  {
    href: "/settings",
    name: "Settings",
    icon: SettingsIcon,
  },
  {
    name: "Security",
    icon: ShieldIcon,
    items: [
      {
        href: "/enable-2fa",
        name: "Enable 2FA",
      },
      {
        href: "/change-password",
        name: "Change Password",
      },
      {
        href: "/recovery-codes",
        name: "Recovery Codes",
      },
    ],
  },
] as LinksProps[]
