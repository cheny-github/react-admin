import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { reqUploadImg } from "../../../../api/api";



const uploadPic = async (param) => {

    const result = await reqUploadImg(param.file,{
        // 上传进度
        onUploadProgress:event=>  param.progress(event.loaded / event.total * 100),
    })

    if (result.status ===0) {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: result.data.url,
        meta: {
        //   id: 'xxx',
        //   title: 'xxx',
          alt: '图片-商品详情',
        //   loop: true, // 指定音视频是否循环播放
        //   autoPlay: true, // 指定音视频是否自动播放
        //   controls: true, // 指定音视频是否显示控制栏
        //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }else{
        param.error({
            msg: 'unable to upload.'
          })
    }

  }


export default class RichEditor extends React.Component {

  state = {
    editorState: null, // 设置编辑器初始内容
    outputHTML: '<p></p>'
  }

  componentDidMount () {
    this.isLivinig = true
    // 0秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 0)
  }

  getDetail =()=>{
      return this.state.editorState.toHTML()
  }



  componentWillUnmount () {
    this.isLivinig = false
  }

  componentWillMount(){
    this.props._setGetDetail(this.getDetail)
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    const {detail} = this.props
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(detail)
    })
  }


  render () {

    const { editorState } = this.state

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            media={{uploadFn: uploadPic}}
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )

  }

}

