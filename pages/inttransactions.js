import React, {Component} from 'react';
import {Table, Button, Checkbox, Confirm} from 'semantic-ui-react';
import factory from '../factory';
import Wrap from '../components/Wrap';
import userData from './json_demo.json' ;
import web3 from '../web3';
import Layout from '../components/Layout';

import Campaign from '../campaign';
import { runInThisContext } from 'vm';

class Internal extends Component{

    static async getInitialProps (props){
        console.log("in internal ")
        const campaigns = await factory.methods.getDeployedCampaigns ().call ();
        return { campaigns };
    }


    state = {
        tb: '',
        rows: []
    }

//     renderTo () {


//         console.log("in internal ")
      

//         const address1= campaigns.map((address, i)=> {

//             return address
//         });


//         console.log("address = " + address1)

//         for(let i in address1){
//             console.log("i = " +i+" "+ address1[i])
//             const campaign =  Campaign(address1[i]);
//             const tx=  campaign.methods.getTransactions().call();

//                 console.log("transaction = "+ tx);

//                       tx[0].map((v,i) => {
//                               console.log("to =" + v)
//                       });

//                       tx[1].map((v1,i1)=>{
//                           console.log("amount =" + v1)
//                       });
//         }
    

// }
// renderAmounts = () => {
//     return this.props.people[1].map ((value, index) => {
//       return <Table.Row>
//                        <Table.Cell key = {index}>
//                               {web3.utils.fromWei (value, 'ether')} 
//                       </Table.Cell>
//             </Table.Row>
//          });
//   };


componentDidMount() {
this.internal();
   
}
 internal = () =>{

        
            const address= this.props.campaigns.map((address1, i)=> {
                     return address1
            });
        
        
        console.log("address = " + address);
        address.map( async(v,index)  => {
            
            try{
                const campaign =  await Campaign(address[index]);
                const tx=  await campaign.methods.getTransactions().call();
                console.log("tx= "+ tx);
                for(var i =0; i < tx[0].length; i++)
                    {
                        val = tx[0][i];
                // let val =  tx[0].map((v,i) => {
                //                 console.log("reciepients= "+v)  
                //              return  v
                //        });

        //         let val1=    tx[1].map((amt,i) => {
        //             console.log("amount= " + amt)  
        //            return  amt
        //   });
                          val1 = tx[1][i];

                this.setState({
                        tb:  <Table.Row key={index}>
                                <Table.Cell>
                                    { 
                                       v
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        val
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                       val1
                                    }
                                </Table.Cell>
                            </Table.Row>
                  })
                  this.state.rows[i]=this.state.tb;
            }
        }
    
            catch(e){
                console.log(e);
            }
        });
        }
    
            
  
    
 



   
        render(){
                return(
                        <Layout>

                            <h1>Internal Transactions</h1>
                            
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>FROM</Table.HeaderCell>
                                        <Table.HeaderCell>RECIEPIENT</Table.HeaderCell>
                                        <Table.HeaderCell>VALUE</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                        {this.state.rows} 
                                </Table.Body>
                                <Table.Body>
                                        {this.state.tb} 
                                </Table.Body>
                            </Table>
                           

                        </Layout>
                );
        }
}

export default Internal;