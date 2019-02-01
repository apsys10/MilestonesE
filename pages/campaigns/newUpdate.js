import React  , {Component} from 'react';
import {Form , Button , Message , Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Campaign from '../../campaign';
import {Router} from '../../routes';

class UpdateForm extends Component{

    state = {
        title: '',
        description: '',
        loading : false,
        errorMessage: ''
        
    }
    static async getInitialProps(props)
    {
        const accounInfo = props.query.accountInfo;
        const address = props.query.address;
        
        return { address , accounInfo }
    }
    isDisabled = () =>{
        if(this.state.description == '' || this.state.title == ''){
            return true;
        }
        return false ;
  }
  onSubmit = async (event) =>
  {
      event.preventDefault();
      console.log("=============>" , this.props.address);
      console.log("+++++++++++++", this.props.accounInfo);

      const campaign = Campaign(this.props.address);
      this.setState({loading: true , errorMessage: ''} )
      
      try{
          
        await campaign.methods.createUpdate(this.state.title , this.state.description ).send({from: this.props.accounInfo , gas: 4000000});


          Router.pushRoute(`/details/${this.props.accounInfo}/${this.props.address}`);

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
            <h1 style={{ marginLeft: "80px" , fontFamily: 'Ariel', fontSize: "40px"}}>New Update</h1>
               <Form onSubmit={this.onSubmit} error ={!!this.state.errorMessage} style={{marginLeft: "500px" , marginRight: "500px"}}>
      
      <Form.Field error ={!!this.state.errorMessage} required>
        
        <label>Title</label>
        
        <Input value ={this.state.title}  onChange={event => {
        this.setState({title: event.target.value})
    }}/>
</Form.Field>

<Form.Field required>
    <label>Description</label>
    <textarea value ={this.state.description}  onChange={event => {
        this.setState({description: event.target.value})
    }}/>
</Form.Field >



<Message error header= "Oops" content= {this.state.errorMessage} />
<Button loading={this.state.loading} disabled = {this.isDisabled()}>Add!</Button>
</Form>
<Loader active= {this.state.loading} />
        </Layout>
    }
}


export default UpdateForm;