import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class Notify extends Component {


render() {
    if (this.props.visible) {
      return (
          <div style= {{marginLeft: '80px' , marginRight: '80px', marginTop: '80px'}}>
        <Message
        color="green"
          onDismiss={this.props.handle}
          header='Done!'
        
        />
        </div>
      )
    }
    else {
        return null;
    }
}
}
// noftify = (props) =>
// {
// return this.props.visible ? <Message
//           onDismiss={this.handleDismiss}
//           header='Welcome back!'
//            content='This is a special notification which you can dismiss.'
//         /> : null
// }

   

export default Notify;
