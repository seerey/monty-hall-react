import React from 'react';
import DoorCountChooser from './DoorCountChooser';

class SimulationForm extends React.PureComponent {

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
                <div className="form-group">
                    <label htmlFor="doors">Doors:</label>
                    <DoorCountChooser />
                </div>
            </form>
        );
    }
}

export default SimulationForm;

