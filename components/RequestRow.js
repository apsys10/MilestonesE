import React, { Component } from 'react';
import { Table, Button, Popup , Message} from 'semantic-ui-react';
import web3 from '../web3';
import Campaign from '../campaign';
import Loader from './Loader';
import Wrap from './Wrap';
import { Router } from '../routes';
import userData from '../pages/json_demo.json'

class RequestRow extends Component {
  state = {
    loading: false,
    Emessage: '',
    summary: {}
  }
  
  componentDidMount = async () =>
  {
    const campaign =  Campaign (this.props.address);
    
     const summary =  await campaign.methods.getSummary ().call ();
     this.setState({summary: summary});
  
  }

  static async getInitialProps (props) {
    const campaign = Campaign (props.query.address);
    const accountInfo = props.query.accountInfo;
    const address = props.query.address;
    const people = await campaign.methods.getPeople ().call ();

    const summary = await campaign.methods.getSummary ().call ();
   

    return {
      address: props.query.address,
      accountInfo: accountInfo,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      beneficiary: summary[5],
      people: people,
    };

  }




  onApprove = async () => {

    this.setState({ loading: true, Emessage: '' })
   
    try {
      const accounts = await web3.eth.getAccounts();
 
      //console.log(accounts);
      const campaign = await Campaign(this.props.address);
      await campaign.methods.approveRequest(this.props.id).send({ from: this.props.accountInfo , gas: 3000000 });
      const { id, request, approversCount } = this.props;
      const readyToFinalize = request.approvalCount > approversCount / 2;
      let sum = parseInt(this.state.summary[1]);
      console.log(sum);
      let blc = sum/1000000000000000000;
      let goal = parseInt(this.state.summary[8]);
      console.log(blc, goal);
      console.log(goal*0.7);
      console.log("conditions" , readyToFinalize && (blc >= goal*0.7));
      if((blc >= goal*0.7))
      {
        await campaign.methods.finalizeRequest(this.props.id).send({ from: this.props.accountInfo , gas: 3000000 });
      }

     
    } catch (error) {
      this.setState({ Emessage: error.message })
    }

    this.setState({ loading: false });
    Router.pushRoute(`/campaigns/${this.props.accountInfo}/${this.props.address}/requests`);
  }

  onFinalize = async () => {
    this.setState({ loading: true, Emessage: '' });
    console.log("in finalize")
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(this.props.address);
      await campaign.methods.finalizeRequest(this.props.id).send({ from: this.props.accountInfo })
    } catch (error) {
      this.setState({ Emessage: error.message });
      console.log(error)
    }
    this.setState({ loading: false });
    console.log("done finalize")

    
      Router.pushRoute(`/campaigns/${this.props.accountInfo}/${this.props.address}/requests`);
  }

// shouldDisable =() =>
// {
// if(this.props.balance < )  
// }

recipientName(rec) {

 

 let l = userData.length ;


 for(let i =0 ; i<userData.length; i++){
   
       if(rec == userData[i].address){
          
           return userData[i].name;
       }
 }
}
  render (){
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    let contents;
    let user;
   userData.map((v, i) => {
      if(userData[i].address == this.props.accountInfo){
          user = userData[i].role;
      }
  });


let sum = parseInt(this.state.summary[1]);

let val = parseInt(request.value);


let errormessage;
    if(this.state.Emessage != '')
    {
    errormessage = <Message error header= "Oops!" content ={this.state.Emessage} />
    }
    else{
      errormessage= null;
    }
    //if (this.props.accountInfo == "0x04c677c7AB1c5bc0F769a03388f88e6BA735d8bD")
    if(user == 'user') {
      contents = <Wrap><Row disabled={request.complete} positive={readyToFinalize && !request.complete} >
        <Cell>
          {id+1}
        </Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{this.recipientName(request.recipient)}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          {
            request.complete ? null : (
              <Button color="teal" basic onClick={this.onFinalize} error={this.state.EMessage}
              disabled = {!readyToFinalize || (sum < val)}
              >Finalize</Button>
            )}</Cell>
      </Row>

        <Loader active={this.state.loading} />
        {errormessage}
        
      </Wrap>

    }
    else {
      contents = <Wrap><Row disabled={request.complete} positive={readyToFinalize && !request.complete} >
        <Cell>
          {id+1}
        </Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{this.recipientName(request.recipient)}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>

        <Cell>
          {
            request.complete ? null : (
              <Button color="green" basic onClick={this.onApprove} disabled = { (sum < val)}>Approve</Button>
            )}
        </Cell>

      </Row>
        <Loader active={this.state.loading} />
        {errormessage}
        
      </Wrap>

    }

    return contents;

  }
}
export default RequestRow;