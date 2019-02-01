import React  , {Component} from 'react';
import {Form , Button , Message , Input} from 'semantic-ui-react';
import Campaign from '../../../campaign';
import web3 from '../../../web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';
import Loader from '../../../components/Loader';
import userData from '../../json_demo.json' ;
import Autocomplete from 'react-autocomplete';
import {Names , getNames} from '../../ud'



class RequestNew extends Component{
    state = {
        value: '',
        description: '',
        recipient: '',
        loading : false,
        errorMessage: '',
        value1: ''
    }


    static async getInitialProps(props)
    {
        const accounInfo = props.query.accountInfo;
        const address = props.query.address;
        let campaign = await Campaign(address);
        
        let summary =  await campaign.methods.getSummary().call();
        
        return { address , accounInfo , summary}
    }
    isDisabled = () =>{
        if(this.state.description == '' || this.state.value1 == '' || this.state.value == ''){
            return true;
        }
        return false ;
  }

    onSubmit = async (event) =>
    {
        event.preventDefault();
        console.log("=============>" , this.props.address);
        console.log("+++++++++++++", this.props.accountInfo);

        const campaign = Campaign(this.props.address);
        const {description , value , recipient}
        = this.state;
        let recipientAddress = '' ;
           
            if(  !((this.state.value1).startsWith('0x'))  ){
                userData.map((v, i) => {
                    if(userData[i].name == this.state.value1){
                        recipientAddress = userData[i].address;
                    }
                });
    }
    else {
                recipientAddress = this.state.value1 ;
                console.log("beneADress === "+ recipientAddress);
    }
            console.log("beneAdress1 = "+ recipientAddress+ 'for name = '+this.state.recipient);

        this.setState({loading: true , errorMessage: ''} )
        
        try{
            
            
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
          
            await campaign.methods.createRequest(description , web3.utils.toWei(value, 'ether'), recipientAddress ).send({from: this.props.accounInfo , gas: 4000000});


            Router.pushRoute(`/campaigns/${this.props.accounInfo}/${this.props.address}/requests`);

        }
        catch(err)
        {
            console.log(err);
         this.setState({errorMessage: err.message});
         
        }
        this.setState({loading: false})


    }
    render()
    {
        return <Layout>
            <Link route = {`/campaigns/${this.props.accounInfo}/${this.props.address}/requests`} >
            <a style= {{marginLeft: '80px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
           <h2 style ={{marginLeft: '80px'}}>Request for Campaign: {this.props.summary[6]}</h2>
           
        <Form onSubmit={this.onSubmit} error ={!!this.state.errorMessage} style={{marginLeft: "500px" , marginRight: "500px"}}>
      
                  <Form.Field error ={!!this.state.errorMessage} required>
                    
                    <label>Recipient</label>
                    
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
                        
                        </div>
                    
        </Form.Field>

            <Form.Field required>
                <label>Value (in ether)</label>
                <Input value ={this.state.value}  onChange={event => {
                    this.setState({value: event.target.value})
                }}/>
            </Form.Field >
            <Form.Field required>
                <label>Description</label>
                <Input value ={this.state.description}  onChange={event => {
                    this.setState({description: event.target.value})
                }}/>
            </Form.Field>
           
           
            <Message error header= "Oops" content= {this.state.errorMessage} />
            <Button loading={this.state.loading} disabled = {this.isDisabled()}>Create!</Button>
        </Form>
        <Loader active= {this.state.loading} />
        </Layout>
    }
}
export default  RequestNew;