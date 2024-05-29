"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TransactionsTable() {
  const StyledHeaderName = styled(Typography)({
    fontSize: "22px",
    fontWeight: "800",
    lineHeight: "32px",
    fontStyle: "normal",
    color: "var(--Colors-Black, #18191F)",
    opacity: "0.7",
  });

  const StyledTableHead = styled(Typography)({
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
    fontStyle: "normal",
    color: "var(--Colors-Black-800, #474A57)",
  });

  const StyledTableCell = styled(Typography)({
    fontSize: "10px",
    fontWeight: "500",
    lineHeight: "24px",
    fontStyle: "normal",
    color: "var(--Colors-Black-800, #474A57)",
    opacity: 0.6,
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledHeaderName sx={{ mb: "12px" }}>Transactions</StyledHeaderName>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "none",
                  "&.MuiTableCell-root": {
                    padding: 0,
                  },
                }}
                align="left"
              >
                <StyledTableHead>Name:</StyledTableHead>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  "&.MuiTableCell-root": {
                    padding: 0,
                  },
                }}
                align="left"
              >
                <StyledTableHead>Action:</StyledTableHead>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  "&.MuiTableCell-root": {
                    padding: 0,
                  },
                }}
                align="left"
              >
                <StyledTableHead>Gas:</StyledTableHead>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{ p: 0, borderBottom: "1px solid black" }}
                align="left"
              >
                <StyledTableCell>Start</StyledTableCell>
              </TableCell>
              <TableCell
                sx={{ p: 0, borderBottom: "1px solid black" }}
                align="left"
              >
                <StyledTableCell>add_player</StyledTableCell>
              </TableCell>
              <TableCell
                sx={{ p: 0, borderBottom: "1px solid black" }}
                align="left"
              >
                <StyledTableCell>1234</StyledTableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
