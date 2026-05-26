import { Box, Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/team")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/team/${id}`, {
      method: "DELETE",
    });

    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "access",
      headerName: "Access Level",
      flex: 1,

      renderCell: ({ row: { access } }) => {
        return (
          <Box
            className="w-[60%] mx-auto my-[8px] p-[5px] flex justify-center  rounded-[4px]"
            style={{
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700],
            }}
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}

            <Typography
              style={{ color: colors.grey[100] }}
              className="ml-[5px]"
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,

      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <div
        className="m-[20px] w-full overflow-hidden"
      >
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            height: "75vh",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={teamMembers}
            columns={columns}
            className="custom-data-grid"
          />
        </Box>
      </div>
    </>
  );
};

export default Team;
