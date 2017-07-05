import React from 'react';
import API from '../utils/Api';
import Loading from "./Loading";
import OfferGrid from "./OfferGrid";
import Nav from './Nav';
import PaginationBar from './PaginationBar';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            api: new API(),
            offers: [],
            itemsPerPage: 8,
            page: 0,
        };

        this.onChangePaginate = this.onChangePaginate.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
        this.state.api.getItems().then((res) => {
            console.log(res.data);
            this.setState(() => {
                return {
                    totalItems: res.data.length
                }
            })
        })
    }

    getItems() {
        this.state.api.getItemsPaginate(this.state.itemsPerPage, this.state.page).then((res) => {
            this.setState(() => {
                return {
                    offers: res.data
                }
            })
        });
    }

    onChangePaginate(newPage) {
        this.setState(() => {
            return {
                page: newPage-1
            }
        },
            this.getItems
        );
    }

    render() {
        return (
            <div className="container">
                <Nav/>
                {!this.state.offers ? <Loading /> : <OfferGrid offers={this.state.offers}/>}
                {!this.state.totalItems ? <Loading /> :
                    <PaginationBar items={this.state.totalItems} limit={this.state.itemsPerPage}
                                   onChange={this.onChangePaginate}/>}
            </div>
        );
    }
}

export default Home;