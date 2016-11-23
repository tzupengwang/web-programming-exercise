import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      reg1: 0,
      reg2: null,
      operator: null,
      lastOp: null,
    };
  }

  resetState() {
    // TODO
    this.setState({
      reg1: 0,
      reg2: null,
      operator: null,
      lastOp: null,
    })
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  handleNumberPress(num) {
    this.setState((state) => {
      if (state.reg2 === null) state.reg2 = num;
      else state.reg2 = state.reg2 * 10 + num;
      return state;
    });
  }

  handleOperatorPress(func) {
    this.setState((state) => {
      const { reg1, reg2, operator } = state;
      if (reg1 !== null && reg2 !== null && operator !== null) {
        state.reg1 = operator(reg1, reg2);
        state.reg2 = null;
      } else {
        if (state.reg2 !== null) state.reg1 = state.reg2;
        state.reg2 = null;
      }
      state.operator = func;
      return state;
    });
  }

  handleChangeSign() {
    this.setState((state) => {
      const { reg1, reg2, operator } = state;
      if (reg2 !== null) state.reg2 = -reg2;
      else state.reg1 = -reg1;
      return state;
    });
  }

  compute() {
    this.setState((state) => {
      const { reg1, reg2, operator, lastOp } = state;
      if (operator === null) {
        if (lastOp !== null)
          state.reg1 = lastOp(reg1);
      } else {
        if (reg2 === null) {
          state.reg1 = operator(reg1, reg1);
          state.lastOp = a => operator(a, reg1);
        }
        else {
          state.reg1 = operator(reg1, reg2);
          state.lastOp = a => operator(a, reg2);
        }
        state.operator = null;
      }
      state.reg2 = null;
      return state;
    });
  }

  render() {
    const { reg1, reg2 } = this.state;
    let currentDisplay = (reg2 === null) ? reg1 : reg2;
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{currentDisplay}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.handleChangeSign.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton onClick={this.handleOperatorPress.bind(this, (a, b) => a / b)} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleNumberPress.bind(this, 7)} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 8)} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 9)} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.handleOperatorPress.bind(this, (a, b) => a * b)} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleNumberPress.bind(this, 4)} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 5)} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 6)} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.handleOperatorPress.bind(this, (a, b) => a - b)} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleNumberPress.bind(this, 1)} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 2)} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.handleNumberPress.bind(this, 3)} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.handleOperatorPress.bind(this, (a, b) => a + b)} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleNumberPress.bind(this, 0)} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton onClick={this.compute.bind(this)} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
