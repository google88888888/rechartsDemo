/**
 * Created by mengjiuxiang on 2017/4/14.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs,message ,Button} from 'antd';
import '../css/index.css';
import Util from "../libs/util";

import * as mock from "../libs/mockData";
import Login from './ctlComponents/loginCtl';
import Order from './ctlComponents/orderCtl';

const {Component} = React;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin:false,
            accessToken:"",

        };

        

    }

    changeStatus(accessToken){
        this.setState({
            hasLogin:!this.state.hasLogin,
            accessToken:accessToken,
        })
    }


    render() {
        const {hasLogin,accessToken} = this.state;
        let self=this;
        let contentHtml;
        if(hasLogin){
        //测试用下面那个
        //if(true){
            contentHtml=<div>
                <Order 
                    changeStatus={this.changeStatus.bind(this)} 
                    accessToken={accessToken}
                />
            </div>
        }else{
            contentHtml=<div>
                <Login 
                    changeStatus={this.changeStatus.bind(this)} 
                />
            </div>
        }
        return (
            <div className="app-div-index">

                {contentHtml}

            </div>

        );
    }
}

ReactDOM.render(
    <App/>
    ,document.getElementById('app')
);
