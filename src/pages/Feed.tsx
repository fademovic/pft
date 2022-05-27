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
  const [dropdownItems, setDropdownItems] = useState<Array<DropdownType>>([]);
  const [filter, setFilter] = useState('');
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
      const dropdownItem: DropdownType = {
        name: headerValue,
        key: header.trim()
      };

      headersWithAccessor.push(columnItem);
      extractedDropdownItems.push(dropdownItem);
    });

    setColumns(headersWithAccessor);
    setDropdownItems(extractedDropdownItems);
  };

  const extractRows = (csvText: string) => {
    const csvRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    const rowsData: Array<Row> = [];

    csvRows.map((row) => {
      // Solution from stack overflow, there is also a npm package for parsing csv but this can help for the task
      const values = row.match(regexForSplitingCSVRow);

      // TODO: Map the data to avoid hardcoded indexes
      if (values) {
        rowsData.push({
          departments: values[0],
          project_name: values[1],
          amount: values[2],
          date: values[3],
          member_name: values[4]
        });
      }
    });

    setRows(rowsData);
  };

  const onFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  // This is recommended from react-table documentation
  const memoizedRows = useMemo(() => rows, [rows]);
  const memoizedColumns = useMemo(() => columns, [columns]);

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
            <Select id="simple-select" value={filter} onChange={onFilterChange} sx={{ width: '200px', marginLeft: '20px' }}>
              {dropdownItems.map((item) => (
                <MenuItem key={item.key} value={item.key} sx={{ textTransform: 'capitalize' }}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FilterWrapper>
          <Table data={memoizedRows} columns={memoizedColumns} />
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
