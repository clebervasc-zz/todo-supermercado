import React, { Component } from 'react';

export default class Navbar extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <header id="header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <h1>Lista Super Mercado</h1>
                        </div>
                    </div>
                </nav>
            </header>
       )
    }

}
