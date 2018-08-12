import React from 'react';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSimulationId: 0,
            simulations: [
                { id: 1, name: "Simulation 1", dateCreated: new Date().toLocaleString() }

            ],
            simulationColumns: [
                { property: "id", header: "ID", key: true },
                { property: "name", header: "Name" },
                { property: "dateCreated", header: "Created Date" }
            ]
        };

        //this.handleCrazyUpdateClick = this.handleCrazyUpdateClick.bind(this);
        //this.insertColumn = this.insertColumn.bind(this);
    }

    addSimulation = (event) => {
        var nextSimNum = this.state.simulations.length + 1;
        var newSim = { id: nextSimNum, name: "Simulation " + nextSimNum, dateCreated: new Date().toLocaleString() }               
        console.log(nextSimNum);
        this.setState({
            simulations: [...this.state.simulations, newSim]
        });
    }

    selectSimulation = (row) => {
        this.setState({
            selectedSimulationId: this.state.simulations.findIndex(x => x.id === row.id)
        });
    }

    onSimulationChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //this.setState({
        //    selectedSimulation: { ...this.state.selectedSimulation, [name]: value }
        //});

        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationId) {
                return { ...sim, [name]: value }
            }
            return sim;
        });

        this.setState({
            simulations: newSims
        });
    }



    render() {
        console.log("app render");
        //<button onClick={this.handleCrazyUpdateClick}>Crazy update!</button>
        //    <button onClick={this.insertColumn}>Insert column</button>
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="sim-header">Simulations</span>
                        <button type="button" className="btn btn-primary" onClick={this.addSimulation}>New</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table
                            data={this.state.simulations}
                            columns={this.state.simulationColumns}
                            selectRow={this.selectSimulation}
                            selectedRow={this.state.simulations[this.state.selectedSimulationId]} />
                    </div>
                    <div className="col">
                        <SimulationForm
                            selectedSimulation={this.state.simulations[this.state.selectedSimulationId]}
                            onSimulationChange={this.onSimulationChange} />
                    </div>
                </div>
            </div>
        );
    }
}


class SimulationForm extends React.PureComponent {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input type="text" name="id" className="form-control" readOnly
                        value={this.props.selectedSimulation.id}
                        onChange={this.props.onSimulationChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" className="form-control"
                        value={this.props.selectedSimulation.name}
                        onChange={this.props.onSimulationChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dateCreated">Date Created:</label>
                    <input type="text" name="dateCreated" className="form-control"
                        value={this.props.selectedSimulation.dateCreated}
                        onChange={this.props.onSimulationChange} />
                </div>
            </form>
        );
    }
}


export default App;


    //makeid() {
    //    var text = "";
    //    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //    for (var i = 0; i < 5; i++)
    //        text += possible.charAt(Math.floor(Math.random() * possible.length));

    //    return text;
    //}
    //insertColumn(e) {
    //    e.preventDefault();
    //    const newColumns = [
    //        { property: "id", visible: false, key: true },
    //        { property: "name", header: "First Name" },
    //        { property: "occupation", header: "Occupation" },
    //        { property: "color", header: "Fav Color" }
    //    ];

    //    this.setState({
    //        columns: newColumns
    //    });

    //}
    //handleCrazyUpdateClick(e) {
    //    e.preventDefault();

    //    const newActivityLogs = this.state.activityLogs.map((activityLog, index) => {
    //        if (activityLog.id === 2) {
    //            return { ...activityLog, name: this.makeid() }
    //        }
    //        return activityLog;
    //    });

    //    this.setState({
    //        activityLogs: newActivityLogs
    //    });
    //}