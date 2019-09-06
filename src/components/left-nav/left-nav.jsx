import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import menuList from '../../config/menu.config'


const { SubMenu } = Menu;

class LeftNav extends Component {
    componentWillMount(){
      this.menuItems =  this.getMenuItems(menuList)
    }
    getMenuItems(menuList){
      const {pathname} = this.props.location
      return menuList.map((item)=>{
        if (item.children) {
          item.children.some(menuItem=>menuItem.path ===pathname) && (this.defaultOpenKey = item.path)
          return (
            <SubMenu
              key={item.path}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title} </span>
                  
                </span>
              }
            >
             {this.getMenuItems(item.children)}
            </SubMenu>
          )
        }else{
          return( 
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon}></Icon>
              {item.title}
            </Link>
          </Menu.Item>
         )
        }

      })
    }


        
    render() {
       const {menuItems,defaultOpenKey} = this
       const {pathname:selectedKey} = this.props.location
        return (
            <Menu
              style={{ width: 256 }}
              defaultOpenKeys={[defaultOpenKey]}
              selectedKeys={[selectedKey]}
              mode="inline"
              id="menu"
            >
              {
                menuItems
              }
            </Menu>
        )
    }
}


export default withRouter(LeftNav)
