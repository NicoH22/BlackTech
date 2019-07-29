import React, {Component} from 'react';
import {Button, Icon, Menu, Segment, Sidebar} from 'semantic-ui-react';

import Article from './Article';
import Populaire from "./Populaire";
import axios from 'axios';



export default class SideBar extends Component {
    state = {
        visible: false,
        categories: [],
    };

    handleShowClick = () => this.setState({visible: true});
    handleSidebarHide = () => this.setState({visible: false});


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(res => {
                const categories = res.data.categories;
                this.setState({categories});
            });
    }

    render() {
        const {visible} = this.state;
        return (
            <div>
                <Button disabled={visible} onClick={this.handleShowClick}><Icon name='bars'/>
                </Button>

                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        {this.state.categories.map(categorie => <Menu.Item key={categorie.id} tag='a' href={categorie.name}><p
                            className="text-white">{categorie.name}</p></Menu.Item>)}

                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Populaire/>
                            <Article/>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}
