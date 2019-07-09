import React from "react";
import moment from "moment";

const UserListItem = props => {
  function isEven(n) {
    return n === parseFloat(n) ? !(n % 2) : void 0;
  }
  return (
    <div className={`userList ${isEven(props.evenOdd) ? null : "bg-gray-200"}`}>
      <div className="container p-2">
        <div className="row">
          <div className="col-md-3 col-9 mt-2">
            <p className="allUserName">{props.name}</p>
            <p className="timestamp">
              {moment(props.updated).format("MM/DD/YY, h:mm:ss a")}
            </p>
          </div>
          <div className="col-md-2 col-1 mt-2">
            <p className={`text-center ${props.status}`}>{props.status}</p>
          </div>
          <div className="col-md-7 mt-2">
            {props.notes !== "" ? <p className="note">{props.notes}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
