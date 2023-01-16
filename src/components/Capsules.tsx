import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ICapsules } from '../interfaces/Capsules';
import spacex from '../api/spacex';

const columns: GridColDef[] = [
  { field: 'serial', headerName: 'Serial', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
  },
  {
    field: 'water_landings',
    headerName: 'Water Landings',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'land_landings',
    headerName: 'Land Landings',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'last_update',
    headerName: 'Last Update',
    width: 700,
  },
  {
    field: 'reuse_count',
    headerName: 'Reuse Count',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
];
const Launches = () => {
  const [capsules, setCapsules] = React.useState<ICapsules[]>([]);

  useEffect(() => {
    spacex.get('/v4/capsules').then((response) => {
      setCapsules(response.data);
    });
  }, []);

  return (
    <DataGrid rows={capsules} columns={columns} rowsPerPageOptions={[5]} autoHeight pageSize={15} />
  );
};

export default Launches;
