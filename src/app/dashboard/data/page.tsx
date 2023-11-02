'use client'

import * as React from "react";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useDemoData } from "@mui/x-data-grid-generator";
import { alpha, styled, Typography, useTheme } from "@mui/material";

const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => {

  return ({
  [`& .MuiDataGrid-toolbarContainer`]: {
    '& .MuiButton-text': {
      color: theme.palette.mode === 'dark' ? '#fff' : '#000'
    }
  },
  [`& .MuiDataGrid-columnHeaderTitle`]: {
      fontWeight: 900
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
})});

const Data = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 500,
    maxColumns: 15,
  });

  return (
    <>
      <Typography 
        variant='h2' 
        sx={{ 
          marginTop: 10, 
          paddingBottom: 4,
          fontWeight: 600
        }}
        >Data</Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Demo "commodities" data to be replaced when pulling data from an API.
      </Typography>
      <div style={{ height: "650px", width: "100%" }}>
        <StripedDataGrid
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolbar
          }}
          sx={{
            border: 0,
            borderColor: 'transparent'
          }}
          loading={!data}
          {...data}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
        />
      </div>
    </>
  );
};

export default Data;