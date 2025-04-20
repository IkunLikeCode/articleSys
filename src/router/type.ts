import React from "react";
export interface IRouterItem{
    path:string,
    component?:React.FC |Element | null,
    children?:IRouterItem[],
    meta?:{
        title:string,
        isShow?:boolean
    },
    name?:string,
    icon?:React.ReactNode
}