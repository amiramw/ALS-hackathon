/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.ResponsiveContainer");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.ResponsiveContainer",{metadata:{library:"sap.ui.commons",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},aggregations:{"ranges":{type:"sap.ui.commons.ResponsiveContainerRange",multiple:true,singularName:"range"},"content":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{"defaultContent":{type:"sap.ui.core.Control",multiple:false}},events:{"rangeSwitch":{}}}});sap.ui.commons.ResponsiveContainer.M_EVENTS={'rangeSwitch':'rangeSwitch'};jQuery.sap.require("sap.ui.core.ResizeHandler");
sap.ui.commons.ResponsiveContainer.prototype.init=function(){this.oCurrentRange=null};
sap.ui.commons.ResponsiveContainer.prototype.exit=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};
sap.ui.commons.ResponsiveContainer.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}if(!this.getAggregation("content")){var d=sap.ui.getCore().byId(this.getDefaultContent());this.setAggregation("content",d)}};
sap.ui.commons.ResponsiveContainer.prototype.onAfterRendering=function(){var r=jQuery.proxy(this.onresize,this);this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),r);this.refreshRangeDimensions();if(!this.oCurrentRange){setTimeout(r,0)}};
sap.ui.commons.ResponsiveContainer.prototype.onresize=function(e){var r=this.findMatchingRange(),c=r&&r.getContent(),n;if(this.oCurrentRange!=r){this.oCurrentRange=r;if(!r){c=this.getDefaultContent()}n=sap.ui.getCore().byId(c);this.setAggregation("content",n);this.fireRangeSwitch({currentRange:this.oCurrentRange})}};
sap.ui.commons.ResponsiveContainer.prototype.refreshRangeDimensions=function(){var r=this.getRanges(),R=[],$;jQuery.each(r,function(i,o){$=o.$();R.push({range:o,width:$.width(),height:$.height()})});this.aRangeDimensions=R};
sap.ui.commons.ResponsiveContainer.prototype.findMatchingRange=function(){var c=this.$(),w=c.width(),h=c.height(),r,R,a=this.aRangeDimensions,m=null;jQuery.each(a,function(i,o){r=o.width||w;R=o.height||h;if(r<=w&&R<=h){o.area=r*R;if(!m||m.area<o.area){m=o}}});return m&&m.range};
