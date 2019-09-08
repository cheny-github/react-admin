import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import menuList, { menusConfig } from '../../config/menu.config'
import userService from '../../service/userService';


const { SubMenu } = Menu;

class LeftNav extends Component {
    componentWillMount(){
      this.menuItems =  this.getMenuItems(menuList)
    }
    getMenuItems(menuList){
      const user = userService.getUser()
 
      const {pathname} = this.props.location

      return menuList.map((item)=>{
        // 用户是否有权限显示当前菜单项
        let flag_ShouldRender = false

        // 用户的权限列表中有该菜单项的显示权限
        const flag1 = user.role.menus.some(menu=>{
                        return menu.indexOf(item.path)===0
                      } )

        // 如果子菜单可以被显示的话，那么它的父菜单项也应该被显示
        // 拿到所有的父级菜单
        const menuFathers = user.role.menus.map(item=>{
          return menusConfig.getMenuByPath(item) && menusConfig.getMenuByPath(item).father
        }).filter(item=>item).map(item=>item.path)
        const flag2 = menuFathers.some((menuItem)=>menuItem.indexOf(item.path)===0)

        if (flag1||flag2|| user.username==="admin") {
           flag_ShouldRender=true
        }

        if (item.children) {
          // 设置默认展开项
          if(item.children.some(menuItem=> menuItem.path.indexOf(pathname) ===0) ){
            this.defaultOpenKey = item.path
          }
          if (flag_ShouldRender) {
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
          }

        }else{
          if (flag_ShouldRender) {
            return( 
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <Icon type={item.icon}></Icon>
                  {item.title}
                </Link>
              </Menu.Item>
             )
          }
        }


        return undefined
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
