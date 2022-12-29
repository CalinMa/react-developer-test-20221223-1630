import React, {useState} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import Moment from 'moment';
import makeStyles from "@material-ui/core/styles/makeStyles";

const formatDates = (timeStamp) => {
    const date = new Date(timeStamp);
    return Moment(date).format('YYYY-MM-DD')
}
const useStyles = makeStyles({
    table: {
        minWidth: 850,
        "& .MuiTableCell-head": {
            fontWeight: 700
        }
    }
});

function UsersList({data, sortUsersList}) {
    const classes = useStyles();
    const [sortDirection, setSortDirection] = useState('desc');

    const sortData = async () => {

        if (sortDirection === 'desc') {
            await setSortDirection('asc')
            sortUsersList('asc')

        } else {
           await setSortDirection('desc')
            sortUsersList('desc')

        }
    }
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow className={classes.table}>
                    <TableCell variant={'head'} >
                        <TableSortLabel active={true} direction={sortDirection} onClick={sortData}/>Date</TableCell>
                    <TableCell >User ID</TableCell>
                    <TableCell>Old value</TableCell>
                    <TableCell>New value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data !== null && data.map((row) => (
                        <TableRow
                        key={row.id}
                        >
                        <TableCell component="th" scope="row">
                            {formatDates(row.timestamp)}
                        </TableCell>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.diff[0].oldValue}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.diff[0].newValue}
                            </TableCell>
                        </TableRow>
                    ))

                }
            </TableBody>
        </Table>
        </TableContainer>
    )
}
export default  UsersList;
