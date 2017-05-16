import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import ActiveLink from "./ui/ActiveLink";
import { AppBar } from 'material-ui';

@withRouter
export default class TopBar extends PureComponent {

	render() {
		return (
			<div className="topbar">
				<AppBar
					showMenuIconButton={ false }
					title="Test Homework"
				>
					<ActiveLink activeOnlyWhenExact={true} to="/">List</ActiveLink>
					<ActiveLink to="/add">New user</ActiveLink>
				</AppBar>
			</div>
		);
	}
}
