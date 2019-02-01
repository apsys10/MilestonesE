import React , {Component} from 'react';
import {Container , Grid , Card , Button , Input , Message} from 'semantic-ui-react';

import Wrap from './Wrap';
import Campaign from '../campaign';
import userData from '../pages/json_demo.json';
import contributeForm from './contributeForm';
import Modal from './Modal2';
import PaypalButton from './PaypalButton';
import Notify from '../components/Message2';
import web3 from '../web3';
import {Router} from '../routes';
//import jsPDF from 'jspdf';



import axios from 'axios';

const CLIENT = {
  sandbox: 'ASRY3giNhA74PLE3xxA63YvrTe4o8nqBqYxmihjC1dyKgovBtT0yUIQPdeTJSKMkhNBhzVSQUcqcVCe0', 
  production: 'Aa5WfEUtZWM9Go_gSx71WB6UncUGmF2PTZbZwigE2Z_RQECPNA1MzqiCCgIGDmv4wNHJCCN5ABrBRqIh',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class Info extends Component {


state = {
  summary: {},
  donation: 0,
  error: '',
  visible: false,
  payment: {},
  touched: false,
  currentRate: 0,
  campaign: {}
}
componentDidMount = async () =>
{
  const campaign =  Campaign (this.props.address);
  this.setState({campaign: campaign})
  console.log(campaign)
   const summary =  await campaign.methods.getSummary ().call ();
   this.setState({summary: summary});
   axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR').then((res) =>
          {
            console.log(res.data.USD);
            this.setState({currentRate: res.data.USD});
          }).catch( err =>
            {
              console.log(err);
            })

}
handleDismiss = () => {
  this.setState({ visible: false })
 }
 

 
  render()
  { let message;
    const minimumContribution = this.state.summary[0];
    const min = minimumContribution/1000000000000000000;
    if(this.state.donation < this.state.currentRate*min && this.state.touched)
    {
      message = <p style ={{color: 'red'}}>You won't be an approver if you pay less than minimum contribution. Currently {min*this.state.currentRate}</p>
      console.log(typeof min)
    }
    else
    {
      message= null;
    }

  console.log("donating now", this.state.donation)
  
    const onSuccess = async (payment) =>
      {   
       
        
        
        payment.CampignName = this.state.summary[6];
        payment.amount = this.state.donation;
        payment.payerName = localStorage.getItem('currentUser');
        payment.fullfilled = 0;
        console.log('Successful payment!', payment);
        
        axios.post('https://donations-ffcdf.firebaseio.com/donations.json' , payment).then((res) =>
        {
          console.log(res);
        }).catch( err =>
          {
            console.log(err);
          });
          
          this.setState({visible: true });
          this.setState({payment: payment});
          const donate = payment.amount/this.state.currentRate;
          await this.state.campaign.methods
        .contribute ()
        .send ({
          from: this.props.accountInfo,
          value: donate * 1000000000000000000,
          gas: 3000000,
        });
   if(typeof window !== 'undefined')
   {
    var doc = new jsPDF({
         
      unit: 'in',
      format: ['11.69', '08.27']
    });
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;
doc.text(`Date :${today}`, 0.5, 0.5 );
    doc.text(`To : ${payment.CampignName}`, 0.5, 0.8);
    doc.text(`From: ${payment.payerName}`, 0.5, 1.1);
    doc.text(`Amount: ${payment.amount} $`, 0.5, 1.4);
    doc.text(`Payment ID: ${payment.paymentID}`, 0.5, 1.7);
   
    doc.text(`Payer ID: ${payment.payerID}`, 0.5, 2);
    

     doc.save('reciept.pdf');

    
   }
       

          Router.replace(`/ind/${this.props.accountInfo}`);
        
      }
      
  
    const onError = (error) =>
    {
      console.log('Erroneous payment OR failed to load script!', error);
      this.setState({visible: true });
      this.setState({error: "Erroneous payment!" });
      
    }
      
  
    const onCancel = (data) =>
    {
      console.log('Cancelled payment!', data);
      this.setState({visible: true });
      
  
    }
    
    
    
    const manager = this.state.summary[4];
   
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
    const bal = balance/1000000000000000000;

   
     
  

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
      description: "Goal set for this Campaign",
    
    }
  ];
      console.log(typeof window)
      return <Wrap>
         <div style={{marginBottom: '20px'}}><Notify visible= {this.state.visible} handle = {this.handleDismiss} address = {this.state.payment.CampignName} data = {this.state.payment} error = {this.state.error} />
         </div>
         <Card.Group items={items} />
         <div style = {{float: 'right' , padding : '5px' , marginRight : "400px" }}>
          <p style = {{color: 'black', fontSize: '20px' , fontFamily: 'Ariel'}}>Donate in $</p>
        
     
         <div style= {{marginBottom: '5px'}}>
      <Input icon = 'dollar sign' error={(this.state.donation < this.state.currentRate*min) && this.state.touched} size = 'mini' value = {this.state.donation} onChange = {event => { this.setState ({donation : event.target.value})
      this.setState({touched: true})
        }}>
   </Input>
   {message}
   </div>

        <PaypalButton
       id = "pay"
      client={CLIENT}
      env={ENV}
      commit={true}
      currency={'USD'}
      total={this.state.donation}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
    
    
    </div>
    
         
         </Wrap>
  }
}
  export default Info;