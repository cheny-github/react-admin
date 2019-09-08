import React, { Component } from 'react'
import './user.less'
import {formatTime} from '../../../../uitls/timeUtils'  
import {PAGE_SIZE} from '../../../../config/constants'  
import LinkButton from '../../../../components/link-button/link-button'
import { Table, Card, Button, Modal,Form,Input,Select, message } from 'antd'
import {reqUserList, reqRoleList, reqAddUser, reqUpdateUser, reqDeleteUser} from '../../../../api/api';
const {Item}= Form
const {Option} = Select
class User extends Component {
    state ={
        users:[],
        //用于添加/更新的表单组件复用，false表示显示更新用户信息，true表示添加用户信息
        flag_addUser:true,
        // 即将要修改的user对象
        userToBeUpdate:null,
        userToBeDelete:null,
        userToBeAdd:null,
        modalVisiable:false,
        //键值对集合，key：角色id，value：角色信息
        roles:{}
    }
    // 用于配置table的column
    columns=[]


    deleteUser=async (userId)=>{
        const result = await reqDeleteUser(userId)
        if (result.status===0) {
            message.success("删除成功")
            this.getUsers()
        }else{
            message.error('删除失败'+(result.msg || ''))
        }
    }

    /**
     * 发送请求更新用户信息
     */
    updateUser= async()=>{
        const user = this.validateField()
        if (user) {
            user._id = this.state.userToBeUpdate._id
            const result = await reqUpdateUser(user)
            if (result.status ===0) {
                message.success('修改成功')
                this.setState({
                    modalVisiable:false
                })
                this.getUsers()
                this.resetForm()
            }else{
                message.error('修改失败'+result.msg)
            }
        }
    }
    
    /**
     * 发送请求添加用户
     */
    addUser= async()=>{
        const user = this.validateField()
        if (user) {
            const result = await reqAddUser(user)
            if (result.status ===0) {
                message.success('添加成功')
                this.setState({
                    modalVisiable:false
                })
                this.getUsers()
                this.resetForm()
            }else{
                message.error('添加失败'+result.msg)
            }
        }
    }


    // 验证表单数据
    validateField(){
        let result =null
        this.props.form.validateFields((error,values)=>{
            if (!error) {
                result =values
            }
        })
        return result   
    }
    // 重置表单中的数据已避免复用组件带来的表单初始数据混乱
    resetForm(){
        this.props.form.resetFields()
    }
    handleAddUserBtnClick =()=>{
        this.setState({
            modalVisiable:true,
            flag_addUser:true
        })
    }

    handleCancel =()=>{
        this.props.form.resetFields()
        this.setState({
            modalVisiable:false
        })
    }
    handleOk =()=>{
        const {flag_addUser} = this.state
        // 解析表单数据
        if (flag_addUser) {
            // 发送添加用户请求
            this.addUser()
        }else{
            // 发送更新用户请求
            this.updateUser()
        }

    }
         /**
      * 	      {
	        "_id": "5cb05b4db6ed8c44f42c9af2",
	        "username": "test",
	        "password": "202cb962ac59075b964b07152d234b70",
	        "phone": "123412342134",
	        "email": "sd",
	        "role_id": "5ca9eab0b49ef916541160d4",
	        "create_time": 1555061581734,
	        "__v": 0
	      },
      */

    componentWillMount(){
        
        this.columns = [
            {
                title: '用户名称',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(crateTime)=>{return formatTime(new Date(crateTime))}
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render:(roleId)=> {
                    return this.state.roles[roleId] && this.state.roles[roleId].name
                }
            },
            {
                title: '操作',
                key: 'operation',
                render:(user)=>{
                    
                    return (
                        <>
                            <LinkButton onClick={()=>{
                                    this.setState({
                                        userToBeUpdate:user,
                                        flag_addUser:false,
                                        modalVisiable:true
                                    })
                            }}>
                                修改
                            </LinkButton>

                            <LinkButton onClick={()=>{this.deleteUser(user._id)}}>
                            删除</LinkButton>
                        </>
                    )
                }
            },
        ]

    }
    componentDidMount(){
        this.getUsers()
        this.getRoles()
    }
    // 获取用户列表并刷新界面
    getUsers=async()=>{
        const result = await reqUserList()
        if (result.status ===0) {
            const {users} = result.data
            this.setState({users})
        }
    }
    getRoles = async ()=>{
        const result = await reqRoleList()
        if (result.status ===0) {
            const roles = result.data.reduce( 
                (pre,role)=>{
                    pre[role._id] = role
                    return pre
                },{})
            roles.getArray = ()=>result.data
            this.setState({roles})
        }
    }
    render() {
        const {users,flag_addUser,modalVisiable,roles} = this.state
        const userToBeUpdate  = flag_addUser ?{} :this.state.userToBeUpdate
        const {username,phone,email,role_id:roleId} = userToBeUpdate
        const {columns} =this
        const {form} =  this.props  
        const {getFieldDecorator} = form
        const cardTitle = (<Button type="primary" onClick={this.handleAddUserBtnClick}>创建用户</Button>)
        const modalTitle =flag_addUser ? '添加用户':'修改用户信息'
    /**
     *  
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱
	|role_id     |N       |string   |角色ID
     */



        return (
            <Card size="default" title={cardTitle}>
                <Table
                    bordered
                    dataSource={users}
                    columns={columns}
                    pagination={
                        {
                            size:PAGE_SIZE
                        }
                    }
                    rowKey="_id"
                        >
                </Table>
                <Modal
                    title={modalTitle}
                    visible={modalVisiable}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form>
                        <Item label="用户名">
                            {getFieldDecorator('username',{
                                initialValue:username,
                                rules:[{required:true,message:'用户名不能为空'}]
                            })(<Input placeholder="请输入用户名"></Input>)
                            }
                        </Item>
                        
                        {
                            flag_addUser && (
                                <Item label="密码">
                                {getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[{required:true,message:'用户密码不能为空'}]
                                })(<Input placeholder="请输入用户密码"></Input>)
                                }
                                 </Item>
                            
                            )
                              
                            
                        }
                        <Item label="手机号">
                            {getFieldDecorator('phone',{
                                initialValue:phone  ,
                                rules:[
                                    {required:true,message:'手机号不能为空'},
                                    {pattern:/\d{1,11}/,message:'请输入正确的手机号'}
                                ]
                            })(<Input placeholder="请输入手机号"></Input>)
                            }
                        </Item>
                        <Item label="邮箱">
                            {getFieldDecorator('email',{
                                initialValue:email,
                            })(<Input placeholder="请输入邮箱"></Input>)
                            }
                        </Item>
                        <Item label="角色">
                            {
                                getFieldDecorator('role_id',{
                                    initialValue:roleId,
                                    rules:[{required:true,message:'请设置角色'}]
                                })(
                                    <Select >
                                        {
                                            roles.getArray && roles.getArray().map(role=>{
                                                return (<Option key={role._id} value={role._id}>{role.name}</Option>)
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                    </Form>
                </Modal>
          </Card>
          
        )
    }
}

export default Form.create()(User)
