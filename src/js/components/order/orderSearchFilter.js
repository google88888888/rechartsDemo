/**
 * Created by mengjiuxiang on 2017/4/14.
 */

import React from 'react';
const { Component } = React;
import { Form, Button ,Input,Row,message,Select,DatePicker} from 'antd';
const {RangePicker } = DatePicker;
import '../../../css/components/order/orderSearchFilter.css';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
import {RequestApi,UnixToDate,DateToUnix} from '../../../libs/util';

class orderSearchFilter extends Component {
    constructor(props){
        super(props);

        this.state = {
        };

    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        
    }

    handleSearch = (e) => {
        e.preventDefault();
        let  searchOptions=null;
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                let orderStartTime=null;
                let orderEndTime=null;
                if(values.orderTime===undefined||values.orderTime===null||values.orderTime.length===0){
                    orderStartTime=null;
                    orderEndTime=null;
                }else{
                    orderStartTime=UnixToDate(""+values.orderTime[0]);
                    orderEndTime=UnixToDate(""+values.orderTime[1]);
                    orderStartTime=orderStartTime.substr(0,10);
                    orderEndTime=orderEndTime.substr(0,10);

                    orderStartTime=orderStartTime+" 00:00:00";
                    orderEndTime=orderEndTime+" 23:59:59";

                    orderStartTime=DateToUnix(orderStartTime);
                    orderEndTime=DateToUnix(orderEndTime);

                    // console.log(orderStartTime);
                    // console.log(orderEndTime);

                    // console.log(UnixToDate(orderStartTime));
                    // console.log(UnixToDate(orderEndTime));

                }
                //DateToUnix
                //2017-08-04 17:36
                searchOptions={
                    corpName:values.corpName===undefined?"":values.corpName,  //企业名
                    orderId:values.orderId===undefined?"":values.orderId,  //认证等级
                    itemName:values.itemName===undefined?"":values.itemName,  //商品规格名称
                    orderStartTime:orderStartTime,  //	查询订单开始时间
                    orderEndTime:orderEndTime,  //查询订单结束时间

                     
                }

            }
        });
        this.props.filter(searchOptions);
    };

    handleReset = () => {
        this.props.form.resetFields();
    }

    output = () => {
        this.props.output();
    }
    

    render() {
        const { getFieldDecorator } = this.props.form;
        const {} = this.state;
        let self = this;
        const orderIdOptions = []; 
        orderIdOptions.push(<Select.Option  key={"全部"}>全部</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"试用规格"}>试用规格</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"50人及以下"}>50人及以下</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"51-100人"}>51-100人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"101-200人"}>101-200人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"201-300人"}>201-300人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"301-400人"}>301-400人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"401-500人"}>401-500人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"501-1000人"}>501-1000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"1001-2000人"}>1001-2000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"2001-3000人"}>2001-3000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"3001-5000人"}>3001-5000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"5001-10000人"}>5001-10000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"10001-15000人"}>10001-15000人</Select.Option>);
        orderIdOptions.push(<Select.Option  key={"15000人以上"}>15000人以上</Select.Option>);

        let searchHtnl;

        searchHtnl=<div >
                        <Form layout="inline" onSubmit={this.handleSearch}>
                            <Row className="margin-top-antd-row-order-search-filter">
                                
                            </Row>
                            <Row className="title-antd-row-order-search-filter">
                                搜索：
                            </Row>
                            <Row>
                                <FormItem
                                    >
                                    {getFieldDecorator('corpName', {})(
                                        <Input placeholder="企业名称" className="search-antd-input-order-search-filter" />
                                    )}
        
                                </FormItem>
                                
                                <FormItem
                                    >
                                    {getFieldDecorator('orderId', {})(
                                        <Input placeholder="订单号" className="search-antd-input-order-search-filter" />
                                    )}
        
                                </FormItem>

                                <FormItem
                                    >
                                    {getFieldDecorator('itemName', {initialValue: '全部'})(
                                        <Select  allowClear={true} placeholder="请选择认证状态" style={{width:"200px",marginTop:"15px"}} allowClear={true}>
                                            {orderIdOptions}
                                        </Select>
                                    )}
        
                                </FormItem>
                            </Row>
                            <Row>

                                <FormItem>
                                    {getFieldDecorator('orderTime', {})(
                                        <RangePicker  
                                            placeholder={["订购开始时间","订购结束时间"]} 
                                            style={{width:"410px",marginTop:"15px"}} 
                                            format="YYYY-MM-DD"
                                            />
                                    )}
                                </FormItem>

                                <FormItem>
                            
                                    <Button
                                        style={{width:"90px",marginTop:"15px"}}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        搜索
                                    </Button>

                                    <Button
                                        style={{width:"90px",marginTop:"15px",marginLeft:"20px"}}
                                        onClick={self.output.bind(self)}
                                    >
                                        导出
                                    </Button>
                                </FormItem>
                            </Row>
                        </Form>
                    </div>

        return (
            <div>

                {searchHtnl}

                
            </div>
        );
    }
}

export default Form.create()(orderSearchFilter);