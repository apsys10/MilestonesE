import React , {Component} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import ContributeForm from './contributeForm2';



class modal extends Component{





    render()
    {
    return <Modal trigger={<Button >Contribute Ether</Button>} closeIcon >
    <Header icon='archive' content='Contribute' />
    <Modal.Content>
      
       
        <ContributeForm address={this.props.address}
  accountInfo={this.props.accountInfo} callback={this.props.callback} />
      
    </Modal.Content>
   
  </Modal>
    }
}




export default modal;