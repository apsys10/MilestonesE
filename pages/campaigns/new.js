import React , {Component} from 'react';
import Layout from '../../components/Layout';
import {Button , Form , Input , Message} from 'semantic-ui-react';
import factory from '../../factory';

import {Router , Link} from '../../routes';
import Loader from '../../components/Loader' ;
import userData from '../json_demo.json' ;
import Modal from '../../components/Modal';
import web3 from '../../web3';
import Autocomplete from 'react-autocomplete';
import { getNames, Names } from '../ud';


class CampaignNew extends Component
{
   state = {
       minimumContribution: '',
       beneficiary: '',
       name: '',
       description: '',
       goal: '',
       errorMessage:'',
       loading: false,
       disabled: true,
       value1: ''
   };

static async getInitialProps(props) {
    const accountInfo = props.query;
     return {accountInfo}
}



onSubmit = async (event)=>{

            event.preventDefault();
            this.setState({loading: true , errorMessage: ''})
             let beneficiaryAddress = '' ;
            // userData.map((v, i) => {
            //     if(userData[i].name == this.state.beneficiary){
            //          beneficiaryAddress = userData[i].address;
            //     }
            // });
            if(  !((this.state.value1).startsWith('0x'))  ){
                userData.map((v, i) => {
                    if(userData[i].name == this.state.value1){
                        beneficiaryAddress = userData[i].address;
                    }
                });
    }
    else {
                beneficiaryAddress = this.state.value1 ;
                console.log("beneADress === "+ beneficiaryAddress);
    }
            console.log("beneAdress1 = "+ beneficiaryAddress+ 'for name = '+this.state.beneficiary);

            try{    let min = web3.utils.toWei(this.state.minimumContribution, 'ether')
                    await factory.methods.createCampaign(min , beneficiaryAddress, this.state.name, this.state.description, this.state.goal).send({from: this.props.accountInfo.accountInfo , gas: 3000000});
                    //this.inform();
                    Router.pushRoute(`/index/${this.props.accountInfo.accountInfo}`);
                    
            }
         catch(err)
            {
                this.setState({errorMessage: err.message})
            }

            this.setState({loading: false});
            
 }


    isDisabled(){
          if(this.state.minimumContribution == '' || this.state.value1 == '' || this.state.goal ==''){
              return true;
          }
          return false ;
    }

 
    render()
    {
        return <Layout><h3 style= {{marginLeft: '40px'}}>Create A Campaign</h3>
         <Link route = {`/id/${this.props.accountInfo.accountInfo}`} >
            <a style= {{marginLeft: '40px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
        <Form error ={!!this.state.errorMessage} style={{marginLeft: "500px" , marginRight: "500px"}}>
        <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label> Campaign Name</label>
                    <Input  labelPosition = "right" 
                            value={this.state.name}
                            onChange= {event => this.setState ({name : event.target.value})}
                    />
        </Form.Field>
        <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label>Goal Amount (in ether)</label>
                    <Input  labelPosition = "right" 
                            value={this.state.goal}
                            onChange= {event => this.setState ({goal : event.target.value})}
                    />
                </Form.Field>
        <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label>Description</label>
                    <Input  labelPosition = "right" 
                            value={this.state.description}
                            onChange= {event => this.setState ({description : event.target.value})}
                    />
        </Form.Field>
              
        <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label>Initiator</label>
                    
                    <div  >
                            <Autocomplete 
                           
                            value={ this.state.value1 }
                            
                           
                              wrapperStyle={{ width: '100%' }}
                              
                            items={ Names() }
                            getItemValue={ item => item.name }
                            shouldItemRender={ getNames }
                            onChange={(event, value1) => this.setState({ value1 }) }
                            onSelect={ value1 => this.setState({ value1 }) }
                            renderMenu={ children => (
                            <div className = "menu">
                                { (this.state.value1 !== '')?
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
     
       
        <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label>Minimum Contribution (in ether)</label>
                    <Input  labelPosition = "right" 
                            value={this.state.minimumContribution}
                            onChange= {event => this.setState ({minimumContribution : event.target.value})}
                    />
                </Form.Field>
               
        <Message error header= "Oops!" content ={this.state.errorMessage} />
      
      {/* <Button loading = {this.state.loading} primary disabled = {this.isDisabled()} >
         Create</Button> */}
         <Modal name= {this.state.value1} min={this.state.minimumContribution} accountInfo ={this.props.accountInfo.accountInfo} CampaignName = {this.state.name} description ={this.state.description} goal = {this.state.goal} clicked ={this.onSubmit} disabled = {this.isDisabled()}/>

        </Form>
        <Loader active = {this.state.loading}/>
       
        
     </Layout>
    }
}

export default CampaignNew;



