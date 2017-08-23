/**
 * Created by mengjiuxiang on 2017/4/14.
 */
import $ from 'jquery';
import React from 'react';
import {Button,notification,message} from 'antd';
import Moment from 'moment';
/*工具函数*/
export function RequestApi(type,url,data,callback,errorCallback){
    let t1 = new Date().getTime();
    $.ajax({
        type: type,
        url:  url,
        data: data,
        dataType: "json",
        //contentType:"application/json", 
        success: function(data){
            console.log("成功"+data);
            let t2 = new Date().getTime();
            if(data.msg==="success"){
                callback(data);
            }else{
                message.error("错误信息："+data.message);
                errorCallback && errorCallback(data);
            }
        },
        error:function(error){
            console.log("失败"+data);
            let t3 = new Date().getTime();
            message.error("网络连接异常:" + JSON.stringify(error.status) + ":" +JSON.stringify(error.statusText),5);
        }
    })
}


export  function UnixToDate(unix,format){
        if(unix === undefined || unix === null) return null;

        if(unix * 1 <= 0) return null;

        if(format === undefined)
            format = "YYYY-MM-DD HH:mm";

        return Moment.unix(unix.toString().substr(0,10)).format(format);

}

//stringTime = "2014-07-10 10:21:12";
export  function  DateToUnix(stringTime){
        var timestamp = Date.parse(new Date(stringTime));
        timestamp = timestamp / 1000;

        return timestamp;

}

export function urlEncode(param, key, encode) {  
  if(param==null) return '';  
  var paramStr = '';  
  var t = typeof (param);  
  if (t == 'string' || t == 'number' || t == 'boolean') {  
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
  } else {  
    for (var i in param) {  
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
      paramStr += urlEncode(param[i], k, encode);  
    }  
  }  
  return paramStr;  
}; 
    