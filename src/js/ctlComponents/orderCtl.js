/**
 * Created by mengjiuxiang on 2017/4/14.
 */


import React from 'react';

import { Form, Button,Icon,message,Input, Checkbox} from 'antd';

//http://recharts.org/#/zh-CN/examples/TwoSimplePieChart
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie} from "recharts";

import {RequestApi,UnixToDate,urlEncode} from "../../libs/util";   
import '../../css/ctlComponents/orderCtl.css';
import '../../libs/common.css';

import OrderSearchFilter from '../components/order/orderSearchFilter';
import OrderTableRender from '../components/order/orderTableRender';

import * as mock from "../../libs/mockData";


const {Component} = React;

class orderCtl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            statistics:{
                corpNum:0,
                totalPayFee:0, 
            },
            loading : true,
            pageOptions : {
                page:1,
                pageSize:10,
                total:0
            },
            searchOptions:{
                corpName:"", //企业名
                orderId:"", //认证等级
                itemName:"", //商品规格名称
                orderStartTime:null, //	查询订单开始时间
                orderEndTime:null, //查询订单结束时间
            },
            
        };

    }

    componentDidMount() {
        this.search();
    }

    search(){
        let self = this;
        let orderSearchModel={
            accessToken:this.props.accessToken,
            
            page:this.state.pageOptions.page,
            pageSize:this.state.pageOptions.pageSize,

            corpName:this.state.searchOptions.corpName, //企业名
            orderId:this.state.searchOptions.orderId, //认证等级
            itemName:this.state.searchOptions.itemName, //商品规格名称
            orderStartTime:this.state.searchOptions.orderStartTime, //	查询订单开始时间
            orderEndTime:this.state.searchOptions.orderEndTime, //查询订单结束时间

        }
        self.setState({
            loading : true,
        })

        new RequestApi('post','/v1/order/search',orderSearchModel,(data)=>{
            if(data.code!==200){
                message.error(data.msg);
            }else{
                let newPageOptions=self.state.pageOptions;
                newPageOptions.total=data.data.itemTotal;
                self.setState({
                    loading : false,
                    data : self.getTrueData(data.data.itemInfos),
                    statistics :  self.getStatistics(data.data),         
                    pageOptions:newPageOptions
                })
            }
        });

        // let newPageOptions=self.state.pageOptions;
        // newPageOptions.total=mock.search.data.itemTotal;
        // self.setState({
        //     loading : false,
        //     data : self.getTrueData(mock.search.data.itemInfos),
        //     statistics :  self.getStatistics(mock.search.data),
        //     pageOptions:newPageOptions
        // })


    }
    filter(searchOptions){
        let self=this;
        this.setState({
            searchOptions:searchOptions,
            pageOptions: {
                page:1,
                pageSize:10,
                total:0
            }
        },function(){
      
            this.search();
        });
    }

    output(){
        let self = this;
        let orderOutputModel={
            accessToken:this.props.accessToken,
            corpName:this.state.searchOptions.corpName, //企业名
            orderId:this.state.searchOptions.orderId, //认证等级
            itemName:this.state.searchOptions.itemName, //商品规格名称
            orderStartTime:this.state.searchOptions.orderStartTime, //	查询订单开始时间
            orderEndTime:this.state.searchOptions.orderEndTime, //查询订单结束时间

        }
        let url="/v1/order/excel";
        window.location = url+"?"+urlEncode(orderOutputModel);
        // new RequestApi('post','/v1/order/excel',orderOutputModel,(data)=>{
        //     if(data.code!==200){
        //         message.error(data.msg);
        //     }else{
        //     }
        // });
    }

    onShowSizeChange(current, pageSize){
        console.log("onShowSizeChange的current"+current+";pageSize"+pageSize);
        let newPageOptions=this.state.pageOptions;
        newPageOptions.page=1;
        newPageOptions.pageSize=pageSize;
        this.setState({
            pageOptions:newPageOptions
        })
        this.search();
    }
    onChange (current, pageSize) {
        console.log("onChangecurrent的current"+current+";pageSize"+pageSize);
        let newPageOptions=this.state.pageOptions;
        newPageOptions.page=current;
        newPageOptions.pageSize=pageSize;
        this.setState({
            pageOptions:newPageOptions
        })
        this.search();
    }

    getTrueData(data){
        for(var i=0;i<data.length;i++){
            data[i].key=i; 
            data[i].paidtime=UnixToDate(data[i].paidtime);

            //data[i].serviceStopTime=UnixToDate(data[i].serviceStopTime);

        };
        return data;
    }

    getStatistics(data){
        let statistics={
            corpNum:data.corpNum,
            totalPayFee:data.totalPayFee, 
        };

        return statistics;
    }

    render() {
        const {data,statistics,loading,pageOptions} = this.state;
        const {} = this.props;
        let self = this;



        const columns = [{
            title: '企业名',
            dataIndex: 'corpName',
            key: 'corpName'
            }, {
            title: '商品规格码',
            dataIndex: 'itemName',
            key: 'itemName'
            }, {
            title: '订单号',
            dataIndex: 'orderId',
            key: 'orderId'
            }, {
            title: '下单时间',
            dataIndex: 'paidtime',
            key: 'paidtime'
            }
        // ,{
        //     title: '服务到期时间',
        //     dataIndex: 'serviceStopTime',
        //     key: 'serviceStopTime',
        // }
            ,{
            title: '订单费用（元）',
            dataIndex: 'payFee',
            key: 'payFee',
            },{
            title: '钉钉分销系统提单价（元）',
            dataIndex: 'nominalPayFee',
            key: 'nominalPayFee',
            },{
            title: '折扣费用（元）',
            dataIndex: 'discountFee',
            key: 'discountFee',
            }, {
            title: '折扣',
            dataIndex: 'discount',
            key: 'discount',
        }];


        const dataChart = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        ];

        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                        {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                        {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

        const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                        {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                        {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];


        return (
            <div>
                <div   className="global-div-order-ctl" >

                    <PieChart width={800} height={400} >
                        <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                        <Tooltip/>
                    </PieChart>


                    <BarChart width={600} height={300} data={dataChart}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>


                    <OrderSearchFilter 
                        filter={this.filter.bind(this)}
                        output={this.output.bind(this)}
                    />
                    <OrderTableRender 
                        columns={columns} 
                        data={data}      
                        statistics={statistics}
                        pageOptions={pageOptions}
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        onChange={this.onChange.bind(this)}
                        loading={loading}
                    />

                    
                </div>
            </div>
            
        )
    }
}


export default orderCtl;