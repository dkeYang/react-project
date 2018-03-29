import React from "react";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(preState => ({
            seconds: preState.seconds++
        }))
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        this.setState(preState => ({
            seconds: 0
        }));
    }

    render() {
        return (
            <div>
                this is the index :
                Seconds:{this.state.seconds}
            </div>
        );
    }
}


export default Index;