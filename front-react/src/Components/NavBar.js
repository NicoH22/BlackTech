import React from 'react';
import './NavBar.css';
import axios from 'axios';
import PanierAll from './Commande/PanierAll';
import Product from './Home/Product';
import CardColumns from 'react-bootstrap/CardColumns';

// import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      admin: false,
      login: false,
      categories: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/admin', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then(response => {
        if (response.data.code === 200) {
          this.setState({ admin: true });
        }
      });
    if (localStorage.getItem('token') === null) {
      this.setState({ login: true });
    }
    axios.get(`http://127.0.0.1:8000/api/categories/`).then(response => {
      console.log(response.data.categories);
      const categories = response.data.categories;
      this.setState({
        categories,
      });
    });
  }

  handleSearch(event) {
    axios
      .get(`http://127.0.0.1:8000/api/search/${this.state.search}`)
      .then(res => {});
  }

  handleSearch(event) {
    axios
      .get(`http://127.0.0.1:8000/api/search/${this.state.search}`)
      .then(res => {});
  }

  handleClick = () => {
    localStorage.removeItem('token');
  };
  handleDefault(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            BLACK TECH
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href={'/'}>
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {this.state.categories.map(categorie => (
                    <a
                      className="dropdown-item"
                      href={
                        '/categories/' + categorie.name + '/' + categorie.id
                      }
                    >
                      {categorie.name}
                    </a>
                  ))}
                </div>
              </div>

              {this.state.admin ? (
                <li className="nav-item">
                  <a className="nav-link" href={'/admin/panel'}>
                    Admin
                  </a>
                </li>
              ) : null}
              {this.state.login ? (
                <li className="nav-item">
                  <a className="nav-link" href={'/login'}>
                    login
                  </a>
                </li>
              ) : null}

              {this.state.login ? (
                <li className="nav-item">
                  <a className="nav-link" href={'/register'}>
                    register
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href={'/mon_profil'}>
                    <i className="user outline icon">profil</i>
                  </a>
                </li>
              )}

              {!this.state.login ? (
                <li className="nav-item">
                  <a className="nav-link" href={'/'} onClick={this.handleClick}>
                    logout
                  </a>
                </li>
              ) : null}
            </ul>
            <input
              className="form-control mr-sm-2 searchbar"
              type="text"
              placeholder="Rechercher"
              onChange={item => {
                this.setState({ search: item.target.value });
              }}
            />
            {!this.state.search ? (
              <a
                className="btn btn-secondary my-2 my-sm-0 btn-sm"
                href={`/search/${this.state.search}`}
                onClick={this.handleDefault}
              >
                Search
              </a>
            ) : (
              <a
                className="btn btn-secondary my-2 my-sm-0 btn-sm"
                href={`/search/${this.state.search}`}
              >
                Search
              </a>
            )}
            <ul className="navbar-nav ml-4">
              <li className="nav-item">
                <PanierAll />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
