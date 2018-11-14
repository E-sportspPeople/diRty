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
      visiableTRACKS: [],
      viewAll: false,
      trackCount: 0,
      allFetched: false,
      angle: {top: 0}
    };

    this.angle = React.createRef();
    this.list = React.createRef();
  }

  async componentDidMount() {
    this.trackFetcher(10);    



    // this.props.scroll.addEventListener('scroll', (event)=> {
    //   if(this.state.viewAll) {
    //     let moreThenParent = event.target.scrollTop > this.list.current.scrollHeight;
    //     let lessThenFooter = event.target.scrollTop < (this.list.current.scrollHeight + this.list.current.offsetHeight);
    //     if(moreThenParent && lessThenFooter) {
    //       console.log(event.target.scrollTop);
    //     }
    //   }
    // });
  }

  countAngleTop() {
    if(this.props.scrollTop > this.list.current.offsetTop && this.props.scrollTop < (this.list.current.offsetHeight + this.list.current.offsetTop)) {
      return {
        top: this.props.scrollTop - this.list.current.offsetTop + 'px'
      }
    }
  }

  async trackFetcher(limit, offset) {
    let tracks = await axios.get(`http://${apiConfig.api}/listDetail?id=${this.state.id}&limit=${limit || 'all'}&offset=${offset || 0}`);
    this.setState({
      tracks: tracks.data.playlist.tracks,
      trackCount: tracks.data.playlist.trackCount,
      viewAll: limit === 'all' ? true : false,
      visiableTRACKS: limit === 'all' ? tracks.data.playlist.tracks : tracks.data.playlist.tracks.slice(0, 10),
      allFetched: limit === 'all' ? true : false
    });
  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
  }
  
  loadAllTracks() {
    if(this.state.viewAll) {
      this.setState({
        visiableTRACKS: this.state.tracks.slice(0, 10), 
        viewAll: false
      });
    } else if(this.state.allFetched) {
      this.setState({
        visiableTRACKS: this.state.tracks,
        viewAll: true
      });
    } else {
      this.trackFetcher('all');
    }
  }

  backToThePlaceWhereTheAllBegin () {
    this.setState({angleMove: false});
    this.loadAllTracks();
  }

  render() {
    return (
      <div ref={this.list} className="List-wrap flex">
        <div className="left flex-c j-start a-end">
          <img src={this.props.img}></img>
          {
            this.state.viewAll && <div ref={this.angle} className="float-less">
              <i onClick={()=>{this.backToThePlaceWhereTheAllBegin()}} style={this.state.viewAll && this.countAngleTop()} className="fas fa-angle-up angle"></i>
            </div>
          }
        </div>
        <div className="right flex-c j-start a-start">
          <div className="right-top">
            <div className="list-info">
              <h2 className="list-name">{this.props.name}</h2>
            </div>
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
                (<li onClick={()=>{this.loadAllTracks()}} className="a-track view-all-wap flex j-center">
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