import React from "react";
import { Route, Link } from "react-router-dom";
import { FlatButton } from 'material-ui';

const ActiveLink = ({ to, activeOnlyWhenExact, ...rest }) => (
	<Route
		path={to}
		exact={activeOnlyWhenExact}
		children={({ match }) => (
			<FlatButton>
				<Link to={to} {...rest} className={match ? "active" : ""} />
			</FlatButton>
		)}
	/>
);

export default ActiveLink;
