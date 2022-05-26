import React from 'react';

import { Column } from 'react-table';
import Table from 'components/Table';

const Feed = () => {
  const data = [
    {
      col1: 'A',
      col2: '1'
    },
    {
      col1: 'B',
      col2: '2'
    },
    {
      col1: 'C',
      col2: '3'
    }
  ];

  const columns: Array<Column<{ col1: string; col2: string }>> = React.useMemo(
    () => [
      {
        Header: 'MOJ HEADER 1',
        accessor: 'col1' // accessor is the "key" in the data
      },
      {
        Header: 'MOJ HEADER 2',
        accessor: 'col2'
      }
    ],
    []
  );

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Feed;
