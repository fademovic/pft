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

export type Row = {
  departments: string;
  project_name: string;
  amount: string;
  date: string;
  member_name: string;
};
