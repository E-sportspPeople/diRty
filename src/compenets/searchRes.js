import React from 'react';
import Track from './oneTrack';

import { Link } from 'react-router-dom';

class Result extends React.Component {
  artistsResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <li className="flex" key={index}>
            <Link to={`/artist/${item.id}`}>
              <div className="artist-name">{item.name}</div>
            </Link>
          </li>
        );
      })
    );
  }

  trackResults() {
    return (
      this.props.result.map((item, index)=>{
        return (
          <Track onClick={()=> {
            this.props.action({
              playList: this.props.result,
              playIndex: index
            });
          }} key={item.id} dt={item.duration} trackName={item.name} id={item.id} ar={item.artists}></Track>
        );
      })
    );
  }
  
  albumResults() {
    return (
      this.props.result.map((item, index)=> {
        return (
          <li className="flex" key={index}>
            <Link to={`/album/${item.id}`}>
              <div>{item.name}</div>
            </Link>
            &nbsp;-&nbsp;
            <Link to={`/artist/${item.artists[0].id}`}>
              <div>{item.artists[0].name}</div>
            </Link>
          </li>
        );
      })
    );
  }

  emptyResult() {
    return (
      <li className="italic">
        Result is empty.
      </li>
    );
  }

  useWhichOne() {
    // when search result is empty and current keyword equel to searched keyword show empty result text
    let fn = (toReturn) => {
      if(this.props.searching) {
        return (<li className="italic">Searching</li>);
      } else  {
        return this.props.searched.type === this.props.type && !this.props.result.length ? this.emptyResult() : toReturn.call(this);
      }
    }
    if (this.props.type === 1 && this.props.searched.keyword) {
      return fn(this.trackResults);
    } else if(this.props.type === 10 && this.props.searched.keyword) {
      return fn(this.albumResults);
    } else if(this.props.type === 100 && this.props.searched.keyword) {
      return fn(this.artistsResults);
    }
  }

  render() {
    return (
      <ul className="result-u flex-c j-start a-start">
        {this.useWhichOne()}
      </ul>
    )
  }
}

export default Result;