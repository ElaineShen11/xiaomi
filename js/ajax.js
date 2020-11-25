function isObject(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true
    }
    return false
}

function ajax(options) {
    //创建数据交互对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest() //非IE5 6
    } else {
        var xhr = new ActiveXObject('Microsoft.XHLHTTP') //IE5 6
    }
    //判断并格式化参数data
    var data = ''
    if (isObject(options.data)) {
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'
        }
        data = data.substring(0, data.length - 1)
    }
    if (typeof options.data === 'string') {
        data = options.data
    }
    //判断请求方式
    if (options.type.toLowerCase() === 'get') {
        var time = ''//是否缓存
        time = options.cache ? '' : Date.now()
        //打开连接
        xhr.open(options.type, options.url + '?' + data + '&_=' + time, true)
        //发送请求
        xhr.send(null) //get请求传null
    }
    if (options.type.toLowerCase() === 'post') {
        //发送请求
        xhr.open(options.type, options.url, true)
        // 设置请求头，作用模拟表单post，请求提交数据，在send方法之前设置
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        //发送请求
        xhr.send(data)
    }
    //等待响应状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //datatype配置
                if (options.dataType === 'json') {
                    var json = JSON.parse(xhr.responseText)
                    options.success(json)
                } else if (options.dataType === 'xml') {
                    options.success(xhr.responseXML)
                } else {
                    options.success(xhr.responseText)
                }
            } else {
                options.error(xhr.status);
            }
        }
    }
}
