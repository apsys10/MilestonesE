import React, { Component } from 'react';

import { Table, Container } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import factory from '../factory';
import web3 from '../web3';
import userData from './json_demo.json';
import Campaign from '../campaign';
import InternalTrans from '../components/internalTrans';
import Wrap from '../components/Wrap';




class Transaction extends Component {




    state = {
        tb: '',
        tb1: '',
        tbRow: [],
        tb2: '',
        rows: []
    }

    componentDidMount() {
        this.showTransactions();
     
    }
    static async getInitialProps(props) {
        const accountInfo = props.query;
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { accountInfo , campaigns}
    }
    

    showTransactions = async () => {

      
        
        let tx, tx1;
        let totalBlocks = await web3.eth.getBlockNumber();
        let j =1;

      
        for (let i = 0; i < totalBlocks; i++) {
          
            tx = await web3.eth.getTransactionFromBlock(i+1);
           


           let from1 = userData.map((v, i) => {
                if (tx.from == userData[i].address) {
                    return userData[i].name
                }

            });

            if (tx.value !== "0") {
                let to1;
                let campaign = await Campaign (tx.to);
               
                let summary =  await campaign.methods.getSummary ().call ();
                
                
                this.setState({
                    tb: <Table.Row key={i}>
                        <Table.Cell>{j}</Table.Cell>
                        <Table.Cell>{
                            from1
                        }</Table.Cell>
                        <Table.Cell>{(tx.to === null) ? '0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0' : summary[6]}</Table.Cell>
                        <Table.Cell>{tx.gas}</Table.Cell>
                        <Table.Cell>{web3.utils.fromWei(tx.gasPrice, 'ether')}</Table.Cell>
                        <Table.Cell>{web3.utils.fromWei(tx.value, 'ether')}</Table.Cell>
                    </Table.Row>
                })
                  this.setState({
                    tb1: <Table.Row key={i}>
                        <Table.Cell>{j}</Table.Cell>
                        <Table.Cell>{
                            from1
                        }</Table.Cell>
                        <Table.Cell>{(tx.to === null) ? '0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0' : summary[6]}</Table.Cell>
                        <Table.Cell>{tx.gas}</Table.Cell>
                        <Table.Cell>{web3.utils.fromWei(tx.gasPrice, 'ether')}</Table.Cell>
                        <Table.Cell>{web3.utils.fromWei(tx.value, 'ether')}</Table.Cell>
                    </Table.Row>
                })
                this.state.tbRow[j-1] = this.state.tb;
                j= j+1;
                
            }
           

            
            
        }

    }
   







    render() {

        return (
            <Layout>
                <Link route={`/id/${this.props.accountInfo.accountInfo}`} >
                    <a style={{ marginLeft: '80px', fontSize: '15px' }}>

                        Back
                    </a></Link>


           <h3>External Transactions</h3>
                <Table striped padded size='small' color="grey">
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Index</Table.HeaderCell>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To (Campaign)</Table.HeaderCell>
                            <Table.HeaderCell>Gas</Table.HeaderCell>
                            <Table.HeaderCell>Gas Price in ether</Table.HeaderCell>
                            <Table.HeaderCell>Value in ether</Table.HeaderCell>
                            {/* <Table.HeaderCell>Transaction Hash</Table.HeaderCell> */}
                        </Table.Row>

                    </Table.Header>
                    <Table.Body>
                        {this.state.tbRow}
                    </Table.Body>
                    <Table.Body>
                        {
                            this.state.tb1
                        }
                    </Table.Body>
                </Table>

                <InternalTrans />
            </Layout>
        );
    }
}

export default Transaction;

// {(tx.to === null) ? 'contract' : tx.to}