import React, { Component } from 'react';
import axios from 'axios';
import './Populaire.css';
import Slider from 'react-slick';

export default class Populaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      produits: [],
      id: '',
      img: [],
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/visit/best').then(({ data }) => {
      const produits = data;
      let index = 0;

      produits.map(({ id }) => {
        axios
          .get('http://127.0.0.1:8000/api/pictures/' + id)
          .then(({ data }) => {
            const name = data[0].name;
            produits[index]['img'] = name;
            index++;
            this.setState({ produits });
          });
      });
    });
  }

  render() {
    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      responsive: [
        {
          arrows: false,
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          arrows: false,
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          arrows: false,
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div>
        <p className="titlePop">PRODUITS POPULAIRES</p>
        <div className="container stylePop">
          <Slider {...settings}>
            {this.state.produits.slice(0, 5).map(produit => (
              <div className="containerPop" key={produit.id}>
                <a href={'/detail/' + produit.id}>
                  <p className="titlePopspace">{produit.name}</p>
                </a>
                <hr />
                <a href={'/detail/' + produit.id}>
                  <img
                    className="imgPop"
                    src={`http://127.0.0.1:8000/uploads/${produit.img}`}
                    alt="Image populaire"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
