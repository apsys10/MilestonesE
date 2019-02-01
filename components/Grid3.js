import React , {Component} from 'react';
import {Container , Grid , Card , Button} from 'semantic-ui-react';

import Wrap from './Wrap';
import Campaign from '../campaign';
import userData from '../pages/json_demo.json';
import contributeForm from './contributeForm';
import Modal from './Modal2';
import {Link, Route } from '../routes';



class Info extends Component {


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
    let colour;
    let bgcolor;
    console.log("name", name)
    
    console.log(this.state.summary);
    console.log(this.props.accountInfo);
    const bal = balance/1000000000000000000;
    let goalShow = goal;
    let bala = bal;
    let nam = name;
    let details;
    if(name == undefined)
    {
      colour= 'red';
      nam = "Closed"
      bgcolor ="silver";
      bala =0;
      goalShow= 0;
      details = null;

      
      
    }
    else{
      colour = null;
      bgcolor = null;
      goalShow = goal;
      details= <Link route={`/details/${this.props.accountInfo}/${this.props.address}`}>
      <a style={{fontSize: "15px" , padding: "5px", marginLeft: '170px'}}> view details </a>
     </Link>
     
    }
    const items = [
    {
      header: <h3 style ={{color: 'black'}}>Campaign name</h3> ,
      color:  colour ,
     style: {
       backgroundColor: bgcolor
     },
      meta: <h3 style ={{color: 'black'}}>{nam}</h3>,
      description: "Title"
      

      
      
    },
    {
        header: <h3 style ={{color: 'black'}}>Description</h3>,
        color:  colour ,
        style: {
          backgroundColor: bgcolor
        },
        meta: <h3 style ={{color: 'black'}}>{description}</h3>
        
        
        
      },
    {
        //header: (web3.utils.fromWei (balance, 'ether')).toString(),
        header:  <h3 style ={{color: 'black'}}>Balance</h3>,
       
        color:  colour ,
        style: {
          backgroundColor: bgcolor
        },
         meta: <h3 style ={{color: 'black'}}>{bala + ' ether' }</h3>
         
       },
       {
         header:  <h3 style ={{color: 'black'}}>Goal Amount:  {goalShow} ether</h3>,
         color:  colour ,
         style: {
          backgroundColor: bgcolor
        },
        //  meta: <h3 style ={{color: 'black'}}>{ goalShow + ' ether'}</h3>,
         description: "goal set for this campaign",
         meta: details
       },
      
      
   
  ];
      
      return <Wrap><Card.Group items={items} /></Wrap>
  }
}
  export default Info;