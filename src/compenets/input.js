import React from 'react';
import { timer } from 'rxjs';


class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [
        {
          name: 'Track',
          type: 1,
        }, 
        {
          name: 'Album',
          type: 10
        }
      ]
    }
  }

  typer(type) {
    this.props.setState({
      type: type
    });
  }

  render() {
    return (
      <div className="input-c-wrap flex j-start a-start">
        <input placeholder="That" value={this.props.searchingKeyWord} 
        onKeyDown={(e)=>{
          e.keyCode === 13 && 
          this.props.searchingKeyWord !== this.props.searched && 
          this.props.searching();
        }} 
        onChange={(e)=> {
          this.props.setState({
            searchingKeyWord: e.target.value,
            searched: false
          });
        }}/>
        <div className="type flex">
        &nbsp;Is&nbsp;
          {
            this.state.types.map((item)=> 
            (<div key={item.name} onClick={()=>{this.props.setState({type: item.type})}} 
              className={`type-item ${this.props.type === item.type && 'active'}`}>
              {item.name}
            </div>))
          }
        </div>
      </div>
    )
  }
}

export default Input;