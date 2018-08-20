import React from 'react';
import DoorCountChooser from './DoorCountChooser';

class SimulationForm extends React.PureComponent {

    render() {

        var doorCount = null;
        if (this.props.selectedSimulation.locked === true) {
            doorCount = <input type="text" name="doorCount" className="form-control" readOnly value={this.props.selectedSimulation.doorCount} />;
        }
        else {
            doorCount = <DoorCountChooser
                doorCount={this.props.selectedSimulation.doorCount}
                onDoorCountChange={this.props.onDoorCountChange} />;
        }

        return (
            <form>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input type="text" name="id" className="form-control" readOnly
                        value={this.props.selectedSimulation.id} />
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
                <div className="form-group">
                    <label htmlFor="doorCount">Doors:</label>
                    {doorCount}
                </div>
            </form>
        );
    }
}

export default SimulationForm;

