import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faPlus, faTrash, faEdit, faEllipsisH, faUpload } from '@fortawesome/free-solid-svg-icons';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
// import Filepicker from './components/Filepicker/Filepicker';
// import Waveform from './components/Waveform/Waveform';
import Notelist from './components/Notelist/Notelist';
import Audioplayer from './components/Audioplayer/Audioplayer';
import Songlist from './components/Songlist/Songlist';
import Navigation from './components/Navigation/Navigation';

library.add(faAngleDown, faPlus, faTrash, faEdit, faEllipsisH, faUpload);

const initialState = {
	time: '0:00',
	route: 'signIn',
	isSignedIn: false,
  song: "",
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
    songs: []
  }
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'userPortal') {
      this.setState({isSignedIn: true});
    }
    this.setState({ route: route });
  }

  loadSong = (song) => {
    this.setState({ song: song });
  }

  loadUser = (data) => {
    this.setState({ user: { 
      id: data.id, 
      name: data.name, 
      email: data.email, 
      joined: data.joined, 
      songs: data.songs 
    }});
  }

  loadNotes = (data) => {
    this.setState({})
  }

  updateTime = (time) => {
    this.setState({ time: time });
  }

  render() {
  	const { route } = this.state;
    return (
      <div>
	      { route === 'userPortal' ?
	      	<div> 
            <Navigation onRouteChange={this.onRouteChange}/>
            <h1 style={{ marginTop: '4.5rem', textAlign: 'center', color: 'white' }}>Account Portal</h1>
	          <Songlist onRouteChange={this.onRouteChange} loadSong={this.loadSong} song={this.state.song} user={this.state.user} loadUser={this.loadUser}/>
          </div>
          : 
          ( route === 'songView' ?
          	<div>
              <Navigation onRouteChange={this.onRouteChange}/>
		          {/*<Filepicker />*/}
			        {/*<Waveform />*/}
              <h3 style={{ marginTop: '4.5rem', textAlign: 'center', color: 'white' }}>{this.state.song}
              </h3>
			        <Notelist song={this.state.song} user={this.state.user} loadUser={this.loadUser} time={this.state.time}/>
			        <Audioplayer updateTime={this.updateTime} song={this.state.song}/>
	          </div>
          	:
          	( route === 'signIn' ? 
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : 
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          	)
          )
        }
      </div>
    );
  }
}

export default App;
