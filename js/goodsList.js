function topNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function success(data) {
        //第三部分实现顶部导航
        var topNavArr = data.topNav;
        topNavArr.push({
          title: "服务"
        }, {
          title: "社区"
        });
  
        for (var i = 0; i < topNavArr.length; i++) {
          $("<li data-index=\"".concat(i, "\" class=\"nav-item\">\n                    <a href=\"#\" >\n                        <span class=\"text\">").concat(topNavArr[i].title, "</span>\n                    </a> \n                </li>")).appendTo(" .nav-list");
          var node = $("<ul class = 'children-list clearfix' style = \"display: ".concat(i == 0 ? 'block' : 'none', "\">\n                </ul>"));
          node.appendTo("#J_navMenu .container"); //取出所有的子菜单选项
  
          if (topNavArr[i].childs) {
            var childsArr = topNavArr[i].childs;
  
            for (var j = 0; j < childsArr.length; j++) {
              $("<li>\n                            <a href=\"#\">\n                                <div class = 'figure figure-thumb'>\n                                    <img src=\"".concat(childsArr[j].img, "\" alt=\"\"/>\n                                </div>\n                                <div class = 'title'>").concat(childsArr[j].a, "</div>\n                                <p class = 'price'>").concat(childsArr[j].i, "</p>\n                            </a>\n                        </li>")).appendTo(node);
            }
          }
        }
      },
      error: function error(msg) {
        console.log(msg);
      }
    });
  } //顶部导航添加移入移出效果
  
  
  function topNavTab() {
    $(" .nav-list").on("mouseenter", ".nav-item", function () {
      $(this).addClass("nav-item-active");
      var index = $(this).index() - 1;
  
      if (index >= 0 && index <= 6) {
        $("#J_navMenu").css({
          display: "block"
        }).removeClass("slide-up").addClass("slide-down");
        $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");
        ;
      }
    });
    $(".nav-list").on("mouseleave", ".nav-item", function () {
      $(this).removeClass("nav-item-active");
    }); //移出的时候取消下拉菜单
  
    $(".nav-list").mouseleave(function () {
      $("#J_navMenu").css({
        display: "block"
      }).removeClass("slide-down").addClass("slide-up");
    });
  } //给侧片导航添加移入切换效果
  
  
  function leftNavTab() {
    $("#J_categoryList").on("mouseenter", ".category-item", function () {
      $(this).addClass("category-item-active");
    });
    $("#J_categoryList").on("mouseleave", "li.category-item", function () {
      $(this).removeClass("category-item-active");
    });
  }
  
  leftNavTab();
  topNavDownload();
  topNavTab();

 

  $(function(){
    $.ajax({
      url:'../data/goodsList.json',
      type:'get',
      datatype:'json',
      success:function(json){
        var goodsStr=''
        $.each(json,function(index,item){
          goodsStr+=`            <li>
          <div class="pro-img">
              <a href="./goodsDetail.html"><img src="${item.imgurl}" alt=""></a>
          </div>
          <div class="pro-title">
              <a href="./goodsDetail.html">${item.shoppingname}</a>
          </div>
          <div class="pro-price">
              <span class="span1">${item.title}
              </span>
              <span class="span2">
                  <i>${item.price}</i>元起
              </span>
          </div>
          <button class="car" code="${item.code}">
          加入购物车
          </button>
      </li>`
        })
        $('.product').append(goodsStr)
      }
    })

    $('.product').on('click','.car',function(){
      var code = $(this).attr('code')
      if(localStorage.getItem('goodsList')){
        var goodsArr = JSON.parse(localStorage.getItem('goodsList'))
      }else{
        var goodsArr = []
      }
     
      var hasGoods = false
      if(goodsArr.length>0){
        $.each(goodsArr,function(index,item){
          if(item.code === code){
            item.num++
            hasGoods = true
            return false
          }
        })
      }
      if(!hasGoods){
        goodsArr.push({code: code, num: 1})
      }

      localStorage.setItem('goodsList', JSON.stringify(goodsArr))
      alert('成功加入购物车')
    })
  })