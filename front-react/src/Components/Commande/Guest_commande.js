import React from 'react';
import NavBar from '../NavBar';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import Checkout from './Checkout';

export default class Guess_commande extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: [],
      total: 0,
      totalP: 0,
      newTotal: 0,
      fdps: [],
      value: 0,
      tab: [],
      weight: [],
      quantity: [],
    };
    this.quantity = this.quantity.bind(this);
  }

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem('Buy'));
    var totalPrice = 0;
    if (product) {
      this.setState({ products: product });
      product.map(products => {
        totalPrice += products.price * products.quantity;

        this.state.tab.push(products.price);
        this.state.tab.push(this.state.value);
        this.state.weight.push(products.weight);
        this.setState({ price: this.state.tab });
      });
      this.setState({ total: totalPrice });
    }
  }

  quantity(i, e) {
    if (this.state.products[i] !== undefined) {
      this.state.products[i].quantity = e.target.value;
      this.setState({ products: this.state.products });
      var totalPrice = 0;
      this.state.products.map(prod => {
        totalPrice += prod.price * prod.quantity;
      });
      this.setState({ total: totalPrice });
    }
  }

  _handleChange = event => {
    this.setState({ value: event.target.value });

    let y = parseInt(this.state.total) + parseInt(5);
    let z = parseInt(this.state.total) + parseInt(10);
    let a = parseInt(this.state.total) + parseInt(0);

    var t = 0;

    if (this.state.weight.length > 3) {
      t = y;
    } else if (this.state.weight.length > 5) {
      t = z;
    } else if (this.state.weight.length <= 3) {
      t = a;
    }
    let x = parseInt(t) + parseInt(event.target.value);
    this.setState({ newTotal: x });
    this.setState({ totalP: t });
  };

  handleCheckout() {
    return <Checkout total={this.state.total} products={this.state.products} />;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h3 className="confirm_title">
            Veuillez entrer vos coordonnées pour la livraison.
          </h3>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="8 offset-2" className="mt-5">
                <MDBCard>
                  <MDBCardBody className="paddingBody">
                    <form
                      className="ui form"
                      encType="multipar/form-data"
                      onSubmit={this.handleCheckout}
                    >
                      <h2 className="ui dividing header centered">
                        Adresse de Livraison
                      </h2>
                      <div className="two fields">
                        <div className="field">
                          <label>Nom</label>
                          <input
                            type="text"
                            name="nom"
                            value={this.state.nom}
                            placeholder="Nom"
                            onChange={item => {
                              this.setState({ nom: item.target.value });
                            }}
                          />
                        </div>
                        <div className="field">
                          <label>Prénom</label>
                          <input
                            type="text"
                            name="prenom"
                            value={this.state.prenom}
                            placeholder="Prénom"
                            onChange={item => {
                              this.setState({ prenom: item.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label>Adresse</label>
                        <input
                          type="text"
                          name="adresse"
                          value={this.state.adresse}
                          placeholder="Adresse"
                          onChange={item => {
                            this.setState({ adresse: item.target.value });
                          }}
                        />
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label>Ville</label>
                          <input
                            type="text"
                            name="ville"
                            value={this.state.ville}
                            placeholder="Ville"
                            onChange={item => {
                              this.setState({ ville: item.target.value });
                            }}
                          />
                        </div>
                        <div className="field">
                          <label>Code Postal</label>
                          <input
                            type="text"
                            name="codepostal"
                            placeholder="Code Postal"
                            onChange={item => {
                              this.setState({ codepostal: item.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="two fields">
                        <div className="field">
                          <label>
                            Numéro de téléphone (Pour les mises à jour sur la
                            livraison) :
                          </label>
                          <input
                            type="text"
                            name="phonenumber"
                            value={this.state.phonenumber}
                            placeholder="Numéro de téléphone"
                            onChange={item => {
                              this.setState({ phonenumber: item.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    <Checkout
                      total={this.state.total}
                      products={this.state.products}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
