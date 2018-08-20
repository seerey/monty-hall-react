import React from 'react';

class Stage extends React.PureComponent {
    render() {
        //<button type="button" className="btn btn-primary btn-play-again" onClick={this.props.playAgain}>Play Again</button>
        let goBackClass = this.props.isGoBackEnabled ? "" : "disabled";
        let goForwardClass = this.props.isGoForwardEnabled ? "" : "disabled";
        let playAgainClass = this.props.isPlayAgainEnabled ? "" : "disabled";
        return (
            <div className="stage">
                {this.props.doorImgs.map((doorImg, index) =>
                    <img src={doorImg} key={index + 1} onClick={x => this.props.selectDoor(index + 1)} alt="door" width="173px" height="281px" />
                )}
                <span className="run-controls">                    
                    <i className={`fas fa-arrow-circle-left ${goBackClass}`} onClick={this.props.goBack}></i>
                    <i className={`fas fa-dice ${playAgainClass}`} onClick={this.props.playAgain}></i>
                    <i className={`fas fa-arrow-circle-right ${goForwardClass}`} onClick={this.props.goForward}></i>
                </span>
            </div>
        );
    }
}

export default Stage;

