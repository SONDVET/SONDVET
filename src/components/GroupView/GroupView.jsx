import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './GroupView.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';


//  This page is for officers and admins to view users by aflliliation
function GroupView() {


    const [open, setOpen] = React.useState(false);
    const [userOpen, setUserOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


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
    const removeUser = (user_id, group_id) => {
        dispatch({
            type: 'REMOVE_USER_GROUP', 
            payload: { 
                user_id: user_id,
                group_id: group_id, 
                parameter: params.id 
            }
        })
        handleCloser()
    };

    // //  Click to remove an entire group/affiliation
    const removeGroup = () => {
        dispatch({ type: 'REMOVE_GROUP', payload: params.id });
        console.log(params.id);
        history.push('/events');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpener = () => {
        setUserOpen(true);
    };
    const handleCloser = () => {
        setUserOpen(false);
    };

    const phoneFormater = (phoneNumb) => {
        let format = ('' + phoneNumb).replace(/\D/g, '');
        let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ')' + match[2] + '-' + match[3];
        }
        return null;
    }


    return (
        <>
            {store.affiliate[0] &&
                <h1>{store.affiliate[0].college_name}</h1>
            }
            <div>
                <Button variant="outlined" color="primary" onClick={() => handleClickOpen()}>
                    Delete Group
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this group?  If you do they will be set to "archived" and only Admins will be able to retrive them.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Disagree and Cancel
                        </Button>
                        <Button onClick={handleClose, removeGroup} color="primary" autoFocus>
                            Agree and Delete Group
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>            
            <Table id="groupView" className="groupViewContainer">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell align="center" colSpan="2">Actions</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(store.affiliateUser[0]) && store.affiliateUser.map((affiliates) =>
                    
                        <StyledTableRow key={affiliates.id}>
                            <StyledTableCell>{affiliates.last_name}</StyledTableCell>
                            <StyledTableCell>{affiliates.first_name}</StyledTableCell>
                            <StyledTableCell>{affiliates.email}</StyledTableCell>
                            <StyledTableCell>{phoneFormater(affiliates.phone_number)}</StyledTableCell>
                            <StyledTableCell align="center"><button onClick={() => goToUser(affiliates.id)}>View</button></StyledTableCell>
                            {/* <StyledTableCell align="center"><button onClick={() => dispatch({ type: 'REMOVE_USER_GROUP', payload: { user_id: affiliates.id, group_id: affiliates.group_id, parameter: params.id } })}>Remove</button></StyledTableCell> */}
                            <StyledTableCell>
                                <Button variant="outlined" color="primary" onClick={handleClickOpener}>
                                    Remove User
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={userOpen}
                                    onClose={handleCloser}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Are you sure?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Are you sure you want to remove this user from this affiliation?  If you do they will can edit their user information to rejoin.
                                         </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleCloser} color="primary">
                                            Disagree and Cancel
                                        </Button>
                                        <Button onClick={ () => removeUser(affiliates.id, affiliates.group_id)} color="primary" autoFocus>
                                            Agree and Remove User
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </StyledTableCell>
                        </StyledTableRow>
                    
                )}
                </TableBody>
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



{/* <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete Group
      </Button>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this group?  If you do they will be set to "archived" and only Admins will be able to retrive them.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Disagree and Cancel
          </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Agree and Delete Group
          </Button>
        </DialogActions>
    </Dialog>
</div> */}

//            <button onClick={() => removeGroup()}>Delete Group</button>
