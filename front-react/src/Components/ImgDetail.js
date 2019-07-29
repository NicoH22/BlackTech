import React from 'react';
import axios from "axios";



export default class Detail extends React.Component {
    state = {
        img: []
    };


    componentDidMount() {
        
        axios.get(`http://127.0.0.1:8000/api/pictures/${this.state.products.id}`)
            .then(res =>
                this.setState({
                    img: res.data
                })
            )
    }


    render() {

        return (
            <div>
                <img alt='test' src={`http://127.0.0.1:8000/storage/${this.state.img.id}/${this.state.img.name}`} />

            </div>

        )
    }
}