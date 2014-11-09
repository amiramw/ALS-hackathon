/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Bar");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Bar",{metadata:{interfaces:["sap.m.IBar"],library:"sap.m",properties:{"enableFlexBox":{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},"translucent":{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},"design":{type:"sap.m.BarDesign",group:"Appearance",defaultValue:sap.m.BarDesign.Auto},"visible":{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{"contentLeft":{type:"sap.ui.core.Control",multiple:true,singularName:"contentLeft"},"contentMiddle":{type:"sap.ui.core.Control",multiple:true,singularName:"contentMiddle"},"contentRight":{type:"sap.ui.core.Control",multiple:true,singularName:"contentRight"}}}});jQuery.sap.require("sap.m.BarInPageEnabler");
sap.m.Bar.prototype.onBeforeRendering=function(){this._removeAllListeners()};
sap.m.Bar.prototype.onAfterRendering=function(){this._handleResize()};
sap.m.Bar.prototype.exit=function(){this._removeAllListeners();if(this._oflexBox){this._oflexBox.destroy();this._oflexBox=null}this._$MidBarPlaceHolder=null;this._$RightBar=null;this._$LeftBar=null};
sap.m.Bar._aResizeHandlers=["_sResizeListenerId","_sResizeListenerIdMid","_sResizeListenerIdRight","_sResizeListenerIdLeft"];
sap.m.Bar.prototype._removeAllListeners=function(){var t=this;sap.m.Bar._aResizeHandlers.forEach(function(i){t._removeListenerFailsave(i)})};
sap.m.Bar.prototype._removeListenerFailsave=function(l){if(this[l]){sap.ui.core.ResizeHandler.deregister(this[l]);this[l]=null}};
sap.m.Bar.prototype._handleResize=function(){this._removeAllListeners();var c=!!this.getContentLeft().length,C=!!this.getContentMiddle().length,b=!!this.getContentRight().length;if(!this.getVisible()){return}if(!c&&!C&&!b){return}this._$LeftBar=this.$("BarLeft");this._$RightBar=this.$("BarRight");this._$MidBarPlaceHolder=this.$("BarPH");this._updatePosition(c,C,b);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this._handleResize,this));if(this.getEnableFlexBox()){return}if(c){this._sResizeListenerIdLeft=sap.ui.core.ResizeHandler.register(this._$LeftBar[0],jQuery.proxy(this._handleResize,this))}if(C){this._sResizeListenerIdMid=sap.ui.core.ResizeHandler.register(this._$MidBarPlaceHolder[0],jQuery.proxy(this._handleResize,this))}if(b){this._sResizeListenerIdRight=sap.ui.core.ResizeHandler.register(this._$RightBar[0],jQuery.proxy(this._handleResize,this))}};
sap.m.Bar.prototype._updatePosition=function(c,C,b){if(!c&&!b){this._$MidBarPlaceHolder.css({width:'100%'});return}if(c&&!C&&!b){this._$LeftBar.css({width:'100%'});return}if(!c&&!C&&b){this._$RightBar.css({width:'100%'});return}var B=this.$().outerWidth(true);this._$RightBar.css({width:""});this._$LeftBar.css({width:""});this._$MidBarPlaceHolder.css({position:"",width:"",visibility:'hidden'});var r=this._$RightBar.outerWidth(true);if(r>B){if(c){this._$LeftBar.css({width:"0px"})}if(C){this._$MidBarPlaceHolder.css({width:"0px"})}this._$RightBar.css({width:B+"px"});return}var l=this._getBarContainerWidth(this._$LeftBar);if(B<(l+r)){l=B-r;this._$LeftBar.width(l);this._$MidBarPlaceHolder.width(0);return}this._$MidBarPlaceHolder.css(this._getMidBarCss(r,B,l))};
sap.m.Bar.prototype._getMidBarCss=function(r,b,l){var m=this._$MidBarPlaceHolder.outerWidth(true),R=sap.ui.getCore().getConfiguration().getRTL(),L=R?"right":"left",M={visibility:""};if(this.getEnableFlexBox()){m=b-l-r-parseInt(this._$MidBarPlaceHolder.css('margin-left'),10)-parseInt(this._$MidBarPlaceHolder.css('margin-right'),10);M.position="absolute";M.width=m+"px";M[L]=l;return M}var s=b-l-r,i=(b/2)-(m/2),a=l>i,c=(b/2)+(m/2),d=(b-r)<c;if(s>0&&(a||d)){M.position="absolute";M.width=s+"px";M.left=R?r:l}var $=this.$("BarMiddle"),e=$.outerWidth(true);if(M.width>e){M.width=e}return M};
sap.m.Bar.prototype._getBarContainerWidth=function(c){var i,C=0,a=c.children(),b=0;if(sap.ui.Device.browser.webkit||sap.ui.Device.browser.firefox){for(i=0;i<a.length;i++){b+=jQuery(a[i]).outerWidth(true)}C=c.outerWidth(true)}else{var o;for(i=0;i<a.length;i++){o=window.getComputedStyle(a[i]);if(o.width=="auto"){b+=jQuery(a[i]).width()+1}else{b+=parseFloat(o.width)}b+=parseFloat(o.marginLeft);b+=parseFloat(o.marginRight);b+=parseFloat(o.paddingLeft);b+=parseFloat(o.paddingRight)}var d=window.getComputedStyle(c[0]);C+=parseFloat(d.width);C+=parseFloat(d.marginLeft);C+=parseFloat(d.marginRight);C+=parseFloat(d.paddingLeft);C+=parseFloat(d.paddingRight)}if(C<b){C=b}return C};
sap.m.Bar.prototype.isContextSensitive=sap.m.BarInPageEnabler.prototype.isContextSensitive;sap.m.Bar.prototype.setHTMLTag=sap.m.BarInPageEnabler.prototype.setHTMLTag;sap.m.Bar.prototype.getHTMLTag=sap.m.BarInPageEnabler.prototype.getHTMLTag;sap.m.Bar.prototype.applyTagAndContextClassFor=sap.m.BarInPageEnabler.prototype.applyTagAndContextClassFor;
