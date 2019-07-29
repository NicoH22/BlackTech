import React from 'react';
import './PanierAll.css';

export default class PanierAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      count: '',
      price: [],
      total: 0,
    };
  }

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem('Buy'));
    let tab = [];
    if (product) {
      this.setState({ products: product });
      product.map(products => {
        tab.push(products.price);
        this.setState({ price: tab });
      });

      var total = tab.reduce((a, b) => a + b, 0);
      this.setState({ total });
    }
  }

  deleteProduct = i => {
    let { products } = this.state;
    products.splice(i, 1);
    this.setState({ products: products });
    localStorage.removeItem('Buy');
    localStorage.setItem('Buy', JSON.stringify(this.state.products));
    window.location.reload();
  };

  render() {
    return (
      <div className="ui simple dropdown">
        <a className="nostyle" href={'/panier/'}>
          <i className="bordered inverted large shopping cart icon"></i>
        </a>
        <div className="left menu">
          <div className="container">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Produit</th>
                    <th scope="col" className="text-center">
                      Quantité
                    </th>
                    <th scope="col" className="text-right">
                      Prix
                    </th>
                    <th> </th>
                  </tr>
                </thead>
                {!this.state.products ? (<h2>Votre panier est vide !</h2>) : null}
                <tbody>
                  {this.state.products.map((product, i) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>
                          <input
                            className="form-control"
                            type="number"
                            value={product.quantity}
                          />
                        </td>
                        <td className="text-right">{product.price}</td>
                        <td className="text-right">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={this.deleteProduct}
                            key={i}
                            onClick={this.deleteProduct.bind(this, i)}
                          >
                            <i className="fa fa-trash"></i> Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Livraison</td>
                    <td className="text-right"></td>
                  </tr>
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
        </div>
      </div>
    );
  }
}
