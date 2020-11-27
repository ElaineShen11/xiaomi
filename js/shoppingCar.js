$(function(){
   
    if (localStorage.getItem('goodsList')){
        var goodArr = JSON.parse(localStorage.getItem('goodsList'))
        
        $.ajax({
            url: '../data/goodsList.json',
            type: 'get',
            dataType: 'json',
            success: function (json) {
                console.log(json)
                var domStr = ''
                $.each(goodArr, function (index, item) {
                    $.each(json, function (ind, obj) {
                        if (item.code === obj.code) {
                            domStr += `
                        <li class="clearfix">
                            <input type="checkbox">
                            <img src="${obj.imgurl}" alt="">
                            <h3>${obj.title}</h3>
                            <span>${obj.price}</span>
                            <p>${item.num}</p>
                            <em>${obj.price}</em>
                            <a href="#" code="${obj.code}">×</a>
                        </li>
                            `
                        }
                    })
                })
                $('.list').append(domStr)
            }
        })
        $('.list').on('click','li a',function(){
            $(this).parent().remove()
            var code = $(this).attr('code')
            $.each(goodArr,function(index,item){
                if(item.code === code){
                    goodArr.splice(index,1)
                    return false
                }
            })
        })
    }

})