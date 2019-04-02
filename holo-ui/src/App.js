import React, {Component} from 'react';
import Header from './Header'
import SecondHeader from './SecondHeader'
import ReactTable from 'react-table'
import "react-table/react-table.css"
import Dialog from './Dialog'

import {BrowserRouter as Router} from 'react-router-dom'


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            counter: 0,
            isOpen: false
        }
    }


    componentDidMount() {
        const url = "http://localhost:8080/hologram/v2/get/playList";
        console.log(this.state.counter);
        fetch(url, {
            method: "GET"
        }).then(response => response.json()).then(posts => {
            this.setState({posts: posts})
        })
        if (this.state.posts) {
            this.state.counter = this.state.counter + 1;
            console.log(this.state.counter);
        }

    }

    /*deleteContact (header) {
        axios.delete(`http://localhost:8080/hologram/v2/get/playList/${header}`);
    .then(res => {
            const users = res.data;
        this.setState({ users });
    })

    }*/

    render() {
        const columns = [

            {
                id: "checkbox",
                accessor: "",
                Cell: ({original}) => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                        />
                    );
                },
                Header: x => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selectAll === 1}
                        />
                    );
                },
                sortable: false,
                width: 45
            },
            {
                Header: "Image",
                accessor: "imageLink",
                Cell: ({original}) => {
                    return (
                        <img height={34} src={this.state.posts[0].imageLink} alt={"img"}/>
                    );
                },
                width:65,

                paddingLeft: "inherit"


            },
            {
                Header: "Product Name",
                accessor: "productName",
                width: 150,
                paddingTop: 10,
                style: {

                    textAlign: "left",
                    fontFamily: "'Roboto-Medium', 'Roboto Medium', 'Roboto'"
                }
            },
            {
                Header: "Promotion Name",
                accessor: "promotionName",
                width: 180,
                paddingTop: 5,
                style: {

                    textAlign: "left",
                    fontFamily: "'Roboto-Medium', 'Roboto Medium', 'Roboto'"
                }
            },
            {
                Header: "Pricing Strategy",
                accessor: "offerText",
                width: 200,
                style: {
                    textAlign: "left",
                    fontFamily: "'Roboto-Medium', 'Roboto Medium', 'Roboto'"
                }
            },
            {
                Header: "Display Device",
                accessor: "displayDevice",
                /*width: 100,*/
                style: {
                    textAlign: "left",
                    fontFamily: "'Roboto-Medium', 'Roboto Medium', 'Roboto'"
                }
            }

        ]
        return (
            <Router>
                <div>
                    <Header/>

                    <button className="add-promo" onClick={(e) => this.setState({isOpen: true})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                        </svg>
                    </button>

                    <button className="edit-promo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>

                    <button className="delete-promo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>


                    <SecondHeader/>
                    <Dialog isOpen={this.state.isOpen} handleClickOnCancel={(e) => this.setState({isOpen: false})}/>
                </div>

                <ReactTable

                    posts={this.state.posts}
                    columns={columns}
                    data={this.state.posts}
                    noDataText="0 hologram promotion in queue"
                    showPagination={false}
                    style={{backgroundColor: "rgb(215, 228,234,1)"}}
                >

                </ReactTable>
            </Router>

        )
    }
}

export default App;
