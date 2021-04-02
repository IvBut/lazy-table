import React from 'react';

export interface IColumn {
  path?: string,
  header: string,
  width?: string,
  render?: (params?: any) => void
}

const Column:React.FC<IColumn> = () => {

  return (
      <>
      </>
  );
};

export default Column;
