
import React, { Component } from 'react';
import factory from '../factory';
import { Card, Button, Form, Label, Input, Dropdown, Message, Grid, Image , Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link, Router } from '../routes';
import web3 from '../web3';
import userData from './json_demo.json';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Wrap from '../components/Wrap';





const Wrapper = styled.div`
  padding: 4em;
  background-image: url("/static/corp.jpg");
  height: 100%; 
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;

`;

class Home extends Component {


    render() {
        var background = {backgroundSize : 'cover'};
        var textStyle = {
          position: 'absolute',
          top: '30%', 
          left: '10%' ,
          right: '40%',
          textAlign: "justify",
          fontSize: "20px"
        
        };
        var Style = {
            position: 'absolute',
            top: '10%', 
            left: '20%' ,
            right: '40%',
            textAlign: "justify",
            fontSize: "50px"
          
          };

        return (

            <Layout >

                <h1 style={{ fontSize: "60px" , left: '20%' , position: 'relative'}}>
                    Welcome to ReachYourGoal
           </h1>

                <Grid >
                    <Grid.Row>
                        <Grid.Column width={10}>
                        <p style={{ fontSize: "20px" , textAlign: "justify", marginLeft: "40px"}}>
                        We are a CrowdFunding Platform based on BlockChain. We use ethereum to write smart contracts.  </p>
<p style={{ fontSize: "20px" , textAlign: "justify", marginLeft: "40px"}}>A Blockchain is a public decentralized ledger that securely records transactions between parties anonymously, thus cutting out the middleman. The word “block” refers to the way data is stored; on blocks. Any transaction is broadcasted to all the nodes on the blockchain which have to verify the transaction.</p>
<p style={{ fontSize: "20px" , textAlign: "justify", marginLeft: "40px"}}>
The power of the blockchain technology is immutable, irreversible, and decentralized and was so revolutionary that other competitors decided to create their own blockchain technology and introduce new blockchains with different functions beyond the first version with Bitcoin.
</p> <p style={{ fontSize: "20px" , textAlign: "justify", marginLeft: "40px"}}>Ethereum blockchain is specifically used for smart contract execution, decentralized apps (largely known as DApps today), and autonomous organizations. Ethereum can be used for virtually any kind of transaction or agreement (to put it another way, any kind of activity that has an economic or governance aspect), at a lower cost than conventional alternatives, such as debit card payments, PayPal, and ballot voting, in a way that is decentralized, trustless (no intermediary like a bank is needed, Bob can send X ETH directly to Alice), secure, safe and live , and censorship-resistant.

</p>
                        </Grid.Column>
                        <Image src="/static/etherum123.png" circular style={{ width: "400px", height: "400px" , marginBottom: "20px" , marginLeft: "40px" }} />
                    </Grid.Row>
                    <Grid.Row><a name = "about"></a>
                    <div style={{width: 'auto' , marginRight: '40px' , marginLeft: '40px'}}>
                        <Image src="/static/corp.jpg" style={background} responsive >
                     
                        </Image>
                        
                        <div>
                        <h1 style={Style}>What we do for you?</h1>
                        <p>                        </p>
                        <h1 style={textStyle}>We launch Campaigns for your needs. Contact us and we will deploy a smart contract that meets the need of your SmartFund campaign. You can have your own account through which you can keep track of the money (ethers) in your Campaign. You can use the contract money with permission of majority of your contributers that approve of your requests to pay vendors for your Campaign needs. We ensure transparency which is a major thing that is lacking in most CrowdFunding platforms today.</h1>
</div>
                        </div>
                        </Grid.Row>
                        <Grid.Row>
                            <div style={{width: 'auto' , marginRight: '40px' , marginLeft: '40px', marginTop: '40px'}}>
                          <h1 style={{ fontSize: "40px" , left: '10%' , position: 'relative'}}>
                              How are we better than other funding platforms?
                          </h1>
                          <Grid columns={3} divided style= {{marginTop: '40px'}}>
    <Grid.Row>
      <Grid.Column>
      <h1 style={{fontSize: "20px"}}>Transparent Transactions</h1>
      <Image src='/static/trans1.jpg' />
      
      
       
      </Grid.Column>
      <Grid.Column>
      <h1 style={{fontSize: "20px"}}>Seamless Transactions</h1>
      <Image src='/static/transaction1.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1 style={{fontSize: "20px"}}>No misuse of your donations</h1>
      <Image src='/static/donations.jpg' />
      </Grid.Column>
    </Grid.Row>

    
  </Grid>
                          </div>
                        {/* </Grid.Row>
                      <Grid.Row style={{marginLeft: '40px'}}>
                      <h1 style={{ fontSize: "40px" , left: '10%' , position: 'relative'}}>
                            Our team
                          </h1>
                      </Grid.Row>
                    <Grid.Row style={{ marginRight: '40px' , marginLeft: '40px' , marginTop: '40px'}}>
                        <Grid.Column width={5}>
                            <Image src="/static/person-1.jpg" style={{ width: "200px" }} circular />
                            <h1>person 1</h1>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Image src="/static/person-2.jpg " style={{ width: "200px" }} circular />
                            <h1>person 2</h1>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Image src="/static/person-3.jpg"  style={{ width: "200px" }} circular />
                            <h1>person 3</h1>
                        </Grid.Column>
                    </Grid.Row>
                      */}
{/* <Grid.Row style={{ marginRight: '40px' , marginLeft: '40px' , marginTop: '40px'}}> 
<Form  style={{ marginLeft: '500px', marginRight: '500px' }}>

<Form.Field  >
  <Label style={{ color: 'black', fontSize: '15px' }}>
    Contact Us
  </Label>
  <Input

    label="name"
    labelPosition="right"
  />
</Form.Field>
<Form.Field>
  <Input
  
    label="email"
    labelPosition="right"
  />
</Form.Field>

<Button>Register</Button>



</Form>

</Grid.Row> */}

                </Grid.Row>
                </Grid>
          
              </Layout>
              
              
        );
    }
}
export default Home;