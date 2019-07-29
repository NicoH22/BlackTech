import React, { Component } from 'react';
import NavBar from '../NavBar';
import AddCategories from './AddCategories';
import axios from 'axios';

export default class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { api_token: '' };       
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/admin', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                Accept: 'application/json',
            }
        })
            .then(response => {
                if(response.data.code === 200){
                    console.log('AUTORISER');
                }  
            })
            .catch(error =>{
                this.props.history.push('/')
            });
    }


    render() {
        return (
            <>
                <NavBar />
                <h2 className="ui dividing header centered">Admin Panel</h2>
                <AddCategories />
            </>
        )
    }
}
