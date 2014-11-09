/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','./View'],function(){"use strict";sap.ui.core.mvc.View.extend("sap.ui.core.mvc.JSView",{metadata:{library:"sap.ui.core"}});(function(){var r={};sap.ui.jsview=function(i,v){var s={};if(v&&typeof(v)=="string"){s.viewName=v;s.controller=arguments[2];var V=new sap.ui.core.mvc.JSView(i,s);return V}else if(v&&typeof(v)=="object"){r[i]=v;jQuery.sap.declare({modName:i,type:"view"},false)}else if(arguments.length==1&&typeof(arguments[0])=="string"){s.viewName=i;s.controller=arguments[1];var V=s.id?new sap.ui.core.mvc.JSView(s.id,s):new sap.ui.core.mvc.JSView(s);return V}else{throw new Error("Wrong arguments! Either call sap.ui.jsview([sId,] sViewName) to instantiate a View or sap.ui.jsview(sViewName, oViewImpl) to define a View type.")}};sap.ui.core.mvc.JSView.prototype.initViewSettings=function(s){if(!r[s.viewName]){jQuery.sap.require({modName:s.viewName,type:"view"})}jQuery.extend(this,r[s.viewName])};sap.ui.core.mvc.JSView.prototype.onControllerConnected=function(c){var t=this;var p={};if(this.getAutoPrefixId()){p.id=function(i){return t.createId(i)}}sap.ui.base.ManagedObject.runWithPreprocessors(function(){t.applySettings({content:t.createContent(c)})},p)};sap.ui.core.mvc.JSView.prototype.getAutoPrefixId=function(){return false}}());return sap.ui.core.mvc.JSView},true);
