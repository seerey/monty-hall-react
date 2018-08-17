import React from 'react';
import Table from './Table';
import SimulationForm from './SimulationForm';
import Stage from './Stage';
import './ie11shim.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';
import ImgCar from './img/car.png';
import ImgCarYouWin from './img/CarYouWin.png';
import ImgDoor from './img/door.png';
import ImgGoat from './img/goat.png';
import ImgGoatYouLost from './img/GoatYouLost.png';
import ImgStay from './img/Stay.png';
import ImgSwitch from './img/switch.png';

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}

class App extends React.PureComponent {
    
    constructor() {
        super();
        this.state = {
            selectedSimulationIndex: null,
            simulations: [],
            simulationColumns: [
                { property: "id", header: "ID", key: true },
                { property: "name", header: "Name" },
                { property: "doorCount", header: "Doors" },
                { property: "dateCreated", header: "Created Date" }
            ],
            runs: [],
            doorsImgs: []
        };

    }

    addSimulation = (event) => {
        // Add simulation
        let nextSimNum = 1;
        let defaultDoorCount = 3;

        if (this.state.simulations.length > 0) {
            // Find the highest id, add 1
            nextSimNum = this.state.simulations.reduce((prev, current) => {
                return (prev.id > current.id) ? prev : current
            }).id + 1;
        }

        var newSim = {
            id: nextSimNum,
            name: "Simulation " + nextSimNum,
            doorCount: defaultDoorCount,            
            dateCreated: new Date().toLocaleString(),
            currentRunId: 1
        };

        // Add run
        //let nextRunNum = 1;
        //if (this.state.runs.length > 0) {
        //    // Find the highest id, add 1
        //    var simRuns = [];
        //    this.state.runs.forEach(run => {
        //        if (run.simulationId === newSim.id) {
        //            simRuns.push(run);
        //        }
        //    });
        //    nextRunNum = simRuns.reduce((prev, current) => {
        //        return (prev.id > current.id) ? prev : current
        //    }).id + 1;
        //}

        var newRun = {
            simulationId: newSim.id,
            id: 1,
            carDoor: this.generateRandomNum(defaultDoorCount),
            stayDoor: null,
            switchDoor: null,
            action: "Start",
            outcome: null
        };

        const doorImgs = this.getDoorImgs(defaultDoorCount, newRun);

        this.setState({
            simulations: [...this.state.simulations, newSim],            
            runs: [...this.state.runs, newRun],
            selectedSimulationIndex: this.state.simulations.length,            
            doorImgs: doorImgs
        });


    }

    deleteSimulation = (event, row) => {
        // prevent the delete icon click from selecting the row
        event.stopPropagation();

        this.setState({
            simulations: this.state.simulations.filter(item => item !== row),
            selectedSimulationIndex: null
        });


    }

    selectSimulation = (row) => {
        console.log("select simulation");
        this.setState({
            selectedSimulationIndex: this.state.simulations.findIndex(x => x.id === row.id)
        });
    }


