import React, { Component } from 'react';
import Img from 'react-image';
import axios from "axios";


export default class Picture {
    state={
        name:'',

    };
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/products/${this.state.id}`)

            .then(res=>{
                const products=res.data;
                this.setState({products});
            });
    }
    render() {
        return (
            <Img src={}/>
        )}
}
