import React, { Component } from 'react'
import './role.less'
import { Card, Button, Table, Modal ,Form, Input, message } from 'antd'
import {formatTime} from '../../../../uitls/timeUtils';
import LinkButton from '../../../../components/link-button/link-button';
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../../../api/api';
import { PAGE_SIZE } from '../../../../config/constants';
import PermissionTree from './permission-tree';
import userService from '../../../../service/userService';

  
class Role extends Component {
    state={
        roleList:[],
        roleToBeUpdate:null,
        flag_tableLoading:true,
        flag_modalVisible:false,
        flag_permissionTreeModalVisible:false
    }

    // table的字段定义,在willMount中初始化
    columns=[]
    ref_PermissionTree =React.createRef()
    getRoles=async ()=>{
        const result = await reqRoleList()
        if (result.status ===0) {
            const roleList = result.data
            this.setState({
               roleList,
               flag_tableLoading:false
            })
        }
   }

    /**
     *    {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "5ca9eaa1b49ef916541160d3",
                "name": "测试",
                "create_time": 1554639521749,
                "__v": 0,
                "auth_time": 1558679920395,
                "auth_name": "test007"
            },
     */
    componentWillMount(){
        this.columns= [
            {title:'角色名',dataIndex:'name',key:'name',},
            {title:'创建时间',dataIndex:'create_time',key:'create_time',
                render:(time)=>formatTime(new Date(time))
            },
            {title:'授权时间',dataIndex:'auth_time',key:'auth_time',
                
                render:(time)=>{
                    if (typeof time ==="undefined") {
                        return '暂未授权'
                    }
                    return formatTime(new Date(time))
                }
            },
            {title:'授权人',dataIndex:'auth_name',key:'auth_name',render:(authName)=>{
                    if (typeof authName ==="undefined") {
                        return '无'
                    }
                    return authName
            }},
            {title:'操作',key:'operation',
                render:(role)=>{
                    return (<>
                        <LinkButton
                         onClick={()=>{
                            //待添加功能,设置tree的显示状态
                            this.setState({
                                flag_permissionTreeModalVisible:true,
                                roleToBeUpdate:role
                            })
                         }}
                        >设置权限</LinkButton>
                    </>)
                }
            },
        ]
    }

    componentDidMount(){
        this.getRoles()
    }
    // 添加用户按钮的点击回调
    handleAddRoleBtnClick=()=>{
        this.setState({
            flag_modalVisible:true
        })
    }
    // Modal的OK回调，发送请求提交表单
    onOk=async ()=>{
        const values = this.validateField()
        if (values) {
            const {roleName} =values
            const result = await reqAddRole(roleName)
            if (result.status ===0) {
                message.success(`${result.data.name}已添加`)
                this.setState({
                    flag_modalVisible:false
                })
                this.getRoles()
            }else{
                message.error(`添加失败,${result.msg || ''}`)
            }
        }
    }

    // 校验添加角色的表单
    validateField =()=>{
        let result =null
        this.props.form.validateFields((error,values)=>{
            if (!error) {
                result = values
            }
        })
        return result
    }

    // Modal的Cancle回调
    onCancel=()=>{
        this.setState({
            flag_modalVisible:false
        })
    }


    handlePermissionTreeModalCancle=()=>{
        this.setState({
            flag_permissionTreeModalVisible:false
        })
    }
    handlePermissionTreeModalOk=async ()=>{
        const menus = this.ref_PermissionTree.current.getCheckedKeys()
        const result = await reqUpdateRole(this.state.roleToBeUpdate._id,menus,Date.now().valueOf(),userService.getUser().username)
        if (result.status ===0) {
            message.success('更新成功')
            
            this.getRoles()
            this.setState({
                flag_permissionTreeModalVisible:false
            })

        }else{
            message.error(`更新失败,${result.msg ||''}`)
        }

    }

    render() {
        const cardTitle = <Button type="primary" onClick={this.handleAddRoleBtnClick}>创建角色</Button>
        const {roleList,flag_tableLoading,flag_modalVisible,flag_permissionTreeModalVisible,roleToBeUpdate} = this.state
        const {columns} =this
        const {getFieldDecorator} = this.props.form
        const {name:roleNameToBeUpdate} = roleToBeUpdate||{}
        return (
            <>
                <Card title={cardTitle}>
                    <Table 
                        loading ={flag_tableLoading}
                        dataSource={roleList}
                        columns={columns}
                        rowKey='_id'
                        pagination={{size:PAGE_SIZE}}
                    >

                    </Table>
                </Card>
                <Modal title="添加角色" visible={flag_modalVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <Form >
                        <Form.Item label="角色名">
                            {
                                getFieldDecorator('roleName',{
                                    rules:[{required:true,message:'角色名不能为空'}]
                                })(<Input placeholder="请输入角色名"></Input>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
                
                {/* PermissionTree */}
                <Modal title="设置权限" 
                visible={flag_permissionTreeModalVisible}
                onCancel={this.handlePermissionTreeModalCancle}
                onOk={this.handlePermissionTreeModalOk}
                >
                   <Input disabled value={roleNameToBeUpdate}></Input>
                    <PermissionTree role={roleToBeUpdate || {}} ref={this.ref_PermissionTree}></PermissionTree>
                </Modal>
            </>
        )
    }
}


export default Form.create()(Role)