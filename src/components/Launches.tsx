import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import spacex from '../api/spacex';
import { ILaunches } from '../interfaces/Launches';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;

  background-color: #fff;
  border-radius: 4px;
  outline: none;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const Patch = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const Description = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin-bottom: 10px;
`;

const Launches = () => {
  const [launches, setLaunches] = React.useState<ILaunches[]>([]);
  const [selectedLaunch, setSelectedLaunch] = React.useState<ILaunches | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const toggleModal = (value: string) => {
    setOpen(!open);
    setSelectedLaunch(launches.find((launch) => launch.id === value));
  };

  const columns: GridColDef[] = [
    {
      field: 'flight_number',
      headerName: 'Flight Number',
      width: 140,
      renderCell: (params) => (
        <>
          <RocketLaunchOutlinedIcon style={{ marginRight: 15 }} />
          {params.value}
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Mission Name',
      width: 200,
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 750,
    },
    {
      field: 'date_utc',
      headerName: 'Launch Date',
      width: 200,
      valueFormatter: (params) => new Date(params.value as string).toLocaleDateString(),
    },
    {
      field: 'success',
      headerName: 'Successfull',
      width: 100,
      renderCell: (params) =>
        params.value ? <CheckIcon color="success" /> : <ClearIcon color="error" />,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Details',
      width: 100,
      field: 'id',
      renderCell: (params) => (
        <InfoOutlinedIcon
          onClick={() => {
            toggleModal(params.value);
          }}
        />
      ),
      align: 'center',
      headerAlign: 'center',
    },
  ];

  useEffect(() => {
    spacex.get('/v5/launches').then((response) => {
      setLaunches(response.data);
    });
  }, []);

  // @ts-ignore
  return (
    <>
      <DataGrid
        rows={launches}
        columns={columns}
        rowsPerPageOptions={[5]}
        autoHeight
        pageSize={15}
      />
      <Modal open={open} onClose={toggleModal}>
        <ModalContainer>
          {selectedLaunch ? (
            <div className="modal">
              <Row>
                <Patch src={selectedLaunch.links.patch.small} />
                <Title>{selectedLaunch.name}</Title>
              </Row>
              <Description>{selectedLaunch.details}</Description>
              <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                  {selectedLaunch.links.flickr.original.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        src={`${item}?w=248&fit=crop&auto=format`}
                        srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <iframe
                  height="350"
                  src={`https://www.youtube.com/embed/${selectedLaunch.links.youtube_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    margin: '20px auto',
                    display: 'block',
                    aspectRatio: '16 / 9',
                  }}
                />
              </Box>
            </div>
          ) : (
            <div />
          )}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default Launches;
