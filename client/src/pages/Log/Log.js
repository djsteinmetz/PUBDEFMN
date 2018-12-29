import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";

class Log extends Component {
  state = {
    status: {}
  };

  // When this component mounts, grab the vehicle with the _id of this.props.match.params.id
  // e.g. localhost:3000/vehicle/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getStatus(this.props.match.params.id)
      .then(res => this.setState({ status: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <div className="box rounded">
          {this.state.status.status}
        </div>
      </Container>
    )
  }
}

export default Log;
