import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// @class_component
// StreamShow: allows user to create a stream by recording title and description
// highlights: 
//          flv - connecting flv player to local obs streaming url
//          helper func - buildPlayer
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class StreamShow extends Component {

    // @constructor method: initalizing refs
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    // @lifecycle_method: builds and attach player when component is loaded for the first time
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    // @lifecycle_method: builds the player every time component is updated
    componentDidUpdate() {
        this.buildPlayer();
    }

    // @helper_function: builds the player and attach video refs
    buildPlayer(){
        if (this.player || !this.props.stream) {
            return;
        }
        console.log(this.videoRef);
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    };
    
    render() {

        if (!this.props.stream){
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;
        
        return (
            <div className="ui container">
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

// @execution: anytime store is updated, mapStateToProps will be called.container
// @output   : it always return an object
// @input    : maximum 2 parameters - state and it's own props
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

// connect: this function connects a react component to the redux store.
// https://react-redux.js.org/api/connect
export default connect(mapStateToProps, {fetchStream})(StreamShow);