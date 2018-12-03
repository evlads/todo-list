import React, { Component } from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {
  
  buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Done', label: 'Done' }
  ];

  render() {

    const { filter, filterChange } = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button key={name} 
          type="button"
          className={`btn ${clazz}`}
          onClick={()=>filterChange(name)}
        >
          {label}
        </button>
      );
    });



    // className="btn btn-outline-secondary">Done</button>
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
};

export default ItemStatusFilter;