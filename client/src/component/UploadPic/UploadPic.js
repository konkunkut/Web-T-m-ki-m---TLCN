import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./UploadPic.scss";
import { Upload, Button, Icon, Modal, Col, Row } from "antd";

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log("fileList", fileList);

    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData();
    // add one or more of your files in FormData
    // again, the original file is located at the `originFileObj` key
    formData.append("file", this.state.fileList[0].originFileObj);

    axios
      .post("http://api.foo.com/bar", formData)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Tải lên</div>
      </div>
    );
    return (
      <div className="upload-pic">
        <div
          visible={this.props.isVisible}
        >
        <Button className="btn-cfmUpload"
          onClick={this.handleSubmit}
           // this button click will trigger the manual upload
        >
          Xác nhận
        </Button>
        </div>
        <Upload
          className="btn-upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUpload}
          beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
        >
          {fileList.length >= this.props.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
