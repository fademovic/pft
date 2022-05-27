import React, { ChangeEvent, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Column } from 'react-table';
import { Button } from '@mui/material';

import Table from 'components/Table';
import { useRoot } from 'context/RootContext';
import { SNACKBAR_TYPES } from 'utils/constants/common';
import { Row } from 'utils/types';
import { regexForSplitingCSVRow } from 'utils/helpers';

const Feed = () => {
  const [columns, setColumns] = useState<Array<Column>>([]);
  const [rows, setRows] = useState<Array<Row>>([]);
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

    csvHeader.map((header) => {
      const columnItem: Column = {
        Header: header.trim(),
        accessor: header.trim()
      };

      headersWithAccessor.push(columnItem);
    });

    setColumns(headersWithAccessor);
  };

  const extractRows = (csvText: string) => {
    const csvRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    const rowsData: Array<Row> = [];

    csvRows.map((i) => {
      // Solution from stack overflow, there is also a npm package for parsing csv but this can help for the task
      const values = i.match(regexForSplitingCSVRow);

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
      <Table data={memoizedRows} columns={memoizedColumns} />
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

export default Feed;
