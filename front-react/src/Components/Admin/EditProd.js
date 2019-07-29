import React, {Component} from 'react';
import NavBar from '../NavBar';
import './EditProd.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
} from "mdbreact";
import {Button} from "semantic-ui-react";
import axios from 'axios';


export default class AddProd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: ''
        }
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

    handleChange(e) {
        const numbers = (e.target.validity.valid) ? e.target.value : this.state.numbers;

        this.setState({numbers});
    }

    render() {
        return (
            <>
                <NavBar/>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8 offset-2" className="mt-5">
                            <MDBCard>
                                <MDBCardBody className="paddingBody">
                                    <form className="ui form">
                                        <h2 className="ui dividing header centered">Modifier le produit</h2>
                                        <div className="field">
                                            <label>Nom</label>
                                            <div className="field">
                                                <input type="text" name="name"
                                                       placeholder="Nom du produit"/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Description</label>
                                            <div className="field">
                                                <textarea name="description"
                                                          placeholder="Description du produit"/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Caractéristiques</label>
                                            <div className="field">
                                                <textarea name="caracteristiques"
                                                          placeholder="Caractéristiques du produit"/>
                                            </div>
                                        </div>
                                        <div className="fields">
                                            <div className="field">
                                                <label>Prix</label>
                                                <input type="text" name="prix" onInput={this.handleChange.bind(this)}
                                                       value={this.state.numbers}
                                                       pattern="[0-9]*"
                                                       placeholder="Prix"
                                                className="priceSize"/>
                                            </div>
                                            <div className="twelve wide field">
                                                <label>Image</label>
                                                <input type="file" name="image"
                                                       placeholder="Image" multiple
                                                       accept=".png, .jpg, .jpeg"/>
                                            </div>
                                        </div>
                                        <div className="ui centered grid mt-auto">
                                            <Button color="grey">
                                                Modifier
                                            </Button>
                                            <Button color="red">
                                                Supprimer
                                            </Button>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        )
    }


}