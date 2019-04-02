import React, {Component} from 'react'
import './App.css'
import Select from 'react-select'
import "react-table/new-react-table.css"

let dialogStyles = {
    width: '450px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    right: 'auto',
    bottom: 'auto'

}

class Dialog extends Component {
    state = {
        selectedOption: null,
        newPosts: [],
        newData:[]
    }

    constructor(props) {
        super(props);
        this.handleClickOnSubmit = this.handleClickOnSubmit.bind(this);
        this.state = {isOpen: false};
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.getProducts();
        this.getTemplates();
    }

    /*handleClickOnSubmit = e => {

        e.preventDefault();
        this.handleClickOnSubmit(this.state);
        /!*this.handleClickOnSubmit({
            productName: "",
            promotionName: "",
            offerText: "",
            displayDevice: ""

        });*!/

    }*/


   /* handleClickOnSubmit(e) {
        e.preventDefault();
        let productName = document.getElementById('productName').value;
        let promotionName = document.getElementById('promotionName').value;
        let offerText = document.getElementById('offerText').value;
        let template = document.getElementById('template').value;
        axios({
            method:'post',
            headers : new Headers(),
            url:'http://localhost:8080/hologram/v2/image/video/generator',
            body:JSON.stringify({productName:productName, promotionName:promotionName, offerText:offerText, template:template })
        })
            .then((response)=> {
                console.log(response)
                this.setState({res:response.data});
            }
            );
    }*/

    handleClickOnSubmit(e) {
        e.preventDefault();
        const  headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let newPosts={
            "productName" : "sprite",

            "offerText" : "Buy 2 get 1 free",

            "promotionName": "promo name 2",

            "displayDevice" : "Hologram 1",

            "template" : "ZOOM_EFFECT"
        }
        fetch('http://localhost:8080/hologram/v2/image/video/generator',{
            method: 'post',
            headers: headers,
            body: JSON.stringify(newPosts)
        }).then(function(response) {/*
            this.setState({newData: response.json()});
            console.log(this.state.newData);*/
            return response.json()

        })

    }

    getProducts() {

        fetch('http://localhost:8080/hologram/v2/get/allProducts')
            .then((response) => {

                return response.json();
            }).then((res) => {
            let dropdownObject = []
            res.map((item, index) => {
                dropdownObject.push({name: item, label: item})
                return null;
            })
            console.log(dropdownObject, "drop")
            this.setState({res: dropdownObject})
        });
    }

    getTemplates() {
        fetch('http://localhost:8080/hologram/v2/get/allTemplates')
            .then((response) => {

                return response.json();
            }).then((res) => {
            let dropdownObject = []
            res.map((item, index) => {
                dropdownObject.push({name: item, label: item})
                return null;
            })
            console.log(dropdownObject, "drop")
            this.setState({template: dropdownObject})
        });
    }


    handleSubmit() {
        return true;
    }

    handleChangeProduct = (selectedOption) => {
        this.setState({selectedProduct: selectedOption});
    }
    handleChangePromotion = (selectedOption) => {
        this.setState({selectedTemplate: selectedOption});
    }
    handleChangeTemplate = (selectedOption) => {
        this.setState({selectedTemplate: selectedOption});
    }

    render() {

        const {selectedProduct, selectedTemplate, selectedLabel} = this.state;

        let dialog = (

            <div style={dialogStyles}>
                <h4 className="Text_Box"> Create new Hologram Promotion </h4>
                <header className="App-header">
                    <form>
                        <div className="FormCenter">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="productName" id="productName">Product Name</label>
                                <Select className="TextBox"
                                        value={selectedProduct}
                                        onChange={this.handleChangeProduct}
                                        options={this.state.res}
                                />
                            </div>
                            <div className="FormField">

                                <label className="FormField__Label" htmlFor="promotionName" id="promotionName">Promotion Name</label>
                                <input type="text" id="promotionText" className="Placeholder_Text"
                                       placeholder="Enter promotion text" name="promotionText"/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="offerText" id="offerText">Pricing Strategy</label>
                                <input type="text" id="offerText" className="Placeholder_Text"
                                       placeholder="Enter offer text" name="offerText"/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="template" id="template">Display Style</label>
                                <Select className="TextBox"
                                        value={selectedTemplate}
                                        onChange={this.handleChangeTemplate}
                                        options={this.state.template}
                                />
                            </div>

                            <div className="FormField">
                                <button className="Right_FormField_CancelButton mr-10"
                                        onClick={this.toggleModal}>Cancel
                                </button>
                                <button className="Right_FormField_ApplyButton mr-10"
                                        onClick={this.handleClickOnSubmit}>Apply</button>


                            </div>

                        </div>
                        <div className="Form_Aside">

                        </div>

                    </form>


                </header>
            </div>

        );

        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>

        );
    }
}

export default Dialog;