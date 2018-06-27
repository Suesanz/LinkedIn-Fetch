import React, {Component} from 'react';
import '../App.css';
import './home.css'
class Home extends Component {

    render() {
        return (
            <div className="App" id="main-div">
                <div className="card" id={"card1"}>
                    <div className="card-title" id="title1">
                        LinkedIn Fetch
                    </div>
                    <div className="card-content">
                        <div id={"others"}>
                            <img id={"img"} src={"https://dannaden.com/wp-content/uploads/2017/09/bigli.jpg"}/>
                            <p></p><p></p>To fetch LinkedIn details<p></p> just click on the Login Button Below.
                        </div>
                        <a className="btn-large waves-effect waves-light"
                           href="https://linkedin-fetch.herokuapp.com/auth/linkedin">Login</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home