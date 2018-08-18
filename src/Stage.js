import React from 'react';

class Stage extends React.PureComponent {
    render() {
        console.log("stage Props: ");
        console.log(this.props);
        return (
            <div className="stage">
                {this.props.doorImgs.map((doorImg, index) =>
                    <img src={doorImg} key={index + 1} onClick={x => this.props.selectDoor(index + 1)} alt="door" width="173px" height="281px" />
                )}
            </div>
        );        
    }
}

export default Stage;

