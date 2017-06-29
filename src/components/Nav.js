import React from 'react';

export default class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    {/*<!-- Brand and toggle get grouped for better mobile display -->*/}
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                        </button>
                        <a className="navbar-brand">Affiliate Site</a>
                    </div>
                    {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}