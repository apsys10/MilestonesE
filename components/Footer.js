import React from 'react';
import { Icon } from 'semantic-ui-react';



export default () =>{
    return   <footer style ={{position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%',
    background: 'grey', 
    
  padding: '1rem',
    color: 'white',
    TextAlign: 'center',
    marginTop: '20px'}}>
    
    <a style= {{color: 'white' , fontSize:'18px'}}>Contact us </a> <Icon name='bell'></Icon>
    <a style= {{color: 'white' , fontSize:'18px'}}>Terms and Conditions</a><Icon name='file'></Icon>
    <a style= {{color: 'white', fontSize:'18px'}}>Privacy Policy</a>
    <Icon name='privacy'></Icon>
    </footer>
}