import React, { Component } from 'react';
import { Table, Button, Checkbox, Message} from 'semantic-ui-react';
import Layout from '../components/Layout';
import Wrap from '../components/Wrap';
import userData from './json_demo.json';
import Loader from '../components/Loader';
import {Link} from '../routes';
import Notify from '../components/Message'



class showUsers extends Component {
state ={
    loading: false,
   visible: false
}
static async getInitialProps(props) {
    const accountInfo = props.query;
     return {accountInfo}
}

    show() {

        return userData.map((v, i) => {

            if (userData[i].name !== 'superuser') {
                return <Table.Row key={i} >
                    <Table.Cell>{userData[i].name}</Table.Cell>
                    <Table.Cell>{userData[i].address}</Table.Cell>
                    <Table.Cell><Checkbox id={i} />
                    </Table.Cell>
                </Table.Row>
            }

        });

    }


   changeAcess= async() => {
        this.setState({loading: true })
        let l = userData.length;
        l -= 2;
        while (l != -1) {
            if (document.getElementById(l).checked) {
                console.log("userName = " + userData[l].name);
                window.localStorage.setItem(userData[l].name, "false");
            }
            else {
                window.localStorage.setItem(userData[l].name, "true");
            }

            l--;
            
        }
        this.setState({loading: false });
        this.setState({visible: true })

    }

    handleDismiss = () => {
            this.setState({ visible: false })
           }
    enableAll = async() => {
  
        let l = userData.length;
        for (let i = 0; i < l - 1; i++) {
            window.localStorage.setItem(userData[i].name, "true");
        }
        this.setState({visible: true })
    }

    componentDidMount() {
        let l = userData.length;
        for (let i = 0; i < l - 1; i++) {
            if (window.localStorage.getItem(userData[i].name) == "false") {
                document.getElementById(i).checked = true;
            }
        }
    }

    render() {

        return (
            <Layout>
                       <Link route = {`/id/${this.props.accountInfo.accountInfo}`} >
            <a style= {{marginLeft: '80px', fontSize: '15px'}}>
                
                    Back
                    </a></Link>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name of the user</Table.HeaderCell>
                            <Table.HeaderCell>Address of the user</Table.HeaderCell>
                            <Table.HeaderCell> Disable <input type="checkbox" checked={true} /> /Enable users</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.show()}
                    </Table.Body>
                </Table>

                <Button onClick={this.changeAcess} >Disable</Button>

                <Button onClick={this.enableAll} >Enable All</Button>
                <Loader active = {this.state.loading} />
                <Notify visible= {this.state.visible} handle = {this.handleDismiss}/>
            </Layout>
        );
    }
}

export default showUsers; 