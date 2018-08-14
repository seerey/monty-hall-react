import React from 'react';

class Stage extends React.PureComponent {
    renderDoor(num) {
        let doorSelectedClass = num <= this.props.doorCount ? "door-selected" : "";
        return (
            <i className={"fas fa-door-closed " + doorSelectedClass} onMouseOver={x => this.props.onDoorCountChange(num)}></i>
        )
    }

    render() {
        return (
            <div className="door-count-chooser">
                {this.renderDoor(1)}
                {this.renderDoor(2)}
                {this.renderDoor(3)}
                {this.renderDoor(4)}
                {this.renderDoor(5)}
                {this.renderDoor(6)}
                {this.renderDoor(7)}
                {this.renderDoor(8)}
                {this.renderDoor(9)}
                {this.renderDoor(10)}
            </div>
        )
    }
}

export default DoorCountChooser;

