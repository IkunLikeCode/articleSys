import type { ReqeustStateSolid } from "../../../../types/commonType";

export interface TypeItem {
  _id: string;
  typeName: string;
}

export interface TypeStates {
  typeList: ReqeustStateSolid<TypeItem[]>;
}
