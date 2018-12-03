import React, { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
  
  state = {
    searshItem: ''
  }

  onSearchChange = (e) => {
    const searchText = e.target.value;
    //this.setState({ searshItem: searchText });
    this.props.isSearch(searchText);
  }

  render(){
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchChange} 
      />
        
    );
  }
}

export default SearchPanel;