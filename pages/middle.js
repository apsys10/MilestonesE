import React, {Component} from 'react';
import factory from '../factory';
import {Card, Button, Form, Label, Input , Dropdown} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link, Router} from '../routes';
import userData from './json_demo.json'


class Middle extends Component
{   
    static async getInitialProps (props) {
          const accountInfo = props.query.accountInfo;
          return {accountInfo}
     }








  Handle()
  {
   let user;
   userData.map((v, i) => {
      if(userData[i].address == this.props.accountInfo){
          user = userData[i].role;
      }
  });
  console.log('at middle', user)

    console.log("at middle = "+this.props.accountInfo);
   


if(user == 'superuser' || user == 'manager')
{
   Router.pushRoute(`/id/${this.props.accountInfo}`);
}
else if(user == 'user')
{
   Router.pushRoute(`/myCampaigns/${this.props.accountInfo}`)
}
else
{
   Router.pushRoute(`/ind/${this.props.accountInfo}`);
}

  }
  

render(){
   
   return (
      <Layout>
         
         {this.Handle()}
         
      </Layout>
    );
  }
}
export default Middle;





