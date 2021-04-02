import React from "react";

export enum ETableContentAliment {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}


export interface ITableProps {
  loadData: (params?: any) => Promise<any>,
  className?: string,
  key?: string,
  contentAliment?: ETableContentAliment,
  children?: React.ReactNode;
}
