function splitend(a){
	  var c = a.split('/');
	  return c[c.length-1];
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds()+':000000';
    return currentdate;
}
function changeDateToString(DateIn) {

    if (typeof DateIn == "string") {
        return DateIn
    }

    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";

    Year = DateIn.getFullYear();
    Month = DateIn.getMonth() + 1;
    Day = DateIn.getDate();

    CurrentDate = Year + "-";
    if (Month >= 10) {
        CurrentDate = CurrentDate + Month + "-";
    } else {
        CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate = CurrentDate + Day;
    } else {
        CurrentDate = CurrentDate + "0" + Day;
    }
    return CurrentDate;
}
angular.module('mtwebapp', ['ionic','monospaced.qrcode','ngCordova'])
.run(function($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast) {
			//双击退出
				$ionicPlatform.registerBackButtonAction(function (e) {
					//判断处于哪个页面时双击退出
					if ($location.path() == '/tab/me' || $location.path() == '/login' || $location.path() == '/tab/activity' || $location.path() == '/tab/sale') {
						if ($rootScope.backButtonPressedOnceToExit) {
							ionic.Platform.exitApp();
						} else {
							$rootScope.backButtonPressedOnceToExit = true;
							$cordovaToast.showShortBottom('再按一次退出系统');
							setTimeout(function () {
								$rootScope.backButtonPressedOnceToExit = false;
							}, 2000);
						}
					}
					else if ($ionicHistory.backView()) {
						$ionicHistory.goBack();
					} else {
						$rootScope.backButtonPressedOnceToExit = true;
						$cordovaToast.showShortBottom('再按一次退出系统');
						setTimeout(function () {
							$rootScope.backButtonPressedOnceToExit = false;
						}, 2000);
					}
					e.preventDefault();
					return false;
				}, 101);
		 
           
  
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
		$httpProvider.defaults.withCredentials = true;
		
		$ionicConfigProvider.backButton.text('');
		$ionicConfigProvider.backButton.previousTitleText(false);
		
		$ionicConfigProvider.platform.ios.tabs.style('standard'); 
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
		
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

        $ionicConfigProvider.platform.ios.views.transition('ios'); 
        $ionicConfigProvider.platform.android.views.transition('android');
		
	
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller: 'loginCtrl'
    })
    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'templates/login/forgotpassword.html',
	  controller:'forgotpasswordCtrl'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
	  controller:'TabsCtrl'
    })
    .state('tabs.sale', {
	  cache:false,
      url: '/sale',
      views: {
        'sale-tab': {
          templateUrl: 'templates/sale/sale.html',
          controller: 'saleCtrl'
        }
      }
    })
 
	.state('tabs.saledetail', {
      url: '/sale/:id',
      views: {
        'sale-tab': {
          templateUrl: 'templates/sale/saledetail.html',
          controller: 'saledetailCtrl'
        }
      }
    })
	.state('tabs.salepublish', {
      url: '/sale/salepublish',
      views: {
        'sale-tab': {
          templateUrl: 'templates/sale/salepublish.html',
          controller: 'salepublishCtrl'
        }
      }
    })
	.state('tabs.saleedit', {
      url: '/sale/edit:gid',
      views: {
        'sale-tab': {
          templateUrl: 'templates/sale/saleedit.html',
          controller: 'saleeditCtrl'
        }
      }
    })
	 
	.state('tabs.activity', {
		cache:false,
      url: '/activity',
      views: {
        'activity-tab': {
          templateUrl: 'templates/activity/activity.html',
		  controller:'activityCtrl'
        }
      }
    })
	.state('tabs.activitydetail', {
      url: '/activity/:id',
      views: {
        'activity-tab': {
          templateUrl: 'templates/activity/activitydetail.html',
		  controller:'activitydetailCtrl'
        }
      }
    })
	.state('tabs.activitypublish', {
      url: '/activity/activitypublish',
      views: {
        'activity-tab': {
          templateUrl: 'templates/activity/activitypublish.html',
		  controller:'activitypublishCtrl'
        }
      }
    })
    .state('tabs.me', {
      url: '/me',
      views: {
        'me-tab': {
          templateUrl: 'templates/me/me.html',
		  controller:'meCtrl'
        }
      }
    })
	.state('tabs.me-detail', {
      url: '/me/me-detail',
	  views:{
		  'me-tab':{
			 templateUrl:'templates/me/me-detail.html',
			 controller:'meCtrl'
		  }
      }
    })
	.state('tabs.me-shopinfo', {
      url: '/me/me-shopinfo',
	  views:{
		  'me-tab':{
			 templateUrl:'templates/me/me-shopinfo.html',
			 controller:'meCtrl'
		  }
      }
    })
	.state('tabs.me-servicestatus', {
      url: '/me/me-servicestatus',
	  views:{
		  'me-tab':{
			 templateUrl:'templates/me/me-servicestatus.html',
			 controller:'meCtrl'
		  }
      }
    })
	.state('tabs.me-subscribeservice', {
      url: '/me/me-subscribeservice',
	  views:{
		  'me-tab':{
			 templateUrl:'templates/me/me-subscribeservice.html',
			 controller:'meCtrl'
		  }
      }
    })
	

   $urlRouterProvider.otherwise('/login');

})
.filter('substr10',function(){
	return function(x){
		return x.substr(0,10);
	}
})

