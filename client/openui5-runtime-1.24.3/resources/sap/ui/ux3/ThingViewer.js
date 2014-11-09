/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.ThingViewer");jQuery.sap.require("sap.ui.ux3.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.ux3.ThingViewer",{metadata:{library:"sap.ui.ux3",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"type":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"subtitle":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'100%'},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'100%'},"headerType":{type:"sap.ui.ux3.ThingViewerHeaderType",group:"Misc",defaultValue:sap.ui.ux3.ThingViewerHeaderType.Standard}},aggregations:{"headerContent":{type:"sap.ui.ux3.ThingGroup",multiple:true,singularName:"headerContent"},"facets":{type:"sap.ui.ux3.NavigationItem",multiple:true,singularName:"facet"},"facetContent":{type:"sap.ui.ux3.ThingGroup",multiple:true,singularName:"facetContent"},"actionBar":{type:"sap.ui.ux3.ActionBar",multiple:false},"navBar":{type:"sap.ui.ux3.NavigationBar",multiple:false,visibility:"hidden"}},associations:{"selectedFacet":{type:"sap.ui.ux3.NavigationItem",multiple:false}},events:{"facetSelected":{allowPreventDefault:true}}}});sap.ui.ux3.ThingViewer.M_EVENTS={'facetSelected':'facetSelected'};(function(){sap.ui.ux3.ThingViewer.prototype.init=function(){var t=this;this._oNavBar=new sap.ui.ux3.NavigationBar();this.setAggregation("navBar",this._oNavBar);this._oSocialActions={};this._oNavBar.attachSelect(function(c){var i=c.getParameters().item;if(t.fireFacetSelected({id:i.getId(),key:i.getKey(),item:i})){t.setSelectedFacet(i)}else{c.preventDefault()}})};sap.ui.ux3.ThingViewer.prototype.onAfterRendering=function(){this._resize=false;if(this.getActionBar()){this._adjustStyles()}if(this.$().find(".sapUiUx3TVFacetContent").length<=0){return}this._resizeListenerId=sap.ui.core.ResizeHandler.register(this.$().find(".sapUiUx3TVFacetContent")[0],jQuery.proxy(this._onresize,this));this._setTriggerValue();this._setHeaderPosition();this._onresize()};sap.ui.ux3.ThingViewer.prototype.onBeforeRendering=function(){if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null}};sap.ui.ux3.ThingViewer.prototype._setHeaderPosition=function(){if(this.getHeaderType()===sap.ui.ux3.ThingViewerHeaderType.Standard){var $=this.$().find(".sapUiUx3TVHeaderContainerIdentifier");var a=this.$().find(".sapUiUx3TVHeaderGroupScrollContainer");a.css("top",$.outerHeight())}};sap.ui.ux3.ThingViewer.prototype._onresize=function(e){var w;if(e){w=jQuery(e.target).width()}if(!w){w=jQuery(this.$().find(".sapUiUx3TVFacetContent")[0]).width()}if(w<this._triggerValue&&this._resize==false){var f=this.$().find(".sapUiUx3TVFacetThingGroup");for(var i=0;i<f.length;i++){jQuery(f[i]).animate({width:"100%"},"fast")}this._resize=true}else if(w>this._triggerValue&&this._resize==true){var f=this.$().find(".sapUiUx3TVFacetThingGroup");for(var i=0;i<f.length;i++){jQuery(f[i]).animate({width:"50%"},"fast")}this._resize=false}if(this.getActionBar()){var m=this.getActionBar().getActionBarMinWidth();var a=m;if(this._bShell){m+=36;a=m+60}this.$().find(".sapUiUx3TV").css("min-width",a+"px");this.$().find(".sapUiUx3TVContent").css("min-width",m+"px")}};sap.ui.ux3.ThingViewer.prototype.exit=function(){this._oNavBar.destroy();if(this._resizeListenerId){sap.ui.core.ResizeHandler.deregister(this._resizeListenerId);this._resizeListenerId=null}};sap.ui.ux3.ThingViewer.prototype._getNavBar=function(){return this._oNavBar};sap.ui.ux3.ThingViewer.prototype._selectDefault=function(){var n=this._oNavBar.getItems();if(n.length&&!this._oNavBar.getSelectedItem()){if(!this.getSelectedFacet()){this.setSelectedFacet(n[0])}var i=this._oNavBar.getSelectedItem();var a=sap.ui.getCore().byId(i);this.fireFacetSelected({id:a.getId(),key:a.getKey(),item:a})}};sap.ui.ux3.ThingViewer.prototype._equalColumns=function(){var h=this.$().find(".sapUiUx3TVHeader");var f=this.$().find(".sapUiUx3TVFacets");var s=this.$().find(".sapUiUx3TVContentScrollContainer");f.height(s.get(0).scrollHeight);h.height(s.get(0).scrollHeight)};sap.ui.ux3.ThingViewer.prototype._rerenderHeader=function(){var $=this.$("header");if($.length>0){var r=sap.ui.getCore().createRenderManager();sap.ui.ux3.ThingViewerRenderer.renderHeader(r,this);r.flush($[0]);r.destroy()}};sap.ui.ux3.ThingViewer.prototype._rerenderHeaderContent=function(){var $=this.$("headerContent");if($.length>0){var r=sap.ui.getCore().createRenderManager();sap.ui.ux3.ThingViewerRenderer.renderHeaderContent(r,this);r.flush($[0]);r.destroy()}};sap.ui.ux3.ThingViewer.prototype._rerenderToolbar=function(){var $=this.$("toolbar");if($.length>0){var r=sap.ui.getCore().createRenderManager();sap.ui.ux3.ThingViewerRenderer.renderToolbar(r,this);r.flush($[0]);r.destroy()}};sap.ui.ux3.ThingViewer.prototype._rerenderFacetContent=function(){var $=this.$("facetContent");if($.length>0){var r=sap.ui.getCore().createRenderManager();sap.ui.ux3.ThingViewerRenderer.renderFacetContent(r,this);r.flush($[0]);r.destroy();this._resize=false;this._setTriggerValue();this._onresize()}};sap.ui.ux3.ThingViewer.prototype._setTriggerValue=function(){var f,m,$=this.$("facetContent");if($.length>0){f=this.$().find(".sapUiUx3TVFacetThingGroup");m=jQuery(f[0]).css("min-width");this._triggerValue=parseInt(m,10)*2}};sap.ui.ux3.ThingViewer.prototype.getFacets=function(){return this._oNavBar.getItems()};sap.ui.ux3.ThingViewer.prototype.insertFacet=function(f,i){this._oNavBar.insertItem(f,i);return this};sap.ui.ux3.ThingViewer.prototype.addFacet=function(f){this._oNavBar.addItem(f);return this};sap.ui.ux3.ThingViewer.prototype.removeFacet=function(e){return this._oNavBar.removeItem(e)};sap.ui.ux3.ThingViewer.prototype.removeAllFacets=function(){return this._oNavBar.removeAllItems()};sap.ui.ux3.ThingViewer.prototype.destroyFacets=function(){this._oNavBar.destroyItems();return this};sap.ui.ux3.ThingViewer.prototype.setIcon=function(i){this.setProperty("icon",i);if(this.getActionBar()){this.getActionBar().setThingIconURI(i)}this._rerenderHeader();return this};sap.ui.ux3.ThingViewer.prototype.insertFacetContent=function(f,i){this.insertAggregation("facetContent",f,i,true);this._rerenderFacetContent();return this};sap.ui.ux3.ThingViewer.prototype.addFacetContent=function(f){this.addAggregation("facetContent",f,true);this._rerenderFacetContent();return this};sap.ui.ux3.ThingViewer.prototype.removeFacetContent=function(f){var r=this.removeAggregation("facetContent",f,true);this._rerenderFacetContent();return r};sap.ui.ux3.ThingViewer.prototype.removeAllFacetContent=function(){var r=this.removeAllAggregation("facetContent",true);this._rerenderFacetContent();return r};sap.ui.ux3.ThingViewer.prototype.destroyFacetContent=function(){this.destroyAggregation("facetContent",true);this._rerenderFacetContent();return this};sap.ui.ux3.ThingViewer.prototype.insertHeaderContent=function(h,i){this.insertAggregation("headerContent",h,i,true);this._rerenderHeaderContent();return this};sap.ui.ux3.ThingViewer.prototype.addHeaderContent=function(h){this.addAggregation("headerContent",h,true);this._rerenderHeaderContent();return this};sap.ui.ux3.ThingViewer.prototype.removeHeaderContent=function(h){var r=this.removeAggregation("headerContent",h,true);this._rerenderHeaderContent();return r};sap.ui.ux3.ThingViewer.prototype.removeAllHeaderContent=function(){var r=this.removeAllAggregation("headerContent",true);this._rerenderHeaderContent();return r};sap.ui.ux3.ThingViewer.prototype.destroyHeaderContent=function(){this.destroyAggregation("headerContent",true);this._rerenderHeaderContent();return this};sap.ui.ux3.ThingViewer.prototype.setSelectedFacet=function(s){var o=this.getSelectedFacet();this.setAssociation("selectedFacet",s,true);var n=this.getSelectedFacet();if(o!=n){this._oNavBar.setSelectedItem(n)}};sap.ui.ux3.ThingViewer.prototype.setTitle=function(t){this.setProperty("title",t,true);this._rerenderHeader()};sap.ui.ux3.ThingViewer.prototype.setSubtitle=function(t){this.setProperty("subtitle",t,true);this._rerenderHeader()};sap.ui.ux3.ThingViewer.prototype.setActionBar=function(a){this.setAggregation("actionBar",a,true);if(this.getIcon()&&this.getActionBar()){this.getActionBar().setThingIconURI(this.getIcon())}this._rerenderToolbar();this._adjustStyles();return this};sap.ui.ux3.ThingViewer.prototype._adjustStyles=function(){var $=this.$().find(".sapUiUx3TVHeader");var a=this.$().find(".sapUiUx3TVFacets");if($.length>0){$.addClass("sapUiUx3TVActionBar");$.removeClass("sapUiUx3TVNoActionBar")}if(a.length>0){a.addClass("sapUiUx3TVActionBar");a.removeClass("sapUiUx3TVNoActionBar")}}}());
