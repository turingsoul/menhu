$("h1,h2,h3,h4,h5,h6,img,a,span,input,button").css("opacity","1");

/*后加载的显示*/
$(".lazylazy").show();

$(".phone").on("click",function(){
	if($(".phoneNumber").hasClass("phoneNumberShow")){
		$(".phoneNumber").removeClass("phoneNumberShow");
	}else{
		$(".phoneNumber").addClass("phoneNumberShow");
	}
})

/*控制导航消失*/
$(".menuCollapse").on("click",function(){
	$("#bigmenu").hide();
	$(".commonHeader").show();
})
$(".btn_closeMenu").on("click",function(){
	$("#bigmenu").hide();
	$(".commonHeader").show();
})
/*控制导航显示*/
$(".toggle").on("click",function(){
	$("#bigmenu").show();
	$(".commonHeader").hide();
	$(".slide-nav>ul>li>ul").hide();
	$(".slide-nav>ul>li:nth-child(2)>ul").show();
})

/*导航栏展开收缩*/
$(".oneStand").on("click",function(e){
	if($(e.target).next("ul").length>=1){
		$(e.target).next("ul").toggle(200);	
		//操作其他相邻元素关闭
		$(e.target.parentNode).siblings().find("ul").hide(200);
	}
})

$(".texiao").hover(function(e){
	//获取特效内容
	var contentArea = [["AI智能数据建模与分类","独立的人工智能模块"],
	 					["本地数据","关系数据库","大数据平台"],
	 					["全自助拖拽式操作","自由布局，自动排版","便捷流畅的交互式分析"],
	 					["数十种图表及样式设置","3D可视化","敏捷数据门户","支持移动端的数据展现"],
	 					["SDK支持二次开发与扩展","支持第三方系统集成","跨平台部署及支持SaaS云服务"]
	 				   ];
    //获取特效次数
	var texiaoIndex = e.currentTarget.getAttribute("texiaoIndex");
	var myHtml = "";
	for(var i=0;i<contentArea[texiaoIndex].length;i++){
			myHtml = myHtml+'<div class="col-1-5 alignCenter">'+'<h4 class="white">'+contentArea[texiaoIndex][i]+'</h4>'+'</div>';
	}
	$("#texiaoArea").html(myHtml);
	//控制三角形移动
	$("#triAngleBox").css("left",''+(texiaoIndex*20)+'%');
	$(".white").css("opacity","1");
})
/*控制顶栏背景*/
function dealWithBackGround(a){
	if(a>0){
		$(".commonHeader").css("background","rgba(0,0,0,0.4)");
	}else{
		$(".commonHeader").css("background","rgba(0,0,0,0)");
	}
}
/*电话失去焦点*/
$(".requestParam2").on("blur",function(){
	testInputPhone($(".requestParam2").val());
})
var phoneVerify = 0;
/*提交申请试用信息*/
	$(".applyMyRequst").on("click",function(){
		var param1 = $(".requestParam1").val();
		var param2 = $(".requestParam2").val();
		var param3 = $(".requestParam3").val();
		var param4 = $(".requestParam4").val();
		//添加基本验证
		var passVerify = verifySubmitInfo(param1,param2,param3,param4);
		if(passVerify){
			/*拼接用户类型*/
			var userType = $(".requestParam1").attr("applyType");
			var param = [ 
	         { name : 'company', value : param3}  
	        ,{ name : 'contact_name', value : ""+param1+"("+userType+")"}
	        ,{ name : 'cell_phone', value : param2} 
	        ,{ name : 'email_address', value : param4} 
	        ];  
	        console.log(param);
	        $.ajax({  
	            type: 'get',  
	            url: '/portal/submitApply',  
	            data: param,  
	            dataType: 'text',  
	            success: function(text){showMessage("申请成功","success");},  
	            error: function(text) {showMessage("提交失败,请联系管理员","alert");}  
			})
		}else{
		}
	});
	//提交申请信息验证 通过返回true  失败返回false
	function verifySubmitInfo(param1,param2,param3,param4){
		var flag=1;
		$("#applyTips").text("");
		if(param4==""){
			$(".requestTips4").text("请留下您的常用邮箱");
			flag=0;
		}else{
			if(!checkEmail(param4)){
				$(".requestTips4").text("请填写正确的邮箱格式");
				flag=0;
			}else{
				$(".requestTips4").text("");
			}
		}
		if(param2==""){
			$(".requestTips2").text("请留下您的联系方式");
			flag=0;
		}else{
			if(!phoneVerify){
				$(".requestTips2").text("电话号码有误");	
				flag=0;
			}
		}
		if(param1==""){
			$(".requestTips1").text("请填写您的姓名");
			flag=0;
		}else{
			$(".requestTips1").text("");
		}
		return flag;
	}
	//邮箱验证
	function checkEmail(str){
	    /*var re = /^[a-z0-9]+[\._-]?[a-z0-9]+@[a-z0-9]+-?[a-z0-9]*(\.[a-z0-9]+-?[a-z0-9]+)?\.(com|org|net|com.cn|org.cn|net.cn|cn)$/*/
	    var re = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
	    if(re.test(str)){
	        return 1;
	    }else{
	        return 0;
	    }
	}
	//电话验证
	function testInputPhone(str){
	var flag=0;
	var reg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
	if(reg.test(str)){
		$.ajax({
					url:"https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+str,
					 dataType: "jsonp",
            		 jsonp: "callback",
					success:function(response){
						if(response.mts){
							$(".requestTips21").text("欢迎您的使用，"+response.carrier+" 用户");
							$(".requestTips2").text("");
							phoneVerify = 1;
							flag = 1;
						}
						else{
							$(".requestTips2").text("该手机号码不存在");
							$(".requestTips21").text("")
							phoneVerify = 0;
							flag = 0;
						}
					},
					error: function(msg){
						$(".requestTips2").text("手机号码不存在");
						$(".requestTips21").text("");
						phoneVerify = 0;
						flag = 0;
					}
			});
	}else{
		$(".requestTips2").text("电话号码格式有误");
		$(".requestTips21").text("");
		phoneVerify = 0;
		flag=0;
	}
	return flag;
}
	//电话验证2
	function testInputPhone2(str){
	var flag=0;
	var reg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
	if(reg.test(str)){
		$.ajax({
					url:"https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+str,
					 dataType: "jsonp",
            		 jsonp: "callback",
					success:function(response){
						if(response.mts){
							flag = 1;
						}
						else{
							flag = 0;
						}
					},
					error: function(msg){
						flag = 0;
					}
			});
	}else{
		$(".requestTips2").text("电话号码格式有误");
		flag=0;
	}
	return flag;
}
	function doAllRight(){
		$("#applybox").hide();
		$("#resultbox").show();
		$("#iknow").on("click",function(){
			$("#applytryout").hide();
			$("#resultbox").hide();
			$("#applybox").show();
			$("#appinput1").val("");
			$("#appinput2").val("");
			$("#appinput3").val("");
			$("#appinput4").val("");
			funPlaceholder(document.getElementById("appinput1"));
			funPlaceholder(document.getElementById("appinput2"));
			funPlaceholder(document.getElementById("appinput3"));
			funPlaceholder(document.getElementById("appinput4"));
		})
	}
	/*全局提示   type参数选项  alert 与  success*/
    function showMessage(txt,type){
    	var typeClass = "";
    	switch(type){
    		case 'alert':
    			typeClass = "bgAlert";
    			break;
    		case 'success':
    			typeClass = "bgGreen";
    			break;
    	}
    	var htmlTemplate = '<div class="globalMessage '+typeClass+'">'+txt+'</div>'
    	$("body").append(htmlTemplate);
    	setTimeout(function(){
    		$(".globalMessage").remove();
    	},3000)
    }
/*案例tab按钮点击*/
$(".anliTab>button").on("click",function(e){
	$(e.target).siblings().removeClass("col-6").addClass("col-2");
	$(e.target).removeClass("col-2").addClass("col-6");
	//获取按钮种类
	/*首先隐藏所有*/
	$(".anliSection").hide();
	var anliType = $(e.target).attr("anliType");
	switch(anliType){
		case "1":
			$(".anliSection1").show();break;
		case "2":
			$(".anliSection2").show();break;
		case "3":
			$(".anliSection3").show();break;
		case "4":
			$(".anliSection4").show();break;
	}
	
})

