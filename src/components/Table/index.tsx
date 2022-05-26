import React from 'react';
import styled from 'styled-components';

import { Column, useSortBy, useTable } from 'react-table';

type Props = {
  data: Array<{ col1: string; col2: string }>;
  columns: Array<Column<{ col1: string; col2: string }>>;
};

const Table = ({ data, columns }: Props) => {
  const tableInstance = useTable({ data, columns }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, headerGroupsIndex) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupsIndex}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, headersIndex) => (
                    // Apply the header cell props
                    // Add the sorting props to control sorting.
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={headersIndex}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row, rowsIndex) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} key={rowsIndex}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, cellIndex) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} key={cellIndex}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default Table;
