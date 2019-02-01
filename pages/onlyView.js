import React, { Component } from 'react';
import Layout from '../components/Layout';
import Campaign from '../campaign';
import { Card, Grid, Button, Table, Container} from 'semantic-ui-react';
import web3 from '../web3';
import { Link } from '../routes';
import userData from './json_demo.json';
import Miles from '../components/Milestone';
import Updates from '../components/Updates'

class OnlyView extends Component {
  constructor(props) {
    super(props)
    this.state = { showComponent: false }
    this.handleClick = this.handleClick.bind(this);
  }


  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const accountInfo = props.query.accountInfo;
    const people = await campaign.methods.getPeople().call();

    const summary = await campaign.methods.getSummary().call();
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
      //contributorsVisibility: "SHOW CONTRIBUTORS"
    };
  }

  handleClick() {
    this.setState(prevState => ({
      showComponent: !prevState.showComponent
    }));
  }

  renderCards() {
    const {
      balance,
      manager, // contains address of creator
      minimumContribution,
      requestsCount,
      approversCount,
      beneficiary,
      name,
      description ,
      goal
    } = this.props;

    let managerName = '', beneficiaryName = '';
    for (let i in userData) {
      if (userData[i].address == manager) {
        managerName = userData[i].name;
        break;
      }
    }
    console.log("name of manager = " + managerName + " for address = " + manager);


    for (let i in userData) {
      if (userData[i].address == beneficiary) {
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

    return <Card.Group items={items} style={{ marginLeft: '80px' }} />;
  }


  renderNames = () => {
    console.log("in renderNames method");


    return this.props.people[0].map((value, index) => {
      return <Table.Row key={index}>
        <Table.Cell>{
          userData.map((v, i) => {
            return userData[i].address == value ? userData[i].name : null
          })
        }</Table.Cell>
      </Table.Row>

    });
  };

  renderAmounts = () => {
    return this.props.people[1].map((value, index) => {
      return <Table.Row key={index}>
        <Table.Cell >
          {web3.utils.fromWei(value, 'ether')}
        </Table.Cell>
      </Table.Row>
    });
  };





  render() {
    console.log("people"  ,typeof this.props.people[0].length)
    return (
      <Layout>
         <Grid columns={1} >
          
          <Grid.Column width={13}>
              <Link route = {`/myCampaigns/${this.props.accountInfo}`} >
              <a style= {{marginLeft: '40px', fontSize: '15px'}}>
                  
                      Back
                      </a></Link>
          <h1 style={{ marginLeft: "80px" , fontFamily: "Times New Roman", fontSize: "40px"}}>
          {this.props.name}
          </h1>
          </Grid.Column>
          </Grid>
       
          
            <div style ={{marginLeft: "80px"}}>
          {/* <h1 style={{ marginLeft: "10px" , fontFamily: 'Ariel'  }}>Milestones</h1> */}
       <Miles accountInfo = {this.props.accountInfo} address = {this.props.address}/>
       </div>
          
          
        
       
        <Grid columns={2} >
        <Grid.Column >
            <Link route={`/campaigns/${this.props.accountInfo}/${this.props.address}/requests`}>
              <a><Button  style={{ float: 'left', marginTop: '20px', width: "192px", marginLeft: "80px" }} > View Requests </Button></a></Link>
          </Grid.Column>
          <Grid.Column >
            <Link route = {`/updates/${this.props.accountInfo}/${this.props.address}`} >
              <a><Button style={{ float: 'right' , marginTop: '20px', width: "192px" , marginRight: "150px"}}  > Add Updates </Button></a></Link>
          </Grid.Column>
          </Grid>
       
        
        <Grid  columns={2} relaxed='very'>
          
            <Grid.Column >
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column >
             <Updates address = {this.props.address} accountInfo ={this.props.accountInfo}/>

            </Grid.Column>

         
          

        </Grid>

        <div>
          {(this.props.people[0].length >0) ?  <Button style={{ float: 'left', marginTop: '20px', marginLeft: "80px" }}
            onClick={this.handleClick}

          > {(this.state.showComponent) ? 'Hide contributers' : 'Show contributers'}

          </Button> : null
          }
         


          {this.state.showComponent ?
            <div style={{ float: 'left', marginTop: '70px' }}>{
              
                <Table >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Contributer</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.renderNames()}
                  </Table.Body>
                </Table>
            

            }</div> :
            null
          }
          {this.state.showComponent ?
            <div style={{ float: 'left', marginTop: '70px' }}>{
              <Table >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Amount in ether</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.renderAmounts()}
                </Table.Body>
              </Table>
            }</div> :
            null
          }
        </div>
       
         
         
        
     
       
       
       
    
      </Layout>
    );
  }
}
export default OnlyView;