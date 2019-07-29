import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Route } from "react-router-dom";
import Home from '../Home/Home';

const Checkout = (props) => {
    const publishableKey = "pk_test_JLikaz6Tp7g6RHa5RBHYQLeK00vXmfgTHO";

    const onToken = token => {
        const body = {
            amount: props.total * 100,
            token: token
        };

        axios
            .post("http://localhost:8000/api/payment", body)
            .then(response => {
              axios.post("http://localhost:8000/api/checkout", props.products)
                  .then(response =>
                    {
                        alert("Votre achat à bien été effectué");
                        localStorage.removeItem("Buy");
                        window.location.reload();
                    })
            .catch(error => {
                    console.log("Error: ", error);
                    alert("Error : "+ error);
                });
            })
            .catch(error => {
                console.log("Paiement échoué: ", error);
                alert("Paiement échoué");
            });
    };

    return (
        <StripeCheckout
            // quantity={props.quantity}
            className="btn btn-lg btn-block btn-success text-uppercase"
            label="Checkout" //Component button text
            name="Black-Tech" //Modal Header
            description="Valider votre paiement"
            panelLabel="Payer : " //Submit button in modal
            token={onToken}
            amount={props.total * 100}
            stripeKey={publishableKey}
            // image="https://www.vidhub.co" //Pop-in header image
            billingAddress={false}
            currency="EUR"
            locale='fr'
        />
    );
};

export default Checkout;
