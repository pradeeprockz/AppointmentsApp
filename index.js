import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    showStarred: false,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = () => {
    const {title, date} = this.state

    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '', // Reset title input
        date: '', // Reset date input
      }))
    }
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  toggleStarredStatus = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment => {
        if (appointment.id === id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, showStarred} = this.state
    if (showStarred) {
      return appointmentsList.filter(appointment => appointment.isStarred)
    }
    return appointmentsList
  }

  render() {
    const {title, date, showStarred} = this.state
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="header-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
            <h1 className="app-heading">Appointments</h1> {/* Main heading */}
            <form
              className="appointment-form"
              onSubmit={e => e.preventDefault()}
            >
              <label htmlFor="Title" className="title-description">
                Title
              </label>
              <input
                type="text"
                className="title-input"
                placeholder="Title"
                value={title}
                onChange={this.onTitleChange}
              />
              <label htmlFor="Date" className="date-description">
                Date
              </label>
              <input
                type="date"
                className="date-input"
                value={date}
                onChange={this.onDateChange}
              />
              <button
                type="button"
                className="add-button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>
          </div>

          <hr />

          <div className="filter-section">
            <button
              type="button"
              className={`starred-filter-button ${showStarred ? 'active' : ''}`}
              onClick={this.toggleStarredFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filteredAppointments.map(appointment => (
              <AppointmentItem
                key={appointment.id} // Ensure each item has a unique key
                appointment={appointment}
                toggleStarredStatus={this.toggleStarredStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
