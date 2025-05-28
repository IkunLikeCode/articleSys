import React, { ElementType } from "react";
export interface IRouterItem {
  path: string;
  component: ElementType;
  children?: IRouterItem[];
  meta?: {
    title: string;
    isShow?: boolean;
    isSuperAdmin?: number;
  };
  name?: string;
  icon?: React.ReactNode;
}
