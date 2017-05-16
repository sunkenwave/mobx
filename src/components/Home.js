import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import CustomTableRow from "./ui/CustomTableRow";

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const {
			tableHeaders,
			users,
			deleteRow
		} = this.store.appState;

		const customStyle = {
			verticalAlign: 'middle',
			fontSize: '16px'
		};

		return (
			<div className="page home">
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							{!!tableHeaders && tableHeaders.map((header, index) => (
								<TableHeaderColumn
									key={index}
									style={customStyle}
								>
										{header}
								</TableHeaderColumn>
							))}
							<TableHeaderColumn />
						</TableRow>
					</TableHeader>
					<TableBody showRowHover stripedRows displayRowCheckbox={false}>
						{!!users.length && users.map((row, index) => (
							<CustomTableRow
								key={row.id}
								deleteRow={deleteRow}
								{ ...row }
							/>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}
}
