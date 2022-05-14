import React from 'react';
import {getHeaders} from "./utils";
import Posts from "./components/Posts";
import Profile from "./components/Profile"
import NavBar from "./components/NavBar";
import Suggestions from "./components/Suggestions";
import Stories from "./components/Stories"

class App extends React.Component {


    constructor(props) {
        super(props);
        console.log("get compiled.")
        this.state = {
            profileUsername: ""
        }
    }
    componentDidMount() {
        fetch("https://photo-app-xwc.herokuapp.com/api/profile", {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({profileUsername: data.username})
            })
    }

    render () {
        return (
            <div>
            <nav className="main-nav">
                <h1>Photo App</h1>
                <NavBar profileUsername={this.state.profileUsername} />
            </nav>

            <aside>
                <header>
                    <Profile />
                </header>
                <div className="suggestions">
                    <div>
                        <Suggestions />
                    </div>
                </div>
            </aside>

            <main className="content">
                <header className="stories">
                    <Stories />
                </header>
                <div id="posts">
                    <Posts profileUsername={this.state.profileUsername} />
                </div>
            </main>

            </div>
        );
    }
}

export default App;