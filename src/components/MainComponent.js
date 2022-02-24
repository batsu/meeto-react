import React, { useState, useEffect } from 'react';
import Header from "./Header"
import { Switch, Route, Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import axios from "axios"
import MakePublicMeeto from './MakePublicMeeto'
import LoginComponent from './LoginComponent';
import TimelineComponent from './TimelineComponent'

class Test123 extends React.Component {
    state = {
      match: {}
    }
  
    componentDidMount() {
      axios.get(`http://localhost:4000/testapi`)
        .then(res => {
          console.log(res)
          const match = res.data;
          this.setState({ match });
        })
    }

    
  
    render() {
        console.log(this.state.match)
      return (
        <ul>
            <li>{this.state.match.email}</li>
            <li>Hello</li>
        </ul>
      )
    }
  }

const HomePage = (props) => {

  // const [message, setMessage] = useState('')
  // // console.log(props)
  // useEffect(() => {
  //   if (props.location.state) {
  //   setMessage(props.location.state.message)
  //   }
  // }, [props])
  // this.setState({message: props.location.state.message} || '')

  // console.log(this.state)
  // if (props.location.state.message) this.setState({message: props.location.state.message})
  // let loggedMessage = "Logged in!"
  // if (props === {}) {
  //   loggedMessage = ""
  // }
  // function logout() {
  //   setMessage("")
  //   console.log(message)
  
    return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Meeto</h1>
          {/* {(props.location.state.message) ? "Logged in!" : null} */}
          { (props.loggedIn) ? "Logged in!" : null}
        </header>
        <p className="App-intro"></p>
        Hello!
        { (props.loggedIn) ? <button onClick={() => props.setLoggedIn(false)}>LOGOUT!</button> : null}
      </div>
    )
}

const Main = (props) => {


  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = document.cookie.split("=")[1]
    axios.post('http://localhost:4000/checkloggedin', {
      cookie: token
  })
    .then(res => {
      if (res.data) setLoggedIn(true)
    })
}, [])



      //   this.callBackendAPI()
      //     .then(res => this.setState({ data: res.express }))
      //     .catch(err => console.log(err));
      // }
        // fetching the GET route from the Express server which matches the GET route from server.js
      // callBackendAPI = async () => {
      //   const response = await fetch('http://localhost:4000/express_backend');
      //   const body = await response.json();
    
      //   if (response.status !== 200) {
      //     throw Error(body.message) 
      //   }
      //   return body;
      // };
    


        

        return (
            <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Switch>
                        <Route path='/home' render={(props) => <HomePage {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/hello' render={() => {
                            return <h4>Hello</h4>
                            }} />
                        <Route path='/test123' component={Test123} />
                        <Route path='/timeline' render={(props) => <TimelineComponent {...props} loggedIn={loggedIn} />} />
                        <Route path='/makemeeto' component={MakePublicMeeto} />
                        <Route path='/login' render={(props) => <LoginComponent {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                        {/* <Route exact path='/test/' component={Test} />
                        <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                        <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                        <Route exact path='/contactus' render={() => 
                            <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                        <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } /> */}
                        <Redirect to='/home' />
                    </Switch>
            {/* <Footer /> */}
        </div>
        );
      }
    

export default Main