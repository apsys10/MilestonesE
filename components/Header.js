import React , {Component} from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link , Router } from '../routes';



class Header extends Component{
state={
    currentUser: '',
    account: ''
}

componentDidMount = () =>
{
    
     let currentUser;
     let account;
currentUser = localStorage.getItem('currentUser');
account = localStorage.getItem('account');

    this.setState({currentUser: currentUser});
    this.setState({account: account});
}
 route = () =>
 {
     Router.pushRoute('/login');
 }
  logout = async () =>
 {    
     console.log("in logout")
     await localStorage.removeItem('currentUser');
     await localStorage.removeItem('account');
     
     await Router.pushRoute('/');
     window.location.reload();
     
 }





   render(){
 console.log(this.state.currentUser);

    let header;
    if(this.state.currentUser == null)

    {
        header = <Menu inverted size = "massive">
        <Link route="/"> 
        <a className="item">Home</a>
        </Link>
        <Link > 
        <a className="item" href ="#about">About us</a>
        </Link>
     
        <Menu.Item position="right">
        <Button onClick = {this.route}>
        
        Login
        
        </Button>
        </Menu.Item>
       
        
    </Menu>
    }
    else {
        header = <Menu inverted size = "massive">
        <Link route="/"> 
        <a className="item">Home</a>
        </Link>
       
        <Link route= {`/bit/${this.state.account}`} > 
        <a className="item">Campaigns</a>
        </Link>
        <Menu.Item >
       <p>Welcome {this.state.currentUser} !</p>
        </Menu.Item>
        
     
        
        <Menu.Item position="right">
        <Button onClick= {this.logout}>
            Logout
        </Button>
        </Menu.Item>
        
        
    </Menu>
    }
    return header
   }
    
}
export default Header;


