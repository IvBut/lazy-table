import React, {ReactElement, useEffect, useRef, useState} from 'react';
import '../../styles/components/table.scss';
import Column, {IColumn} from "./column";
import {ETableContentAliment, ITableProps} from "./types";




const Table: React.FC<ITableProps> = (props:ITableProps )=> {
  const {
    className,
    loadData,
    children,
    key = 'id',
    contentAliment = ETableContentAliment.CENTER
  } = props;

  const [rows, setRows] = useState<Array<any>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const hasMore = useRef(false);

  const observer = useRef<IntersectionObserver>();
  const lastRecordRef = React.useCallback((node: HTMLDivElement) => {
    if (loading) return;
    const rowIndex = node?.dataset?.rowIndex ? +(node.dataset.rowIndex) : 0;
    if (rowIndex === rows.length - 1) {
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore.current) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer?.current.observe(node)
    }
  },[loading, hasMore.current]);

  const columns = React.Children.toArray(children);
  const valueByPath = React.useCallback((obj: any, path: string) => () => {
    return path.split('.').reduce((object, key) => (object)[key], obj);
  },[columns]);

  useEffect(() => {
    load({perPage, currentPage});
  },[currentPage]);

  useEffect(() => {
    hasMore.current = currentPage * perPage < totalCount
  },[totalCount]);

  const load = async (params?: any) => {
    try {
      setLoading(true);
      const { data, total } = await loadData(params);
      setRows(prevRows => [...prevRows, ...data]);
      if (total) {
        setTotalCount(total);
        console.log(rows);
      }
    } catch (e) {
      console.log('Error ',e);
    } finally {
      setLoading(false);
    }

  };

  const cellClasses = React.useMemo(() => {
    const classes = ['table-cell'];
    const alimentMap = {
      [ETableContentAliment.CENTER] : 'aliment-center',
      [ETableContentAliment.RIGHT] : 'aliment-right',
      [ETableContentAliment.LEFT] : 'aliment-left'
    };
    classes.push(alimentMap[contentAliment]);
    return classes.join(' ');
  },[contentAliment]);

  const handleReset = () => {
    setRows([]);
    setCurrentPage(1);
  };

  return (
      <div className={`${className ? className : ''} table-wrapper`}>
        { loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
        <div><button onClick={handleReset}>Reset</button></div>
        <div className="table-header">
          {
            columns.map((columnRef: any, index: number) => {
              return (<div className={cellClasses} key={index}><span>{columnRef.props.header}</span></div>)
            })
          }
          <div style={{width: '17px'}}></div>
        </div>
        <div className="table-body">
          {
            rows.map((row, index) => {
              return (
                  <div ref={lastRecordRef} key={`${index}-${row[key]}`} data-row-index={index} className="table-row">
                    {
                      columns.map((columnRef: any, index: number) => {
                        const path = columnRef.props?.path;
                        const render = columnRef.props?.children;
                        return (
                            <div className={cellClasses} key={index}>
                              { path ? <span>{valueByPath(row, path)()}</span> : render ? render(row) : null}
                            </div>
                          )
                      })
                    }
                  </div>
              )
            })
          }
        </div>

      </div>
  );
};

export default Table;
