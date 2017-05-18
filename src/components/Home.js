import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { TextField } from 'material-ui';
import CustomTableRow from "./ui/CustomTableRow";

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	render() {
		const {
			tableHeaders,
      filterUsers,
			deleteRow,
      filter,
      onFilterChange
		} = this.store;

		const customStyle = {
			verticalAlign: 'middle',
			fontSize: '16px'
		};

		const users = filterUsers();

		return (
			<div className="page home">
        <TextField
          hintText="Filter by ids, names or companies"
          type="text"
          id="filter"
          value={filter}
          onChange={onFilterChange}
          className="filter"
        />
				<Table selectable={false} className="table">
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
            {!users.length &&
							<TableRow>
								<TableRowColumn>
									<p className="not-found">
										Users not found
									</p>
								</TableRowColumn>
							</TableRow>
            }
						{!!users.length && users.map(row => (
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
