import React, { Component } from 'react';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';
import './Article.css';
import Product from './Product';
import Pagination from 'react-js-pagination';
import { CircleSpinner } from 'react-spinners-kit';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,

      activePage: 1,
      itemsCountPerPage: 1,
      totalItemsCount: 1,
      pageRangeChange: 3,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    axios.get(`http://127.0.0.1:8000/api/products/`).then(response => {
      const products = response.data.data;
      this.setState({
        products,
        loading: false,
        itemsCountPerPage: response.data.per_page,
        totalItemsCount: response.data.total,
        activePage: response.data.current_page,
      });
    });
  }

  handlePageChange = pageNumber => {
    axios
      .get(`http://127.0.0.1:8000/api/products?page=` + pageNumber)
      .then(response => {
        const products = response.data.data;
        this.setState({
          products,
          loading: false,
          itemsCountPerPage: response.data.per_page,
          totalItemsCount: response.data.total,
          activePage: response.data.current_page,
        });
      });
  };

  add = () => {
    var showBuy = [];

    var show = {
      id: this.state.products.id,
      title: this.state.products.name,
      description: this.state.products.description,
      price: this.state.products.price,
      weight: this.state.products.weight,
      quantity: 1,
    };

    showBuy.push(show);
    showBuy = showBuy.concat(JSON.parse(localStorage.getItem('Buy') || '[]'));

    console.log('okoko');
    localStorage.setItem('Buy', JSON.stringify(showBuy));
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="article">
        <div className={'loading'}>
          <CircleSpinner size={70} color="#000000" loading={loading} />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/">Home</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <CardColumns className="containerArticle">
          {this.state.products.map(product => (
            <Product add={this.add} product={product} key={product.id} />
          ))}
        </CardColumns>
        <div className="pagination">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.activePage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={this.state.pageRangeChange}
            onChange={this.handlePageChange}
            itemClass={'page-item'}
            linkClass={'page-link'}
          />
        </div>
        <footer>
          <div className="ui buttons">
            <button class="ui circular twitch icon purple button">
              <i class="twitch icon"></i>
            </button>
            <button class="ui circular instagram icon button">
              <i class="instagram icon"></i>
            </button>
            <button class="ui circular youtube icon button">
              <i class="youtube icon"></i>
            </button>
            <button class="ui circular snapchat icon yellow button">
              <i class="snapchat icon"></i>
            </button>
            <button class="ui circular twitter icon button">
              <i class="twitter icon"></i>
            </button>
          </div>
          <p>Copyright 2019 BLACKTECH©</p>
        </footer>
      </div>
    );
  }
}
