import React from 'react';
import './panier.css';
import NavBar from '../NavBar';
import Checkout from './Checkout';
import axios from 'axios';

export default class Panier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id_product: '',
      price: [],
      total: 0,
      totalP: 0,
      newTotal: 0,
      value: 0,
      tab: [],
      weight: [],
      quantity: [],
      admin: false,
      login: false,
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
    if (localStorage.getItem('token') === null) {
      this.setState({ login: true });
    }
  }

  supp = i => {
    let { products } = this.state;
    products.splice(i, 1);
    this.setState({ products: products });
    localStorage.setItem('Buy', JSON.stringify(this.state.products));
    window.location.reload();
  };

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

  render() {
    return (
      <div>
        <NavBar />
        <div className="container mb-4">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col" className="text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-right">
                        Price
                      </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((product, i) => {
                      return (
                        <tr>
                          <td>{product.title}</td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              id={product.id}
                              defaultValue={product.quantity}
                              onChange={this.quantity.bind(this, i)}
                              min="1"
                            />
                          </td>
                          <td className="text-right" value={product.price}>
                            {product.price * this.state.products[i].quantity}
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-sm btn-danger"
                              id="button"
                              key={i}
                              onClick={this.supp.bind(this, i)}
                            >
                              <i className="fa fa-trash"></i> Supprimer
                            </button>{' '}
                          </td>
                        </tr>
                      );
                    })}
                    {console.log(this.state.products)}
                    {this.state.products.length === 0 ? (<h2>Votre panier est vide !</h2>) : null}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td className="text-right">
                        <strong>{this.state.total}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col mb-2">
              <div className="row">
                <div className="col-sm-12  col-md-6">
                  <a href={'/'}>
                    <button className="btn btn-block btn-light">
                      Continue Shopping
                    </button>
                  </a>
                </div>
                {this.state.login ? (
                  <div className="col-sm-12 col-md-6">
                    <a href={'../commande_confirmation'}>
                      <button className="btn btn-block btn-info">
                        Checkout
                      </button>
                    </a>
                  </div>
                ) : (
                  <div className="col-sm-12 col-md-6 text-right">
                    <Checkout
                      total={this.state.total}
                      products={this.state.products}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
