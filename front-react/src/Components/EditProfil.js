import React, {Component} from 'react';
import NavBar from './NavBar';
import {Button} from "semantic-ui-react";
import axios from 'axios';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";


export default class EditProfil extends Component {
    constructor(props){
        super(props);
        this.state={
            user:[],
            id:'',
            name:"",
            first_name:"",
            date_birth:"",
            phone_number:"",
            email:"",
            password:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/profil',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                Accept: 'application/json',
            }
        })
            .then(res=>{
                const user = res.data;
                this.setState({
                    user:res.data,
                    id:res.data.id,
                  name:res.data.name,
                    first_name:res.data.first_name,
                    date_birth:res.data.date_birth,
                    phone_number:res.data.phone_number,
                    email:res.data.email,
                    password:res.data.password

                });
                console.log(user)

            })

    }
   handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
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

        axios.post("http://127.0.0.1:8000/api/edit/profil/"+this.state.id, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(res => {
                this.props.history.push('/mon_profil');
            })
            .catch(err => {
                console.log(err);
            });

            

    }


    render() {
        console.log(this.state.id);
        return (
            <div>
                <NavBar />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8 offset-2" className="mt-5">
                            <MDBCard>
                                <MDBCardBody className="paddingBody">
                                    <form className="ui form" encType='multipar/form-data' onSubmit={this.handleSubmit}>
                                        <h2 className="ui dividing header centered">Modifier mes informations</h2>
                                        <div className="field">
                                            <label>Nom</label>
                                            <div className="field">
                                                <input type="text" name="name"
                                                      value={this.state.name}
                                                       onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Prenom</label>
                                            <div className="field">
                                                <input type="text" name="first_name"
                                                       value={this.state.first_name}

                                                       onChange={this.handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Date de naissance</label>
                                            <div className="field">
                                                <input type="date" name="date_birth"
                                                       value={this.state.date_birth}
                                                       onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label>Telephone</label>
                                            <div className="field">
                                                <input type="text" name="phone_number"
                                                      value={this.state.phone_number}

                                                       onChange={this.handleChange}

                                                />
                                            </div>
                                        </div>

                                        <div className="field">
                                            <label>Email</label>
                                            <div className="field">
                                                <input type="email" name="email"
                                                     value={this.state.email}
                                                       onChange={this.handleChange}
                                                       />
                                            </div>
                                        </div>


                                        <div className="ui centered grid mt-auto">
                                            <Button 
                                                color="grey"
                                            >
                                                Modifier
                                            </Button>
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