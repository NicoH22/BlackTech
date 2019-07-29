import React, { Component } from 'react';
import NavBar from "./NavBar";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Button} from "semantic-ui-react";
import axios from "axios";

export default class LoginUser extends Component {
constructor(props){
    super(props);
    this.state={
        name:"",
        first_name:"",
        date_birth:"",
        phone_number:"",
        email:"",
        password:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);


}
    componentDidMount(){
    axios.post('http://127.0.0.1.8000/api/register')
        .then(res=>{

        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();


        formData.append("name", this.state.name);
        formData.append("first_name", this.state.first_name);
        formData.append("date_birth", this.state.date_birth);
        formData.append("phone_number", this.state.phone_number);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);


        axios.post("http://127.0.0.1:8000/api/register", formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(res => {
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log(err);
            });

    }




    render() {
        return (
            <>
                <NavBar />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8 offset-2" className="mt-5">
                            <MDBCard>
                                <MDBCardBody className="paddingBody">
                                    <form className="ui form" encType='multipar/form-data' onSubmit={this.handleSubmit}>
                                        <h2 className="ui dividing header centered">Inscription</h2>
                                        <div className="field">
                                            <label>Nom</label>
                                            <div className="field">
                                                <input type="text" name="name"
                                                       placeholder="Nom"
                                                       onChange={(item) => {
                                                           this.setState({ name: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Prenom</label>
                                            <div className="field">
                                                <input type="text" name="prenom"
                                                       placeholder="prenom"
                                                       onChange={(item) => {
                                                           this.setState({ first_name: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Date de naissance</label>
                                            <div className="field">
                                                <input type="date" name="date_birth"

                                                       onChange={(item) => {
                                                           this.setState({ date_birth: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Telephone</label>
                                            <div className="field">
                                                <input type="text" name="telephone"

                                                       onChange={(item) => {
                                                           this.setState({ phone_number: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>

                                        <div className="field">
                                            <label>Email</label>
                                            <div className="field">
                                                <input type="email" name="email"

                                                       onChange={(item) => {
                                                           this.setState({ email: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Mot de passe</label>
                                            <div className="field">
                                                <input type="password" name="password"

                                                       onChange={(item) => {
                                                           this.setState({ password: item.target.value })
                                                       }}
                                                />
                                            </div>
                                        </div>

                                        <div className="ui centered grid mt-auto">
                                            <Button color="grey">
                                                Ajouter
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