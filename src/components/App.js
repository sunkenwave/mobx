import React, { Component } from "react";
import { Route } from "react-router-dom";
import { inject } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TopBar from "./TopBar";

@inject("store")
export default class App extends Component {

	render() {
		return (
			<MuiThemeProvider>
				<div className="wrapper">
					{/*<DevTools />*/}
					<TopBar />

					<Route
						exact
						path="/"
						render={props => (
							<LazyRoute {...props} component={import("./Home")} />
						)}
					/>
					<Route
						exact
						path="/add"
						render={props => (
							<LazyRoute {...props} component={import("./SubPage")} />
						)}
					/>

					<footer>
						Production by
						<a href="https://github.com/sunkenwave/mobx" target="_blank">
							@sunkenwave
						</a>
					</footer>
				</div>
			</MuiThemeProvider>
		);
	}
}
