import React from 'react';
import NavBar from '../NavBar';
import './Commande_confirmation.css';

export default class Commande_confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h3 className="confirm_title">
            Vous etes sur le point de valider une commande en tant qu'invité...
          </h3>
          <div class="ui placeholder segment">
            <div class="ui two column stackable center aligned grid">
              <div class="ui vertical clearing divider">OU</div>
              <div class="middle aligned row">
                <div class="column">
                  <div class="ui icon header">
                    <i class="user icon"></i> Continuer en tant qu'invité
                  </div>
                  <div className="checkout">
                    <a href={'./guest_confirmation'}>
                      <div class="ui primary button">Continuer</div>
                    </a>
                  </div>
                  <div class="field">
                    <div class="ui search">
                      <div class="ui icon input"></div>
                      <div class="results"></div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="ui icon header">
                    <i class="world icon"></i>Me connecter / S'inscrire
                  </div>
                  <a href={'./login'}>
                    <div class="ui button">Connexion</div>
                  </a>
                  <a href={'./register'}>
                    <div class="ui green button">Inscription</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