.controller('TabsCtrl', function($scope, $rootScope, $state) {
	//解决主界面显示tabs，其他子页面不显示tabs
        $rootScope.$on('$ionicView.beforeEnter', function() {
			var statename = $state.current.name;
            if(statename ==='tabs.activity'||statename ==='tabs.me'||statename ==='tabs.sale'){
					$rootScope.hideTabs = false;
				}else{
					$rootScope.hideTabs = true;
				}
        });
    })
	
.controller('loginCtrl', function($scope,$http, $state,$timeout,$rootScope) {
	var user = $scope.user={};
	$rootScope.imm = 'http://api.immbear.com';
	$rootScope.chatimm = 'http://chat.immbear.com';
	$rootScope.uploadimm='http://chat.immbear.com/file/uploader';
	$rootScope.imgimm='http://img.immbear.com/';
	user.account= "maoxiaojie";
	user.password="111111";
	var imm = $rootScope.imm ;
	$scope.signIn = function(user) {
	  user.password=hex_md5(user.password);
	  user.type=5;
	  $http.post(imm+'/merchant/login',user).success(function(res){
		if(res.is_success==true && res.merchant_service_status==2){
			$rootScope.sid =res.shop_id;
			$rootScope.spic = res.portrait_url;
			  $state.go('tabs.sale');
		}else if(res.is_success==true && res.merchant_service_status !==2 ){
				$scope.tip = '账号状态异常，请联系客服人员';
				$timeout(function(){$scope.tip = '';},1500)
		}else if(res.is_success==false){
				$scope.tip = '账号不存在或密码错误';		
				$timeout(function(){$scope.tip = '';},1500);
				$timeout.cancel();
		}
	  })
	};
  
})
.controller('forgotpasswordCtrl', function($scope, $state,$timeout,$rootScope) {
  

  
})
.controller('saleCtrl', function($scope, $state,$timeout,$rootScope,$http) {
	var imm = $rootScope.imm;
	var sid = $rootScope.sid;
	var imgimm = $rootScope.imgimm;
	var geton = $scope.geton = function(){
		$http.get(imm+ '/goods?shop_id='+sid+'&offset=0&limit=5000&status=1').success(function(res){
			//if(res.goods.length==0){$scope.nogoods = true}else{
				for(i=0;i<res.goods.length;i++){
					for(k=0;k<res.goods[i].pic_url_list.length;k++){
						res.goods[i].pic_url_list[k]=imgimm+res.goods[i].pic_url_list[k];
					}			
				}
				$scope.ongoods = res.goods;
			//};
		});
	};
	var getun = $scope.getun = function(){
		$http.get(imm+ '/goods?shop_id='+sid+'&offset=0&limit=5000&status=0').success(function(res){
			for(i=0;i<res.goods.length;i++){
				for(k=0;k<res.goods[i].pic_url_list.length;k++){
					res.goods[i].pic_url_list[k]=imgimm+res.goods[i].pic_url_list[k];
				}		
			}
			$scope.ungoods = res.goods;		
		})
	}
 
	$scope.noMoreGoods = false;
	$scope.addgoods = function(){
		
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
	$scope.unsaleit = function(gid){
		$http.put(imm+'/goods/status',{ids:''+gid+'','status': 0}).success(function(res){
				if(res.is_success == true){
					  geton();
				}
		})
	}
	$scope.onsaleit = function(gid){
		$http.put(imm+'/goods/status',{ids:''+gid+'','status': 1}).success(function(res){
			if(res.is_success == true){
					getun();
			}		
		})
	}
	$scope.deletegood = function(gid){
		$http.put(imm+'/goods/status',{ids:''+gid+'','status': 2}).success(function(res){
			if(res.is_success == true){
					geton();
					getun();
			}	
		})
	}
	$scope.publishgoods = function(){
		$state.go('tabs.salepublish')
	}
	
})
.controller('saledetailCtrl', function($scope, $state,$timeout,$rootScope,$http,$ionicSlideBoxDelegate) {
	var imm = $rootScope.imm;
	var imgimm = $rootScope.imgimm;
	$scope.myActiveSlide = 1;
	var url = window.location.href;
	var urll = url.split('/');
	var gid = urll[urll.length-1];
	$http.get(imm+'/goods/'+gid).success(function(res){
		for(i=0;i<res.pic_url_list.length;i++){res.pic_url_list[i]=imgimm+res.pic_url_list[i];}
		$scope.gpic = res.pic_url_list
		$scope.goods=res;
	})
	$timeout( function() {$ionicSlideBoxDelegate.update();}, 50);
	$scope.editgoods = function(gid){
		$state.go('tabs.saleedit',{gid:gid})
	}
})


.controller('saleeditCtrl', function($scope, $state,$timeout,$rootScope,$http,$stateParams,$ionicPopup,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$cordovaFileTransfer,$ionicHistory) {
	$rootScope.hideTabs == true;
	var gid = $stateParams.gid;
	var imm = $rootScope.imm;
	var imgimm = $rootScope.imgimm;
	var sid = $rootScope.sid;
	var uploadimm = $rootScope.uploadimm;
	$scope.data={};
	$scope.imglist = [];
	$http.get(imm+'/goods/'+gid).success(function(res){
		$scope.childcateid = res.category_list[0];
		$scope.cateid = res.category_list[1];
		$scope.data.category_id = res.category_list;
		$scope.data.description = res.description;
		$scope.data.price = res.price;
		$scope.data.promotion_price = res.promotion_price;
		$scope.data.detail = res.detail;
		$scope.data.remark = res.remark;
		for(i=0;i<res.pic_url_list.length;i++){
			res.pic_url_list[i]=imgimm+res.pic_url_list[i];
		}
		//console.log(res.pic_url_list);
		
		$scope.imglist = $scope.imglist.concat(res.pic_url_list);
		//console.log($scope.imglist);
	})
	var categoryurl = imm+'/basic/goodscategories?type=all_tree';
	  $http.get(categoryurl).success(function(res){
		  $scope.category = res.goodscategories;
		  var cate = $scope.category;
		  for(i=0;i<cate.length;i++){
			  if(cate[i].id == $scope.cateid){
			  $scope.catename = cate[i].name;
				for(j=0;j<cate[i].son.length;j++){
					if(cate[i].son[j].id==$scope.childcateid){
					$scope.childcatename = cate[i].son[j].name;
					}
				}
			}
		  }
	  })
	  $http.get(imm+'/merchant/'+sid+'/msgconfig').success(function(resData){
			$scope.totalCnt = resData.current_mass_count;
            $scope.remainCnt = resData.mass_remain_count;
            $scope.sentCnt = $scope.totalCnt - $scope.remainCnt;
			//console.log($scope.sentCnt+' '+$scope.remainCnt)
		});
		
	  
	  $scope.data.shop_id = ''+sid+'';
	  
	  $scope.data.is_sendall = $scope.is_sendall = false;
	  //$scope.data.basic_info =''+ []+'';	
	  
		$scope.takePhote = function(){
				var options = {  
					maximumImagesCount: 1,  
					width: 800,  
					height: 800,  
					quality: 80  
				}; 
				navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
						destinationType: Camera.DestinationType.FILE_URI
					});

					function onSuccess(results) {
						//console.log(results);	
						var ft = new FileTransfer();
						ft.upload(results,uploadimm, function(data) {
						// 响应数据				 
						var res = angular.fromJson(data.response);
							$scope.imglist.push(res.url);
							 //console.log($scope.imglist);
							}, function(error) {	 
								// console.log('error???')
							}, options);
													}
					function onFail(message) {}
		}  
		   //image picker  
		$scope.pickImage = function () {  
				var options = {  
					maximumImagesCount: 1,  
					width: 800,  
					height: 800,  
					quality: 80  
				};  
			  
				$cordovaImagePicker.getPictures(options)  
					.then(function (results) { 
						//console.log(results);
						  var ft = new FileTransfer();
						ft.upload(results[0],uploadimm, function(data) {
						// 响应数据				 
						var res = angular.fromJson(data.response);
						$scope.imglist.push(res.url);
							 //console.log($scope.imglist);
					
							}, function(error) {	 
								//console.log('error???')
							}, options);			   
					}, function (error) {  
						// error getting photos  
					});  
	  
		} 
	 $scope.delpic = function(index){
		 $scope.imglist.splice(index,1);
		 //console.log(index)
	 } 
	  //保存修改
	$scope.submit = function(){
		$scope.imglist_ = [];
		  for(i=0;i<$scope.imglist.length;i++){
			  $scope.imglist_[i]=splitend($scope.imglist[i]);  
		  }
		 $scope.data.pic_url_list = $scope.imglist_.toString();
		// console.log($scope.data.pic_url_list+' 22222');
		if($scope.data.description ==undefined||$scope.data.category_id === undefined){
			$ionicPopup.alert({
				title: '',
				template: '请完善必填信息'
			 });
		}else{
			$ionicPopup.show({
				template: '<input type="checkbox" ng-model="data.is_sendall" ng-click="showsent()">通知粉丝',
				title: '是否将商品通知给您的粉丝？',
				subTitle: '您的本月粉丝群发通知已发送'+$scope.sentCnt+'条,还可以发送'+$scope.remainCnt+'条',
				scope: $scope,
				 buttons: [
				   {
					 text: '<b>发布</b>',
					 type: 'button-positive',
					 onTap: function(e) {
							$http.put(imm+'/goods/'+gid,$scope.data).success(function(res){
								//console.log($scope.data.pic_url_list);
								//console.log('res '+res);
									if(res.is_success == true){
										$ionicHistory.nextViewOptions({
											disableBack: true
										  });
										$state.go('tabs.sale');}
									else{
										$ionicPopup.alert({
											title: '修改商品失败',
										   template: '请完善必填信息重试或联系客服'
										 });
									}
							})
					 }
					},
					{ text: '取消' },
				 ]
			   }).then(function(res) {
					//$state.go('tabs.sale')
			   });
			 } 
		
	}
  
})
.controller('salepublishCtrl', function($scope,$state,$timeout,$ionicPopup,$rootScope,$http,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$cordovaFileTransfer) {
	  var imm = $rootScope.imm;
	  var sid = $rootScope.sid;
	  var uploadimm = $rootScope.uploadimm;
	  var categoryurl = imm+'/basic/goodscategories?type=all_tree';
	  $http.get(categoryurl).success(function(res){
		  $scope.category = res.goodscategories;
	  })
	  $http.get(imm+'/merchant/'+sid+'/msgconfig').success(function(resData){
			$scope.totalCnt = resData.current_mass_count;
            $scope.remainCnt = resData.mass_remain_count;
            $scope.sentCnt = $scope.totalCnt - $scope.remainCnt;
			//console.log($scope.sentCnt+' '+$scope.remainCnt)
		});
		
	  $scope.data={};
	  $scope.data.shop_id = ''+sid+'';
	  $scope.imglist = [];
	  $scope.data.is_sendall = $scope.is_sendall = false;
	  //$scope.data.basic_info =''+ []+'';	
	  
		$scope.takePhote = function(){
				var options = {  
					maximumImagesCount: 1,  
					width: 800,  
					height: 800,  
					quality: 80  
				}; 
				navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
						destinationType: Camera.DestinationType.FILE_URI
					});

					function onSuccess(results) {
						//console.log(results);	
						var ft = new FileTransfer();
						ft.upload(results,uploadimm, function(data) {
						// 响应数据				 
						var res = angular.fromJson(data.response);
							$scope.imglist.push(res.url);
							 //console.log($scope.imglist);
							}, function(error) {	 
								// console.log('error???')
							}, options);
													}
					function onFail(message) {}
		}  
		   //image picker  
		$scope.pickImage = function () {  
				var options = {  
					maximumImagesCount: 1,  
					width: 800,  
					height: 800,  
					quality: 80  
				};  
			  
				$cordovaImagePicker.getPictures(options)  
					.then(function (results) { 
						//console.log(results);
						  var ft = new FileTransfer();
						ft.upload(results[0],uploadimm, function(data) {
						// 响应数据				 
						var res = angular.fromJson(data.response);
						$scope.imglist.push(res.url);
							 //console.log($scope.imglist);
					
							}, function(error) {	 
								//console.log('error???')
							}, options);			   
					}, function (error) {  
						// error getting photos  
					});  
	  
		} 
	  $scope.delpic = function(index){
		 $scope.imglist.splice(index,1);
		 //console.log(index)
	 } 
	  //发布提交
	$scope.submit = function(){
		 $scope.data.pic_url_list = $scope.imglist.toString();
		// console.log($scope.data.pic_url_list+' 22222');
		if($scope.data.description ==undefined||$scope.data.category_id === undefined){
			$ionicPopup.alert({
				title: '',
				template: '请完善必填信息'
			 });
		}else{
			$ionicPopup.show({
				template: '<input type="checkbox" ng-model="data.is_sendall" ng-click="showsent()">通知粉丝',
				title: '是否将商品通知给您的粉丝？',
				subTitle: '您的本月粉丝群发通知已发送'+$scope.sentCnt+'条,还可以发送'+$scope.remainCnt+'条',
				scope: $scope,
				 buttons: [
				   {
					 text: '<b>发布</b>',
					 type: 'button-positive',
					 onTap: function(e) {
							$http.post(imm+'/goods',$scope.data).success(function(res){
								//console.log($scope.data.pic_url_list);
								//console.log('res '+res);
									if(res.is_success == true){
										$ionicPopup.alert({
											title: '发布成功',
										   template: ''
										 });
										$state.go('tabs.sale');}
									else{
										$ionicPopup.alert({
											title: '发布商品失败',
										   template: '请完善必填信息重试或联系客服'
										 });
									}
							})
					 }
					},
					{ text: '取消' },
				 ]
			   }).then(function(res) {
					//$state.go('tabs.sale')
			   });
			 } 
		
	}
})
.controller('activityCtrl', function($scope, $state,$timeout,$rootScope,$http,$ionicPopup) {
	var imm = $rootScope.imm;
	var sid = $rootScope.sid;
	$http.get(imm+'/shop/'+sid).success(function(sinfo){
		$scope.shoppic = sinfo.pic_url_list[0];
	})
	$http.get(imm+'/shop/'+sid+'/activities?offset=0&limit=1000').success(function(acts){
		if(acts.activities.length == 0){$scope.noacts = true}
		$scope.acts = acts.activities;
		$rootScope.acts = acts.activities;
	})
	$scope.now = getNowFormatDate();
	$scope.deleteact = function(actid){
		$ionicPopup.confirm({title:'提醒',template:'确认删除此活动吗?'}).then(function(res){
			if(res){$http.delete(imm+'/shop/'+sid+'/activity/'+actid).success(function(res){
				if(res.is_success == true){
					$http.get(imm+'/shop/'+sid+'/activities?offset=0&limit=1000').success(function(acts){
					if(acts.activities.length == 0){$scope.noacts = true}
					$scope.acts = acts.activities;
					$rootScope.acts = acts.activities;
					})
				}else{
					$ionicPopup.alert({
				   title: '删除活动失败',
				   template: '请稍后重试'
					});
				}
					})
			}
		})
	}
	$scope.publishact = function(){
		$state.go('tabs.activitypublish')
	}
})
.controller('activitydetailCtrl', function($scope, $state,$timeout,$rootScope,$http) {
	var url = window.location.href;
	var urll = url.split('/');
	$scope.index = urll[urll.length-1]-1;
	$scope.acts = $rootScope.acts;
	$scope.act_content = JSON.parse($scope.acts[$scope.index].act_content);
})
.controller('activitypublishCtrl', function($scope, $state,$timeout,$rootScope,$http,$cordovaImagePicker,$ionicPopover,$cordovaCamera,$cordovaFileTransfer,$ionicPopup) {
	var imm = $rootScope.imm;
	var uploadimm = $rootScope.uploadimm;
	var sid = $rootScope.sid;
	$scope.id=1;
	$scope.act_content = {
		"index":$scope.id,
		"sections":[]
	};
	//$scope.act_content.sections=[];
	var addimg_ = $scope.addimg = function(imgsrc){
		$scope.id++;
		$scope.act_content['sections'].push(
		[2,imgsrc]
		)
	}
	$scope.addtext = function(){
		$scope.id++;
		$scope.act_content['sections'].push(
		[1,'']
		)
	}
	$scope.delcontent = function(index){
		$scope.id--;
		$scope.act_content['sections'].splice(index,1);
	}
		$ionicPopover.fromTemplateUrl('templates/activity/activitypopover.html',{
			scope:$scope
		}).then(function(popover){
			$scope.popover = popover;
		});
		 $scope.closePopover = function() {
            $scope.popover.hide();
          };
          // 清除浮动框
          $scope.$on('$destroy', function() {
            $scope.popover.remove();
          });
          // 在隐藏浮动框后执行
          $scope.$on('popover.hidden', function() {
            // 执行代码
          });
          // 移除浮动框后执行
          $scope.$on('popover.removed', function(){
            // 执行代码
          });
	$scope.addimg = function ($event){
		$scope.popover.show($event);
		
	  }  
		$scope.takePhote = function(){
			 var options = {  
					maximumImagesCount: 1,  
					width: 800,  
					height: 800,  
					quality: 80  
				}; 
				navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
						destinationType: Camera.DestinationType.FILE_URI
					});

					function onSuccess(results) {
						//console.log(results);	
						var ft = new FileTransfer();
						ft.upload(results,uploadimm, function(data) {
						// 响应数据				 
						var res = angular.fromJson(data.response);
							addimg_(res.url);
							 //console.log($scope.imglist);
							}, function(error) {	 
								// console.log('error???')
							}, options);
													}
					function onFail(message) {}
		
		}  
		   //image picker  
	   $scope.pickImage = function (){  
			//console.log('haha')
			var options = {  
				maximumImagesCount: 1,  
				width: 800,  
				height: 800,  
				quality: 80  
			} 
			  
			$cordovaImagePicker.getPictures(options)  
				.then(function (results) {  
				//console.log(typeof(results));
				var ft = new FileTransfer();
				ft.upload(results[0], uploadimm, function(data) {
				// 响应数据
					var res = angular.fromJson(data.response);
						console.log(res.url);
						addimg_(res.url);
					}, function(error) {
						console.log('error???')
					}, options);			   
			}, function (error) {  
				// error getting photos  
			});  
	  
		} 
	 
	var user = $scope.user = {};
	//提交活动
	$scope.actsubmit = function(){
		var postdata = {
			'act_title':user.act_title,
			'begin_time':changeDateToString(user.begintime),
			'end_time':changeDateToString(user.endtime),
			'act_content':JSON.stringify($scope.act_content)
		}
		$http.post(imm+'/shop/'+sid+'/activities',postdata).success(function(res){
			if(res.is_success == true){$state.go('tabs.activity')};
			if(res.des == "you have already post a activity"){
				 $ionicPopup.alert({
				   title: '发布活动失败',
				   template: '今天你已经发过活动了'
				 });		
			}
		})
	}
	
})
.controller('meCtrl', function($scope,$http,$state,$timeout,$rootScope,$ionicSlideBoxDelegate) {
	var user =$scope.user=[];
	var imm = $rootScope.imm;
	var chatimm = $rootScope.chatimm;
	$scope.sid= $rootScope.sid;
	$scope.spic = $rootScope.spic; 
	$http.get(imm+'/shop/'+$scope.sid).success(function(sinfo){
		$scope.brand_name = sinfo.brand_name;
		$scope.shop_name = sinfo.shop_name;
		$scope.qrcode = sinfo.qrcode;
		$scope.shoppics = sinfo.pic_url_list;
		$scope.address = sinfo.address;
		$scope.business_hours = sinfo.business_hours;
	})
	$http.get(imm+'/merchant/'+$scope.sid+'/info').success(function(pinfo){
		$scope.pname = pinfo.contact_name;
		$scope.tel = pinfo.contact_phone_no;
		$scope.email = pinfo.contact_email;
		$scope.qq = pinfo.contact_qq;
	})
	$http.get(imm+'/merchant/'+$scope.sid+'/serviceinfo').success(function(service){
		if(service.service_status ==2){$scope.servicestatus = '正常使用'};
		if(service.service_status ==5){$scope.servicestatus = '服务到期(续年费)'};
		if(service.service_status ==6){$scope.servicestatus = '店面关闭'};
		if(service.service_status ==3){$scope.servicestatus = '欠费使用'};
		if(service.service_status ==4){$scope.servicestatus = '审核未通过'};
		if(service.service_status ==1){$scope.servicestatus = '等待审核'};
		$scope.endtime = service.service_deadline.substr(0,19);
	})
	$http.get(imm+'/merchant/'+$scope.sid+'/msgconfig').success(function(msg){
		$scope.current_p2p_count = msg.current_p2p_count;
		$scope.current_mass_count = msg.current_mass_count;	
	})
	$http.get(imm+'/shop/'+$scope.sid+'/introduction').success(function(intro){
		$scope.intro=intro.introduction;
	})
	$http.get(imm+'/shop/'+$scope.sid+'/fans?offset=0&limit=50000').success(function(fans){
		$scope.fansnum = fans.total_num;
	})
	$http.get(chatimm+'/chat/shops/usernum?shop_id='+$scope.sid).success(function(res){
		$scope.currentnum = res.shop_dict[$scope.sid];
	})
	$timeout( function() {$ionicSlideBoxDelegate.update();}, 50);
	$scope.logout = function(){
		$http.get(imm+'/merchant/logout').success(function(){});
		$state.go('login');
	};
	
  
})


