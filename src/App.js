import React from 'react';
import './App.css';
import {Button,message, Tag, Select} from 'antd'
import PropTypes from 'prop-types';
import * as action from './redux/actions';
// import moduleName from 'r'
class App extends React.Component {
  

  static propTypes={
    store:PropTypes.object.isRequired
  }

  add=()=>{
    this.props.store.dispatch(action.add(this.value))
  }

  sub=()=>{
    this.props.store.dispatch(action.sub(this.value))
  }

  render(){
    const store =this.props.store;
    const total = store.getState()
    return (
      <>
        <Tag color="magenta">{total}</Tag>
          <br/>
          <Select
          style={{width:300}}
          defaultValue="请选择"
          onSelect={(value)=>{
              this.value = value
          }}> 
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
        <br/>
       <Button type="primary" onClick={this.add} style={{width:200}}>加</Button>
       <br/>
       <Button type="primary" onClick={this.sub} style={{width:200}}>减</Button>
      </>
    );
  }

}

export default App;
