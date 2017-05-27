'use strict';

var myApp=angular.module('myApp', ['ui.router','ngCookies','ngAnimate','validation']);

"use strict";
//module initial action
angular.module("myApp").value("dict",{}).run(["dict","$http",function(dict,$http){
	$http.get("data/city.json").then(function(resp){
		dict.city=resp.data;
	});
	$http.get("data/salary.json").then(function(resp){
		dict.salary=resp.data;
	});
	$http.get("data/scale.json").then(function(resp){
		dict.scale=resp.data;
	});
}])
"use strict";
angular.module("myApp").config(["$provide",function($provide){
	$provide.decorator("$http",["$delegate","$q",function($delegate,$q){
		$delegate.post=function(url,data,config){
			var def=$q.defer();
			$delegate.get(url).then(function(resp){
				def.resolve(resp);
			},function(error){
				def.reject(error);
			});
			return {
				then:function(scb,ecb){
					def.promise.then(scb,ecb);
				}
			}
		};
		return $delegate;
	}])
}])
'use strict';

myApp.config(["$stateProvider", '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url: '/main',
		templateUrl: 'views/main.html',
		controller: 'mainCtrl'
	}).state("position",{
		url:"/position/:id",
		templateUrl:"views/position.html",
		controller:"positionCtrl"
	}).state("company",{
		url:"/company/:id",
		templateUrl:"views/company.html",
		controller:"companyCtrl"
	}).state("search",{
		url:"/search",
		templateUrl:"views/search.html",
		controller:"searchCtrl"
	}).state("me",{
		url:"/me",
		templateUrl:"views/me.html",
		controller:"meCtrl"
	}).state("login",{
		url:"/login",
		templateUrl:"views/login.html",
		controller:"loginCtrl"
	}).state("register",{
		url:"/register",
		templateUrl:"views/register.html",
		controller:"registerCtrl"
	}).state("post",{
		url:"/post",
		templateUrl:"views/post.html",
		controller:"postCtrl"
	}).state("favorite",{
		url:"/favorite",
		templateUrl:"views/favorite.html",
		controller:"favoriteCtrl"
	}).state("config",{
		url:"/config",
		templateUrl:"views/config.html",
		controller:"configCtrl"
	}).state("feedback",{
		url:"/feedback",
		templateUrl:"views/feedback.html",
		controller:"feedbackCtrl"
	}).state("resume",{
		url:"/resume",
		templateUrl:"views/resume.html",
		controller:"resumeCtrl"
	})
	 $urlRouterProvider.otherwise('main');
	
}])

"use strict";
angular.module("myApp").config(['$validationProvider',function($validationProvider){
	var expression={
		phone:/^1[\d]{10}$/,
		password:function(value){
			var str=value+'';
			return str.length>5;
		},
		required:function(value){
			return !!value;
		}
	};
	var defaultMsg={
		phone:{
			success:'',
			error:"必须是11位手机号"
		},
		password:{
			success:'',
			error:'长度至少6位'
		},
		required:{
			success:"",
			error:"长度不能为空"
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
"use strict";

angular.module("myApp").directive("appCompany", function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/company.html",
		scope:{
			company:"="
		},
		link:function(scope){
			//console.log(scope.company);
     	}
	};
});
"use strict";

angular.module("myApp").directive("appFoot",[function(){
	return{
		restrict:"A",
		repace:true,
		templateUrl:"views/template/foot.html"
	}
}])
'use strict';

angular.module("myApp").directive("appHead",['cache',function(cache){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"views/template/head.html",
		link:function($scope){
			$scope.name=cache.get("name");
		}
	}
}])
"use strict";

angular.module("myApp").directive("appHeaderBar",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/headerBar.html",
		scope:{
			text:"@headerText"
		},
		link:function(scope,ele,attr){
			scope.back=function(){
				window.history.back();
			}
		}
	}
});
"use strict";

angular.module("myApp").directive("appHeadFirst",[function(){
	return{
		restrict:"A",
		repace:true,
		templateUrl:"views/template/headFirst.html"
	}
}])

"use strict";

