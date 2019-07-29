import React, { Component } from 'react';
// import axios from 'axios';
// import './Populaire.css';
import Slider from 'react-slick';
// import { baseUrl } from "./config";
import promo from '../images/promo.png';
import promo2 from '../images/promo2.png';
import promo3 from '../images/promo3.png';
import promo4 from '../images/promo4.png';
import Carousel from 'react-bootstrap/Carousel';

export default class Populaire extends Component {
  render() {
    return (
      <div className={'container mt-10'}>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={promo4} alt="First slide" />
            <Carousel.Caption>
              {/*<h3>First slide label</h3>*/}
              {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={promo} alt="First slide" />
            <Carousel.Caption>
              {/*<h3>First slide label</h3>*/}
              {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={promo2} alt="Third slide" />

            <Carousel.Caption>
              {/*<h3>Second slide label</h3>*/}
              {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={promo3} alt="Third slide" />

            <Carousel.Caption>
              {/*<h3>Third slide label</h3>*/}
              {/*<p>*/}
              {/*  Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
              {/*</p>*/}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
