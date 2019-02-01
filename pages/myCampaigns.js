import React, {Component} from 'react';
import factory from '../factory';
import {Card, Button, Form, Label, Input , Dropdown} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link, Router} from '../routes';
import Info from '../components/Grid3';
import Wrap from '../components/Wrap'


class MyCampaigns extends Component{
    

    static async getInitialProps(props)
    {   const accountInfo = props.query;
        const MyCampaigns = await factory.methods.getMyCampaigns(accountInfo.accountInfo).call();
    
        return {MyCampaigns , accountInfo}
    }


 renderCampaigns () {

        let latest = this.props.MyCampaigns.length ;
    
        const items = this.props.MyCampaigns.map ((address, index) => {
            console.log("address of campaign", address)
          return {
    
            header: " Campaign:   #" + (index +1),
                color: (index+1 == latest)? "green" : "null",
                description: (
                <Wrap>
                
                <br />
                   <Info address = {address} accountInfo = {this.props.accountInfo.accountInfo}/>
                   <br />
                   <div>
              <br />
        {/* <Link route={`/details/${this.props.accountInfo.accountInfo}/${address}`}>
            <a style={{fontSize: "20px" , padding: "5px"}}> view details </a>
          </Link> */}
          
          </div>
                   </Wrap>
                 ),
                fluid: true,
            };
        }).reverse();
        return <Card.Group items={items} style={{marginLeft: '80px' ,marginRight: '80px'}} />;
     }
      
 render () {
       return (
          <Layout>
              <div >
                  <h3 style = {{padding: '10px' , color : 'black' , marginLeft: '80px'}}>My Campaigns</h3>
                      {this.renderCampaigns()}
              </div>
           </Layout>
        );
      }
    }
export default MyCampaigns;