angular.module("myApp").directive("appPositionClass",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/positionClass.html",
		scope:{
			company:"="
		},
		link:function(scope){
			
			scope.showPositionList=function(index){
				scope.positionList=scope.company.positionClass[index].positionList;
				scope.isActive=index;
			}
			/*scope.isActive=0;
			scope.positionList=scope.showPositionList(0);*/
			scope.$watch('company', function(newVal){
        		if(newVal) scope.showPositionList(0);
     		 });
		}
	}
});
/*
angular.module("myApp").directive("appPositionClass",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/positionClass.html",
	}
});
*/
"use strict";

angular.module("myApp").directive("appPositionInfo",["$log","$http",function($log,$http){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/positionInfo.html",
		scope:{
			isActive:"=",
			isLogin:"=",
			pos:"=",
		},
		link:function(scope){
			scope.$watch("pos",function(newVal){
				if(newVal){
					scope.pos.select=scope.pos.select||false;
					scope.imagePath=scope.pos.select?"image/star-active.png":"image/star.png";
				}
			})
			scope.favorite=function(){
				$http.post("/data/favorite.json",{
					id:scope.pos.id,
					select:!scope.pos.select
				}).then(function(resp){
					scope.pos.select=!scope.pos.select;
					scope.imagePath=scope.pos.select?"image/star-active.png":"image/star.png";
				});
			}
		}
	}
}]);

"use strict";
angular.module("myApp").directive("appPositionList",["$http",function($http){
	return{
	strict:"A",
	templateUrl:"views/template/postionList.html",
	replace:true,
	scope:{
		data:"=",
		filterObj:"=",
		isFavorite:"="
	},
	link:function(scope){
		scope.select=function(item){
			$http.post("data/favorite.json",{
				id:item.id,
				select:!item.select
			}).then(function(resp){
				item.select=!item.select;
			});
		}
	}
	}
}]);
"use strict";
angular.module("myApp").directive("appSheet",function(){
	return{
		restrict:"A",
		replace:true,
		scope:{
			visible:"=",
			list:"=",
			select:"&"
		
		},
		templateUrl:"views/template/sheet.html",
		link:function(scope){	
		    
		}

	}
});
"use strict";
angular.module("myApp").directive("appTab",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/tab.html",
		scope:{
			tabClick:"&",
			list:"="
		},
		link:function($scope){
				$scope.click=function(item){
				$scope.selectId=item.id;
				$scope.tabClick(item);
			}
		}

	}
});
"use strict";
angular.module("myApp").filter("filterByObj",[function(){
	return function(list,obj){

	/*	console.log("list");
		console.log(list);

		console.log("obj");
		console.log(obj);*/


		var result=[];
		angular.forEach(list,function(item){
			var isEqual=true;
			for(var e in obj){
				if (item[e]!==obj[e]) {
					isEqual=false;
				}
			}
			if (isEqual) {
				result.push(item);
			}
		});
/*	console.log("result");
		console.log(result);*/
		return result;
	}
}])
/*"use strict";

angualr.module("myApp").service("cache",["$cookies",function($cookies){

	this.put=functuon(key,value){
		$cookies.put(key,value)
	}
	this.get=function(key){
		return $cookies.get(key);
	};
	this.remove=function(key){
	return $cookies.remove(key);
	};
}]);*/


'use strict';
angular.module('myApp').service('cache', ['$cookies', function($cookies){
    this.put = function(key, value){
      $cookies.put(key, value);
    };
    this.get = function(key) {
      return $cookies.get(key);
    };
    this.remove = function(key) {
      $cookies.remove(key);
    };
}]);

"use strict";

