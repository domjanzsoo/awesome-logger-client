import React, {useState, useEffect} from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components'
import axios from 'axios';

const Styles = styled.div`
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

const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


const JobLogs = () => {
  const [tableData, setTableData] = useState([]);

  const getLogs = async () => {
    await axios.get(process.env.REACT_APP_API_URL + '/jobs').then(data => {
      console.log('the data');
      console.log(data.data);

      setTableData(data.data);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    if(tableData.length === 0)
      getLogs();
  }, []);

  const columns = React.useMemo(
    () => [
          {
            Header: 'Id',
            accessor: 'id'
          },
          {
            Header: 'Summary',
            accessor: 'summary'
          },
          {
            Header: 'Description',
            accessor: 'description'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            Header: 'Property',
            accessor: 'property.name'
          }
        ]
  );

  return (
    <Styles>
      <Table columns={columns} data={tableData} />
    </Styles>
  )
}


export default JobLogs;
