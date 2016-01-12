'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import BucketList from '../components/bucket-list';
import Actions from '../actions';


/**
 * Buckets page
 */

const BucketsPage = React.createClass({
	componentWillMount: function () {
		let actions = this.props.actions;
		let user = this.props.params.user;

		actions.loadBuckets({ user });
	},

	componentWillUnmount: function () {
		var actions = this.props.actions;

		actions.setBuckets([]);
	},

	componentDidMount: function () {
		let user = this.props.user.username;

		document.title = user + ' - Bucket';
	},

	render: function () {
		let buckets = this.props.buckets;
		let user = this.props.params.user;

		return <div>
			<h1>@{ user }</h1>

			{ this.newBucketButton() }

			<BucketList user={ user } buckets={ buckets } />
		</div>;
	},

	newBucketButton: function () {
		let actions = this.props.actions;
		let isOwnDashboard = this.props.params.user === this.props.user.username;

		if (isOwnDashboard) {
			return <a href="#" onClick={ actions.createBucket }>New Bucket</a>;
		}
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
		buckets: state.buckets,
		user: state.user
	};
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}


/**
 * Expose page
 */

export default connect(mapStateToProps, mapDispatchToProps)(BucketsPage);