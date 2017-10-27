import React from 'react'
import ReactHowler from 'react-howler'
import Button from '../components/Button'
import raf from 'raf' // requestAnimationFrame polyfill

class PlayList extends React.Component {
  constructor (props) {
    super(props)

    // Song list hard coded
    this.tracks = [
            { id: 0, 
              name: 'How do you sleep', 
              artist: 'LCD SOUNDSYSTEM',
              source: 'tracks/05.how-do-you-sleep.mp3',
              duration: '9:12'
          	},
            { 
        	  id: 1, 
        	  name: 'Tonite', 
        	  artist: 'LCD SOUNDSYSTEM',
        	  source: 'tracks/06.tonite.mp3',
              duration: '5:47'
        	},
            { 
              id: 2, 
              name: 'Call the police', 
              artist: 'LCD SOUNDSYSTEM',
              source: 'tracks/07.call-the-police.mp3',
              duration: '6:59'
            },
            { 
              id: 3, 
              name: 'Ritual Union (Acappella)', 
              artist: 'Little Dragon',
              source: ['acappella.ogg','acappella.mp3'],
              duration: '0:15'
	        }
	]

    this.state = {

      currentSrcIndex: 0,
      playing: false,
      html5: true,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0

    }

    this.handleClick = this.handleClick.bind(this)
    this.assignTrackAndPlay = this.assignTrackAndPlay.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleStop = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)

  }

  componentWillUnmount () {
    this.clearRAF()
  }

  comonentDidMount() {
  }

  getDuration(src) {

  }




  handleClick (id, e, i) {

	this.setState({
	    activeKey: e
	});
	let nextIndex = id;

    this.assignTrackAndPlay(nextIndex)
    	.then((response) => 
    		console.log(response, nextIndex)
		)
	   .catch(err => console.log('There was an error:' + err))

  }

  assignTrackAndPlay(id) {
  	console.log(id);
  	return new Promise((response) =>
	  	this.setState({ currentSrcIndex: id, playing: true, isPressed: true }),
		this.renderSeekPos()

	)
  }

  handlePlay () {

    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }


  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handlePause () {
  	console.log('test')
  	return new Promise((response) =>
	    this.setState({ playing: false }),
	    this.renderSeekPos()
	)

  }

  renderSeekPos () {
    this.setState({
      seek: this.player.seek()
    })
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render () {

    return (
      <div>
        <ReactHowler
          src={this.tracks[this.state.currentSrcIndex].source}
          html5={this.state.html5}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handlePlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />
		<ul id="tracklist">
			{this.tracks.map((track,i) =>  
				<li className='tracklist-item' key={i} data-id={track.id}> 
					<button className={this.state.activeKey === i ? "active" : ""} onClick={this.handleClick.bind(this, track.id, i)}>{ track.artist + ' - ' + track.name} <span>{track.duration}</span></button>
				</li>
			)}
		</ul>
		<div className='controls'>
	        <Button onClick={this.handlePlay}>Play</Button>
	        <Button onClick={this.handlePause}>Pause</Button>
	        <Button onClick={this.handlePause}>Stop</Button>
	        <p> 
	        	{this.tracks[this.state.currentSrcIndex].artist + ' - ' + this.tracks[this.state.currentSrcIndex].name + ' ' }
				{(isNumber(this.state.seek)) ? fancyTimeFormat(this.state.seek.toFixed(0)) : '0.00' /*check if is number before updating*/ }
				{' / '}
				{(this.state.duration) ? fancyTimeFormat(this.state.duration.toFixed(0)) : 'NaN'}
	        </p>
	      </div>
      </div>
    )
  }
}

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = time % 60;
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default PlayList