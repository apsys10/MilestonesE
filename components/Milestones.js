import React, { Component } from 'react';
import { Table, Button, Popup , Message , Step} from 'semantic-ui-react';
import web3 from '../web3';
import Campaign from '../campaign';
import Loader from './Loader';
import Wrap from './Wrap';
import { Router } from '../routes';
import userData from '../pages/json_demo.json';


class Milestones extends Component {
  state = {
    loading: false,
    Emessage: ''
    
  }
  

onFinalize = async () => {
    this.setState({ loading: true, Emessage: '' });
    console.log("in finalizeMilestone")
    try {
    const campaign = await Campaign(this.props.address);
      await campaign.methods.completeMilestone(this.props.id).send({ from: this.props.accountInfo })
    } catch (error) {
      this.setState({ Emessage: error.message });
      console.log(error)
    }
    this.setState({ loading: false });
    console.log("done finalizeMileStone");
    

    
    Router.replace(`/details/${this.props.accountInfo}/${this.props.address}`);
  }




  render (){
    const { Row, Cell } = Table;
    console.log("is milestone reached")
    let contents;
  let milestone = this.props.milestone;
   let arr = this.props.milestoneArr;
   //console.log(arr[0].done);
   let pos;
   for(var i =0; i<arr.length ; i++)
   {
     if(arr[i].done == false)
     {
       console.log("position" , i);
       pos=i;
       break;

     }
   }
   let activeprocess;
   if(this.props.id == pos)
   {
     activeprocess = true;
   }
   else{
     activeprocess = false;
   }
console.log(activeprocess);

    let errormessage;
    if(this.state.Emessage != '')
    {
    errormessage = <Message error header= "Oops!" content ={this.state.Emessage} />
    }
    else{
      errormessage= null;
    }
 let button;
 let user;

 userData.map((v,i)=>
 {
     if(userData[i].address == this.props.accountInfo)
     {
    user = userData[i].role;
     }
 });
console.log("Role of user",user)
 if(user == 'user')
 {
     button =  milestone.done ? null : (
        <Button size= 'mini'  color="green" basic onClick={this.onFinalize}>Completed?</Button>
      );


 }
 else
 {
     button = null;
 }



    
      contents = <Wrap>
          <Step completed = {milestone.done} active = {activeprocess} size= 'mini' basic>
      <Step.Content>
        <Step.Title>{milestone.message}</Step.Title>
        {activeprocess ? <Step.Description>{button
           }</Step.Description> : null
          }
      </Step.Content>
    </Step>
        <Loader active={this.state.loading} />
        {errormessage}
        
      </Wrap>

    

    return contents;

  }
}
export default Milestones;




{/* <Row positive={milestone.done} key ={this.props.id} >
        <Cell>
          {this.props.id+1}
        </Cell>
        <Cell>
          {milestone.message}
        </Cell>
        

        <Cell>
          {
            milestone.done ? null : (
              <Button color="green" basic onClick={this.onFinalize}>Completed</Button>
            )}
        </Cell>

      </Row> */}