import React ,  {Component} from 'react';
import Layout from '../../../components/Layout';
import {Button, Table , Container } from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../campaign';
import RequestRow from '../../../components/RequestRow';
import Wrap from '../../../components/Wrap';
import userData from '../../json_demo.json'
 
class RequestIndex extends Component {


static async getInitialProps(props)
{
    const address = props.query.address;
    const accountInfo = props.query.accountInfo;
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    
        const requests = await Promise.all(Array(parseInt(requestsCount)).fill().map((element , index) =>
    {
        return campaign.methods.requests(index).call();
}));
const approversCount = await campaign.methods.approversCount().call();

        //console.log(requests);
        return {address , requests , requestsCount , approversCount, accountInfo}
    
}    



renderRow()
{
    return this.props.requests.map((request , index) =>
    {
        return <RequestRow  request = {request}
        key= {index} address = {this.props.address} id = {index} approversCount = {this.props.approversCount} accountInfo ={this.props.accountInfo}/>

    })

}
  
render()
    {  
        
        const { Header , Row , HeaderCell , Body} = Table;
        let tablee;
        let user;
   userData.map((v, i) => {
      if(userData[i].address == this.props.accountInfo){
          user = userData[i].role;
      }
  });
        
        if(user == 'user')
        {
            tablee = <Wrap> <Link route ={`/campaigns/${this.props.accountInfo}/${this.props.address}/requests/new`}>
            <a>
                <Button floated = "right"  style = {{ marginBottom: 10, marginRight: "80px"}}> Add Request </Button>
            </a>
            </Link>
            <Link route = {`/details/${this.props.accountInfo}/${this.props.address}`} >
            <a style= {{marginLeft: '40px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
            <h3 style ={{marginLeft: "80px"}}>Requests</h3>
            <Container>
            <Table >
                <Header>

                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell> Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>
            </Container>
            <div style ={{marginLeft: "80px"}}> Found {this.props.requestsCount} requests.</div>
            </Wrap>
        }
        else{
             tablee = <Wrap>
                  <Link route = {`/campaigns/${this.props.accountInfo}/${this.props.address}`} >
            <a style= {{marginLeft: '80px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
                 <p style ={{marginLeft: "80px", marginTop: '10px'}}>You can approve only if you have contributed to the Campaign</p>
                
                 <Container><Table  >
             <Header>

                 <Row>
                     <HeaderCell>ID</HeaderCell>
                     <HeaderCell>Description</HeaderCell>
                     <HeaderCell>Amount</HeaderCell>
                     <HeaderCell> Recipient</HeaderCell>
                     <HeaderCell>Approval Count</HeaderCell>
                     <HeaderCell>Approve</HeaderCell>
                     
                 </Row>
             </Header>
             <Body>
                 {this.renderRow()}
             </Body>
         </Table>
         </Container>
         <div style ={{marginLeft: "80px"}}> Found {this.props.requestsCount} requests.</div>
         </Wrap>

        }
       

        return <Layout>
            
            {tablee}
        </Layout>
    }
}
export default RequestIndex;
