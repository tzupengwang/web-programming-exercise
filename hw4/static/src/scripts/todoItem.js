import React from 'react';
import classNames from 'classnames';

const { Component } = React;

class TodoItem extends Component {
  render() {
    const { content, completed, removeSelf, markComplete, markUndone } = this.props;
    const cardClass = classNames('mcol', 'card', { completed });
    return (
      <div className={cardClass}>
        <div className="content">{content}</div>
        <div className="option-wrap">
        <div className="check" onClick={markComplete}>Mark as completed</div>
        <div className="uncheck" onClick={markUndone}>Mark as uncompleted</div>
        <div className="remove" onClick={removeSelf}>Remove</div></div>
      </div>
    );
  }
}

export default TodoItem;
