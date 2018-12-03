import React, { Component } from 'react'; 
import Header from '../components/app-header';
import SearchPanel from "../components/search-panel";
import TodoList from "../components/todo-list";
import TodoListItem from "../components/todo-list-item";
import ItemStatusFilter from '../components/item-status-filter';
import ItemAddForm from '../components/item-add-form';
import './app.css';

class App extends Component {

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make an app'),
      this.createTodoItem('Have a lunch'),
      this.createTodoItem('Make an app'),
      this.createTodoItem('Have a dinner')
    ],
    filterSearsh: '',
    filterParam: 'All'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  toggleClick = (arr, id, action) => {
    const idx = arr.findIndex((el) => el.id === id);
    const newArray = [...arr];
    newArray[idx][action] = !newArray[idx][action]; 
    return newArray;
  };

/*
  const idx = todoData.findIndex((el) => el.id === id);
  const newArray = [...todoData];
  newArray[idx].done = !newArray[idx].done;
*/

  onLabelClick = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleClick(todoData, id, 'done')
      };
    });
  };

/*
    const newTodoData = this.state.todoData.map((item) => {
      if (item.id === id) { item.done = !item.done }
      return item;
    });
    this.setState({ todoData: newTodoData })
*/

  onImportantClick = (id) => {

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleClick(todoData, id, 'important')
      };
    });
  };

  deleteItem = (id) => {
    
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  /*
    const newTodoData = this.state.todoData.filter((item) => item.id !== id);
    this.setState({ todoData: newTodoData })
  */

  createItem = (text) => {

    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      };
    });
  };

  searchItems = (base, searchText) => {

    if (searchText.length === 0) {return base}

    return base.filter((item) => {
        return item.label.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  };

  onSearchChange = (filterSearsh) => {
    this.setState({ filterSearsh });
  }

  doFilter(items, filter) {
    switch(filter) {
      case 'All':
        return items;
      case 'Active':
        return items.filter((item) => !item.done);
      case 'Done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

/*
  this.filteredTodoData = this.state.todoData.filter((item) => {
    const substring = item.label.substring(0, text.length);
    if (substring.toLowerCase() == text.toLowerCase()) {
      // console.log(substring);
      return item;
    }
  })
*/

  onFilterChange = (filterParam) => {
    this.setState({ filterParam});
  }


  render() {

    const { todoData, filterSearsh, filterParam} = this.state;

    const doneCount = todoData
            .filter((el) => el.done === true)
            .length;
    
    const todoCount = todoData.length - doneCount;

    const viewData = this.doFilter(
      this.searchItems(todoData, filterSearsh), filterParam);

    return (
      <div className="todo-app">
        <Header toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel isSearch={this.onSearchChange} />
          <ItemStatusFilter 
            filter={filterParam}
            filterChange={this.onFilterChange}
          />
        </div>

        <TodoList 
          todos={viewData} 
          labelClick={(id)=>this.onLabelClick(id)}
          importantClick={(id) => this.onImportantClick(id)}
          deleteClick={(id) => this.deleteItem(id)}
        />

        <ItemAddForm submitClick={this.createItem}/>

      </div>
    );
  }
}

export default App;