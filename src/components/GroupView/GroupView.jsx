import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './GroupView.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container, Grid, Paper, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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


//  This page is for officers and admins to view users by aflliliation
//  They can also creat new affiliations here.
function GroupView() {


    const [open, setOpen] = React.useState(false);
    const [userOpen, setUserOpen] = React.useState(false);
    const [group, setGroup] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [search, setSearch] = useState("")

    const goToDetails = (eventId) => {
        //TODO: this route may need to be updated 
        history.push(`/details/${eventId}`)
    }

    const goToGroup = (groupId) => {
        //TODO: this route may need to be updated 
        history.push(`/group_view/${groupId}`)
    }
    const params = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    const orgName = useSelector((store) => store.affiliate);

    useEffect(() => {
        if (params.id === undefined) {
            dispatch({ type: 'FETCH_AFFILIATE', payload: search });
            dispatch({ type: 'FETCH_ALL_USER_EVENT' });
            dispatch({ type: 'FETCH_ALL_USER_EVENT' });
            dispatch({ type: 'FETCH_USER_GROUP' });
            console.log(search)
        } else {
            dispatch({ type: 'GET_AFFILIATION', payload: params.id });
            dispatch({ type: 'FETCH_AFFILIATE_USER', payload: params.id });

        }
    }, [search]);

    const memberCount = (groupId) => {
        let count = 0;
        for (let item of store.userGroup) {
            if (groupId === item.group_id) {
                count++;
            }
        }
        return count;
    }


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
        return phoneNumb;
    }


    function handleSubmit() {
        console.log(group);
        dispatch({ type: 'ADD_AFFILIATION', payload: { name: group } });
        setGroup("");
        dispatch({ type: 'FETCH_AFFILIATE' });
    }

    const restoreGroup = () => {
        dispatch({ type: 'RESTORE_GROUP', payload: params.id })
        console.log(params.id);
        history.push('/events');
    };

    return (
        <>
            <h1 className="header">Group View</h1>
            <Container>
                {store.affiliate.length === 1 ?
                    <>
                        <h1>{store.affiliate[0].college_name}</h1>
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => history.push("/group_view")}>
                                All Groups
                            </Button>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{`Are you sure you want to delete ${store.affiliate[0].college_name} ?`}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        If you do they will be set to "archived" and only Admins will be able to retrive them.
                        </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose} variant="contained" style={{ color: "white", backgroundColor: "#FF0000" }}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose, removeGroup} variant="contained" color="primary" autoFocus>
                                        Delete Group
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <br></br>
                        <TableContainer component={Paper}>
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
                                            <StyledTableCell align="center"><Button variant="contained" onClick={() => goToUser(affiliates.id)}>View User</Button></StyledTableCell>
                                            {/* <StyledTableCell align="center"><button onClick={() => dispatch({ type: 'REMOVE_USER_GROUP', payload: { user_id: affiliates.id, group_id: affiliates.group_id, parameter: params.id } })}>Remove</button></StyledTableCell> */}
                                            <StyledTableCell>
                                                <Button variant="contained" style={{ backgroundColor: "#FF0000", color: "white" }} onClick={handleClickOpener}>
                                                    Remove From Group
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
                                                            Are you sure you want to remove this user from this affiliation?  If you do they will have to edit their user information before they can rejoin.
                                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={handleCloser} color="primary">
                                                            Disagree and Cancel
                                                        </Button>
                                                        <Button onClick={() => removeUser(affiliates.id, affiliates.group_id)} color="primary" autoFocus>
                                                            Agree and Remove User
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br></br>
                        <br></br>
                        <Button variant="contained" style={{ backgroundColor: "#FF0000", color: "white" }} onClick={() => handleClickOpen()}>
                            Archive Group
                        </Button> &nbsp; &nbsp;
                        <Button
                            component={ReactHTMLTableToExcel}
                            variant="contained"
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="groupView"
                            filename="Group Members"
                            sheet="GroupMembers.xls"
                            buttonText="Download Group Members" ></Button>
                    </>
                    :
                    <>
                        {/* {store.affiliate[0] &&  */}
                        <div className="groupListContainer">
                            <TextField label="Search Groups" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <TableContainer component={Paper}>
                                <Table id="SO College Members">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Active Groups</StyledTableCell>
                                            <StyledTableCell>Total Members</StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(store.affiliate[0]) && store.affiliate.map((affiliate) =>
                                            <StyledTableRow key={affiliate.id}>
                                                <StyledTableCell>{affiliate.college_name}</StyledTableCell>
                                                <StyledTableCell>{(store.userGroup[0]) && memberCount(affiliate.id)}</StyledTableCell>
                                                <StyledTableCell><Button variant="contained" color="default" onClick={() => goToGroup(affiliate.id)}>View</Button></StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br></br>
                            <TextField label="Search Groups" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <TableContainer component={Paper}>
                                <Table id="SO College Members">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Archived Groups</StyledTableCell>
                                            <StyledTableCell>Total Members</StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(store.affiliate[0]) && store.affiliate.map((affiliate) =>
                                            <StyledTableRow key={affiliate.id}>
                                                <StyledTableCell>{affiliate.college_name}</StyledTableCell>
                                                <StyledTableCell>{(store.userGroup[0]) && memberCount(affiliate.id)}</StyledTableCell>
                                                <StyledTableCell><Button variant="contained" color="default" onClick={() => goToGroup(affiliate.id)}>View</Button></StyledTableCell>
                                                <StyledTableCell><Button variant="contained" color="default" onClick={() => restoreGroup(affiliate.id)}>Unarchive</Button></StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            <TableContainer component={Paper}>
                                <Table id="addNewGroup">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell colSpan="3">Add a New Group</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                <input
                                                    value={group}
                                                    type="text"
                                                    placeholder="Input New Group Name"
                                                    onChange={(e) => setGroup(e.target.value)}>
                                                </input>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={handleSubmit}>
                                                    Add Group to List
                                        </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </>}
            </Container></>
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
