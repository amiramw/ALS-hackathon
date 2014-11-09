/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Element'],function(q,E){"use strict";var C=function(){if(!(this instanceof E)){return}var o=this.clone;this.clone=function(){var c=o.apply(this,arguments);if(this.aCustomStyleClasses){c.aCustomStyleClasses=this.aCustomStyleClasses.slice()}return c};this.addStyleClass=function(s,S){if(!this.aCustomStyleClasses){this.aCustomStyleClasses=[]}if(s){if(s.indexOf("\"")>-1){return this}if(s.indexOf("'")>-1){return this}for(var i=this.aCustomStyleClasses.length-1;i>=0;i--){if(this.aCustomStyleClasses[i]==s){return this}}this.aCustomStyleClasses.push(s);var r=this.getDomRef();if(r){q(r).addClass(s)}else if(S===false){this.invalidate()}}return this};this.removeStyleClass=function(s,S){if(s&&this.aCustomStyleClasses){for(var i=this.aCustomStyleClasses.length-1;i>=0;i--){if(this.aCustomStyleClasses[i]==s){this.aCustomStyleClasses.splice(i,1);var r=this.getDomRef();if(r){q(r).removeClass(s)}else if(S===false){this.invalidate()}}}}return this};this.toggleStyleClass=function(s,a){if(s&&typeof s==="string"){if(a===true){this.addStyleClass(s)}else if(a===false){this.removeStyleClass(s)}else if(a===undefined){this.hasStyleClass(s)?this.removeStyleClass(s):this.addStyleClass(s)}else{q.sap.log.warning(this.toString()+"- toggleStyleClass(): bAdd should be a boolean or undefined, but is '"+a+"'")}}return this};this.hasStyleClass=function(s){if(s&&this.aCustomStyleClasses){for(var i=this.aCustomStyleClasses.length-1;i>=0;i--){if(this.aCustomStyleClasses[i]==s){return true}}}return false};this.getMetadata().addPublicMethods(["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass"])};return C},true);
