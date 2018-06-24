// Compt for copying as a CreatePost
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import moment from 'moment'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  NavBar,
  Icon,
  InputItem,
  TextareaItem,
  Button,
  DatePicker,
} from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US'
import { savePost } from '../../api/posts/posts_api'


class CreatePost extends Component {

  constructor() {
		super()
		this.state = {
      driver_name: '',
      driver_phone: '',
    	driver_id: uuid.v4(),

      price: 15,
      pickup_gps: [0,0],                // the ad lat according to google
      pickup_address: '',               // the ad lng according to google
      dropoff_gps: [0,0],                // the ad lat according to google
      dropoff_address: '',               // the ad lng according to google
    	description: '',
    	leave_time: new Date().getTime(),
		}
	}

  componentDidMount() {
    this.pickup_autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('pickup')),
            // {
            //   types: ['address'],
            // }
          )
    this.pickup_autocomplete.addListener('place_changed', this.fillInPickupAddress.bind(this));
    this.dropoff_autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('dropoff')),
            // {
            //   types: ['address'],
            // }
          )
    this.dropoff_autocomplete.addListener('place_changed', this.fillInDropoffAddress.bind(this));
  }

  fillInPickupAddress() {
    const place = this.pickup_autocomplete.getPlace()
    this.setState({
      pickup_address: place.formatted_address,
      pickup_gps: [parseFloat(place.geometry.location.lng().toFixed(7)), parseFloat(place.geometry.location.lat().toFixed(7))],
    })
  }

  fillInDropoffAddress() {
    const place = this.dropoff_autocomplete.getPlace()
    this.setState({
      dropoff_address: place.formatted_address,
      dropoff_gps: [parseFloat(place.geometry.location.lng().toFixed(7)), parseFloat(place.geometry.location.lat().toFixed(7))],
    })
  }


  renderHeader() {
		return (
			<div>
				<NavBar
		      mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.push('/')}
		    >Comuet Instant</NavBar>
				<h3 style={{ color: 'white', textAlign: 'center' }}>Post Last Minute Carpool</h3>
			</div>
		)
	}

  renderPickupDropOff() {
    return (
      <div>
        <InputItem
          id='pickup'
          type='text'
          placeholder='Waterloo, ON'
          value={this.state.pickup_address}
          onChange={(v) => this.setState({ pickup_address: v })}
          clear
        >From</InputItem>
        <InputItem
          id='dropoff'
          type='text'
          value={this.state.dropoff_address}
          placeholder='Toronto, ON'
          onChange={(v) => this.setState({ dropoff_address: v })}
        >To</InputItem>
        <InputItem
          id='price'
          type='number'
          placeholder={15}
          value={this.state.price}
          onChange={(v) => this.setState({ price: v })}
        >Price</InputItem>
        <TextareaItem
          title='Description'
          placeholder='Provide a briefing to your passengers'
          value={this.state.description}
          onChange={(v) => this.setState({ description: v })}
          rows={4}
          autoHeight
        />
        <input type='time' value={this.state.leave_time} onChange={v => this.setState({ leave_time: v })} step={1} />
        {/*<DatePicker
          mode='time'
          locale={enUs}
          minuteStep={2}
          use12Hours
          title='Leave Time'
          value={this.state.leave_time}
          onChange={v => this.setState({ leave_time: v })}
        />*/}
      </div>
    )
  }

  renderDriverDetails() {
    return (
      <div>
        <InputItem
          id='name'
          type='text'
          placeholder='Driver Name'
          value={this.state.driver_name}
          onChange={(v) => this.setState({ driver_name: v })}
          clear
        >Driver Name</InputItem>
        <InputItem
          id='name'
          type='text'
          placeholder='Driver Phone'
          value={this.state.driver_phone}
          onChange={(v) => this.setState({ driver_phone: v })}
          clear
        >Driver Phone</InputItem>
      </div>
    )
  }

  createPost() {
    savePost(this.state)
      .then((data) => {
        console.log(data)
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

	render() {
		return (
			<div id='CreatePost' style={comStyles().container}>
				{
          this.renderHeader()
        }
        <div style={comStyles().form}>
          {
            this.renderPickupDropOff()
          }
        </div>
        <div style={comStyles().driver}>
          {
            this.renderDriverDetails()
          }
        </div>
        <Button type='primary' onClick={() => this.createPost()} style={{ width: '90vw', margin: 'auto' }}>Post Ride</Button>
			</div>
		)
	}
}

// defines the types of variables in this.props
CreatePost.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
CreatePost.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(CreatePost)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
			background: '#2980B9',  /* fallback for old browsers */
			background: '-webkit-linear-gradient(to right, #2980B9, #6DD5FA)',  /* Chrome 10-25, Safari 5.1-6 */
			background: 'linear-gradient(to right, #2980B9, #6DD5FA)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		},
    form: {
      margin: '20px auto',
      width: '90vw',
    },
    driver: {
      margin: '20px auto',
      width: '90vw',
    },
	}
}
