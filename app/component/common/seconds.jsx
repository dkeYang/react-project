import React from "react"

class Seconds extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(preState => ({
            seconds: preState.seconds + 1
        }))
    }

    componentDidMount() {
        this.timerId = setInterval(() => { this.tick() }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        return (
            <div className="cont">
                <div className="wife"></div>
                <div className="top">
                 {this.props.title}:
                </div>
                <div className="bottom">
                    Seconds: {this.state.seconds}
                </div>
            </div>
        )

    }
}

export default Seconds;