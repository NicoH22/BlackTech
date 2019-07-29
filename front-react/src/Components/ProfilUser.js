import React from 'react';
import NavBar from "./NavBar";
import axios from "axios";
import {Button} from "semantic-ui-react";


export default class ProfilUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:[],
            products:[],
            img:[],
        };

    }

componentDidMount() {
    axios.get('http://localhost:8000/api/profil',{
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            Accept: 'application/json',
        }
    })
        .then(res=>{
            // console.log(res.data);
            const user = res.data;
            this.setState({user:res.data});
            console.log(user)

        })
}




    render() {
        return(
            <div >
            <NavBar/>
            <div className="container">
            <div >
                <h2 className='text-center'>Mes Informations</h2>
                <a href={'/editprofil'}><Button className="btn-link">Modifier mes informations</Button></a>
            </div>
                <div className="ui inverted segment">
                    <div className="ui inverted form">

                        <div className="five fields">
                            <div className="field">
                                <label>Prenom</label>
                                <h4 className='text-light'>{this.state.user.first_name}</h4>
                            </div>
                            <div className="field">
                                <label>Nom de famille</label>
                                <h4 className='text-light'>{this.state.user.name}</h4>
                            </div>
                            <div className="field">
                                <label>Date de Naissance</label>
                                <h4 className='text-light'>{this.state.user.date_birth}</h4>
                            </div>
                            <div className="field">
                                <label>Numero de telephone</label>
                                <h4 className='text-light'>{this.state.user.phone_number}</h4>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <h4 className='text-light'>{this.state.user.email}</h4>
                            </div>
                            <div className="field">
                                <label>date d'inscription</label>
                                <h4 className='text-light'>{this.state.user.created_at}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className='text-center'>Mes Commandes</h3>
                <table className="ui selectable inverted table">
                    <thead>
                    <tr>
                        <th>reference</th>
                        <th>date</th>
                        <th>nombre article</th>
                        <th>prix</th>
                        <th>statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a  className='text-danger'>R30592985j43953</a></td>
                        <td>19-2-05</td>
                        <td>2</td>
                        <td>255 e</td>
                        <td>Livree</td>
                    </tr>
                    <tr>
                        <td><a  className='text-danger'>Goei0358853053</a></td>
                        <td>19-28-06</td>
                        <td>1</td>
                        <td>300 e</td>
                        <td>en cours de preparation</td>
                    </tr>

                    </tbody>
                </table>
            </div>
            </div>
        )
    }

}