    import React, { Component } from 'react';
    import {
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBCard,
        MDBCardBody,
        MDBBtn,
        MDBInput
    } from "mdbreact";
    import NavBar from "../NavBar";
import Axios from 'axios';

    export default class LoginAdmin extends Component {
        constructor(props) {
            super(props);
            this.state = { email: '', password: '', api_token: '' };

            this.handleSubmit = this.handleSubmit.bind(this);
          
        }


        handleSubmit(event) {
            const email = this.state.email;
            const password = this.state.password;
            Axios.post('http://127.0.0.1:8000/api/login', {email,password})
            .then(resp =>{
                        localStorage.setItem('token', resp.data.api_token);
                        if (resp.data.code === 200) {
                            this.props.history.push('/');
                        }
            })
            event.preventDefault();
        };

        render() {
            return (
                <div>
                    <NavBar />

                    <MDBContainer>

                        <MDBRow>
                            <MDBCol md="8 offset-2" className="mt-5">
                                <MDBCard>
                                    <MDBCardBody>
                                        <form onSubmit={this.handleSubmit}>
                                            <p className="h2 text-center title py-4">Login</p>
                                            <div className="grey-text">
                                                <MDBInput
                                                    label="Your email"
                                                    name="email"
                                                    group
                                                    type="email"
                                                    onChange={(item) => { this.setState({ email: item.target.value }) }}
                                                    value={this.state.email}
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                />
                                                <MDBInput
                                                    label="Your password"
                                                    name="password"
                                                    group
                                                    type="password"
                                                    onChange={(item) => { this.setState({ password: item.target.value }) }}
                                                    value={this.state.password}
                                                    validate
                                                />
                                            </div>
                                            <div className="text-center mt-4">
                                                <MDBBtn
                                                    color="dark"
                                                    className="mb-3"
                                                    type="submit"
                                                >
                                                    Login
                                            </MDBBtn>
                                            </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            )
        }
    }