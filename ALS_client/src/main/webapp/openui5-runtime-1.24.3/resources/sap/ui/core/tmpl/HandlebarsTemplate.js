/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/RenderManager','./Template','sap/ui/thirdparty/handlebars'],function(q,R,T,h){"use strict";var H=T.extend("sap.ui.core.tmpl.HandlebarsTemplate",{constructor:function(i,s){T.apply(this,arguments)}});T.registerType("text/x-handlebars-template","sap.ui.core.tmpl.HandlebarsTemplate");H.RENDER_HELPERS=(function(){var e=Handlebars.helpers["each"],w=Handlebars.helpers["with"],I=Handlebars.helpers["if"],u=Handlebars.helpers["unless"],p=T.parsePath,r=new R();r.renderControl=function(c){this.writeControlData(c);this.writeClasses(c);this.writeStyles(c)};var o={"each":function(c,a){a=a||c;if(!a.hash.path){return e.apply(this,arguments)}else{var b=a.data.renderManager,d=a.data.rootControl,P=a.data.path,f=a.data.parentControl,s=(q.sap.startsWith(a.hash.path,"/")?"":(P||""))+a.hash.path,g=d.bindList(s),i=[],j;if(a.data){j=Handlebars.createFrame(a.data)}if(g){q.each(g,function(k,v){if(j){j.renderManager=b;j.rootControl=d;j.path=s+"/"+k+"/";j.parentControl=f}i.push(a.fn({},{data:j}))})}if(!f){return new Handlebars.SafeString(i.join(""))}}},"with":function(c,a){a=a||c;if(!a.hash.path){return w.apply(this,arguments)}else{}},"if":function(c,a){a=a||c;if(!a.hash.path){return I.apply(this,arguments)}else{}},"unless":function(c,a){a=a||c;if(!a.hash.path){return u.apply(this,arguments)}else{}},"text":function(c,a){a=a||c;var b=a.data.rootControl,P=a.data.path,s=(q.sap.startsWith(a.hash.path,"/")?"":(P||""))+a.hash.path;if(s){var v=b.bindProp(s);return v&&new Handlebars.SafeString(v)}else{throw new Error("The expression \"text\" requires the option \"path\"!")}},"element":function(c,a){a=a||c;var b=a.data.renderManager,d=a.data.rootControl,E=d.createDOMElement(a.hash,a.data.path),P=a.data.parentElement;if(a.fn){var C=a.fn({},{data:{renderManager:b,rootControl:d,parentElement:E}})}if(P){P.addElement(E);return}return new Handlebars.SafeString(b.getHTML(E))},"control":function(c,a){a=a||c;var b=a.data.renderManager,C=a.data.control;if(C){return new Handlebars.SafeString(b.getHTML(C))}var d=a.data.rootControl,P=a.data.path,m=a.data.children,t=a.hash["sap-ui-type"],M=q.sap.getObject(t).getMetadata(),D=a.hash["sap-ui-default-aggregation"]||M.getDefaultAggregationName(),v=a.data.view;var f={};if(a.fn){a.fn({},{data:{rootControl:d,path:P,children:f,defaultAggregation:D,view:v}})}var s=q.extend({},a.hash);q.each(s,function(k,V){if(f[k]){delete s[k]}});var n=d.createControl(s,a.data.path,!!m,v);if(!q.isEmptyObject(f)){s=a.hash;var A=M.getAllAggregations();q.each(f,function(g,j){for(var i=0,l=j.length;i<l;i++){var k=j[i],x=A[g],y=x&&x.multiple;if(typeof s[g]==="string"){var B=sap.ui.base.ManagedObject.bindingParser(s[g],v&&v.getController());B.template=k;n.bindAggregation(g,B)}else{if(y){n.addAggregation(g,k)}else{n.setAggregation(g,k)}}}})}if(m){var g=a.hash["sap-ui-aggregation"]||a.data.defaultAggregation;m[g]=m[g]||[];m[g].push(n);return}return new Handlebars.SafeString(b.getHTML(n))},"property":function(c,a){a=a||c;var b=a.data.rootControl,m=b.getMetadata(),P=a.hash.name,g=m.getAllProperties()[P]._sGetter;return b[g]()},"aggregation":function(c,a){a=a||c;var b=a.data.renderManager,d=a.data.rootControl,m=d.getMetadata(),A=a.hash.name,g=m.getAllAggregations()[A]._sGetter,f=[];var C=d[g]();if(C){for(var i=0,l=C.length;i<l;i++){if(a.fn){f.push(a.fn({},{data:{renderManager:b,rootControl:d,control:C[i]}}))}else{f.push(b.getHTML(C[i]))}}}return new Handlebars.SafeString(f.join(""))},"event":function(c,a){a=a||c},"controlData":function(c,a){a=a||c;var b=a.data.rootControl;return new Handlebars.SafeString(r.getHTML(b))}};return o}());H.prototype.createMetadata=function(){var t=this.getContent(),f=this._fnTemplate=this._fnTemplate||Handlebars.compile(t);var m={},j=sap.ui.core.tmpl.TemplateControl.getMetadata().getJSONKeys(),p=sap.ui.core.tmpl.TemplateControl.getMetadata().getAllPrivateAggregations();var o={"property":function(c,a){a=a||c;var n=a.hash.name;if(n&&n!=="id"&&!j[n]){m.properties=m.properties||{};m.properties[n]=q.extend({},{type:"string"},a.hash)}else{throw new Error("The property name \""+n+"\" is reserved.")}},"aggregation":function(c,a){a=a||c;var n=a.hash.name;if(n&&!j[n]&&!p[n]){a.hash.multiple=a.hash.multiple=="true";m.aggregations=m.aggregations||{};m.aggregations[n]=q.extend({},a.hash)}else{throw new Error("The aggregation name \""+n+"\" is reserved.")}},"event":function(c,a){a=a||c},"controlData":function(c,a){a=a||c;m._hasControlData=true}};q.each(["each","if","unless","with"],function(i,v){o[v]=function(){}});f({},{helpers:o});return m};H.prototype.createRenderer=function(v){var t=this.getContent(),f=this._fnTemplate=this._fnTemplate||Handlebars.compile(t);var r=function(a,c){var s=f(c.getContext()||{},{data:{renderManager:a,rootControl:c,view:v},helpers:H.RENDER_HELPERS});a.write(s)};return r};return H},true);