angular.module("myApp").controller("companyCtrl",["$http","$state","$scope",function($http,$state,$scope){
	/*$http.get("data/company.json?id="+$state.params.id).then(function success(resp){
		console.log("company 数据"+resp.data);
		$scope.company=resp.data;
	},function(){
*/
	//})

	$http.get("data/company.json",{
		params:{
			id:$state.params.id
		}
	}).then(function(resp){
		$scope.company=resp.data;
	});
}]);
"use strict";
angular.module("myApp").controller("configCtrl",['$http','$scope','$state',"cache",function($http,$scope,$state,cache){
/*	$http.get("data/myFavorite.json").then(function(resp){
	   $scope.list=resp.data;
	});*/
	  $scope.isLogin=!!cache.get("name");
     if (cache.get('name')) {
     	   $scope.name=cache.get('name');
     	   $scope.image=cache.get('image');
     	   $scope.id=cache.get('id');
             $scope.message=cache.get('desc');
           
     }
    $scope.logout=function(){
     	cache.remove("id");
     	cache.remove("name");
     	cache.remove("image");
     	$state.go("main");
     }

     $scope.login=function(){
     	$state.go("login");
     }
	}]);
"use strict";
angular.module("myApp").controller("favoriteCtrl",['$http','$scope',function($http,$scope){
	$http.get("data/myFavorite.json").then(function(resp){
	   $scope.list=resp.data;
	});

	}]);
"use strict";
angular.module("myApp").controller("feedbackCtrl",['$http','$scope',function($http,$scope){
	$http.get("data/feedbackType.json").then(function(resp){
	   $scope.sgttype=resp.data;
	});
	$scope.feedback={}
	$scope.selectType="s1";
	$scope.click=function(item){
		$scope.selectType=item.id;
	    $scope.feedback.id=item.id;
	}



	$scope.submit=function(){
		$http.post("data/feedback.json",$scope.feedback).then(function(resp){
			console.log(resp.data);
		});
	}

}]);
"use strict";

angular.module("myApp").controller("loginCtrl",["$http","$scope","$state","cache",function($http,$scope,$state,cache){
/*	$http.get("data/positionList.json").then(function(resp){
		$scope.lists=resp.data;
	},function(){

	});*/
	$scope.goback=function(){
		window.history.back();
	}
	$scope.submit=function(){
		$http.post("data/login.json",$scope.user).then(function(resp){
			cache.put("id",resp.data.id);
			cache.put("name",resp.data.name);
			cache.put("image",resp.data.image);
			cache.put("desc",resp.data.describle);
			console.log(resp.data);
			$state.go("main");
		})
	}
}]);
"use strict";

angular.module("myApp").controller("mainCtrl",["$http","$scope",function($http,$scope){
	$http.get("data/positionList.json").then(function(resp){
		$scope.lists=resp.data;
	},function(){

	});
}]);
"use strict";
angular.module("myApp").controller("meCtrl",['$http','$scope',"$state",'cache',function($http,$scope,$state,cache){
     $scope.isLogin=!!cache.get("name");
     $scope.message="职场没有过客";

     if (cache.get('name')) {
     	   $scope.name=cache.get('name');
     	   $scope.image=cache.get('image');
     	   $scope.id=cache.get('id');
             $scope.message=cache.get('desc');

     }

     $scope.logout=function(){
     	cache.remove("id");
     	cache.remove("name");
     	cache.remove("image");
     	$state.go("main");
     }
     $scope.goPost=function(){
          $scope.isLogin=!!cache.get("name");
          if ($scope.isLogin) {
            $state.go("post");   
          }else{
             $state.go("login");  
          }
        
     }
       $scope.goFavorite=function(){
          $scope.isLogin=!!cache.get("name");
          if ($scope.isLogin) {
            $state.go("favorite");   
          }else{
             $state.go("login");  
          }
        
     }

     $scope.resume=function(){
      $scope.isLogin=!!cache.get("name");
      if ($scope.isLogin) {
        $state.go("resume");
      }else{
        $state.go("login");
      }
    }

     }]);
"use strict";

