import React from 'react';

//doorCount, onChange
class DoorCountChooser extends React.PureComponent {
    //hover = (num) => {
    //    this.setState({
    //        numDoors: num < 3 ? 3 : num
    //    })
    //}

    renderDoorIcon(num) {
        let doorSelectedClass = num <= this.props.doorCount ? "door-selected" : "";
        return (
            <i className={"fas fa-door-closed " + doorSelectedClass} onMouseOver={x => this.props.onDoorCountChange(num)}></i>
        )
    }

    render() {
        return (
            <div className="door-count-chooser">
                {this.renderDoorIcon(1)}
                {this.renderDoorIcon(2)}
                {this.renderDoorIcon(3)}
                {this.renderDoorIcon(4)}
                {this.renderDoorIcon(5)}
                {this.renderDoorIcon(6)}
                {this.renderDoorIcon(7)}
                {this.renderDoorIcon(8)}
                {this.renderDoorIcon(9)}
                {this.renderDoorIcon(10)}
            </div>
        )
    }
}

export default DoorCountChooser;

