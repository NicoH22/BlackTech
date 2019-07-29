import { Component } from "react";
import axios from "axios";
// import CardColumns from "./Home/Article";
import React from "react";
// import Product from "../Components/Home/Product";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { Button, Icon } from "semantic-ui-react";
import NavBar from "./NavBar";
import SousCategorie from "./SousCategorie";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";



export default class ProductCategorie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produits: [],
            id: '',
            imgs: [],
        }
    }
    componentDidMount() {
        const uri = window.location.href;
        const id = uri.split('/');

        Promise.all([
            axios.get('http://127.0.0.1:8000/api/categories/' + id[5]),
            axios.get('http://127.0.0.1:8000/api/pictures/')
        ])
            .then(([produitsResponse, imgResponse]) => {
                console.log('hhhh: '+ produitsResponse);
                const imgs = imgResponse.data;
                this.setState({ produits: produitsResponse.data, imgs });
                console.log("lol: " + this.state.produits)
            });
    }
    render() {
        return (

            <div>
                <NavBar />
                <Breadcrumb>
                    <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                    <BreadcrumbItem active>category</BreadcrumbItem>
                </Breadcrumb>
                <SousCategorie />
                <CardColumns className="containerArticle" >
                    {this.state.produits.map((elt) => (

                        <Card key={elt.id}>
                            {this.state.imgs.map(img => {
                                if (elt.id === img.products_id) {
                                    return <a href={'/detail/' + elt.id}><Card.Img variant="top" src={`http://127.0.0.1:8000/uploads/${img.name}`} /></a>
                                }
                            }
                            )}
                            <Card.Body>
                                <Card.Title> {elt.name}</Card.Title>

                                <Card.Text>
                                    {elt.description}<br />
                                    <a href={'/detail/' + elt.id}>Voir l'article</a>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="cardFooter">
                                <h4 className="text-muted">{elt.price}$</h4>
                                <a href={'/admin/edit/'}>
                                    <Button color="grey">
                                        Modifier
                    </Button>
                                </a>

                                <Button ui floated="right" icon color="green">
                                    Ajouter au panier
                    <Icon name='cart plus' />
                                </Button>
                            </Card.Footer>
                        </Card>))}
                </CardColumns>
            </div>
        )
    }

}