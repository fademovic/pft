export type Notification = {
  message: string;
  type: string;
};

export type UserInfo = {
  name: string;
};

export type RouteType = {
  path: string;
  Component: () => JSX.Element;
};
