import React , {Component} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'



class modal extends Component{



 disableHandler = () =>
 {
  if(this.props.min == '' || this.props.name == ''){
    return false;
}
return true ;
 }


    render()
    {
      console.log(this.props.disabled);
    return <Modal trigger={<Button disabled={this.props.disabled}>Create</Button>} closeIcon >
    <Header icon='archive' content='Confirm transaction' />
    <Modal.Content>
      
        <h2>Summary</h2>
        <h3>
        Minimum Contribution: {this.props.min}</h3>
        <h3>For: {this.props.name}</h3>
        <h3>Campaign Name: {this.props.CampaignName}</h3>
        <h3>Description: {this.props.description}</h3>
        <h3>Goal Amount: {this.props.goal}</h3>
      
    </Modal.Content>
    <Modal.Actions>
      
      <Button color='green' onClick = {this.props.clicked}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
    }
}




export default modal;