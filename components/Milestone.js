import React ,  {Component} from 'react';
import {Button, Table , Container, Input , Grid , Step , Progress} from 'semantic-ui-react';
import {Link , Router} from '../routes';
import Campaign from '../campaign';
import Wrap from './Wrap';
import Layout from './Layout';
import MileStone from './Milestones';
import userData from '../pages/json_demo.json';

 
class MilestoneIndex extends Component {


state ={
    milestones: [],
    mile: '',
    campaign: {}
}
    
  
componentDidMount = async () =>
{
    const campaign = Campaign(this.props.address);
    this.setState({campaign: campaign});
    const milestoneCount = await campaign.methods.getMilestoneCount().call();
    
        const milestones = await Promise.all(Array(parseInt(milestoneCount)).fill().map((element , index) =>
    {
        return campaign.methods.milestones(index).call();
}));
this.setState({milestones: milestones})
}

addMilestone = async () =>
{try {
    await this.state.campaign.methods.createMilestone(this.state.mile).send({from: this.props.accountInfo , gas: 4000000});
    Router.replace(`/details/${this.props.accountInfo}/${this.props.address}`);
    

} catch (error) {
   console.log(error); 
}

}
renderMiles()
{
    return this.state.milestones.map((milestone , index) =>
    {
        return <MileStone  milestone = {milestone} milestoneArr = {this.state.milestones}
        key= {index} address = {this.props.address} id = {index} accountInfo ={this.props.accountInfo}/>

    })

}

percentProgress()
{
    let total = parseInt(this.state.milestones.length);
   let count =0;
    this.state.milestones.map((v,i) =>
    {
          if(v.done == true)
          {
              count++
          }
    });
    return (count/total)*100
}




  
render()
    {  

        console.log("percentage progress" , this.percentProgress());
    let user;

    userData.map((v,i)=>
    {
        if(v.address == this.props.accountInfo)
        {
       user = v.role;
        }
    });
    let button;
    if(user == 'user')
    {
        button = <div style={{float: 'right' , padding: "10px"}}>
        <Input value = {this.state.mile} onChange = {event =>
       {
          this.setState({mile: event.target.value})
       }}
       />
       
       <Button floated = "right"  style = {{ marginBottom: 10, marginRight: "80px"}} onClick = {this.addMilestone}> Add Milestone </Button>
       
       </div> 
    }
    else{
        button = null;
    }
         return <Wrap>
      
             <h2 style ={{fontFamily: 'Ariel'}}>Progress so far</h2>
             <div style ={{marginRight: '100px'}}>
             <Progress percent={this.percentProgress()} indicating />
             </div>
             {button}
             <div style = {{marginTop: '20px' , overflowX: 'visible' , overflowY: 'hidden' }}>
             
         <Step.Group ordered>
   
    {this.renderMiles()}
  </Step.Group>
         
         </div>
         </Wrap>
   
        
         
         
    
    }

       

     
    
}
export default MilestoneIndex;
