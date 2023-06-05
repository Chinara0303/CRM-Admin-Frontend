import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {NavLink } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'capacity',
    headerName: 'Capacity',
    type: 'number',
    width: 90,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  { id: 1, name: 'Snow',  capacity: 35 },
  
];

export default function Room() {
  return (
    <div className='room-area' style={{ height: 400, width: '100%' }}>
    <NavLink to='./create'>Create</NavLink>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}