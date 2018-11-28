import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { deleteEvent } from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

class EventDashboard extends Component {
  // state = {
  //   isOpen: false,
  //   selectedEvent: null
  // };

  // this.handleFormOpen = this.handleFormOpen.bind(this);
  // this.handleCancel = this.handleCancel.bind(this);

  // handleFormOpen = () => {
  //   this.setState({
  //     selectedEvent: null,
  //     isOpen: true
  //   });
  // };

  // handleCancel = () => {
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  // handleUpdateEvent = (updatedEvent) => {
  //   this.props.updateEvent(updatedEvent);
  //   this.setState({
  //     isOpen: false,
  //     selectedEvent: null
  //   });
  // };

  // handleOpenEvent = (eventToOpen) => () => {
  //   this.setState({
  //     selectedEvent: eventToOpen,
  //     isOpen: true
  //   });
  // };

  // handleCreateEvent = newEvent => {
  //   // console.log('dashboard ');
  //   // console.log(this);
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = "/assets/user.png";
  //   this.props.createEvent(newEvent);
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    // const { selectedEvent } = this.state;
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            // onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity/>
          {/* <Button
            onClick={this.handleFormOpen}
            positive
            content="Create event"
          />
          {this.state.isOpen && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )} */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(EventDashboard);
