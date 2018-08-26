import React from 'react';

class Stage extends React.PureComponent {
    render() {
        let goBackClass = this.props.isGoBackEnabled ? "" : "disabled";
        let goForwardClass = this.props.isGoForwardEnabled ? "" : "disabled";
        let playAgainClass = this.props.isPlayAgainEnabled ? "" : "disabled";
        return (
            <div className="stage">
                {this.props.doorImgs.map((doorImg, index) =>
                    <img key={index + 1} className="float-left" src={doorImg} onClick={x => this.props.selectDoor(index + 1)} alt="door" width="173px" height="281px" />
                )}
                <div className="stage-item float-left">                    
                    <div className="card repeat-tool float-left">
                        <span className="run-controls">
                            <i className={`fas fa-arrow-circle-left ${goBackClass}`} onClick={this.props.goBack}></i>
                            <i className={`fas fa-dice ${playAgainClass}`} onClick={this.props.playAgain}></i>
                            <i className={`fas fa-arrow-circle-right ${goForwardClass}`} onClick={this.props.goForward}></i>
                        </span>
                        <div className="card-body">
                            <form className="form-inline">
                                <span>Repeat</span>
                                <select name="repeatType" className="form-control form-control-sm" onChange={this.props.onRepeaterToolChange}>
                                    <option>Switch</option>
                                    <option>Stay</option>
                                </select>
                                <span>play</span>
                                <select name="numTimes" className="form-control form-control-sm" onChange={this.props.onRepeaterToolChange}>
                                    <option>10</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option>500</option>
                                    <option>1000</option>
                                    <option>5000</option>
                                </select>
                                <span>times</span>
                            </form>
                            <button type="button" className="btn btn-primary" onClick={this.props.onRepeaterToolGo}>Go!</button>
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Stage;

