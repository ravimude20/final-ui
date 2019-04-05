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

    constructor(props) {
        super(props);

        this.initialState= {

            offerText : '',

            template : '',
            promotionText:'',

            selectedProduct: null,
            isOpen: false

        }
        // this.setState(this.initialState);
        this.state = this.initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTemplate = this.handleChangeTemplate.bind(this);

    }

    toggleModal = () => {
        const  isopen = this.state.isOpen;

        this.setState({
            isOpen:false
        });
    }

    componentDidMount() {
        this.getProducts();
        this.getTemplates();
    }

    handleSubmit() {
        let newData ={}

        newData.displayDevice= this.state.displayDevice || '';
        newData.offerText = this.state.offerText || '';
        newData.promotionName= this.state.promotionText || '';
        newData.productName= this.state.selectedProduct.name || '';
        newData.template= this.state.selectedTemplate.name || '';

        console.log(newData)

        const apiUrl= 'http://localhost:8080/hologram/v2/image/video/generator';
        const  headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const option= {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newData)
        };

        fetch(apiUrl, option)
            .then((res)=>{
                const response =  res => res.json();
                this.props.closeModal();
            })
        /* this.setState(this.initialState);*/
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


    handleChangeProduct = (selectedOption) => {
        this.setState({selectedProduct: selectedOption});
    }
    handleChangeTemplate = (selectedOption) => {
        this.setState({selectedTemplate: selectedOption});
    }



    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })

    }

    render() {
        console.log(this.state);
        const {selectedProduct, selectedTemplate, selectedLabel} = this.state;

        let dialog = (

            <div style={dialogStyles}>
                <h4 className="Text_Box"> Create new Hologram Promotion </h4>
                <header className="App-header">
                    <div className="FormCenter">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="productName" >Product Name</label>
                            <Select className="TextBox"
                                    name="productName"
                                    value={selectedProduct}
                                    onChange={this.handleChangeProduct}
                                    options={this.state.res}
                            />
                        </div>
                        <div className="FormField">

                            <label className="FormField__Label" htmlFor="promotionName" id="promotionName">Promotion Name</label>
                            <input type="text" id="promotionText" className="Placeholder_Text"
                                   placeholder="Enter promotion text" name="promotionText" onChange={this.handleChange}/>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="offerText" id="offerText">Pricing Strategy</label>
                            <input type="text" id="offerText" className="Placeholder_Text"
                                   placeholder="Enter offer text" name="offerText" onChange={this.handleChange}/>
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="template" >Display Style</label>
                            <Select className="TextBox"
                                    name="template"
                                    value={selectedTemplate}
                                    onChange={this.handleChangeTemplate}
                                    options={this.state.template}
                            />
                        </div>
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="displayDevice" id="displayDevice">Display Device</label>
                            <input type="text" id="displayDevice" className="Placeholder_Text"
                                   placeholder="Enter display device" name="displayDevice" onChange={this.handleChange}/>
                        </div>

                        <div className="FormField">
                            <button className="Right_FormField_ApplyButton mr-10" onClick={this.handleSubmit}>Apply
                            </button>
                        </div>

                    </div>
                    <div className="Form_Aside">

                    </div>



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