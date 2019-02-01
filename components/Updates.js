import React , {Component} from 'react';
import Wrap from './Wrap';
import {Segment , Header , Icon} from 'semantic-ui-react';
import Campaign from '../campaign';
import Update from './Update';

class Updates extends Component
{
    state ={
        updates: []
    }
        
      
    componentDidMount = async () =>
    {
        const campaign = Campaign(this.props.address);
        this.setState({campaign: campaign});
        const UpdateCount = await campaign.methods.getUpdateCount().call();
        
            const updates = await Promise.all(Array(parseInt(UpdateCount)).fill().map((element , index) =>
        {
            return campaign.methods.updates(index).call();
    }));
    this.setState({updates: updates});
    }
    renderUpdates()
{
    return this.state.updates.map((update , index) =>
    {
        return <Update  update = {update} updateArr = {this.state.updates}
        key= {index} address = {this.props.address} id = {index} accountInfo ={this.props.accountInfo}/>

    }).reverse();

}

    render()
    {   
        return  <Wrap><h1 style ={{fontFamily: 'Ariel'}}>Campaign Progress</h1>
        
       <div style ={{marginRight: "40px" , width: '600px' ,height:'400px' ,overflowY: 'scroll', wordWrap: 'break-word'}}>
        {(this.state.updates.length ==0) ? <Header icon>
           <Icon name='bell slash outline' />
           No Updates yet.
           </Header>:this.renderUpdates()}
        </div>
   
    </Wrap>

    }

}
export default Updates;
