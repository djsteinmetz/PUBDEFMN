import React from 'react';
import moment from 'moment';

const UserListItem = props => {
    function isEven(n) {
        console.log(n)
        return n === parseFloat(n)? !(n%2) : void 0;
    }      
    return (
        <div className={`userList ${isEven(props.evenOdd) ? null : 'odd'}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <p>{props.name}</p>
                        <p className="timestamp">{moment(props.updated).format("MM/DD/YY, h:mm:ss a")}</p>
                    </div>
                    <div className="col-md-2">
                        <p className={`text-center ${props.status}`}>{props.status}</p>
                    </div>
                    <div className="col-md-7">
                        {props.notes !== "" ? <p>{props.notes}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserListItem;