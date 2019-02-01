import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Link, Router } from '../routes';
import {Button} from 'semantic-ui-react';
import userData from './json_demo.json'



class Mid extends Component {
        state = {

            account: '',
            loaded: false
        }


    componentWillMount = async () => {
        let account;
        account = await localStorage.getItem('account')
        this.setState({ account: account });
        this.setState({loaded: true});
    }
   
    


    Handle = async () => {
        let user;
   userData.map((v, i) => {
      if(userData[i].address == this.state.account){
          user = userData[i].role;
      }
  });
        console.log("account in state", this.state.account)

       

        if(user == 'superuser' || user == 'manager')
        {
           Router.pushRoute(`/id/${this.state.account}`);
        }
        else if(user == 'user')
        {
           Router.pushRoute(`/myCampaigns/${this.state.account}`)
        }
        else
        {
           Router.pushRoute(`/ind/${this.state.account}`);
        }





    }

    render() {
 console.log("account in state", this.state.account);
 console.log(typeof this.state.account);
 

        return (
            <Layout>
                
            
    
            {this.state.loaded ? <Button onClick = {this.Handle()}>Welcome Back!</Button>: null}
            </Layout>
        );
    }
}
export default Mid;







