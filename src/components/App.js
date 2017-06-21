import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import {Helmet} from "react-helmet";
import axios from 'axios';

import '../styles/main.scss';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }
    componentDidMount() {
        axios.get('http://miguelkorn.nl/School/iProject/api.php').then((res) => {
            console.log('get axios');
            console.log(res);
            this.setState = {
                items: res
            }
        })
    }
    render() {
        return (
            <div>
                <Helmet
                    title="H | Welcome to our Homepage"
                />
                <Nav />
                <h1>Homepage</h1>
                <p>test</p>
                <p>{this.state.item}</p>
            </div>
        );
    }
}

class About extends Component {
    render() {
        return (
            <div>
                <Helmet
                    title="A | Welcome to our about page"
                />
                <Nav/>
                <h1>About</h1>
            </div>
        );
    }
}

class Contact extends Component {
    render() {
        return (
            <div>
                <Helmet
                    title="C | Welcome to our contactpage"
                />
                <Nav/>
                <h1>Contact</h1>
            </div>
        );
    }
}


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Helmet
                    htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
                    titleTemplate="%s | React App"
                    titleAttributes={{itemprop: "name", lang: "en"}}
                    meta={[
                        {name: "description", content: "Server side rendering example"},
                        {name: "viewport", content: "width=device-width, initial-scale=1"},
                    ]}
                />
                <Switch>
                    <Route exact path='/' component={ Homepage } />
                    <Route path="/about" component={ About } />
                    <Route path="/contact" component={ Contact } />
                </Switch>
            </div>
        );
    }
}