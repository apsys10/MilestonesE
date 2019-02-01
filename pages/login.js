import React, { Component } from 'react';
import factory from '../factory';
import { Card, Button, Form, Label, Input, Dropdown, Message, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link, Router } from '../routes';
import web3 from '../web3';
import { getNames, Names } from './ud'

import userData from './json_demo.json';
import Autocomplete from 'react-autocomplete';

class TrueLogin extends Component {
  state = {
    // accountInfo: this.props.accounts[0],
    accountInfo: '',
    EMessage: '',
    password: '',
    username: '',
    passwordMatch: '',
    UserExists: false
  };

  static async getInitialProps(props) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    const accounts = await web3.eth.getAccounts();
    return { campaigns, accounts };
  }



  onSubmit = async (event) => {

    //     event.preventDefault();

    //       for (let i in userData) {
    //         if (userData[i].name == this.state.username) {
    //           console.log("address of username  " + this.state.username + " is " + userData[i].address + " pwd = " + userData[i].password);
    //           this.setState({ passwordMatch: userData[i].password }, function () {
    //             console.log("match = " + this.state.passwordMatch);
    //           });

    //           console.log("match1 = " + userData[i].password); console.log("pwd input = " + this.state.password);
    //           if (userData[i].password == this.state.password) {
    //             console.log("pswd matched");

    //             await web3.eth.personal.unlockAccount(userData[i].address, this.state.password, 15000);
    //             await localStorage.setItem('currentUser',this.state.username );
    //             Router.pushRoute(`/it/${userData[i].address}`)


    //           }
    //       else {
    //       this.setState({ EMessage: "invalid credentials" });
    //     }

    //   }
    // }
    event.preventDefault();

    for (let i in userData) {
      if (userData[i].name == this.state.username) {
        console.log("address of username  " + this.state.username + " is " + userData[i].address + " pwd = " + userData[i].password);
        this.setState({ passwordMatch: userData[i].password }, function () {
          console.log("match = " + this.state.passwordMatch);
        });

        console.log("match1 = " + userData[i].password); console.log("pwd input = " + this.state.password);

        console.log("username to be searched = " + this.state.username);

        if (userData[i].password == this.state.password && window.localStorage.getItem(this.state.username) !== "false") {
          console.log("pswd matched");
          await web3.eth.personal.unlockAccount(userData[i].address, this.state.password, 15000);
          await localStorage.setItem('currentUser',this.state.username );
          await localStorage.setItem('account', userData[i].address);

          Router.pushRoute(`/it/${userData[i].address}`)

        }
        else {
          if (window.localStorage.getItem(this.state.username) == "false")
            this.setState({ EMessage: 'You Do Not Have Permission To Access Application' });
          else
            this.setState({ EMessage: 'wrong password or username' });
        }
      }
    }
    // else{
    //   this.setState({ EMessage: "invalid credentials " });
    // }

  }
  // method replacement

  //   else {

  //   }
  // }
  // else{
  //   this.setState({EMessage: 'User Does Not Exist'});
  // }




  selectAccount() {
    this.setState({ accountInfo: this.refs.accountSelector.value });
  }

  render() {


    return (

      <Layout >


        <Form onSubmit={this.onSubmit} error={!!this.state.EMessage} style={{ marginLeft: '500px', marginRight: '500px' }} >

          <Form.Field style={{ marginTop: "100px" }} error={!!this.state.EMessage}>
            <Label style={{ color: 'black', fontSize: '15px', marginBottom: '20px' , width: '100%'}} >
              Enter Username and Password
            </Label>
            {/* <Input

              onChange={event => {
                this.setState({ username: event.target.value });
              }}
              label="Username"
              labelPosition="right"
            /> */}
          </Form.Field>
          <Form.Field error={!!this.state.EMessage}>
                    
                    <label>Username</label>
                    
                    <div  >
                            <Autocomplete 
                           
                            value={ this.state.username }
                            
                           
                              wrapperStyle={{ width: '100%' }}
                              
                            items={ Names() }
                            getItemValue={ item => item.name }
                            shouldItemRender={ getNames }
                            onChange={(event, username) => this.setState({ username }) }
                            onSelect={ username => this.setState({ username }) }
                            renderMenu={ children => (
                            <div className = "menu">
                                { (this.state.username !== '')?
                                 children : null} 
                            </div>
                            )}
                            
                            renderItem={ (item, isHighlighted) => (
                            <div
                                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                key={ item.id } >
                                { item.name }
                            </div>
                            )}
                        />
                        {/* </Input> */}
                        </div>
                        </Form.Field>
          <Form.Field error={!!this.state.EMessage}>
          <label>Password</label>
            <Input type="password"
              value={this.state.password}
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
              // label="Password"
              // labelPosition="right"
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.EMessage} />
          <Button>Login</Button>



        </Form>
        <footer style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          background: 'grey',

          padding: '1rem',
          color: 'white',
          TextAlign: 'center',
          marginTop: '20px'
        }}>

          <a style={{ color: 'white', fontSize: '18px' }}>Contact us </a> <Icon name='bell'></Icon>
          <a style={{ color: 'white', fontSize: '18px' }}>Terms and Conditions</a><Icon name='file'></Icon>
          <a style={{ color: 'white', fontSize: '18px' }}>Privacy Policy</a>
          <Icon name='privacy'></Icon>
        </footer>
        
      </Layout>
    );
  }
}
export default TrueLogin;