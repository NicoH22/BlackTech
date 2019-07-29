import React from 'react';
import axios from 'axios';
import Product from './Home/Product';
import CardColumns from 'react-bootstrap/CardColumns';
import NavBar from './NavBar';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
    };

    axios
      .get(`http://127.0.0.1:8000/api/search/${this.props.match.params.name}`)
      .then(res => {
        const data = res.data;
        this.setState({ search: data });
      });
  }

  render() {
    return (
      <>
        <NavBar />
        {this.state.search.length === 0 ? (
          <>
            <div class="ui negative big message mt-5">
              <div class="header">
                Le résultat de "{this.props.match.params.name}" a trouvé 0
                article.
              </div>
              <p>Veuillez effectuer une autre recherche.</p>
            </div>
          </>
        ) : (
          <CardColumns className="containerArticle">
            {this.state.search.map(product => (
              <Product product={product} />
            ))}
          </CardColumns>
        )}
      </>
    );
  }
}
