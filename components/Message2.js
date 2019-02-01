import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class Notify extends Component {


render() {
 console.log("payment in notify " , this.props.data.payerID)
    if (this.props.visible) {
      if(this.props.error == '')
      {
        if(this.props.data.payerID !== undefined)
        {
          return (
            <div style= {{marginLeft: '80px' , marginRight: '80px', marginTop: '80px'}}>
          <Message
          color="green"
            onDismiss={this.props.handle}
            header =  {`Payment successful to ${this.props.address} !! Payer Id: ${this.props.data.payerID} Payment ID: ${this.props.data.paymentID} `}
            
           
          
          />
          </div>
        )
        }
        else {
          return (
            <div style= {{marginLeft: '80px' , marginRight: '80px', marginTop: '80px'}}>
          <Message
          color="red"
            onDismiss={this.props.handle}
            header = 'You Cancelled Payment!'
           
          
          />
          </div>
          )
        }
       
      }
      else{
        return (
          <div style= {{marginLeft: '80px' , marginRight: '80px', marginTop: '80px'}}>
        <Message
        color="red"
          onDismiss={this.props.handle}
          header = {this.props.error}
         
        
        />
        </div>
        )
      }
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