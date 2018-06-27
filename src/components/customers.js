import React, {Component} from 'react';
import '../App.css';
import axios from 'axios'

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            emails: [],
            summary: null,
            fname: null,
            lname: null,
            industry: null,
            headline: null,
            url: null,
            img: null
        };
    }

    componentDidMount() {
        axios.get('/profile')
            .then(res => {
                const fname = res.data[0].firstName
                const lname = res.data[0].lastName
                const emails = res.data[1].Email
                const summary = res.data[2].summary
                const industry = res.data[2].industry
                const url = res.data[3].url
                const headline = res.data[1].headline
                // console.log(res.data[1].Email)

                this.setState({
                    fname, lname, emails, summary, industry, url,headline
                })
            })
        // .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
    }

    render() {
        return (
            <div>
                {/*<h2>Dashboard</h2>*/}

                <div className="App" id="main-div">


                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card" id={"card"}>
                                <div className="card-title" id="title">
                                    Linkedin Fetch
                                </div>
                                <div className="card-content">

                                    <p></p>
                                    <img id={"url"} src={this.state.url}/>
                                    <p></p>
                                    <span id={"name"}>{this.state.fname} {this.state.lname}</span>
                                    <p></p>
                                    <span id={"headline"}>{this.state.headline}</span>
                                    <p></p>

                                    <span id={"email"}> <em>Email:  </em> {this.state.emails}</span>
                                    <span id={"industry"}><em>Industry :  </em> {this.state.industry}</span>
                                    <p></p>

                                    <span id={"sum"}><em>Summary :  </em> {this.state.summary}</span>
                                    <p></p>
                                    <a id ={"a"} href={"/"}>Go to HomePage</a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Customers;
