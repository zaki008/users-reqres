"use client";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import { getUsers, updateData } from "@/redux/slice/userSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [paginationModel] = useState({
    page: data.page - 1 || 0,
    pageSize: data.per_page || 10,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getUsers(data));
  }, [data.page, data.per_page]);

  const handlePaginationModelChange = (newModel) => {
    dispatch(
      updateData({ page: newModel.page + 1, per_page: newModel.pageSize })
    );
  };

  const handleLogout = () => {
    Cookies.remove("tokenLogin");
    router.push("/auth/login");
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return (
          <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ marginTop: 10 }}
              width={50}
              height={50}
              src={params?.row?.avatar}
              alt="image"
            />
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return (
          <Typography sx={{ fontWeight: "bold" }}>
            {params.colDef.headerName}
          </Typography>
        );
      },
    },
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return (
          <Typography sx={{ fontWeight: "bold" }}>
            {params.colDef.headerName}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return (
          <Typography sx={{ fontWeight: "bold" }}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => router.push(`user/${params?.row?.id}`)}
              sx={{ marginRight: 1 }}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log({ paginationModel });

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Grid2 container justifyContent={"center"}>
          <Grid2 size={12} marginTop={3}>
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <Typography variant="h4">List Users</Typography>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Grid2>
          <Grid2 size={12} sx={{ justifyContent: "center", display: "flex" }}>
            <Paper
              sx={{
                maxHeight: 500,
                width: { xs: "100%", md: "100%", lg: "100%" },
              }}
            >
              <DataGrid
                loading={isLoading ? true : false}
                rows={data.data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20, 30]}
                sx={{ border: "1px solid #d4d4d4" }}
                onPaginationModelChange={handlePaginationModelChange}
                getRowId={(row) => row.id}
                rowCount={data.total}
                paginationMode="server"
                rowHeight={80}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Home;
