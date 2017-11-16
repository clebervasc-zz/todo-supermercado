import React, { Component } from 'react';

export default class Navbar extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <section id="er">
                <div className="container-fluid">
                    <div id="erros" className="bg-danger text-danger"></div>
                </div>
            </section>
       )
    }

}
