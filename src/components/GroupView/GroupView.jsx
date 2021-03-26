import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './GroupView.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';


//  This page is for officers and admins to view users by aflliliation
function GroupView() {

    //Styling for material tables
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const params = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    const orgName = useSelector((store) => store.affiliate);

    useEffect(() => {
        dispatch({ type: 'FETCH_AFFILIATE_USER', payload: params.id });
        dispatch({ type: 'GET_AFFILIATION', payload: params.id });
    }, []);

    //  Clicking on a volunteer will history/push you to their user page.
    const goToUser = (user) => {
        console.log(`You want to view details for person with id of ${user}`)
        history.push(`/userdetails/${user}`)
    };

    //  Click to remove a volunteer from that affiliation.    
    const removeUser = () => {

    };


    return (
        <>
            {store.affiliate[0] &&
                <h1>{store.affiliate[0].college_name}</h1>
            }
            <Table id="groupView" className="groupViewContainer">
                <TableHead>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell align="center" colSpan="2">Actions</StyledTableCell>
                </TableHead>
                {(store.affiliateUser[0]) && store.affiliateUser.map((affiliates) =>
                    <TableBody>
                        <StyledTableRow key={affiliates.id}>
                            <StyledTableCell>{affiliates.last_name}</StyledTableCell>
                            <StyledTableCell>{affiliates.first_name}</StyledTableCell>
                            <StyledTableCell>{affiliates.email}</StyledTableCell>
                            <StyledTableCell>{affiliates.phone_number}</StyledTableCell>
                            <StyledTableCell align="center"><button onClick={() => goToUser(affiliates.id)}>View</button></StyledTableCell>
                            <StyledTableCell align="center"><button onClick={() => dispatch({ type: 'REMOVE_USER_GROUP', payload: { user_id: affiliates.id, group_id: affiliates.group_id, parameter: params.id } })}>Remove</button></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                )}
            </Table>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="groupView"
                filename="Group Members"
                sheet="GroupMembers.xls"
                buttonText="Download Group Members" />
        </>
    );
}

export default GroupView;