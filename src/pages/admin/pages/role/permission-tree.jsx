import { Tree } from 'antd';
import React from 'react'
import PropTypes from 'prop-types';
import MenusConfig from '../../../../config/menu.config'

const { TreeNode } = Tree;



class PermissionTree extends React.PureComponent {

  static propTypes={
      role:PropTypes.object.isRequired
  }

  componentWillMount(){
    this.initMenuTree(this.props.role)
  }
  initMenuTree=(role)=>{
      // 目前只实现了两层
      const getExpandedKeys=()=> {
        const expandedKeys=role.menus.reduce((pre,item)=>{
          const father  =MenusConfig.getMenuByPath(item) &&MenusConfig.getMenuByPath(item).father
          if (father) {
            pre.push(father.path)
          }
          return pre
        },[])
        return [...new Set(expandedKeys)]
      }
      // 添加默认拥有的权限
      role.menus.push('/home','/production')
      role.menus = [...new Set(role.menus)]
      this.menusTreeData=  this.initMenusTreeData(MenusConfig,role)
      const expandedKeys = getExpandedKeys()
      const checkedKeys = role.menus
     this.setState({checkedKeys,expandedKeys})
  }

  componentWillReceiveProps({role}){
    this.initMenuTree(role)
  }

  // 初始化tree控件的显示数据，role参数用于判断chekBox的可选

  initMenusTreeData=(menuList,role)=>{
    const roleName= role.name
    return menuList.map((menu)=>{
      let flag_disableCheckbox =false
      const {title} =menu
      if (roleName ==="超级管理员" || title ==="首页" ||title ==="商品管理" ) {
          flag_disableCheckbox=true
      }
      if (menu.children) {
        return {
          title:menu.title,
          key:menu.path,
          flag_disableCheckbox,
          children:this.initMenusTreeData(menu.children,role)
        }
      }else{
        return {
          title:menu.title,
          flag_disableCheckbox,
          key:menu.path
        }
      }
    })
  }

  menusTreeData =null

  state = {
    expandedKeys: ['',],
    autoExpandParent: true,
    checkedKeys: ['/home'],
  };

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  getCheckedKeys = ()=>{
    return this.state.checkedKeys
  }
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode  disableCheckbox={item.flag_disableCheckbox}  title={item.title} selectable={false} key={item.key} dataRef={item}>
            {
              this.renderTreeNodes(item.children)
            }
          </TreeNode>
        );
      }
      return <TreeNode disableCheckbox={item.flag_disableCheckbox}  selectable={false}  key={item.key} {...item} />;
    });

  render() {
    const {menusTreeData} =this
    return (
      <Tree

        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(menusTreeData)}
      </Tree>
    );
  }
}



export default PermissionTree