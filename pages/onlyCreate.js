import React, {Component} from 'react';
import factory from '../factory';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link, Router} from '../routes';
import web3 from '../web3';
import Info from '../components/Grid2';
import Wrap from '../components/Wrap';
import userData from './json_demo.json';
import Campaign from '../campaign';
import Notify from '../components/Message';
import axios from 'axios';


class OnlyCreate extends Component {
// state = {
//   campaigns: [],
//   accountInfo: {},
//   accounts: []
// }
state ={
  rerender: false,
  visible: false
}
   static async getInitialProps (props){
     try {
          const campaigns = await factory.methods.getDeployedCampaigns ().call ();
          const accountInfo = props.query;
          const accounts = await web3.eth.getAccounts();
          //console.log(accounts[0]);
        
          return {campaigns, accountInfo , accounts};
     } catch (error) {
          console.log(error)
     }  
    
  }
  //test fetch
  // componentDidMount = () =>
  // {
  // axios.get("https://donations-ffcdf.firebaseio.com/donations.json").then((res) =>
  // {
  //  console.log("response data",res.data);
  //   const fetched = [];
  //  for( let key in res.data) 
  //  {
  //    fetched.push({...res.data[key]}
  //   )
  //  }
  //  console.log("fetched data", fetched);
  //  let arr = [];
  // for(let key in fetched)
  // { if(fetched[key].fullfilled == 0)
  // {
  //   console.log(fetched[key]);
  //   arr.push(fetched[key])
  // }
    
  // }

  // console.log("final arr" , arr)



  
  // }
  // )
  // }
  

Remove = async (address,index) =>
{
  console.log(index);
  try {

let campaign = await Campaign(address);
let summary = await campaign.methods.getSummary ().call ();
let faddr = "0xb4049d6b71612E866187AD1D465651A52B3B7D7F"
await campaign.methods.destruct(faddr,summary[5],index).send({from: this.props.accountInfo.accountInfo, gas: 4000000 }).then(res =>
  {
    console.log(res);
    this.setState({visible: true })
    Router.pushRoute(`/id/${this.props.accountInfo.accountInfo}`);
  
    // this.setState(prevState => ({
    //   rerender: !prevState.rerender
    // }));
    // console.log(this.state.rerender);
  }).catch(err =>
    {
      console.log(err)
    });



  

   
  } catch (error) {
    console.log(error);
  }

}
handleDismiss = () => {
  this.setState({ visible: false })
 }

  renderCampaigns () {
    
     //console.log("all Campaigns", this.props.campaigns);
    let latest = this.props.campaigns.length ;
    

    const items = this.props.campaigns.map ((address, index) => {
      console.log("array length and address",latest ,address )
    return {

      header: " Campaign:  # " + (index +1),
              color: (index+1 == latest)? "green" : "null",
              description: (
                <Wrap>
                  <Button onClick = {() => this.Remove(address,index)} floated = 'right' style ={{color: 'red'}}>Remove</Button>
             <Info address= {address}/>
             <br />
             {/* <Link route={`/int/${address}`}><Button> Internal Transactions </Button> */}
      
     {/* </Link> */}
                </Wrap>
              ),
        fluid: true,
        
      };
    }).reverse();
    return <Card.Group items={items} style={{marginLeft: '80px' ,marginRight: '80px'}}/>;
 }
  
render () {
  let externaltransactions;
  let user;
   userData.map((v, i) => {
      if(userData[i].address == this.props.accountInfo.accountInfo){
          user = userData[i].role;
      }
  });
  console.log("user is" , user);
  // if(this.props.accountInfo.accountInfo == "0x98E0E5810D9e262c4AC19815b57c68B7Bf6050a6")
  if(user == 'superuser')
  {externaltransactions = <Wrap><Link route={`/transactions/${this.props.accountInfo.accountInfo}`}>
  <a>
      <Button
      
      size = 'big'
        floated = "left"
        content="Transactions"
        style = {{ marginLeft: '40px'}}
        
      />
    </a>
  </Link> 
 
 
  <Link route={`/accessebility/${this.props.accountInfo.accountInfo}`}>
  <a>
      <Button
      
      size = 'big'
        floated = "left"
        content="Manage Accessability"
        style = {{ marginLeft: '40px'}}
        
      />
    </a>
  </Link>
  </Wrap>}
  else{
    externaltransactions = null;
   
  }
  
   return (
      <Layout>
         <div>
          {externaltransactions}
        
    <Link route={`/campaigns/${this.props.accountInfo.accountInfo}`}>
    <a>
        <Button
        style = {{ marginLeft: '40px'}}
        size = 'big'
          floated = "left"
          content="Create Campaign"
          icon="add circle"
         
        />
      </a>
    </Link>
   </div>
   <br />
   <br />
   <br />

          
         <div style = {{color: 'blue'}}>
              <h3 style = {{ color : 'black', marginLeft: '80px'}}>Open Campaigns</h3>
                  {this.renderCampaigns()}
          </div>
          <Notify visible= {this.state.visible} handle = {this.handleDismiss}/>
        </Layout>
    );
  }
}

export default OnlyCreate;