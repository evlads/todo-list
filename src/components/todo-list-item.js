import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({
    id, 
    labelClick,
    importantClick,
    deleteClick, 
    label,
    done, 
    important = false
  }) => {

  const style = {
    color: important ? 'steelblue' : 'black',
    fontWeight: important ? 'bold' : 'normal'
  };

  let classNames = "todo-list-item";

  if (done) { classNames += " done"}

  return (
    <span className={classNames}>
      <span
        className="todo-list-item-label"
        style={style}
        onClick={() => labelClick(id)}
        >
        {label}
      </span>

      <button type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={() => importantClick(id)}
      >
        <i className="fas fa-exclamation" />
      </button>

      <button type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={() => deleteClick(id)}
      >
        <i className="far fa-trash-alt" />
      </button>
    </span>
  );
};

export default TodoListItem;