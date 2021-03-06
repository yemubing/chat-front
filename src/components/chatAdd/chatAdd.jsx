import React, {Component} from 'react';

import Alert from '../alert/alert.jsx';
import * as api from '@/api/api.js';

import './chatadd.less';

class ChatAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {title: '', addr: '', intro: '', msg: ''};

    this.changeTitle = this.changeTitle.bind(this);
    this.changeAddr = this.changeAddr.bind(this);
    this.changeIntro = this.changeIntro.bind(this);

    this.addChat = this.addChat.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    document.title = '添加聊天室';
  }

  changeTitle(event) {
    this.setState({title: event.target.value});
  }

  changeAddr(event) {
    this.setState({addr: event.target.value});
  }

  changeIntro(event) {
    this.setState({intro: event.target.value});
  }

  addChat() {
    const {title, addr, intro} = this.state;
    if (title === '') {
      this.setState({'msg': '聊天室标题不能为空'});
      return;
    }
    if (addr === '') {
      this.setState({'msg': '地址不能为空'});
      return;
    }
    if (intro === '') {
      this.setState({'msg': '聊天室介绍不能为空'});
      return;
    }
    api.addChat({title, addr, intro}).then(data => {
      if (data.success) {
        this.props.history.push('/chat');
      } else {
        this.setState({'msg': data.msg});
      }
    });
  }

  closeAlert() {
    this.setState({msg: ''});
  }

  render() {
    return (
      <div className="bg-layer chatadd-layer">
        <ul className="chatadd-con">
          <li>
            <label htmlFor="title">聊天室标题：</label>
            <div className="input-chatadd">
              <input className="input-tit"
                  id="title"
                  onChange={this.changeTitle}
                  placeholder="请输入聊天室标题"
                  type="text"
                  value={this.state.title}
              />
            </div>
          </li>
          <li>
            <label htmlFor="addr">聊天室地址：</label>
            <div className="input-chatadd">
              <select className="input-addr"
                  id="addr"
                  onChange={this.changeAddr}
                  value={this.state.addr}
              >
                <option value="1">北京</option>
                <option value="2">上海</option>
                <option value="3">深圳</option>
                <option value="4">杭州</option>
                <option value="5">郑州</option>
                <option value="6">大连</option>
              </select>
            </div>
          </li>
          <li>
            <label htmlFor="intro">聊天室介绍：</label>
            <div className="input-chatadd">
              <textarea className="input-intro"
                  id="intro"
                  onChange={this.changeIntro}
                  rows="5"
                  value={this.state.intro}
              ></textarea>
            </div>
          </li>
        </ul>
        <div className="input-sub">
          <button onClick={this.addChat}>提交</button>
        </div>
        <Alert name={this.state.msg}
            onCloseAlert={this.closeAlert}
        >
        </Alert>
      </div>
    )
  }
}

export default ChatAdd;