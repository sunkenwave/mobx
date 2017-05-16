import React, { PureComponent } from "react";
import { inject, observer } from "mobx-react";
import CustomTextField from "./ui/CustomTextField";
import { RaisedButton } from 'material-ui';

@inject("store")
@observer
export default class SubPage extends PureComponent {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
		this.addRow = () => {
			this.store.addRow(() => this.props.history.push('/'));
		};
	}

	render() {
		const {
			form, onFieldChange
		} = this.store;

		return (
			<div className="page user">
				<h1>Add new user</h1>
				<form>
					<CustomTextField
						type="text"
						name="name"
						value={form.fields.name.value}
						error={form.fields.name.error}
						onChange={(e) => onFieldChange(e.target.name, e.target.value)}
						label="Name"
					/>
					<br />
					<CustomTextField
						type="text"
						name="company"
						value={form.fields.company.value}
						error={form.fields.company.error}
						onChange={(e) => onFieldChange(e.target.name, e.target.value)}
						label="Company name"
					/>
					<br />
					<CustomTextField
						type="number"
						name="phone"
						value={form.fields.phone.value}
						error={form.fields.phone.error}
						onChange={(e) => onFieldChange(e.target.name, e.target.value)}
						label="Phone"
					/>
				</form>
				<RaisedButton
					primary={true}
					onClick={this.addRow}
				>
					Add new user
				</RaisedButton>
			</div>
		);
	}
}
