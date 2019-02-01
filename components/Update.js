import React, { Component } from 'react';
import {Segment , Header , Icon} from 'semantic-ui-react';

import Loader from './Loader';
import Wrap from './Wrap';


class Update extends Component {
  
  render (){
   
   
  let update = this.props.update;
   let arr = this.props.updateArr;
   //console.log(arr[0].done);
   let pos;
   let icon;
   if(this.props.id == arr.length -1)
   {
       pos = "Latest";
       icon = <Icon name = 'bolt'></Icon>
      
   }
   else{
       pos = null;
       icon = null;
   }
   let content;
       
             
           content = <Wrap>
               <h1 style ={{fontFamily: 'Ariel' , fontSize: '20px'}}>{pos} {icon}
               <p><strong><Icon name ='bell'></Icon>{update.title}</strong></p></h1>
           <p>{update.message}</p>  
           
           </Wrap>
        

   


    
      return content

    

    

  }
}
export default Update;