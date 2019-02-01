import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../campaign';
import {Card, Grid, Button, Table} from 'semantic-ui-react';
import web3 from '../../web3';
import {Link} from '../../routes';
import userData from '../json_demo.json';
import ContributeForm from '../../components/contributeForm';
import Miles from '../../components/Milestone';
import Updates from '../../components/Updates'




class CampaignShow extends Component {



  constructor(props)
    {     super(props)
        this.state = {showComponent: false}
        this.handleClick = this.handleClick.bind(this);
    }
    
  static async getInitialProps (props) {
    const campaign = Campaign (props.query.address);
    const accountInfo = props.query.accountInfo;
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
       name:summary[6],
    description: summary[7],
    goal: summary[8],
      people: people,
    };
  }

  handleClick()
  {
      this.setState(prevState => ({
          showComponent : !prevState.showComponent
      }));
  }

  renderCards () {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      beneficiary,
      name,
      description,
      goal
    } = this.props;



    let managerName = '' , beneficiaryName = '';
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
        meta: <h3 style ={{color: 'black'}}>{web3.utils.fromWei(balance, 'ether')}</h3>
        
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

    return <Card.Group items={items} style= {{marginLeft: '80px' ,marginRight: '80px'}}/>;
  }
 render () {
    return (
      <Layout>
        <Link route = {`/ind/${this.props.accountInfo}`} >
            <a style= {{marginLeft: '80px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
        <h1 style = {{marginLeft: "80px" , fontFamily: 'Ariel'}}>
          {this.props.name}
        </h1>
        {/* <h1 style={{ marginLeft: "80px" , fontFamily: 'Ariel' ,   marginTop: '10px' }}>Milestones</h1> */}
       <div style ={{marginBottom: '40px' , marginLeft: "80px"}}>
       
        <Miles accountInfo = {this.props.accountInfo} address = {this.props.address} />
        </div>
        <Grid  columns={2} relaxed='very'>
          
            <Grid.Column width ={9}>
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column width ={6} >
             <Updates address = {this.props.address} accountInfo ={this.props.accountInfo} />

            </Grid.Column>

         
          

        </Grid>
        <Grid>
         <Grid.Column>
                <Link route={`/campaigns/${this.props.accountInfo}/${this.props.address}/requests`}>
            <a><Button style={{ float: 'left' , marginTop: '20px' , width: "192px" , marginLeft: '80px'}} > View Requests </Button></a></Link>
                </Grid.Column>
             </Grid>
             
           
      </Layout>
    );
  }
}
export default CampaignShow;
