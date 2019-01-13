import React, { Component } from "react";

// Styles:
import "./styles.scss";

class Event extends Component {
  state = {
    error: false
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Event">
        <h3 className="text-center text-primary">Event</h3>
      </div>
    );
  }
}

export default Event;
