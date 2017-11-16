import React, { Component }  from 'react';

export default class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state ={
            list: [],
            product: "",
            qtd: "",
            val: "",
            done:false,
            total:0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
        this.handleVal = this.handleVal.bind(this);
        this.handleQtd = this.handleQtd.bind(this);
        this.setTotal = this.setTotal.bind(this);
    }

    /*Pegando Valores*/
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    /*Adicionando os produtos a lista e fazendo unshift para tabela*/
    handleSubmit(e){
        e.preventDefault();
         if(!this.handleValidation())
         return;
        
         this.state.list.unshift({
            id: Date.now(),
            product:product.value,
            qtd:qtd.value,
            val:val.value,
            done:false
         });

         this.setState({
            list:this.state.list
        });
        
        this.setTotal(this.state.list);
    }

    /*Função para deletar a lista inteira*/
    handleDeleteList(e){
        e.preventDefault();
        let items = [];

        this.setState({
            list:items
        });
    }

    /*Completando Compra*/
    handleComplete(e){
        e.preventDefault();
        let items = [];

        this.state.list.filter((item) => {
            if( parseInt(item.id) === parseInt(e.target.getAttribute('data-id')))
               item.done = !item.done;

            items.push(item);
        });
        
        this.setState({
            list:items
        });
    }

    /*Removendo Compra*/
    handleRemove(e){
        e.preventDefault();
        
        let items = [];

        this.state.list.filter((item) => {
            if( parseInt(item.id) !== parseInt(e.target.getAttribute('data-id')))
                items.push(item);
            
        });
        
        this.setState({
            list:items
        });

        
        this.setTotal(items);
    }

    /*Validação simples para os campos*/
    handleValidation(){
        document.getElementById("erros").style.display = "none";
        let product =  this.state.product;
        let qtd =   this.state.qtd;
        let val = this.state.val;
        
        let errors = "";
    
    
        if(product === "") errors += '<p>Produto não pode ser vazio</p>';
    
        if(qtd === "")
            errors += '<p>Quantidade não pode ser vazio</p>';
        else if( qtd != parseInt(qtd) )
             errors += '<p>Quantidade invalida (Use somente números)</p>';
    
        if(val === "")
            errors += '<p>Valor não pode ser vazio (Use somente números)</p>';
        else if( val != parseFloat(val) )
             errors += '<p>Valor invalido</p>';
    
        if(errors != ""){
            document.getElementById("erros").style.display = "block";
            document.getElementById("erros").innerHTML = errors;
            return 0;
    
        }else
            return 1;
    
    }

    /*Validação simples para o campo "Produto"*/
    handleProduct(product) {
        let str = product.toLowerCase();
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }

    /*Validação simples para o campo "Valor"*/
    handleVal(val) {
        let num = parseFloat(val).toFixed(2) + "";
        num = num.replace(".", ",");
        num = "R$ " + num; 
        return num;
    }
    
    /*Validação simples para o campo "Quantidade"*/
    handleQtd(qtd){
        return parseInt(qtd);
    }


    /*Função para pegar o valor total da compra*/
    setTotal(list){
        let total = 0;

        list.map((item) =>  { total += item.val * item.qtd })
        
        this.setState({
            total:total
        });
        
    }

    render(){
        return(
           <section id="hero">
               <div className="container-fluid">
                    <div className="form-inline">
                        <form action="" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="product" id="product" placeholder="Produto:" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" name="qtd" id="qtd" placeholder="Quantidade:" onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" name="val" id="val" placeholder="Valor:" onChange={this.handleChange} />
                            </div>
        
                            <button id="add" className="btn btn-primary">Adicionar à Lista</button>
                            <button id="del" onClick={this.handleDeleteList} className="btn btn-danger">Excluir Lista</button>
                        </form>
                    </div>

                    <table id="marketTable" className="table table-striped">
                        <thead>
                            <tr>
                                <td>Produto</td>
                                <td>Quantidade</td>
                                <td>Valor</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {/*Montando Tabela*/}
                            { this.state.list.map((item, idx) => 
                                <tr key={idx} className={item.done ? "done" : "incomplete"}>
                                    <td>{this.handleProduct(item.product)}</td>
                                    <td>{this.handleQtd(item.qtd)}</td>
                                    <td>{this.handleVal(item.val)}</td>
                                    <td>
                                        <button onClick={this.handleComplete} data-id={item.id} className="btn btn-success">
                                            { item.done ? "Comprar" : "Comprado" }
                                        </button> 

                                        <button onClick={this.handleRemove} data-id={item.id} className="btn btn-danger">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )} 

                        </tbody>
                    </table>
                </div>

                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container-fluid">
                        <h4 className="text-center text-success">
                            Total: <span id="totalValor">{this.handleVal(this.state.total)}</span>
                        </h4>
                    </div>
                </nav>

           </section>
        )
    }
}