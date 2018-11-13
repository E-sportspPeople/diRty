import React from "react";
import Track from './oneTrack';
import axios from 'axios';

import "../styleSheet/oneList.scss";

import apiConfig from "../apiConfig"; // import your api config


class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      JSXTracks: [],
      tracks: [],
      visiableTRACKS: []
    };
  }

  async componentDidMount() {
    this.trackFetcher(10);    
  }

  async trackFetcher(limit, offset) {
    let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${this.state.id}&limit=${limit || 'all'}&offset=${offset || 0}`);
    this.setState({
      tracks: tracks.data.playlist.tracks,
      // JSXTracks: tracks.data.playlist.tracks.map((item, index) => {
      //   return (<Track onClick={()=> {
      //     this.props.action({
      //       playList: tracks.data.playlist.tracks,
      //       playIndex: index
      //     });
      //   }} key={item.id} dt={item.dt} trackName={item.name} id={item.id} ar={item.ar}></Track>)
      // }),
      trackCount: tracks.data.playlist.trackCount,
      viewAll: limit === 'all' ? true : false,
      visiableTRACKS: limit === 'all' ? tracks.data.playlist.tracks : tracks.data.playlist.tracks.slice(0, 10)
    });
  }

  render() {
    return (
      <div className="List-wrap flex">
        <div className="left flex j-end a-start">
          <img src={this.props.img}></img>
        </div>
        <div className="right flex-c j-start a-start">
          <div className="right-top">
            <div className="list-info">
              <h2 className="list-name">{this.props.name}</h2>
            </div>
            {/* <div className="play"></div> */}
          </div>
          <div className="right-bottom">
            <ul>
              {
                this.state.visiableTRACKS.map((item, index) => {
                  return (<Track onClick={()=> {
                    this.props.action({
                      playList: this.state.visiableTRACKS,
                      playIndex: index
                    });
                  }} key={item.id} dt={item.dt} trackName={item.name} id={item.id} ar={item.ar}></Track>)
                })
              }
              {
                this.state.trackCount > 10 && 
                (<li onClick={this.state.viewAll ? ()=> {this.setState({visiableTRACKS: this.state.tracks.slice(0, 10), viewAll: false})} : ()=> {this.trackFetcher('all')}} className="a-track view-all-wap flex j-center">
                  <div className="view-all">
                    {this.state.viewAll ? "Viwe less tracks" : `View ${this.state.trackCount || "loading"} tracks`}
                  </div>
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default List;

// export default connect(
//   null,
//   action
// )(List);