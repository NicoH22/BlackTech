import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios/index';
import NavBar from '../NavBar';
import { Button } from 'semantic-ui-react';

export default class AddProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      files: [],
      categories_id: '',
      name: '',
      description: '',
      characteristic: '',
      price: '',
      quantity: '',
      selectedFile: null,
      api_token: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/categories').then(res => {
      const categories = res.data.categories;
      this.setState({ categories });
    });
    axios
      .get('http://127.0.0.1:8000/api/admin', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: 'application/json',
        },
      })
      .then(response => {
        if (response.data.code === 200) {
          console.log('AUTORISER');
        }
      })
      .catch(error => {
        this.props.history.push('/');
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    const length = this.state.files.length;
    for (let i = 0; i < length; i++) {
      formData.append('files[]', this.state.files[i]);
    }
    formData.append('categories_id', this.state.categories_id);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('characteristic', this.state.characteristic);
    formData.append('price', this.state.price);
    formData.append('quantity', this.state.quantity);

    axios
      .post('http://127.0.0.1:8000/api/admin/add', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <NavBar />
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8 offset-2" className="mt-5">
              <MDBCard>
                <MDBCardBody className="paddingBody">
                  <form
                    className="ui form"
                    encType="multipar/form-data"
                    onSubmit={this.handleSubmit}
                  >
                    <h2 className="ui dividing header centered">
                      Ajouter un produit
                    </h2>
                    <div className="field">
                      <label>Nom</label>
                      <div className="field">
                        <input
                          type="text"
                          name="name"
                          placeholder="Nom du produit"
                          onChange={item => {
                            this.setState({ name: item.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label>Catégorie</label>
                      <select
                        className="ui fluid dropdown"
                        onChange={item => {
                          this.setState({ categories_id: item.target.value });
                        }}
                      >
                        <option value="">Selectionner une catégorie</option>
                        {this.state.categories.map(categorie => (
                          <option key={categorie.id} value={categorie.id}>
                            {categorie.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Description</label>
                      <div className="field">
                        <textarea
                          name="description"
                          placeholder="Description du produit"
                          onChange={item => {
                            this.setState({ description: item.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label>Caractéristiques</label>
                      <div className="field">
                        <textarea
                          name="caracteristiques"
                          placeholder="Caractéristiques du produit"
                          onChange={item => {
                            this.setState({
                              characteristic: item.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="two fields">
                      <div className="field">
                        <label>Prix</label>
                        <input
                          type="text"
                          name="prix"
                          value={this.state.price}
                          pattern="[0-9]*"
                          placeholder="Prix"
                          onChange={item => {
                            this.setState({ price: item.target.value });
                          }}
                        />
                      </div>
                      <div className="field">
                        <label>Quantité</label>
                        <input
                          type="text"
                          name="quantity"
                          pattern="[0-9]*"
                          placeholder="Quantité"
                          onChange={item => {
                            this.setState({ quantity: item.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label>Image</label>
                      <input
                        type="file"
                        name="files"
                        placeholder="Image"
                        multiple
                        accept=".png, .jpg, .jpeg"
                        onChange={item => {
                          this.setState({ files: item.target.files });
                        }}
                      />
                    </div>
                    <div className="ui centered grid mt-auto">
                      <Button color="grey">Ajouter</Button>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}
