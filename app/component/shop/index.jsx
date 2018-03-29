import React from "react"

class ShopIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
        }
    }

    tick() {
        this.setState(preState => {
            return {
                seconds: preState.seconds++
            }
        })
    }

    componentDidMount(){
        this.timerId = setInterval(()=>this.tick(),1000)
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
        this.setState(()=>({
            seconds:0
        }))
    }

    render(){
        return (
            <div>
              this is the shop :
              Seconds:{this.state.seconds}
            </div>
        )
    }
}

export default ShopIndex;