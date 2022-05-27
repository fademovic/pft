import React, { ChangeEvent, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Column } from 'react-table';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Table from 'components/Table';
import { useRoot } from 'context/RootContext';
import { SNACKBAR_TYPES } from 'utils/constants/common';
import { Row } from 'utils/types';
import { regexForSplitingCSVRow } from 'utils/helpers';

const DEFAULT_MEMBER_HEADER = 'member name';
const NEW_MEMBER_HEADER = 'name';
const AMOUNT_KEY = 'amount';
const CURRENCY = '€';

type DropdownType = {
  name: string;
  key: string;
};

const defaultDropdownValue: DropdownType = {
  name: 'Select all',
  key: 'all'
};

const Feed = () => {
  const [columns, setColumns] = useState<Array<Column>>([]);
  const [rows, setRows] = useState<Array<Row>>([]);
  const [filteredColumns, setFilteredColumns] = useState<Array<Column>>([]);
  const [filteredRows, setFilteredRows] = useState<Array<Row>>([]);
  const [dropdownItems, setDropdownItems] = useState<Array<DropdownType>>([]);
  const [filterValue, setFilterValue] = useState(defaultDropdownValue.key);
  const [totalAmount, setTotalAmount] = useState(0);
  const { showNotification } = useRoot();

  const fileReader = new FileReader();

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];

      fileReader.onload = function (event) {
        const csvOutput = event.target && event.target.result;
        if (csvOutput) {
          extractColumns(csvOutput.toString());
          extractRows(csvOutput.toString());
        }
      };

      fileReader.readAsText(file);
    }

    showNotification('Successfully uploaded file', SNACKBAR_TYPES.success);
  };

  const extractColumns = (csvText: string) => {
    const csvHeader = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const headersWithAccessor: Array<Column> = [];
    const extractedDropdownItems: Array<DropdownType> = [defaultDropdownValue];

    csvHeader.map((header) => {
      const trimmedHeader = header.trim().replace('_', ' ');
      const headerValue = trimmedHeader === DEFAULT_MEMBER_HEADER ? NEW_MEMBER_HEADER : trimmedHeader;

      const columnItem: Column = {
        Header: headerValue,
        accessor: header.trim()
      };

      // This part I don't like becase code repeats
      // The reason why I did this is because accessor type in Column would demand cast on multiple places
      // And also because of filtering, I always need all header names in dropdown
      const dropdownItem: DropdownType = {
        name: headerValue,
        key: header.trim()
      };

      headersWithAccessor.push(columnItem);

      if (dropdownItem.key !== AMOUNT_KEY) {
        extractedDropdownItems.push(dropdownItem);
      }
    });

    setColumns(headersWithAccessor);
    setDropdownItems(extractedDropdownItems);
  };

  const extractRows = (csvText: string) => {
    const csvRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    const rowsData: Array<Row> = [];
    let amount = 0;

    csvRows.map((row) => {
      // Solution from stack overflow, there is also a npm package for parsing csv but this can help for the task
      const rowValue = row.match(regexForSplitingCSVRow);

      // TODO: Map the data to avoid hardcoded indexes
      if (rowValue) {
        amount = amount + parseFloat(rowValue[2].slice(0, -1).replace(',', ''));

        rowsData.push({
          departments: rowValue[0],
          project_name: rowValue[1],
          amount: rowValue[2],
          date: rowValue[3],
          member_name: rowValue[4]
        });
      }
    });

    setTotalAmount(amount);
    setRows(rowsData);
  };

  const onFilterChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newRows: Array<Row> = [];
    const newColumns: Array<Column> = [
      {
        Header: AMOUNT_KEY,
        accessor: AMOUNT_KEY
      }
    ];

    columns.map((item) => {
      if (item.accessor === value) {
        newColumns.unshift({
          Header: item.Header,
          accessor: item.accessor
        });
      }

      item.accessor === value || item.accessor === AMOUNT_KEY;
    });

    rows.map((item) => {
      newRows.push({
        [value]: item[value as keyof Row],
        amount: item.amount
      });
    });

    setFilteredColumns(newColumns);
    setFilteredRows(newRows);
    setFilterValue(value);
  };

  // This is recommended from react-table documentation
  const memoizedRows = useMemo(() => rows, [rows]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const memoizedFilteredRows = useMemo(() => filteredRows, [filteredRows]);
  const memoizedFilteredColumns = useMemo(() => filteredColumns, [filteredColumns]);

  return (
    <div>
      <ImportContainer>
        <h1>CSV IMPORT </h1>
        <label htmlFor="contained-button-file">
          <FileInput accept=".csv" id="contained-button-file" type="file" onChange={onFileUpload} />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </ImportContainer>
      {memoizedRows.length > 0 && memoizedColumns.length > 0 && (
        <Content>
          <FilterWrapper>
            Total expenses by:
            <Select
              id="simple-select"
              value={filterValue}
              onChange={onFilterChange}
              sx={{ width: '200px', marginLeft: '20px', textTransform: 'capitalize' }}
            >
              {dropdownItems.map((item) => (
                <MenuItem key={item.key} value={item.key} sx={{ textTransform: 'capitalize' }}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FilterWrapper>
          <Table
            data={filterValue === defaultDropdownValue.key ? memoizedRows : memoizedFilteredRows}
            columns={filterValue === defaultDropdownValue.key ? memoizedColumns : memoizedFilteredColumns}
            total={totalAmount.toFixed(2).toLocaleString()}
            currency={CURRENCY}
            showTotal={filterValue !== defaultDropdownValue.key}
          />
        </Content>
      )}
    </div>
  );
};

const FileInput = styled.input`
  display: none;
`;

const ImportContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 24px;
`;

export default Feed;
