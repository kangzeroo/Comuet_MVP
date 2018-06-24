// Compt for copying as a SearchBar
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  InputItem,
  Button,
} from 'antd-mobile'
import {
	savePostsToRedux,
	setReduxPickup,
	setReduxDropoff,
} from '../../actions/posts/posts_actions'
import { getPosts } from '../../api/posts/posts_api'


class SearchBar extends Component {

  constructor() {
		super()
		this.state = {
      pickup_gps: [0,0],                // the ad lat according to google
      pickup_address: '',               // the ad lng according to google
      dropoff_gps: [0,0],                // the ad lat according to google
      dropoff_address: '',               // the ad lng according to google
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

  submitSearch() {
    this.props.setReduxPickup({
      pickup_address: this.state.pickup_address,
      pickup_gps: this.state.pickup_gps,
    })
    this.props.setReduxDropoff({
      dropoff_address: this.state.dropoff_address,
      dropoff_gps: this.state.dropoff_gps,
    })
    getPosts({ pickup_gps: this.state.pickup_gps, dropoff_gps: this.state.dropoff_gps })
      .then((posts) => {
        this.props.savePostsToRedux(posts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

	render() {
		return (
			<div id='SearchBar' style={comStyles().container}>
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
        <Button type='primary' onClick={() => this.submitSearch()} style={{ width: '200px' }}>Search</Button>
			</div>
		)
	}
}

// defines the types of variables in this.props
SearchBar.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
SearchBar.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SearchBar)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		savePostsToRedux,
    setReduxPickup,
  	setReduxDropoff,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '90vw',
			margin: '20px auto',
		}
	}
}
