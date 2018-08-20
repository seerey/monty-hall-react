import React from 'react';

//doorCount, onChange
class DoorCountChooser extends React.PureComponent {
    renderDoorIcon(num) {
        let doorSelectedClass = num <= this.props.doorCount ? "door-selected" : "";
        return (
            <i key={num} className={`fas fa-door-closed ${doorSelectedClass}`} onMouseOver={x => this.props.onDoorCountChange(num)}></i>
        )
    }

    render() {
        let doors = [];
        for (var doorNum = 1; doorNum <= 10; doorNum++) {
            doors.push(this.renderDoorIcon(doorNum));
        }

        return (
            <div className="door-count-chooser">
                {doors}
            </div>
        )
    }
}

export default DoorCountChooser;

