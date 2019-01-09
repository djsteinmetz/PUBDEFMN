import React, { Component } from 'react';

export class YourStatus extends Component {
    state = {
        isExpanded: false,
        socket: this.props.socket
    }
    toggle = () => {
        console.log('toggle')
        this.setState({isExpanded: !this.state.isExpanded});
    }
    changeStatus = (e) => {
        this.toggle();
        this.props.handleStatusChange;
        this.state.socket.emit('user-update', {
            uid: this.props.uid,
            status: e.target.id,
            // notes: this.state.notes,
            getUsers: this.props.getAllUsers
        });
    }
    render() {
        return (
            <React.Fragment>
                {this.state.isExpanded ? <p>Change your status</p> : <p className={`text-center currentStatus ${this.props.status}`} onClick={this.toggle}>{this.props.status}</p>}
                {this.state.isExpanded ? (
                    <div style={{display: 'flex', float: 'left', marginLeft: '-5px'}}>
                        <p className={`text-center currentStatus In changeStatus`} data-name="status" id="In" onClick={this.changeStatus}>In</p>
                        <p className={`text-center currentStatus Out changeStatus`} data-name="status" id="Out" onClick={this.changeStatus}>Out</p>
                        <p className={`text-center currentStatus Court changeStatus`} data-name="status" id="Court" onClick={this.changeStatus}>Court</p>
                        <p className={`text-center currentStatus LEC changeStatus`} data-name="status" id="LEC" onClick={this.changeStatus}>LEC</p>
                        <p className={`text-center currentStatus In changeStatus`} data-name="status" id="In" onClick={this.changeStatus}>In</p>
                    </div>
                 ) : null}
            </React.Fragment>
        )
    }
}