import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './GroupView.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


//  This page is for officers and admins to view users by aflliliation
function GroupView() {

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
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="groupView"
                filename="Group Members"
                sheet="GroupMembers.xls"
                buttonText="Download Group Members" />
            <table id="groupView" className="groupViewContainer">
                <thead>
                    <tr>
                        <th>Last Name</th><th>First Name</th><th>Email</th><th>Phone Number</th><th>Placeholder</th><th colSpan="2">Actions</th>
                    </tr>
                </thead>
                {(store.affiliateUser[0]) && store.affiliateUser.map((affiliates) =>
                    <tbody>
                        <tr key={affiliates.id}>
                            <td>{affiliates.last_name}</td>
                            <td>{affiliates.first_name}</td>
                            <td>{affiliates.email}</td>
                            <td>{affiliates.phone_number}</td>
                            <td>placeholder</td>
                            <td><button onClick={() => goToUser(affiliates.id)}>View</button></td>
                            <td><button onClick={() => removeUser(affiliates.id)}>Remove</button></td>
                        </tr>
                    </tbody>
                )}
            </table>
        </>
    );
}

export default GroupView;