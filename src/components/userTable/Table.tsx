import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import CreateUserModal from "./form";
import { ListUsers, fetchRoles } from "../../service/adminservice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IRoles {
  _id: string;
  name: string;
}

interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: IRoles;
  password: string;
}

export default function CustomizedTables() {
  // const roles = ['Admin', 'User', 'Guest'];
  const [openModal, setOpenModal] = React.useState(false);

  const [roleData, setRoleData] = React.useState<IRoles[]>([]);
  const [userDatas, setUserDatas] = React.useState<IUsers[]>([]);
  const [editDta, setEdit] = React.useState<IUsers>();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchRoles("/roles"); 
        setRoleData(result.roles);
        console.log(result.roles);
      } catch (error: any) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, [openModal]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ListUsers("/users");
        if (response) {
          console.log(response);
          setUserDatas(response.users);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [openModal]);

  const handleEditUser = (userData: IUsers) => {
    setEdit(userData);
    handleOpenModal();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          minWidth: 1000,
          padding: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{ backgroundColor: "black" }}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDatas.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user?.name}
                </StyledTableCell>
                <StyledTableCell>{user?.email}</StyledTableCell>
                <StyledTableCell>{user?.role?.name}</StyledTableCell>
                <Button
                  sx={{ marginTop: "3px" }}
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUserModal
        open={openModal}
        onClose={handleCloseModal}
        roles={roleData}
        isEdit={editDta}
      />
    </>
  );
}
