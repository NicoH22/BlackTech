import React, { Component } from 'react';
import axios from 'axios';
import './Article.css';
import Card from 'react-bootstrap/Card';
import { Button, Icon } from 'semantic-ui-react';
import LinesEllipsis from 'react-lines-ellipsis';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            url: '',
            admin: false,
            test: ''
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/pictures/distinct')
            .then(response => {
                    const imgs = response.data;
                    this.setState({imgs});
                },
            );
        axios.get('http://127.0.0.1:8000/api/admin', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                Accept: 'application/json',
            }
        })
            .then(response => {
                this.setState({admin: true});
            })

    }

    add = () => {
        var showBuy = [];

        var show = {
            id: this.props.product.id,
            title: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price,
            quantity: 1,
            weight: this.props.product.weight,
        };

        showBuy.push(show);
        showBuy = showBuy.concat(
            JSON.parse(localStorage.getItem("Buy") || "[]")
        );

        localStorage.setItem("Buy", JSON.stringify(showBuy));
        window.location.reload();

    };

    render() {
        return (
            <div>
                <Card key={this.props.product.id}>
                    {this.state.imgs.map(img => {
                            if (this.props.product.id === img.products_id) {
                                return <a key={this.props.product.id} href={'/detail/' + this.props.product.id}><Card.Img
                                    variant="top" src={`http://127.0.0.1:8000/uploads/${img.name}`}/></a>
                            }
                        }
                    )}

                    <Card.Body className="cardBody">
                        <a href={'/detail/' + this.props.product.id}><Card.Title
                            className="titleSize">{this.props.product.name}</Card.Title></a>
                        <Card.Text>
                            <LinesEllipsis
                                text={this.props.product.description}
                                maxLine='3'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                            <a href={'/detail/' + this.props.product.id}>Voir l'article</a>
                        </Card.Text>
                    </Card.Body>

                    <Card.Footer className="cardFooter">
                        <a className="ui right ribbon huge label"
                           href={'/detail/' + this.props.product.id}>{this.props.product.price}$</a>
                        <div className="mt-3">
                            {this.state.admin ? (
                                <a href={'/admin/edit/'}>
                                    <Button color="grey" className="ui button">
                                        Modifier
                                    </Button>
                                </a>
                            ) : (
                                null
                            )}
                            <Button floated="right" icon color="green" className="ui button" onClick={this.add}>
                                Ajouter au panier
                                <Icon name='cart plus'/>
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}
