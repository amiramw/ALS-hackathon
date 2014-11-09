/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.Panel");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Panel",{metadata:{publicMethods:["setDimensions"],library:"sap.ui.commons",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"scrollLeft":{type:"int",group:"Behavior",defaultValue:0},"scrollTop":{type:"int",group:"Behavior",defaultValue:0},"applyContentPadding":{type:"boolean",group:"Appearance",defaultValue:true},"collapsed":{type:"boolean",group:"Behavior",defaultValue:false},"areaDesign":{type:"sap.ui.commons.enums.AreaDesign",group:"Appearance",defaultValue:sap.ui.commons.enums.AreaDesign.Fill},"borderDesign":{type:"sap.ui.commons.enums.BorderDesign",group:"Appearance",defaultValue:sap.ui.commons.enums.BorderDesign.Box},"showCollapseIcon":{type:"boolean",group:"Behavior",defaultValue:true},"text":{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"},"title":{type:"sap.ui.core.Title",multiple:false},"buttons":{type:"sap.ui.commons.Button",multiple:true,singularName:"button"}}}});
sap.ui.commons.Panel.prototype.init=function(){this._oScrollDomRef=null;this._iMaxTbBtnWidth=-1;this._iTbMarginsAndBorders=0;this._iMinTitleWidth=30;this._iOptTitleWidth=30;this._iTitleMargin=0;this._bFocusCollapseIcon=false;this._resizeDelayTimer=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons")};
sap.ui.commons.Panel.prototype.exit=function(){this._rb=undefined};
sap.ui.commons.Panel.prototype.onThemeChanged=function(){if(this.getDomRef()&&this._oTitleDomRef){this.getDomRef().style.minWidth="auto";if(this._oToolbarDomRef){this._oToolbarDomRef.style.width="auto"}this._oTitleDomRef.style.width="auto";this._initializeSizes();if(!jQuery.support.flexBoxLayout||(sap.ui.commons.Panel._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0)))){this._handleResizeNow()}}};
sap.ui.commons.Panel.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};
sap.ui.commons.Panel.prototype.onAfterRendering=function(){var i=this.getId();this._oScrollDomRef=jQuery.sap.domById(i+"-cont");if(!this._oScrollDomRef){return}this._oHeaderDomRef=jQuery.sap.domById(i+"-hdr");this._oTitleDomRef=jQuery.sap.domById(i+"-title");this._oToolbarDomRef=jQuery.sap.domById(i+"-tb");if(this._bFocusCollapseIcon){this._bFocusCollapseIcon=false;var $=jQuery.sap.byId(i+"-collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){$.focus()}else{var a=jQuery.sap.byId(i+"-collIco");if(a.is(":visible")&&(a.css("visibility")=="visible"||a.css("visibility")=="inherit")){a.focus()}}}this._initializeSizes();if(!jQuery.support.flexBoxLayout||(sap.ui.commons.Panel._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0)))){this._handleResizeNow();this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this._handleResizeSoon,this))}};
sap.ui.commons.Panel.prototype.getFocusInfo=function(){var c=null;var i=this.getId();if(this._bFocusCollapseIcon){var $=jQuery.sap.byId(i+"-collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){c=$[0].id}else{var a=jQuery.sap.byId(i+"-collIco");if(a.is(":visible")&&(a.css("visibility")=="visible"||a.css("visibility")=="inherit")){c=a[0].id}}}return{id:(c?c:i)}};
sap.ui.commons.Panel.prototype.applyFocusInfo=function(f){var d;if(f&&f.id&&(d=jQuery.sap.byId(f.id))&&(d.length>0)){d.focus()}else{this.focus()}return this};
sap.ui.commons.Panel.prototype._initializeSizes=function(){var r=sap.ui.getCore().getConfiguration().getRTL();var b=this.getButtons();if(b&&b.length>0){var m=0;jQuery(this._oToolbarDomRef).children().each(function(){var w=this.offsetWidth;if(w>m){m=w}});this._iMaxTbBtnWidth=m;if(this._oToolbarDomRef){this._oToolbarDomRef.style.minWidth=m+"px";var $=jQuery(this._oToolbarDomRef);this._iTbMarginsAndBorders=$.outerWidth(true)-$.width()}}var a=this._oTitleDomRef.offsetLeft;var t=this.getDomRef().offsetWidth;if(r){a=t-(a+this._oTitleDomRef.offsetWidth)}var c=jQuery(this._oTitleDomRef);this._iOptTitleWidth=c.width()+1;this._iTitleMargin=c.outerWidth(true)-c.outerWidth();var d=10000;jQuery(this._oHeaderDomRef).children(".sapUiPanelHdrRightItem").each(function(){var g=this.offsetLeft;if(r){g=t-(g+this.offsetWidth)}if((g<d)&&(g>0)){d=g}});var e=a;e+=this._iMinTitleWidth;e+=this._iMaxTbBtnWidth+1;e+=(d==10000)?10:(t-d);this.getDomRef().style.minWidth=e+10+"px";if(this._oScrollDomRef){var s=this.getProperty("scrollTop");if(s>0){this._oScrollDomRef.scrollTop=s}var f=this.getProperty("scrollLeft");if(f>0){this._oScrollDomRef.scrollLeft=f}}};
sap.ui.commons.Panel.prototype._fixContentHeight=function(){if(sap.ui.commons.Panel._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0))){this._iContTop=this._oHeaderDomRef.offsetHeight;if(this._oScrollDomRef){this._oScrollDomRef.style.top=this._iContTop+"px"}}};
sap.ui.commons.Panel.prototype._handleResizeSoon=function(){if(this._resizeDelayTimer){jQuery.sap.clearDelayedCall(this._resizeDelayTimer)}this._resizeDelayTimer=jQuery.sap.delayedCall(200,this,function(){this._handleResizeNow();this._resizeDelayTimer=null})};
sap.ui.commons.Panel.prototype._handleResizeNow=function(){if(!jQuery.support.flexBoxLayout&&this.getDomRef()){var r=sap.ui.getCore().getConfiguration().getRTL();var b=this._oTitleDomRef.offsetLeft;var t=this.getDomRef().offsetWidth;if(r){b=t-(b+this._oTitleDomRef.offsetWidth)}var a=10000;jQuery(this._oHeaderDomRef).children(".sapUiPanelHdrRightItem").each(function(){var d=this.offsetLeft;if(r){d=t-(d+this.offsetWidth)}if((d<a)&&(d>0)){a=d}});var c=(a==10000)?this.$().width()-b-20:a-b-10;var B=this.getButtons();if(B&&B.length>0){if((c-this._iOptTitleWidth-this._iTitleMargin)>(this._iMaxTbBtnWidth-this._iTbMarginsAndBorders)){this._oToolbarDomRef.style.width=(c-this._iOptTitleWidth-this._iTitleMargin-this._iTbMarginsAndBorders)+"px";this._oTitleDomRef.style.width=this._iOptTitleWidth+"px"}else{this._oToolbarDomRef.style.width=this._iMaxTbBtnWidth+"px";this._oTitleDomRef.style.width=Math.max((c-this._iMaxTbBtnWidth-this._iTbMarginsAndBorders),this._iMinTitleWidth)+"px"}}else{this._oTitleDomRef.style.width=Math.max(c,this._iMinTitleWidth)+"px"}}this._fixContentHeight()};
sap.ui.commons.Panel.prototype._hasIcon=function(){return(this.getTitle()&&this.getTitle().getIcon())};
sap.ui.commons.Panel.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);jQuery(this.getDomRef()).toggleClass("sapUiPanelDis",!e);return this};
sap.ui.commons.Panel.prototype.setApplyContentPadding=function(p){this.setProperty("applyContentPadding",p,true);jQuery(this.getDomRef()).toggleClass("sapUiPanelWithPadding",p);return this};
sap.ui.commons.Panel.prototype.setCollapsed=function(c){this.setProperty("collapsed",c,true);this._setCollapsedState(c);return this};
sap.ui.commons.Panel.prototype._setCollapsedState=function(c){var d=this.getDomRef();if(d){var a=sap.ui.getCore().getConfiguration().getAccessibility();if(c){if(!this.getWidth()){d.style.width=this.getDomRef().offsetWidth+"px"}jQuery(d).addClass("sapUiPanelColl");if(a){d.setAttribute("aria-expanded","false")}if(this.getHeight()){d.style.height="auto"}var e=this._rb.getText("PANEL_EXPAND");this.$("collArrow").attr("title",e);this.$("collIco").attr("title",e)}else{if(!this.getDomRef("cont")){this._bFocusCollapseIcon=true;this.rerender()}else{jQuery(d).removeClass("sapUiPanelColl");if(a){d.setAttribute("aria-expanded","true")}if(!this.getWidth()){d.style.width="auto"}if(this.getHeight()){d.style.height=this.getHeight()}var C=this._rb.getText("PANEL_COLLAPSE");this.$("collArrow").attr("title",C);this.$("collIco").attr("title",C)}}}};
sap.ui.commons.Panel._isSizeSet=function(c){return(c&&!(c=="auto")&&!(c=="inherit"))};
sap.ui.commons.Panel.prototype.setTitle=function(t){var o=this.getTitle();this.setAggregation("title",t);if(o&&o!==t&&o.getId()===this.getId()+"-tit"){o.destroy()}return this};
sap.ui.commons.Panel.prototype.setText=function(t){if(!this.getTitle()){this.setTitle(new sap.ui.core.Title(this.getId()+"-tit",{text:t}))}else{this.getTitle().setText(t)}return this};
sap.ui.commons.Panel.prototype.getText=function(){if(!this.getTitle()){return""}else{return this.getTitle().getText()}};
sap.ui.commons.Panel.prototype.getScrollLeft=function(){var s=0;if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){s=jQuery(this._oScrollDomRef).scrollLeftRTL()}else{s=jQuery(this._oScrollDomRef).scrollLeft()}this.setProperty("scrollLeft",s,true)}return s};
sap.ui.commons.Panel.prototype.setScrollLeft=function(p){this.setProperty("scrollLeft",p,true);if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){jQuery(this._oScrollDomRef).scrollLeftRTL(p)}else{jQuery(this._oScrollDomRef).scrollLeft(p)}}return this};
sap.ui.commons.Panel.prototype.getScrollTop=function(){var s=0;if(this._oScrollDomRef){s=this._oScrollDomRef.scrollTop;this.setProperty("scrollTop",s,true)}return s};
sap.ui.commons.Panel.prototype.setScrollTop=function(p){this.setProperty("scrollTop",p,true);if(this._oScrollDomRef){this._oScrollDomRef.scrollTop=p}return this};
sap.ui.commons.Panel.prototype.setDimensions=function(w,h){this.setWidth(w);this.setHeight(h);return this};
sap.ui.commons.Panel.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w}return this};
sap.ui.commons.Panel.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h}return this};
sap.ui.commons.Panel.prototype.onclick=function(e){this._handleTrigger(e)};
sap.ui.commons.Panel.prototype.onsapspace=function(e){this._handleTrigger(e)};
sap.ui.commons.Panel.prototype._handleTrigger=function(e){var i=this.getId();if((e.target.id===i+"-collArrow")||(e.target.id===i+"-collIco")||(e.target.id===i&&e.type==="sapspace"&&this.getShowCollapseIcon())){this.setCollapsed(!this.getProperty("collapsed"));e.preventDefault();e.stopPropagation();this.fireEvent("collapsedToggled")}};
