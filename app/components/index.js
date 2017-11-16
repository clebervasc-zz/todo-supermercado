import React, { Component } from 'react';
import Navbar from './navbar';
import Errors from './errors';
import AddProduct from './addProduct';

export default class Index extends Component{

    render(){
        return(
            <div>
                <Navbar />
                <Errors />
                <AddProduct />
            </div>
       )
    }

}
