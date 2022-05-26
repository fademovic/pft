import { paths } from 'utils/constants/common';

import Feed from 'pages/Feed';

export const anonymousRoutes = {
  ROOT: {
    path: paths.ROOT,
    Component: Feed
  }
};

export const authorizedRoutes = {
  ROOT: {
    path: paths.ROOT,
    Component: Feed
  }
};
