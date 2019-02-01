import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../campaign';
import web3 from '../web3';
import {Router} from '../routes';
import Loader from '../components/Loader';
import Wrap from '../components/Wrap';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  };

//   static async getInitialProps (props) {
//     const accountInfo = props.query;
//     console.log(accountInfo);
//     return {accountInfo};
//   }

onSubmit = async event => {
    event.preventDefault ();

    console.log(this.props.accountInfo);
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
        //Router.pushRoute(`/index/${this.props.accountInfo.accountInfo}`);
      Router.replaceRoute (`/campaigns/${this.props.accountInfo}/${this.props.address}`);
    } catch (err) {
      this.setState ({errorMessage: err.message});
    }
    this.setState ({loading: false, value: ''});
  };

  render () {
    console.log('=========+++++', this.props.accountInfo);
    return (<Wrap>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>

          <label> Amount to contribute </label>
          <Input
            value={this.state.value}
            onChange={event => {
              this.setState ({value: event.target.value});
            }}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="oops" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Contribute</Button>
      </Form>
      <Loader active ={this.state.loading} />
      </Wrap>
    );
  }
}

export default ContributeForm;
