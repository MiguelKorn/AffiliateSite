import React from 'react';
import PropTypes from 'prop-types';

export default class PaginationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numPages: 0,
            pages: [],
            currPage: 1
        };
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.changeItems = this.changeItems.bind(this);
    }

    componentDidMount() {
        const numPages = Math.ceil(this.props.items / this.props.limit);
        const tmpArray = this.state.pages;
        for (let i = 0; i < numPages; i++) {
            tmpArray.push(i + 1);
        }
        this.setState(() => {
            return {
                numPages: numPages,
                pages: tmpArray,
                currPage: 1
            }
        })
    }

    handlePrevClick(e) {
        e.preventDefault();
        let newPage = this.state.currPage - 1;
        if (newPage > 0) {
            this.setState(() => {
                return {
                    currPage: newPage
                }
            },
                this.changeItems
            );
        }
    }

    handleNextClick(e) {
        e.preventDefault();
        let newPage = this.state.currPage + 1;
        if (newPage < this.state.numPages) {
            this.setState(() => {
                    return {
                        currPage: newPage
                    }
                },
                this.changeItems
            );

        }
    }

    handleOnClick(e) {
        e.preventDefault();
        const newPage = e.target.innerHTML;
        this.setState(() => {
                return {
                    currPage: newPage
                }
            },
            this.changeItems
        );
    }

    changeItems() {
        this.props.onChange(this.state.currPage);
    }

    render() {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a href="" onClick={this.handlePrevClick}>
                            <span>&laquo;</span>
                        </a>
                    </li>
                    {this.state.pages.map((page) => {
                        return (
                            <li key={page}><a href="" onClick={this.handleOnClick}>{page}</a></li>
                        )
                    })}
                    <li>
                        <a href="" onClick={this.handleNextClick}>
                            <span>&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

PaginationBar.propTypes = {
    items: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

