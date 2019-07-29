import React from 'react';
import './Detail.css';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      products: [],
      img: [],
    };
  }

  componentDidMount() {
    const uri = window.location.href;
    const id = uri.split('/');
    Promise.all([
      axios.get('http://127.0.0.1:8000/api/products/' + id[4]),
      axios.get('http://127.0.0.1:8000/api/pictures/' + id[4]),
    ]).then(([productsResponse, imgResponse]) => {
      this.setState({ products: productsResponse.data, img: imgResponse.data });
    });

    axios
      .post('http://127.0.0.1:8000/api/visit/count/' + id[4], null, {
        Accept: 'application/json',
        'Content-Type': 'appliction/json',
      })
      .then(res => {});
  }

  add = () => {
    var showBuy = [];

    var show = {
      id: this.state.products.id,
      title: this.state.products.name,
      description: this.state.products.description,
      price: this.state.products.price,
      quantity: 1,
      weight: this.state.products.weight,
    };

    showBuy.push(show);
    showBuy = showBuy.concat(JSON.parse(localStorage.getItem('Buy') || '[]'));

    localStorage.setItem('Buy', JSON.stringify(showBuy));
    window.location.reload();
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="card col-6 offset-3 mt-4 ">
          <div className="card-body ">
            <h3 className="card-title text-center">
              {this.state.products.name}
            </h3>

            {this.state.img.map(img => (
              <img
                className="card-img-top imgCard img_size"
                src={`http://127.0.0.1:8000/uploads/${img.name}`}
                alt={img.name}
              />
            ))}
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="description" title="description">
                {this.state.products.description}
              </Tab>
              <Tab eventKey="caracteristiques" title="caracterestiques">
                {this.state.products.characteristic}
              </Tab>
            </Tabs>
            <div className="ui labels m-4">
              <p className="ui huge label">{this.state.products.price}$</p>
              {this.state.products.quantity > 10 ? (
                <p className="ui teal tag label">En stock</p>
              ) : this.state.products.quantity > 0 ? (
                <p className="ui yellow tag label">Bientôt épuisé</p>
              ) : (
                <p className="ui red tag label">Épuisé</p>
              )}
            </div>
            <input type="hidden" value={this.state.value} />
            <Button
              variant="success"
              className="btn-article"
              onClick={this.add}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
