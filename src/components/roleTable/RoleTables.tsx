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
import CreateRoleModal from "./Form";
import { ListUsers, fetchRoles } from "../../service/adminservice";
import { ToastContainer, toast } from "react-toastify";

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
  
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IRoles {
  _id: string;
  name: string;
  description: string;
}

export default function RoleTables() {
  const [openModal, setOpenModal] = React.useState(false);

  const [roleData, setRoleData] = React.useState<IRoles[]>([]);

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
      } catch (error: any) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, [openModal]);

  return (
    <>
      <ToastContainer />

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
          Add Role
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Role Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleData.map((role, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {role.name}
                </StyledTableCell>
                <StyledTableCell>{role.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateRoleModal open={openModal} onClose={handleCloseModal} />
    </>
  );
}
