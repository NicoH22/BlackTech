import React, { Component } from 'react';
import axios from "axios";


export default class SousCategorie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subcategories: []
        }

    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/subcategories/')
            .then(res => {

                const subcategories = res.data.sous_categories;
                this.setState({ subcategories });
            });
    }

    render() {
        return (
            <div className='col-1 border border-dark justify-content-center '>
                <h6>Sous-Categories</h6>
                {this.state.subcategories.map((elt) =>
                    <a href={'/categories/'+elt.name+'/'+elt.id} > {elt.name}</a>
                )}
            </div>
        )
    }
}
