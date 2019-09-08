import React from 'react';
import './App.css';
import {Button, Tag, Select} from 'antd'
import PropTypes from 'prop-types';
import  {add,sub} from './redux/actions';
import { connect } from 'react-redux';
class App extends React.Component {
  

  static propTypes={
    total:PropTypes.number.isRequired,
    add:PropTypes.func.isRequired,
    sub:PropTypes.func.isRequired
  }

  add=()=>{
    this.props.add(this.value);
  }

  sub=()=>{
    this.props.sub(this.value);
  }

  render(){
    const total = this.props.total;

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


/**
 * mapStateToProps
 * (state)=>({propName:xxx})
 * mapDispatchToProps
 * (dispatch)=>({propName:(data)=>{dispatch(action(data)}})
 * 或者对象语法糖{action1,action2}
 */
const container = connect(
                          (state)=>({ total:state }),
                          {add, sub}
                        );
const wrappedApp = container(App);
export default wrappedApp;
