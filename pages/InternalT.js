import Wrap from '../components/Wrap';
import Campaign from '../campaign';
import userData from './json_demo.json';
import React , {Component} from 'react';
import {Table} from 'semantic-ui-react'



class Int extends Component {


    state = {
        
      tb: [],
      rows: []
    }
    componentDidMount = async () =>
    {
      this.renderInt();
    
    }
    static async getInitialProps(props)
    {
        try {
            
            const campaign =  await Campaign (props.query.address);
            const summary =  await campaign.methods.getSummary ().call ();
            return { campaign , summary}
        } catch (error) {
            console.log(error);
        }
    }



renderInt = async () =>
{
try {
    console.log(this.props.campaign)
    const campaign = this.props.campaign
    let tx = await campaign.methods.getTransactions().call();
    let val;

    console.log("tx" , tx)
  
   
           
        for(var i =0; i < tx[0].length; i++)
        {
            val = tx[0][i];
           console.log("val in loop", val )
        
        console.log("val" , val);
        let name;
        userData.map((v,i) =>
        {
             if(val == userData[i].address)
             {
                name = userData[i].name;
             }
        });

        // let val1 = tx[1].map((amt, i) => {
        //     console.log("amount= " + amt)
        //     return amt
        // });
        let val1 = web3.utils.fromWei(tx[1][i], 'ether');
        console.log("val1" , val1)
    
 



 //this.state.rows[i] = this.state.tb;


     
 



        this.setState({
            tb: <Table.Row key= {i}>
             <Table.Cell>
                   {
                        i+1
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        this.props.summary[6]
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        name
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        val1
                    }
                </Table.Cell>
            </Table.Row>
        })
        
       
            this.state.rows[i] = this.state.tb;

        
                
            
        
        
    }
}
 catch (error) {
    console.log(error);
}
}

render() {
    const { Header , Row , HeaderCell , Body} = Table;
    return <div><h3>Internal Contract Transactions</h3>

            <Table>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Index</Table.HeaderCell>
                        <Table.HeaderCell>From</Table.HeaderCell>
                        <Table.HeaderCell>To</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.rows}
                    {/* {this.renderInt} */}
                </Table.Body>
                <Table.Body>
                    {this.state.tb}
                </Table.Body>
            </Table>
            </div>
            
          
     
    
}

}
export default Int;

