import { Upload, Icon, Modal ,message} from 'antd';
import React from 'react';
import {reqDelProdImg} from '../../../../api/api'
import {IMG_URL_BASE} from '../../../../config/constants'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadImg extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    // 对象字段固定
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    ],
  };

  componentWillMount(){
 
    const {imgs} = this.props
    if (imgs) {
      const fileList = imgs.map((img,index)=>{
        return  ({
          uid: img+(-index),
          name: img,
          status: 'done',
          url: `${IMG_URL_BASE}${img}`,
        })
      })
      this.setState({
        fileList
      })
    }
  }

  getImgs =()=>{
    return this.state.fileList.map(item=>item.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  //从这里拿到上用户要添加的图片
  // 每个导致fileList的目录变化的图片都会在这个回调函数中通过file拿到，
  //   这个file 是fileList中某个元素的拷贝
 // file里面有个response属性，保存着当前图片上传成功服务器的响应，
//  也可以拿到图片在上传时的本地文件名
  handleChange = async ({ fileList,file }) => {
    const response= file.response
    if (file.status ==="done") {
        if (response.status === 0) {
            message.success('添加成功')
            //下面两句非常重要，图片显示就是考fileList的url属性的。
            fileList[fileList.length-1].name = response.data.name
            fileList[fileList.length-1].url = response.data.url
            this.setState({fileList})
        }else{
            message.error('添加失败')
            fileList.pop()
        }
    }
    // 删除图片
    if (file.status ==="removed") {
     const result = await reqDelProdImg(file.name)
     if (result.status ===0) {
         message.info('删除成功')
         this.setState({fileList})
     }else{
         message.info('删除失败')
         this.setState({fileList:[...fileList,file]})
     }
    }
    if (file.status !=="done" && file.status !=="removed") {
      this.setState({fileList})
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
        // 接口地址
          action="/manage/img/upload"
        // 字段名称
          name='image'
        //   展示类型
          listType="picture-card"
        //   指定数据源
          fileList={fileList}
        //   查看大图
          onPreview={this.handlePreview}
        //   fileList中的数据发生变化调用
          onChange={this.handleChange}
        >
            {/* 最大6张图 */}
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

// Function components cannot be given refs
export default UploadImg