import { NavBookMarkIcon } from '@/components/common/icons/icon-nav-bookmark';
import { NavHomeIcon } from '@/components/common/icons/icon-nav-home';
import { NavMoviesIcon } from '@/components/common/icons/icon-nav-movies';
import { NavTvIcon } from '@/components/common/icons/icon-nav-tv-series';

export const routes = [
  {
    path: '/home',
    icon: NavHomeIcon,
  },
  {
    path: '/movies',
    icon: NavMoviesIcon,
  },
  {
    path: '/tv',
    icon: NavTvIcon,
  },
  {
    path: '/favorites',
    icon: NavBookMarkIcon,
  },
];
