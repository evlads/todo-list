import React from 'react';
import TodoListItem from './todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, labelClick, importantClick, deleteClick }) => {

  const todoElements = todos.map((item) => {
    const { id, ...itemProps} = item;

    return (
      <li 
        key={id}
        className="list-group-item"
      >
        <TodoListItem 
          id={id} 
          labelClick={()=>labelClick(id)} 
          importantClick={() => importantClick(id)} 
          deleteClick={()=>deleteClick(id)} 
          {...itemProps} 
        />
      </li>  
    );
  });

  return (
    <ul className="list-group todo-list">
      {todoElements}
    </ul>
  );
};

export default TodoList;