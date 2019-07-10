import React, { Component } from 'react'
import { Menu, Icon, Switch } from 'antd';
const { SubMenu } = Menu;
export class MenuList extends Component {
    state = {
        theme: 'dark',
        current: '1',
      };
    
      changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };



    render() {
        return (
            <div>
                <div>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>试题管理</span>
              </span>
            }
          >
            <Menu.Item key="1">添加试题</Menu.Item>
            <Menu.Item key="2">试题分类</Menu.Item>
            <Menu.Item key="3">查看试题</Menu.Item>
            
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">添加用户</Menu.Item>
              <Menu.Item key="8">用户展示</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>Navigation Thre</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>

                
            </div>
        )
    }
}

export default MenuList
