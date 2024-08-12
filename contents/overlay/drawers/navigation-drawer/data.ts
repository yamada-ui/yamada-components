import {
  HouseIcon,
  SearchIcon,
  BellIcon,
  HeartIcon,
  DiamondIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "@yamada-ui/lucide"

export const tabData = {
  top: [
    { link: "", label: "Home", icon: HouseIcon },
    { link: "", label: "Search", icon: SearchIcon },
    { link: "", label: "Notifications", icon: BellIcon },
    { link: "", label: "Favorites", icon: HeartIcon },
    { link: "", label: "Premium Plan", icon: DiamondIcon },
  ],
  bottom: [
    { link: "", label: "Profile", icon: UserIcon },
    { link: "", label: "Settings", icon: SettingsIcon },
    { link: "", label: "Logout", icon: LogOutIcon, color: "danger" },
  ],
}
