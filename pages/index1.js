import React, {Component} from 'react';
import factory from '../factory';
import {Card, Button, Form, Label, Input , Dropdown} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link, Router} from '../routes';
import web3 from '../web3'
import CampaignIndex from './index2';

class Login extends Component
{    state = {
    accountInfo: this.props.accounts[0],
    showing: false
   };
  static async getInitialProps (props) {
    const campaigns = await factory.methods.getDeployedCampaigns ().call ();
    const accountInfo = props.query;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
   

    return {campaigns, accounts};
  }

    onSubmit = async (event) =>
  {     event.preventDefault();
    console.log("state of accountInfo", this.state.accountInfo)
    try {
      if(this.state.accountInfo == "0xaa54074eF1e358786461ed11261D3aff5600A25b")
    {
      this.setState(
        {
            showing: true
        },
            function()
              {
                  console.log("state of showing",this.state.showing);
                  Router.pushRoute(`/index/${this.state.accountInfo}/${this.state.showing}`);
             }
     );
   }
      else if(this.state.accountInfo == "0x099f423Ca1Ec11e6833f24a53F904335765f0c74" || this.state.accountInfo == "0x451e4d57Da1072BEf34e8e3D29160D172cE1Ae7B")
      {
            Router.pushRoute(`/myCampaigns/${this.state.accountInfo}`)
      }
      else{
        Router.pushRoute(`/index/${this.state.accountInfo}/${this.state.showing}`);

      }
    } 
    catch (error) {
      console.log(error)
    }
    
    
    
      
      
  }
  selectAccount()
  {
    
    console.log('======@#$^%' ,this.refs.accountSelector.value);
    this.setState({accountInfo: this.refs.accountSelector.value});
    console.log("final", this.state.accountInfo)
    
  }

    render(){
        let optionItems = this.props.accounts.map((account , index) =>
    <option key={index}>{account}</option>
);

    return (
      <Layout>
         
        <Form onSubmit = {this.onSubmit} >

        <Form.Field>
          <Label style={{color: 'blue', fontSize: '25px'}}>
              Enter Account Key to view,create and donate to campaigns
            </Label>
            <Input
              value={this.state.accountInfo}
              onChange={event => {
                this.setState ({accountInfo: event.target.value});
              }}
              label="address"
              labelPosition="right"
            />
          </Form.Field>
          <Button >Enter</Button>

          
          
        </Form>

        <div>
          <select style ={{color: 'blue' , padding: '10px' , marginTop: '10px'}} ref ="accountSelector" onChange ={(e) => {
            e.preventDefault();
            this.selectAccount()}}>{optionItems}</select>
        </div>
        

        </Layout>
    );
  }
    }
    export default Login;



