import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../campaign';
import web3 from '../web3';
import {Router} from '../routes';
import Loader from '../components/Loader';
import Wrap from '../components/Wrap';
import Notify from './Message';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    visible: false
  };
  handleDismiss = () => {
    this.setState({ visible: false })
   }
   updateParent = () =>
   {
     this.props.callback();
   }
  onSubmit = async event => {
    event.preventDefault ();

    console.log(this.props.accountInfo);
    console.log("in contribute")
    const campaign = Campaign (this.props.address);
    this.setState ({loading: true, errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts ();
      await campaign.methods
        .contribute ()
        .send ({
          from: this.props.accountInfo,
          value: web3.utils.toWei (this.state.value, 'ether'),
          gas: 3000000,
        });
        this.setState({visible: true });
    Router.replace(`/ind/${this.props.accountInfo}`);
  
    } catch (err) {
      this.setState ({errorMessage: err.message});
      
    }
    this.setState ({loading: false, value: ''});
    await Router.pushRoute(`/ind/${this.props.accountInfo}`);
    
    this.updateParent();
    
  };



  render () {
    console.log('=========+++++', this.props.accountInfo);
    return (<Wrap>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>

          <label> Amount to contribute (in ether) </label>
          <Input
            value={this.state.value}
            onChange={event => {
              this.setState ({value: event.target.value});
            }}
           
          />
        </Form.Field>
        <Message error header="oops" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Contribute</Button>
      </Form>
      <Notify visible= {this.state.visible} handle = {this.handleDismiss}/>
      <Loader active ={this.state.loading} />
      </Wrap>
    );
  }
}

export default ContributeForm;
