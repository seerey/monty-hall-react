import React from 'react';

class Stage extends React.PureComponent {
    render() {
        return (
            <div className="stage">
                {this.props.doorImgs.map((doorImg, index) =>
                    <img src={doorImg} key={index + 1} onClick={x => this.props.selectDoor(this.props.doorCount, this.props.run, index + 1)} alt="door" width="173px" height="281px" />
                )}
            </div>
        );        
    }
}

export default Stage;

