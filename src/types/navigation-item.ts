export type NavigationItem = {
  name: string;
  href: string;
  type: string;
  subItems?: SubItems[];
};

export type SubItems = {
  title: string;
  icon?: any;
  href: string;
  description: string;
};