    onDoorCountChange = (doorCount) => {
        if (doorCount < 3) {
            doorCount = 3;
        }

        // Enumerate simulations to modify the doorCount for the selected simulation
        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationIndex) {
                return { ...sim, doorCount: doorCount }
            }
            return sim;
        });

        // Enumerate runs to re-calc the car door for the selected simulation
        var newRun = null;
        const newRuns = this.state.runs.map((run, index) => {
            if (run.simulationId === this.state.selectedSimulationIndex) {
                newRun = { ...run, carDoor: this.generateRandomNum(doorCount) };
                return newRun;
            }
            return run;
        });

        const newDoorImgs = this.getDoorImgs(doorCount, newRun);

        this.setState({
            simulations: newSims,
            runs: newRuns,
            doorImgs: newDoorImgs
        });
    }

    onSimulationChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationIndex) {
                return { ...sim, [name]: value }
            }
            return sim;
        });

        this.setState({
            simulations: newSims
        });
    }

    generateRandomNum(max, exclude) {
        let num = Math.floor(Math.random() * max) + 1;
        if (exclude > 0) {
            while (num !== exclude) {                
                num = Math.floor(Math.random() * max) + 1;
            }
        }
        return num;
    }

    //createRun(doorCount, simulationId,) {
    //    return {
    //        simulationId: simulationId,
    //        id: 1,            
    //        carDoor: this.generateRandomNum(doorCount),
    //        stayDoor: null,
    //        switchDoor: null,
    //        action: "Start",
    //        outcome: null
    //    }
    //}

    playGame(doorCount, run, door) {
        var newRun = { ...run };
        if (newRun.action === "Start") {
            newRun.stayDoor = door;
            // if first pick is the car door, find a random door to offer switch
            if (newRun.stayDoor === newRun.carDoor) {
                newRun.switchDoor = this.generateRandomNum(doorCount, newRun.stayNumber);
            }
            // otherwise, the switch door is the car door
            else {
                newRun.switchDoor = newRun.carDoor;
            }
            newRun.action = "StayOrSwitch";            
            return newRun;
        }

        if (newRun.action === "StayOrSwitch") {
            // if they picked the door
            if (door === newRun.stayDoor) {
                newRun.action = "Stay";
            }
            else if (door === newRun.switchDoor) {
                newRun.action = "Switch"
            }

            if (door === newRun.carDoor) {
                newRun.outcome = "Win";
            }
            else {
                newRun.outcome = "Lose";
            }
        }
    }

    getDoorImg(door, run) {
        if (run.action === "Start") {
            return ImgDoor;
        }
        else if (run.action === "SwitchOrStay") {
            if (door === run.stayDoor) {
                return ImgStay;
            }
            else if (door === run.switchDoor) {
                return ImgSwitch;
            }
            return ImgGoat;
        }
        // end of game
        else {
            if (run.outcome === "Win") {
                if (door === run.carDoor)
                    return ImgCarYouWin;
                else
                    return ImgCar;               
            }            
            else if (run.outcome === "Lose") {
                if ((door === run.switchDoor && run.action === "Switch")
                    || (door === run.stayDoor && run.action === "Stay")) {
                    return ImgGoatYouLost;
                }
                else {
                    return ImgGoat;
                }
            }
        }
        return null;
    }

    getDoorImgs(doorCount, run) {
        const doors = Array.from({ length: doorCount }, (_, i) => this.getDoorImg(i, run));
        return doors;
    }

    selectDoor = (doorCount, currentRun, door) => {
        var selectedSim = this.state.simulations[this.state.selectedSimulationIndex];

        var newRun = this.playGame(selectedSim.doorCount, currentRun, door)
        const newRuns = this.state.runs.map((run, index) => {
            if (run.id === newRun.id && run.simulationId === newRun.simulationId) {
                return newRun;
            }
            return run;
        });

        const doorImgs = this.getDoorImgs(selectedSim.doorCount, newRun);
        this.setState({
            runs: newRuns,
            doorImgs: doorImgs
        });
    }


    render() {
        console.log("app render");
        var simulationForm = null;
        var stage = null;

        // if a simulation is selected
        if (this.state.selectedSimulationIndex >= 0 && this.state.simulations[this.state.selectedSimulationIndex]) {

            var selectedSim = this.state.simulations[this.state.selectedSimulationIndex];
            simulationForm = <SimulationForm
                selectedSimulation={selectedSim}
                onSimulationChange={this.onSimulationChange}
                onDoorCountChange={this.onDoorCountChange} />;

            var currentRun = this.state.runs[this.state.runs.findIndex(run => run.id === selectedSim.currentRunId)];            
            stage = <Stage doorCount={selectedSim.doorCount} run={currentRun} doorImgs={this.state.doorImgs} selectDoor={this.selectDoor} />;
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="sim-header">Simulations</span>
                        <button type="button" className="btn btn-primary" onClick={this.addSimulation}>New</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg">
                        <Table
                            data={this.state.simulations}
                            columns={this.state.simulationColumns}
                            selectRow={this.selectSimulation}
                            selectedRowIndex={this.state.selectedSimulationIndex}
                            isRowDeleteOn={true}
                            deleteRow={this.deleteSimulation} />
                    </div>
                    <div className="col-sm">
                        {simulationForm}
                    </div>
                </div>
                <div className="row">
                    {stage}
                </div>
            </div>
        );
    }
}




export default App;

