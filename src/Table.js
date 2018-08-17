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
                    <TableHeaderRow visibleColumns={this.state.visibleColumns} isRowDeleteOn={this.props.isRowDeleteOn} />
                    <TableBody
                        columns={this.props.columns}
                        visibleColumns={this.state.visibleColumns}
                        data={this.props.data}
                        selectRow={this.props.selectRow}
                        selectedRowIndex={this.props.selectedRowIndex}
                        isRowDeleteOn={this.props.isRowDeleteOn}
                        deleteRow={this.props.deleteRow} />
                </table>
            </div>
        );
    };
}


class TableBody extends React.PureComponent {
    getKeyColumn(columns) {
        return columns.filter(x => x.key === true)[0].property;
    }

    render() {
        console.log("selectedRowIndex: " + this.props.selectedRowIndex);

        return (
            <tbody>
                {this.props.data.map((row) =>                    
                    <TableRow
                        key={row[this.getKeyColumn(this.props.columns)]}
                        row={row}
                        visibleColumns={this.props.visibleColumns}
                        selectRow={this.props.selectRow}
                        isSelected={this.props.selectedRowIndex >= 0 && row === this.props.data[this.props.selectedRowIndex] ? true : false}
                        isRowDeleteOn={this.props.isRowDeleteOn}
                        deleteRow={this.props.deleteRow}
                         />
                )}
            </tbody>
        );
    }

}


class TableRow extends React.PureComponent {

    render() {
        console.log("row render");
        return (
            <tr onClick={i => this.props.selectRow(this.props.row)} className={this.props.isSelected ? "table-primary" : ""} >
                {this.props.isRowDeleteOn ? <td className="del" onClick={(event) => this.props.deleteRow(event, this.props.row)}><i className="fas fa-minus-circle delete-icon"></i></td> : null}
                {this.props.visibleColumns.map((column, i) =>
                    <td className={column.property} key={column.property}>{this.props.row[column.property]}</td>
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
                    {this.props.isRowDeleteOn ? <th className="del"></th> : null}
                    {this.props.visibleColumns.map((column) =>
                        <th className={column.property} key={column.property}>{column.header}</th>
                    )}
                </tr>
            </thead>
        );
    }
}


export default Table;
