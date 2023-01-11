import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { ReactElement, useEffect, useState } from 'react';

import dummyData from '../../../dummyData.json';
import { getMonthName } from './UserDashboardView';

const useStyles = makeStyles(() => ({
  dashboardWrapper: {
    width: '100%',
  },
}));

export const UserHistoryView = (): ReactElement => {
  const classes = useStyles();
  const [userHistory, setUserHistory] = useState<RewardHistory[]>([]);

  useEffect(() => {
    async function fetchData() {
      const historyData = dummyData.HISTORY_DATA;
      historyData.sort(function (a, b) {
        if (a.year - b.year != 0) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
      setUserHistory(historyData);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.dashboardWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>CO2 Saved</TableCell>
              <TableCell>Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userHistory.map((row) => (
              <TableRow key={`${row.year}-${row.month}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell>{`${getMonthName(row.month)}`}</TableCell>
                <TableCell>{row.co2_saved}</TableCell>
                <TableCell>{row.reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
