import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios/index';
import { Button } from 'semantic-ui-react';

export default class AddCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: '',
      nameSupp: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/categories').then(res => {
      const categories = res.data.categories;
      this.setState({ categories });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('name', this.state.name);

    axios
      .post('http://127.0.0.1:8000/api/admin/addCategories', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    window.location.reload();
  }

  handleSubmitDelete(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('name', this.state.nameSupp);

    axios
      .post('http://127.0.0.1:8000/api/admin/deleteCategories', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    window.location.reload();
  }

  render() {
    return (
      <>
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
                      Ajouter une catégorie
                    </h2>
                    <div className="field">
                      <label>Nom de la nouvelle catégorie</label>
                      <div className="field">
                        <input
                          type="text"
                          name="name"
                          placeholder="Nom de la catégorie"
                          onChange={item => {
                            this.setState({ name: item.target.value });
                          }}
                        />
                      </div>
                      <div className="ui centered grid mt-auto mb-3">
                        <Button color="grey">Ajouter</Button>
                      </div>
                    </div>
                  </form>
                  <form
                    className="ui form"
                    encType="multipar/form-data"
                    onSubmit={this.handleSubmitDelete}
                  >
                    <div className="field">
                      <label>Catégorie</label>
                      <select
                        className="ui fluid dropdown"
                        name="nameSupp"
                        onChange={item => {
                          this.setState({ nameSupp: item.target.value });
                        }}
                      >
                        <option value="">Selectionner une catégorie</option>
                        {this.state.categories.map(categorie => (
                          <option key={categorie.id} value={categorie.name}>
                            {categorie.name}
                          </option>
                        ))}
                      </select>
                      <div className="ui centered grid mt-auto mb-3">
                        <Button color="red mt-3">Supprimer</Button>
                      </div>
                    </div>
                  </form>

                  <h2 className="ui dividing header centered mt-5">
                    Gestion des articles
                  </h2>
                  <div className="ui centered grid mt-auto">
                    <a href={'/admin/add/'}>
                      <Button color="green">Ajouter</Button>
                    </a>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}
