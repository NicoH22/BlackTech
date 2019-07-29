import React from 'react';
import NavBar from "../NavBar";
import Populaire from "./Populaire";
import Article from "./Article";
import Promo from "./Promo";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Promo/>
                <Populaire/>
                <Article/>
            </div>
        )
    }
}