angular.module("myApp").controller("positionCtrl",["$log","$scope","$q","$state","$http","cache",function($log,$scope,$q,$state,$http,cache){
	$scope.isLogin=!!cache.get("name");
	$scope.isActive=true;
	$scope.message="";

function getPosition(){
	var def=$q.defer();
	$http.get("data/position.json",{
		params:
		{
			id:$state.params.id
		}
	}).then(function success(resp) {
		$scope.pos=resp.data;
		def.resolve(resp.data);
		console.log(resp.data);

		if (!!resp.data.posted) {
			$scope.message="已投递";
		}else{
			if ($scope.isLogin) {
				$scope.message="去投递";
			}else{
				$scope.message="去登入";

			}
		}
	},function(err){
		def.reject(err);
	});

	return def.promise;
}
function getCompany(id){
	$http.get("data/company.json",{
		params:{
			id:id
		}
	}).then(function(resp){
		$scope.company=resp.data;
	});
}
getPosition().then(function(obj){
	getCompany(obj.companyId);
});

$scope.go=function(){
	if($scope.message!=="已投递"){
		if ($scope.isLogin) {
			$http.post("data/handle.json",{
				id:$scope.pos.id
			}).then(function(resp){
				$log.info(resp);
				$scope.message="已投递";
			});
		}else{
			$state.go("login");
		}
	}
}

$scope.favorite=function(){
	
}
}]);
"use strict";
angular.module("myApp").controller("postCtrl",['$http','$scope',function($http,$scope){
	$scope.tabList=[{
		id:"all",
		name:"全部"
	},{
		id:"pass",
		name:"面试邀请"
	},{
		id:"fail",
		name:"不合适"
	}];
	$scope.myPost="";
	$http.get("data/myPost.json").then(function(resp){
		$scope.myPost=resp.data;
		console.log(resp);
	})
	$scope.filterObj={};
	$scope.tClick=function(id,name){
		switch(id){
			case 'all':delete $scope.filterObj.state;break;
			case 'pass':$scope.filterObj.state="1";break;
			case 'fail':$scope.filterObj.state="-1";break;
			default:

		}

	}
}]);
"use strict";
angular.module("myApp").controller("registerCtrl",['$interval','$http','$scope','$state',function($interval,$http,$scope,$state){
	$scope.submit=function(){		
		$http.post('data/regist.json',$scope.user).then(function(resp){
			$state.go("login");
		})		
	};
	var count=60;
	$scope.send=function(){
		$http.get("data/code.json").then(function(resp){
			if (1===resp.data.state) {
				count=60;
				$scope.time="60s";
				var interval=$interval(function(){
					if (count<=0) {
						$interval.cancel(interval);
						$scope.time="";
					}else{
						count--;
						$scope.time=count+"s";
					}
				},1000);
			}
		});
	}

	$scope.goback=function(){
		window.history.back();
	}
}]);
angular.module("myApp").controller("resumeCtrl",["$http","$scope",function($http,$scope){
	
}]);
"use strict";

angular.module("myApp").controller("searchCtrl",["dict","$http","$scope",function(dict,$http,$scope){
	$scope.searchName='';
/*	$scope.visible=false;
*/	$scope.search=function(){
		$http.get("data/positionList.json",{
			params:{
				name:$scope.searchName
			}
		}).then(function(resp){
		$scope.posList=resp.data;
	});
	}
	$scope.search();
	$scope.sheet={

	};
	$scope.sheet.visible=false;
	$scope.sheet.list=["1","2","3"];
	$scope.tabId="";
	$scope.tClick=function(id,name){
		$scope.sheet.list=dict[id];
		$scope.sheet.visible=true;
		$scope.tabId=id;
	};
	$scope.tabList=[{
		id:"city",
		name:"城市"
	},{
		id:"salary",
		name:"薪水"
	},{
		id:"scale",
		name:"公司规模"
	}];
	$scope.filterObj={};
    $scope.cClick=function(id,name){
    	if (id) {
    		angular.forEach($scope.tabList,function(item){
    			if ($scope.tabId==item.id) {
    				item.name=name;
    		}
    		$scope.filterObj[$scope.tabId+"Id"]=id;
    	});
    	}else{
    		delete $scope.filterObj[$scope.tabId+"Id"]
    		angular.forEach($scope.tabList,function(item){
    			if ($scope.tabId==item.id) {
					switch(item.id){
    					case "city":item.name="城市";break;
    					case "salary":item.name="薪水";break;
    					case "scale":item.name="公司规模";break;
    					default:
    			}    }
    	});
    		
    	}    	
    }
}]);