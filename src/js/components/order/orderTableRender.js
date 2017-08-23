/**
 * Created by mengjiuxiang on 2017/4/14.
 */


import React from 'react';
import { Table ,Row} from 'antd';
import '../../../css/components/order/orderTableRender.css';


const {
    Component
} = React;


class orderTableRender extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };

    render(){

        const {columns ,data,onRowClick,loading,pageOptions,onShowSizeChange,onChange,statistics} = this.props;

        let pagination = {
            total: pageOptions.total === undefined ? 0 :pageOptions.total,
            showTotal : total => `共 ${total} 条`,
            showSizeChanger:true,
            current : pageOptions.page,
            pageSize:pageOptions.pageSize,
            pageSizeOptions:['1','10','20','30','40','50','60','70','80','90','100'],
            onShowSizeChange: (current, pageSize) => {
                onShowSizeChange(current, pageSize);
            },
            onChange: function (current, pageSize) {
                onChange (current, pageSize);
            },
            showQuickJumper:true
        };

        let statisticsHtml;

        statisticsHtml=<div>
                            <Row className="title-div-common">
                                统计：
                            </Row>
                            <Row > 
                                <span className="item-first-span-order-table-render" >
                                    符合查询条件的企业总数：
                                </span>
                                <span className="item-span-order-table-render" >
                                    {statistics.corpNum}
                                </span>
                                <span className="item-second-span-order-table-render" >
                                    符合查询条件的交易总金额：
                                </span>
                                <span className="item-span-order-table-render" >
                                    {statistics.totalPayFee}
                                </span>
                            </Row>

                    </div>

        return(
            <div >
                {statisticsHtml}
                <div>
                    <Row className="title-div-common">
                        展示：
                    </Row>
                    <Table className="title-div-common"
                           columns={columns} 
                           dataSource={data}
                           onRowClick={onRowClick}
                           pagination={pagination}
                           loading={loading}
                           />
                </div>
            </div>
        )
    }
}

export default orderTableRender;