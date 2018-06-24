// Compt for copying as a HomePage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import {
	Card,
	Button,
	InputItem,
	NavBar,
	Icon,
} from 'antd-mobile'
import SearchBar from '../modules/SearchBar'


class HomePage extends Component {

	renderHeader() {
		return (
			<div>
				<NavBar
		      mode='dark'
					rightContent={[
		        <Icon key='1' onClick={() => this.props.history.push('/add')} type='plus' />,
		      ]}
		    >Comuet Instant</NavBar>
				<h3 style={{ color: 'white', textAlign: 'center' }}>Last Minute Carpools Only</h3>
			</div>
		)
	}

	renderSearchbar() {
		return (
			<SearchBar />
		)
	}

	renderList() {
		return (
			<div style={comStyles().postList}>
				{
					this.props.posts.map((post) => {
						return (
							<Card key={post.id} style={comStyles().post}>
								<Card.Header
									title={`${post.driver}`}
									extra={`${post.time}`}
								/>
								<Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
									<h2>{`$${post.price}`}</h2>
									<h5>{`${post.pickup} to ${post.dropoff}`}</h5>
								</Card.Body>
							</Card>
						)
					})
				}
			</div>
		)
	}

	render() {
		return (
			<div id='HomePage' style={comStyles().container}>
				{
					this.renderHeader()
				}
				{
					this.renderSearchbar()
				}
				{
					this.renderList()
				}
			</div>
		)
	}
}

// defines the types of variables in this.props
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
HomePage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HomePage)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		posts: redux.posts.posts,
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
			width: '100vw',
			overflowY: 'scroll',
			background: '#2980B9',  /* fallback for old browsers */
			background: '-webkit-linear-gradient(to right, #2980B9, #6DD5FA)',  /* Chrome 10-25, Safari 5.1-6 */
			background: 'linear-gradient(to right, #2980B9, #6DD5FA)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		},
		postList: {
			margin: '20px auto',
			width: '90vw',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
		},
		post: {
			margin: '5px auto',
			width: '100%',
		}
	}
}
