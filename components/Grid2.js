import React , {Component} from 'react';
import {Container , Grid , Card , Button} from 'semantic-ui-react';

import Wrap from './Wrap';
import Campaign from '../campaign';
import userData from '../pages/json_demo.json';
import contributeForm from './contributeForm';
import Modal from './Modal2';
import web3 from '../web3';



class Info extends Component {

// static async getInitialProps (props) {
//       const campaign = await Campaign (this.props.address);
//      const summary = await campaign.methods.getSummary ().call ();
//       return {
//         address: this.props.address,
//        minimumContribution: summary[0],
//         balance: summary[1],
//         requestsCount: summary[2],
//         approversCount: summary[3],
//         manager: summary[4],
//         beneficiary: summary[5],
//        campaign: campaign,
//        summary
//       };
//     }
state = {
  summary: {}
}
componentDidMount = async () =>
{
  const campaign =  Campaign (this.props.address);
  console.log(campaign)
   const summary =  await campaign.methods.getSummary ().call ();
   this.setState({summary: summary});

}
 
 
  render()
  {
    
  
    const manager = this.state.summary[4];
    const minimumContribution = this.state.summary[0];
    const balance = this.state.summary[1];
    const beneficiary = this.state.summary[5];
    const name = this.state.summary[6];
    const description = this.state.summary[7];
    const goal = this.state.summary[8];
    let managerName = '' ;
    let beneficiaryName = '';
    for(let i in userData){
        if(userData[i].address == manager){
          managerName = userData[i].name;
              break;
        }
    }
    console.log("name of manager = "+ managerName+" for address = "+manager);


    for(let i in userData){
      if(userData[i].address == beneficiary){
            beneficiaryName = userData[i].name;
            break;
      }
    }
    console.log(this.state.summary);
    console.log(this.props.accountInfo);
   //const bal = Math.round(balance);
   const bal = balance/1000000000000000000
    console.log("balance" , bal);
    const min = minimumContribution/1000000000000000000;
    

    const items = [
   
    {
    
      header: <h3 style ={{color: 'black'}}>Campaign name</h3>,
       meta : <h3 style ={{color: 'black'}}>{name}</h3>,
      description: "Title"

      
      
    },
    {
      header: <h3 style ={{color: 'black'}}>Description</h3>,
      meta: <h3 style ={{color: 'black'}}>{description}</h3>
      
      
    },
    {
      meta:<h3 style ={{color: 'black'}}>{min}</h3>, //minimumContribution,
        header:  <h3 style ={{color: 'black'}}>Minimum Contribution in ether</h3>,
      description: "Contribute atleast this much ether to beacome an approver"
    },

    {
     //header: ,
     header: <h3 style ={{color: 'black'}}>Balance</h3>,
     //header: web3.utils.fromWei(bal , 'ether' )+ 'wei',
      meta: <h3 style ={{color: 'black'}}>{bal + ' ether'}</h3>
      
    },
    {
      header: <h3 style ={{color: 'black'}}>Owner</h3>,
      meta: <h3 style ={{color: 'black'}}>{beneficiaryName}</h3>,
      description: "Owner of this campaign"
      
    },
    {
      header: <h3 style ={{color: 'black'}}>Goal Amount</h3>,
      meta: <h3 style ={{color: 'black'}}>{goal}</h3>,
      description: "Goal set for this Campaign"
      
    }
  ];
      
      return <Wrap><Card.Group items={items} style ={{marginTop: '20px'}}/></Wrap>
  }
}
  export default Info;