import React from 'react';
import Table from './Table';
import SimulationForm from './SimulationForm';
import './ie11shim.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';



if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}

class App extends React.PureComponent {
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

    }

    addSimulation = (event) => {

        let nextSimNum = 1;        
        if (this.state.simulations.length > 0) {
            // Find the highest id, add 1
            nextSimNum = this.state.simulations.reduce((prev, current) => {
                return (prev.id > current.id) ? prev : current
            }).id + 1; 
        }
        
        var newSim = { id: nextSimNum, name: "Simulation " + nextSimNum, dateCreated: new Date().toLocaleString() }               
        this.setState({
            simulations: [...this.state.simulations, newSim]
        });
    }

    deleteSimulation = (row) => {


        this.setState({
            simulations: this.state.simulations.filter(item => item !== row)
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="sim-header">Simulations</span>
                        <button type="button" className="btn btn-primary" onClick={this.addSimulation}>New</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <Table
                            data={this.state.simulations}
                            columns={this.state.simulationColumns}
                            selectRow={this.selectSimulation}
                            selectedRow={this.state.simulations[this.state.selectedSimulationId]}
                            isRowDeleteOn={true}
                            deleteRow={this.deleteSimulation} />
                    </div>
                    <div className="col-4">
                        {this.state.simulations.length >= this.state.selectedSimulationId + 1
                            ? <SimulationForm selectedSimulation={this.state.simulations[this.state.selectedSimulationId]} onSimulationChange={this.onSimulationChange} />
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}




export default App;

