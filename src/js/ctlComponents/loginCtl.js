/**
 * Created by mengjiuxiang on 2017/4/14.
 */


import React from 'react';

import { Form, Button,Tooltip,Icon,message,Input, Checkbox,Row} from 'antd';
const FormItem = Form.Item;
import sha256 from 'crypto-js/sha256';
import {RequestApi} from "../../libs/util";   
import '../../css/ctlComponents/loginCtl.css';
import '../../libs/common.css';

import * as mock from "../../libs/mockData";

const {Component} = React;

class loginCtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }
    handleSubmit = (e) => {
        let self=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);


                let params = {
                    account:values.account,
                    password:""+sha256(values.password),
                };

                //将上面数据转化成json
                //JSON.stringify(params)

                new RequestApi('post','/v1/login/normal',params,(data)=>{
                     
                        if(data.code!==200){
                            message.error(data.msg);
                        }else{
                            self.props.changeStatus(data.data.access_token);
                            
                        }
                });

            }
        });

        //self.props.changeStatus(mock.normal.data.access_token);
    }
    render() {
        const {} = this.state;
        const {} = this.props;
        const { getFieldDecorator } = this.props.form;
        let self = this;
        return (
            <div className="global-div-loginCtl">
                <div className="title-div-order-search-filter">
                    安恒密盾订单管理网站
                </div>
                <Form onSubmit={this.handleSubmit} className="form-antd-form-loginCtl">
                    <FormItem>
                        {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账号!' }],
                        })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                        })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-antd-button-loginCtl">
                            登录
                        </Button>
                    </FormItem>
                </Form>

            </div>
            
        )
    }
}


export default Form.create()(loginCtl);



