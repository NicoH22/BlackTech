import React, {Component} from 'react';
import Pagination from 'react-js-pagination';

export default class Paginate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    handlePageChange(pageNumb) {
        this.setState({activePage: pageNumb});
    }

    render() {
        return <div>
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplay={5}
                onChange={this.handlePageChange}
                className="pagination-lg"
            />
        </div>
    }
}