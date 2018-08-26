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

//if (process.env.NODE_ENV !== 'production') {
//    const { whyDidYouUpdate } = require('why-did-you-update')
//    whyDidYouUpdate(React)
//}

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
            runColumns: [],
            runs: [],
            doorImgs: [],
            isPlayAgainEnabled: true,
            isGoForwardEnabled: true,
            isGoBackEnabled: true,
            repeatType: "Switch",
            numTimes: 10
        };

    }

    addSimulation = (event) => {
        // Add simulation
        let nextSimNum = 1;
        let defaultDoorCount = 3;
        let selectedSimulationIndex = this.state.simulations.length;

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
            currentRunId: 1,
            locked: false
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

        var newRun = this.createRun(newSim.id, 1);

        const doorImgs = this.getDoorImgs(defaultDoorCount, newRun);


        var doorColumns = [];
        for (var doorNum = 1; doorNum <= newSim.doorCount; doorNum++) {
            doorColumns.push({ property: `D${doorNum}`, header: `D${doorNum}` });
        }

        var runColumns = [
            { property: "id", header: "Play", key: true },
            ...doorColumns,
            { property: "stayDoor", header: "Stay Door" },
            { property: "switchDoor", header: "Switch Door" },
            { property: "action", header: "Action" },
            { property: "outcome", header: "Outcome" }
        ];

        this.setState({
            simulations: [...this.state.simulations, newSim],
            runs: [...this.state.runs, newRun],
            selectedSimulationIndex: selectedSimulationIndex,
            doorImgs: doorImgs,
            runColumns: runColumns
        });


    }

    createRun(simId, runId) {
        var newRun = {
            simulationId: simId,
            id: runId,
            carDoor: null,
            stayDoor: null,
            switchDoor: null,
            action: "Start",
            outcome: null
        };

        return newRun;
    }

    deleteSimulation = (event, selectedSim) => {
        // prevent the delete icon click from selecting the row
        event.stopPropagation();

        this.setState({
            simulations: this.state.simulations.filter(sim => sim !== selectedSim),
            runs: this.state.runs.filter(run => run.simulationId !== selectedSim.id),
            selectedSimulationIndex: null
        });
    }

    getCurrentRun(selectedSimulationIndex) {
        if (typeof selectedSimulationIndex !== "number")
            selectedSimulationIndex = this.state.selectedSimulationIndex;

        var simulation = this.state.simulations[selectedSimulationIndex];
        var run = this.state.runs.find(run => run.simulationId === simulation.id && run.id === simulation.currentRunId);
        return run;
    }

    getCurrentSimulation(selectedSimulationIndex) {
        if (typeof selectedSimulationIndex !== "number")
            selectedSimulationIndex = this.state.selectedSimulationIndex;
        return this.state.simulations[selectedSimulationIndex];
    }

    selectSimulation = (sim) => {
        //console.log("select simulation");
        const simIndex = this.state.simulations.findIndex(x => x === sim)

        if (simIndex >= 0) {
            //console.log("setting doors");
            this.setState({
                doorImgs: this.getDoorImgs(sim.doorCount, this.getCurrentRun(simIndex))
            });
        }

        var doorColumns = [];
        for (var doorNum = 1; doorNum <= sim.doorCount; doorNum++) {
            doorColumns.push({ property: `D${doorNum}`, header: `D${doorNum}` });
        }

        var runColumns = [
            { property: "id", header: "Play", key: true },
            ...doorColumns,
            { property: "stayDoor", header: "Stay Door" },
            { property: "switchDoor", header: "Switch Door" },
            { property: "action", header: "Action" },
            { property: "outcome", header: "Outcome" }
        ];

        this.setState({
            selectedSimulationIndex: simIndex,
            runColumns: runColumns
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

        var doorColumns = [];        
        for (var doorNum = 1; doorNum <= doorCount; doorNum++) {
            doorColumns.push({ property: `D${doorNum}`, header: `D${doorNum}` });
        }

        var runColumns = [
            { property: "id", header: "Play", key: true },
            ...doorColumns,
            { property: "stayDoor", header: "Stay Door" },
            { property: "switchDoor", header: "Switch Door" },
            { property: "action", header: "Action" },
            { property: "outcome", header: "Outcome" }
        ];

        const newDoorImgs = this.getDoorImgs(doorCount);

        this.setState({
            simulations: newSims,
            doorImgs: newDoorImgs,
            runColumns: runColumns
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

    onRepeaterToolChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        if (name === "numTimes") {
            this.setState({
                numTimes: parseInt(value, 10)
            })
        }
        else if (name === "repeatType") {
            this.setState({
                repeatType: value
            })    
        }
    }

    onRepeaterToolGo = () => {
        var sim = this.getCurrentSimulation();    
        var currentRun = this.getCurrentRun();

        var trimmedRuns = this.state.runs;
        var startingRunId = null;
        
        if (currentRun.outcome === null) {
            // current run is not finished so remove it
            trimmedRuns = this.state.runs.filter(run => run !== currentRun);
            startingRunId = sim.currentRunId; // rewind to current id
        }
        else {
            // current run is finished so start with new id
            startingRunId = sim.currentRunId + 1;
        }

        let endingRunId = startingRunId + this.state.numTimes - 1;
        var autoRuns = [];        
        
        for (var runId = startingRunId; runId <= endingRunId; runId++) {
            let run = this.createRun(sim.id, runId);
            let firstDoorNum = this.generateRandomNum(sim.doorCount);        
            let firstPlayRun = this.playGame(sim.doorCount, run, firstDoorNum);
            var finalDoorNum;
            if (this.state.repeatType === "Switch") {
                finalDoorNum = firstPlayRun.switchDoor;
            }
            else if (this.state.repeatType === "Stay") {
                finalDoorNum = firstPlayRun.stayDoor;
            }
            var finalRun = this.playGame(sim.doorCount, firstPlayRun, finalDoorNum);
            autoRuns.push(finalRun);
        }

        const doorImgs = this.getDoorImgs(sim.doorCount, autoRuns[autoRuns.length - 1]);

        this.setState({            
            runs: [...trimmedRuns, ...autoRuns],
            doorImgs: doorImgs
        });

        // Lock if not already done to prevent change to door count. Set
        // the new run ID
        sim = { ...sim, locked: true, currentRunId: endingRunId };
        this.updateSimulation(sim);
    }

    generateRandomNum(max, exclude) {
        let num = Math.floor(Math.random() * max) + 1;
        if (exclude > 0) {
            while (num === exclude) {
                num = Math.floor(Math.random() * max) + 1;
            }
        }
        return num;
    }

    playGame(doorCount, run, door) {
        var newRun = { ...run };
        
        if (newRun.action === "Start") {
            // set the car door first
            newRun.carDoor = this.generateRandomNum(doorCount);

            newRun.stayDoor = door;
            // if first pick is the car door, find a random door to offer switch
            if (newRun.stayDoor === newRun.carDoor) {
                newRun.switchDoor = this.generateRandomNum(doorCount, newRun.stayDoor);
            }
            // otherwise, the switch door is the car door
            else {
                newRun.switchDoor = newRun.carDoor;
            }
            newRun.action = "StayOrSwitch";
        }
        else if (newRun.action === "StayOrSwitch") {
            // if they picked the door
            if (door === newRun.stayDoor) {
                newRun.action = "Stay";
            }
            else if (door === newRun.switchDoor) {
                newRun.action = "Switch"
            }
            else {
                // selected an already open door
                return newRun;
            }

            if (door === newRun.carDoor) {
                newRun.outcome = "Win";
            }
            else {
                newRun.outcome = "Lose";
            }
        }
        return newRun;
    }

    getDoorImg(door, run) {
        if (!run || run.action === "Start") {
            return ImgDoor;
        }
        else if (run.action === "StayOrSwitch") {
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
            if (run.outcome === "Win" && door === run.carDoor) {
                return ImgCarYouWin;
            }
            if (run.outcome === "Lose" && door === run.carDoor) {
                return ImgCar;
            }
            if ((door === run.switchDoor && run.action === "Switch")
                || (door === run.stayDoor && run.action === "Stay")) {
                return ImgGoatYouLost;
            }
        }
        return ImgGoat;
    }

    getDoorImgs(doorCount, run) {
        var doors = [];
        for (var doorNum = 1; doorNum <= doorCount; doorNum++) {
            doors.push(this.getDoorImg(doorNum, run));
        }
        return doors;
    }

    updateSimulation(simToUpdate) {
        const newSims = this.state.simulations.map((sim, index) => {
            if (simToUpdate.id === sim.id) {
                return simToUpdate
            }
            return sim;
        });

        this.setState({
            simulations: newSims
        });
    }

    //lockSimulation(selectedSim) {
    //    if (selectedSim.locked === false) {
    //        const newSims = this.state.simulations.map((sim, index) => {
    //            if (index === this.state.selectedSimulationIndex) {
    //                return { ...sim, locked: true }
    //            }
    //            return sim;
    //        });

    //        this.setState({
    //            simulations: newSims
    //        });
    //    }
    //}

    selectDoor = (door) => {
        var selectedSim = this.getCurrentSimulation();
        var newRun = this.getCurrentRun();

        // lock if not already done to prevent change to door count
        if (selectedSim.locked === false) {
            const sim = { ...selectedSim, locked: true };
            this.updateSimulation(sim);
        }

        // Play game and get a new run
        newRun = this.playGame(selectedSim.doorCount, newRun, door)

        // Enumerate the runs to update the one that just changed
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

    playAgain(sim, maxRunId, outcome) {
        if (!this.isPlayAgainEnabled(outcome))
            return;

        let newRunId = maxRunId + 1;
        let newRun = this.createRun(sim.id, newRunId);

        // Enumerate simulations to modify the currentRunId
        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationIndex) {
                return { ...sim, currentRunId: newRunId }
            }
            return sim;
        });

        const doorImgs = this.getDoorImgs(sim.doorCount, newRun);

        this.setState({
            runs: [...this.state.runs, newRun],
            simulations: newSims,
            doorImgs: doorImgs
        });
    }

    isPlayAgainEnabled(outcome) {
        return outcome === "Win" || outcome === "Lose" ? true : false;
    }

    isGoBackEnabled(runId) {
        return runId > 1 ? true : false;
    }

    isGoForwardEnabled(runId, maxRunId) {
        return runId < maxRunId ? true : false;
    }

    goBack(selectedSim, currentRunId) {
        if (!this.isGoBackEnabled(currentRunId))
            return;

        const targetRunId = currentRunId - 1;

        // Enumerate simulations to modify the currentRunId
        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationIndex) {
                return { ...sim, currentRunId: targetRunId }
            }
            return sim;
        });
        const targetRun = this.state.runs.find(run => run.simulationId === selectedSim.id
            && run.id === targetRunId);
        const doorImgs = this.getDoorImgs(selectedSim.doorCount, targetRun);

        this.setState({
            simulations: newSims,
            doorImgs: doorImgs
        });
    }

    goForward(selectedSim, currentRunId, maxRunId) {
        if (!this.isGoForwardEnabled(currentRunId, maxRunId))
            return;

        const targetRunId = currentRunId + 1;

        // Enumerate simulations to modify the currentRunId
        const newSims = this.state.simulations.map((sim, index) => {
            if (index === this.state.selectedSimulationIndex) {
                return { ...sim, currentRunId: targetRunId }
            }
            return sim;
        });
        const targetRun = this.state.runs.find(run => run.simulationId === selectedSim.id
            && run.id === targetRunId);
        const doorImgs = this.getDoorImgs(selectedSim.doorCount, targetRun);

        this.setState({
            simulations: newSims,
            doorImgs: doorImgs
        });
    }

    runsTableDataMapper(visibleColumns, run) {
        var tds = visibleColumns.map((column, i) => {
            var text = run[column.property];
            if (column.property.startsWith("D")) {
                const doorNum = parseInt(column.property.substring(1), 10)
                if (doorNum > 0 && run.carDoor === doorNum) {
                    text = "C";
                }
                else {
                    text = "G"
                }
            }

            return <td className={column.property} key={column.property}>{text}</td>
        })            
        return tds
    }

    render() {
        //console.log("app render");
        var simulationForm = null;
        var stage = null;
        var runsTable = null;

        // if a simulation is selected
        if (this.state.selectedSimulationIndex >= 0 && this.state.simulations[this.state.selectedSimulationIndex]) {

            const selectedSim = this.getCurrentSimulation();
            const currentRun = this.getCurrentRun();
            const maxRunId = this.state.runs.filter(x => x.simulationId === selectedSim.id).length;
            const maxRun = this.state.runs.find(x => x.simulationId === selectedSim.id && x.id === maxRunId);
            const isPlayAgainEnabled = this.isPlayAgainEnabled(maxRun.outcome);
            const isGoForwardEnabled = this.isGoForwardEnabled(selectedSim.currentRunId, maxRunId);
            const isGoBackEnabled = this.isGoBackEnabled(currentRun.id);
            const selectedSimRuns = this.state.runs.filter(run =>
                run.simulationId === selectedSim.id
                && run.outcome);

            simulationForm = <SimulationForm
                selectedSimulation={selectedSim}
                onSimulationChange={this.onSimulationChange}
                onDoorCountChange={this.onDoorCountChange} />;

            stage = <Stage
                doorImgs={this.state.doorImgs}
                selectDoor={this.selectDoor}
                isGoBackEnabled={isGoBackEnabled}
                isGoForwardEnabled={isGoForwardEnabled}
                isPlayAgainEnabled={isPlayAgainEnabled}
                playAgain={() => this.playAgain(selectedSim, maxRunId, maxRun.outcome)}
                goBack={() => this.goBack(selectedSim, currentRun.id)}
                goForward={() => this.goForward(selectedSim, currentRun.id, maxRunId)}
                onRepeaterToolChange={this.onRepeaterToolChange}
                onRepeaterToolGo={this.onRepeaterToolGo}
            />;

            runsTable =
                <div>
                    <span className="table-header">Plays</span>
                    <Table
                        data={selectedSimRuns}
                        customDataMapper={this.runsTableDataMapper}
                        columns={this.state.runColumns}
                        isRowDeleteOn={false} />
                </div>
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="table-header">Simulations</span>
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
                <div className="row">
                    {runsTable}
                </div>
            </div>
        );
    }
}


export default App;

