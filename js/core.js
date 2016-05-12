/**
 * JS通用方法集
 * Author: Alpha Tan
 * Date: 2014/1/1
 */
String.prototype.formatURI = function(){
	var s = this.toString();
	for(var i in arguments){
		s = s.replace('{' + i+'}', arguments[i].encode());
	}
	return s;
}

String.prototype.encode = function(){
	return encodeURI(this);
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, '');
}

String.prototype.ltrim = function(){
	return this.replace(/(^\s*)/g, '');
}

String.prototype.rtrim = function(){
	return this.replace(/(\s*$)/g, '');
}

if(!window.console){
	console = {};
	console.log = {};
	window.console = console;
}

var Cookie = function(){
	this.opts = {
		name:null,
		value:'',
		path:'/',
		domain:location.hostname,
		expireMinutes:1000*60	//default as one day
	};
}
Cookie.prototype = {
	add : function(opts){
		opts = $.extend(this.opts, opts);

		if(opts.name.trim()==""){
			console.log('the parameter of name must not be null.');
			return;		
		}	

		var expires = (isNaN(opts.expireMinutes)) ? 0 : opts.expireMinutes;	
		var exp = new Date();
		exp.setTime(exp.getTime() + expires);
		document.cookie = opts.name + "=" + escape(opts.val) 
						+ ";expires=" + exp.toGMTString() 
						+ ";domain=" + opts.domain 
						+ ";path=" + opts.path;
	}, 
	get : function(name){
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if(arr != null) {
			return unescape(arr[2]);
		}
		return null;
	},
	remove : function(){
		opts = $.extends(this.opts, opts);

		if(opts.name.trim()==""){
			console.log('the parameter of name must not be null.');
			return;		
		}	
		var exp = new Date();
		exp.setTime(exp.getTime() - 1000);
		
		document.cookie = opts.name + "=" 
						+ ";expires=" + exp.toGMTString() 
						+ ";domain=" + opts.domain 
						+ ";path=" + opts.path;
	}
}