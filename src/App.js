import React from 'react';
import './App.css';
import {Button,message} from 'antd'
// import moduleName from 'r'
function App() {
  return (
   <Button type="primary" onClick={()=>message.warning('hello world')} >hello</Button>
  );
}

export default App;
