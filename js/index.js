var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    effect : 'fade',
    fadeEffect: {
    crossFade: true,
  },
    speed:1000,
    autoplay : {
      delay:4000,
      disableOnInteraction: false,
    },
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })     
  for(let i=0;i<mySwiper.pagination.bullets.length;i++){
    mySwiper.pagination.bullets[i].onmouseover=function(){
      this.click();
    };
  } 
  
  //如果你在swiper初始化后才决定使用clickable，可以这样设置
  mySwiper.params.pagination.clickable = true ;
  //此外还需要重新初始化pagination
  mySwiper.pagination.destroy()
  mySwiper.pagination.init()
  mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');   


  $(function(){
    $.ajax({
      url:'../data/goods.json',
      type:'get',
      datatype:'json',
      success:function(json){
        var goodsStr=''
        $.each(json,function(index,item){
          goodsStr+=`<li>
            <div class="figure">
                <a href="./goodsList.html">
                    <img src="${item.imgurl}">
                </a>
            </div>
            <h3 class="title">
                <a href="./goodsList.html">
                ${item.shoppingname}
                </a>
            </h3>
            <p class="desc">${item.title}
            </p>
            <p class="price">
                <span class="num">${item.price}</span>元
            </p>
        </li>`
        })
        $('.row-r ul').append(goodsStr)
      }
    })
  })


  function leftNavDownload(){
    $.ajax({
        url: "../data/nav.json",
        success: function(data){
            //第二部分，实现侧边导航栏
            var sideArr = data.sideNav;
            for(var i = 0; i < sideArr.length; i++){
                var node = $(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${sideArr[i].title}
                        <em class = 'iconfont icon-iconfontxiangxia1copy19'></em>
                    </a>
                    <div class="children clearfix">
                        
                    </div>
                </li>`);
                node.appendTo("#J_categoryList");

                //取出其中的子节点
                var childArr = sideArr[i].child;
                var col = Math.ceil(childArr.length / 6);
                node.find("div.children").addClass("children-col-" + col);
                for(var j = 0; j < childArr.length; j++){
                    if(j % 6 == 0){
                        var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                        newUl.appendTo(node.find("div.children"));
                    }
                    $(`<li>
                        <a href="#">
                            <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl);
                }
            }
        }
    })
}


function topNavDownload(){
    $.ajax({
        url: "../data/nav.json",
        success: function(data){
            //第三部分实现顶部导航
            var topNavArr = data.topNav;
            topNavArr.push({title: "服务"}, {title: "社区"});
            for(var i = 0; i < topNavArr.length; i++){
                $(`<li data-index="${i}" class="nav-item">
                    <a href="#" >
                        <span class="text">${topNavArr[i].title}</span>
                    </a> 
                </li>`).appendTo(" .nav-list");


                var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                </ul>`);
                node.appendTo("#J_navMenu .container")
                //取出所有的子菜单选项
                if(topNavArr[i].childs){
                    var childsArr = topNavArr[i].childs;
                    for(var j = 0; j < childsArr.length; j++){
                        $(`<li>
                            <a href="#">
                                <div class = 'figure figure-thumb'>
                                    <img src="${childsArr[j].img}" alt=""/>
                                </div>
                                <div class = 'title'>${childsArr[j].a}</div>
                                <p class = 'price'>${childsArr[j].i}</p>
                            </a>
                        </li>`).appendTo(node);
                    }
                }
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

//顶部导航添加移入移出效果
function topNavTab(){
    
    $(" .nav-list").on("mouseenter", ".nav-item", function(){
        $(this).addClass("nav-item-active");
        var index = $(this).index() - 1;
        if(index >= 0 && index <= 6){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
            $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
        }
    })
    $(".nav-list").on("mouseleave", ".nav-item", function(){
        $(this).removeClass("nav-item-active");
    })


    //移出的时候取消下拉菜单
    $(".nav-list").mouseleave(function(){
        $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
    })
    
}

//给侧片导航添加移入切换效果
function leftNavTab(){
    $("#J_categoryList").on("mouseenter", ".category-item", function(){
        $(this).addClass("category-item-active");
    })
    $("#J_categoryList").on("mouseleave", "li.category-item", function(){
        $(this).removeClass("category-item-active");
    })
}

leftNavDownload();
leftNavTab();
topNavDownload();
topNavTab();