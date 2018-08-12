import React from 'react';



if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}

class Table extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { visibleColumns: this.getVisibleColumns(props.columns) };
    }

    getVisibleColumns(columns) {
        return columns.filter(x => x.visible === undefined || x.visible === true);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.columns !== nextProps.columns) {
            this.setState({ visibleColumns: this.getVisibleColumns(nextProps.columns) });
        }
    }
    
    render() {
        console.log("table render");
        return (
            <div>
                <table className="table sim-table table-hover table-sm">
                    <TableHeaderRow visibleColumns={this.state.visibleColumns} />
                    <TableBody
                        columns={this.props.columns}
                        visibleColumns={this.state.visibleColumns}
                        data={this.props.data}
                        selectRow={this.props.selectRow}
                        selectedRow={this.props.selectedRow} />
                </table>
            </div>
        );
    };
}


class TableBody extends React.PureComponent {

    render() {
        const keyColumn = this.props.columns.filter(x => x.key === true)[0].property;

        return (
            <tbody>
                {this.props.data.map((row) =>
                    <TableRow
                        key={row[keyColumn]}
                        row={row}
                        visibleColumns={this.props.visibleColumns}
                        selectRow={this.props.selectRow}
                        selectedRow={this.props.selectedRow} />
                )}
            </tbody>
        );
    }

}


class TableRow extends React.PureComponent {

    render() {
        console.log("row render");
        return (
            <tr onClick={i => this.props.selectRow(this.props.row)} className={this.props.selectedRow === this.props.row ? "table-primary" : ""}>
                {this.props.visibleColumns.map((column, i) =>
                    <td key={column.property}>{this.props.row[column.property]}</td>
                )}
            </tr>
        );
    }
}


class TableHeaderRow extends React.PureComponent {
    render() {
        console.log("header row render");
        return (
            <thead>
                <tr>
                    {this.props.visibleColumns.map((column) =>
                        <th key={column.property}>{column.header}</th>
                    )}
                </tr>
            </thead>
        );
    }
}


export default Table;
