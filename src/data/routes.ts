import { NavBookMarkIcon } from "@/components/icons/icon-nav-bookmark";
import { NavHomeIcon } from "@/components/icons/icon-nav-home";
import { NavMoviesIcon } from "@/components/icons/icon-nav-movies";
import { NavTvIcon } from "@/components/icons/icon-nav-tv-series";

export const routes = [
  {
    path: "/home",
    icon: NavHomeIcon,
  },
  {
    path: "/movies",
    icon: NavMoviesIcon,
  },
  {
    path: "/tv",
    icon: NavTvIcon,
  },
  {
    path: "/bookmark",
    icon: NavBookMarkIcon,
  },
];
