import React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Home() {
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  let histroy= useHistory();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <div align="center">
          <Button variant="contained" color="secondary" onClick={()=> histroy.push("/addUser")}>
            Add User
          </Button>
        </div>
        <Table
          sx={{ minWidth: 900, marginTop: 7 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={() => handleDelete(user.id)}
                      style={{ marginRight: "2px" }}
                      color="primary"
                    >
                      Delete
                    </Button>
                    <Button style={{ marginLeft: "2px" }} color="secondary"
                    onClick={()=>histroy.push(`/editUser/${user.id}`)}
                    >
                      Edit
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
