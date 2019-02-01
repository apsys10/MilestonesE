import React, { Component } from 'react';
import { Table, Button, Checkbox, Confirm } from 'semantic-ui-react';
import factory from '../factory';
import Wrap from './Wrap';
import userData from '../pages/json_demo.json';
import web3 from '../web3';
import Layout from './Layout';

import Campaign from '../campaign';



class Internal extends Component {

    componentDidMount = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        this.setState({ campaigns: campaigns });
        this.internal();
    }


    state = {
        tb: '',
        rows: [],
        tb1: '',
        tb1rows: [],
        counter: 0,
        campaigns: []
    }



    componentDidMount() {

        this.internal();
    }

    internal = () => {


        const address = this.state.campaigns.map((address1, i) => {
            return address1
        });


        console.log("address = " + address);
        address.map(async (v, index) => {

            try {
                const campaign = await Campaign(address[index]);
                const summary = await campaign.methods.getSummary().call();
                const tx = await campaign.methods.getTransactions().call();
                console.log("tx= " + tx);

                let val = tx[0].map((v, i) => {
                    // console.log("reciepients= "+v)  
                    return v
                });
                console.log("val = " + val + " length = " + val.length)



                let val1 = tx[1].map((amt, i) => {
                    // console.log("amount= " + amt)  
                    return amt
                });


                if (val.length > 1) {

                    for (let j = 0; j < val1.length; j++) {
                        console.log("amount= " + " j=  " + j + " " + val1[j]);
                        let name;
                        for (let k = 0; k < userData.length; k++) {
                            if (val[j] == userData[k].address) {
                                name = userData[k].name;
                            }
                        }

                        this.setState({
                            tb1: <Table.Row key={index}>
                                <Table.Cell>
                                    {
                                        summary[6]
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        name
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                       val1[j]/1000000000000000000
                                    }
                                </Table.Cell>
                            </Table.Row>
                        })
                        this.state.tb1rows[this.state.counter] = this.state.tb1;
                        this.state.counter++;

                    }
                }
                else {
                    let name;
                    for (let k = 0; k < userData.length; k++) {
                        if (val[0] == userData[k].address) {
                            name = userData[k].name;
                        }
                    }
                    this.setState({
                        tb: <Table.Row key={index}>
                            <Table.Cell>
                                {
                                    summary[6]
                                }
                            </Table.Cell>
                            <Table.Cell>
                                {
                                    name
                                }
                            </Table.Cell>
                            <Table.Cell>
                                {
                                val1/1000000000000000000
                                }
                            </Table.Cell>
                        </Table.Row>
                    })
                    this.state.rows[index] = this.state.tb;
                }


            }
            catch (e) {
                console.log(e);
            }

        });

    }

    render() {
        return (

            <Wrap>
                <h3>Internal Transactions</h3>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.rows}
                    </Table.Body>

                    <Table.Body>
                        {this.state.tb}
                    </Table.Body>

                    <Table.Body>
                        {this.state.tb1rows}
                    </Table.Body>
                    <Table.Body>
                        {this.state.tb1}
                    </Table.Body>
                </Table>

            </Wrap>

        );
    }
}

export default Internal;