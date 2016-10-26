import React from 'react';
import TodoItem from './todoItem';
import CountDisplay from './countDisplay';

const { Component } = React;

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todoCount: 0,
      todoList: [],
      inputField: '',
    };
  }

  appendCard = (content, resetInput) => {
    if (typeof content !== 'string' || content === '') return;
    const newItem = {
      content,
      completed: false,
    };
    this.setState((state) => {
      state.todoList.push(newItem);
      state.todoCount += 1;
      if (resetInput === true) state.inputField = '';
      return state;
    });
  }

  handleSubmit = (e) => {
    // handle 'enter' key for submission
    const charCode = e.charCode;
    const inputDOM = e.target;
    if (charCode !== 0) {
      if (charCode === 13) {
        e.preventDefault();
        this.appendCard(this.state.inputField, true);
        inputDOM.blur();
        setTimeout(() => {
          inputDOM.focus();
        }, 120);
      }
    }
  }

  handleChange = (e) => {
    const newValue = e.target.value;
    this.setState((state) => {
      state.inputField = newValue;
      return state;
    });
  }

  modifyCounter = (offset) => {
    this.setState((state) => {
      state.todoCount += offset;
      return state;
    });
  }

  removeItem = (index) => {
    this.setState((state) => {
      if (state.todoList[index].completed === false) {
        state.todoCount -= 1;
      }
      state.todoList.splice(index, 1);
      return state;
    });
  }

  markComplete = (index) => {
    this.setState((state) => {
      const item = state.todoList[index];
      if (!item.completed) {
        item.completed = !item.completed;
        state.todoCount -= 1;
      }
      return state;
    });
  }

  markUndone = (index) => {
    this.setState((state) => {
      const item = state.todoList[index];
      if (item.completed) {
        item.completed = !item.completed;
        state.todoCount += 1;
      }
      return state;
    });
  }

  render() {
    const { todoCount, todoList, inputField } = this.state;
    return (
      <div id="todo-list">
        <div className="mcol title">
          todo list
        </div>
        <div className="mcol input-div">
          <input id="input" type="text" autoFocus
                 placeholder="What needs to be done?"
                 value={inputField}
                 onKeyPress={this.handleSubmit}
                 onChange={this.handleChange}
          >
          </input>
        </div>
        {
          todoList.map((item, index) => (
            <TodoItem key={index} content={item.content} completed={item.completed}
                      modifyCounter={this.modifyCounter}
                      removeSelf={() => this.removeItem(index)}
                      markComplete={() => this.markComplete(index)}
                      markUndone={() => this.markUndone(index)} />
          ))
        }
        <div className="mcol" id="footer">
          <CountDisplay todoCount={todoCount}/>
        </div>
      </div>
    );
  }
}

export default TodoApp;
