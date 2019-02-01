import React, { Component } from 'react';
import factory from '../factory';
import { Card, Button, Form, Label, Input, Dropdown , Message} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link, Router } from '../routes';
import web3 from '../web3';
import Campaign from '../campaign';
import Info from '../components/Grid';
import Wrap from '../components/Wrap';
import Modal from '../components/Modal2';








class CampaignIndex extends Component {
state = {
  isOpen: false,
  donation: '',
  error: '',
  visible: false,
  payment: {}
  
}

toggle = () =>
{ console.log("in callback")
this.setState(prevState => ({
  isOpen: !prevState.isOpen
}));
}
handleDismiss = () => {
  this.setState({ visible: false })
 }




  static async getInitialProps(props) {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      const accountInfo = props.query;
      const accounts = await web3.eth.getAccounts();
      
      const summaries = await campaigns.map(async (address, index)=>
      {
        let campaign = await Campaign(address);
        
        let summary =  await campaign.methods.getSummary().call();
        return summary
      })

   
    return { campaigns, accountInfo, accounts , summaries};
  }

  catch (error) {
      console.log(error)
    }
  }
  
  componentWillReceiveProps = (props) =>
  {
console.log("in component will recieve props");
console.log(props)
  }

  
  renderInfo = () => {
    let latest = this.props.campaigns.length;
    
   
    
  


    const items = this.props.campaigns.map((address, index) => {
     

      return {
        header: " Campaign:   #" + (index +1),
        color: (index + 1 == latest) ? "green" : "null",
        description: (
          <Wrap>
            <br />
          <Info address= {address} accountInfo = {this.props.accountInfo.accountInfo}/>
          <div>
            <br />
        <Link route={`/campaigns/${this.props.accountInfo.accountInfo}/${address}`}>
            <a style={{fontSize: "20px" , padding: "5px"}}> view details </a>
          </Link>
          </div>
          <br />
          <div style ={{marginTop: "20px"}}>
          <Modal address = {address} accountInfo ={this.props.accountInfo.accountInfo} callback= {this.toggle} /> 
          <Button>Offer Services</Button>
          </div>
         
   
          </Wrap>
        ),
        fluid: true,
      };
    }).reverse();



    return <Card.Group items={items} style={{marginLeft: '80px' ,marginRight: '80px'}}  />
  }


  render() {
    


    return (
      <Layout>
       
        <div style={{ color: 'red' }}>
          <h1 style={{ padding: '10px', color: 'black' , fontFamily: 'Ariel'}}>Open Campaigns</h1>
          {this.renderInfo()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

