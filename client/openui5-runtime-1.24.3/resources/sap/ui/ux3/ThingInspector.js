/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.ThingInspector");jQuery.sap.require("sap.ui.ux3.library");jQuery.sap.require("sap.ui.ux3.Overlay");sap.ui.ux3.Overlay.extend("sap.ui.ux3.ThingInspector",{metadata:{library:"sap.ui.ux3",properties:{"firstTitle":{type:"string",group:"Misc",defaultValue:null},"type":{type:"string",group:"Misc",defaultValue:null},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"secondTitle":{type:"string",group:"Misc",defaultValue:null},"followState":{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:sap.ui.ux3.FollowActionState.Default},"flagState":{type:"boolean",group:"Misc",defaultValue:false},"favoriteState":{type:"boolean",group:"Misc",defaultValue:false},"favoriteActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"updateActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"followActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"flagActionEnabled":{type:"boolean",group:"Misc",defaultValue:true},"headerType":{type:"sap.ui.ux3.ThingViewerHeaderType",group:"Misc",defaultValue:sap.ui.ux3.ThingViewerHeaderType.Standard}},aggregations:{"actions":{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"action"},"headerContent":{type:"sap.ui.ux3.ThingGroup",multiple:true,singularName:"headerContent"},"facets":{type:"sap.ui.ux3.NavigationItem",multiple:true,singularName:"facet"},"facetContent":{type:"sap.ui.ux3.ThingGroup",multiple:true,singularName:"facetContent"},"actionBar":{type:"sap.ui.ux3.ActionBar",multiple:false},"thingViewer":{type:"sap.ui.ux3.ThingViewer",multiple:false,visibility:"hidden"}},associations:{"selectedFacet":{type:"sap.ui.ux3.NavigationItem",multiple:false}},events:{"actionSelected":{},"facetSelected":{allowPreventDefault:true},"feedSubmit":{}}}});sap.ui.ux3.ThingInspector.M_EVENTS={'actionSelected':'actionSelected','facetSelected':'facetSelected','feedSubmit':'feedSubmit'};jQuery.sap.require("sap.ui.ux3.Overlay");jQuery.sap.require("sap.ui.ux3.ActionBar");jQuery.sap.require("sap.ui.ux3.ThingViewer");(function(){sap.ui.ux3.ThingInspector.prototype.init=function(){var a,t=this;sap.ui.ux3.Overlay.prototype.init.apply(this);this._oThingViewer=new sap.ui.ux3.ThingViewer(this.getId()+"-thingViewer");this.setAggregation("thingViewer",this._oThingViewer);this._oThingViewer.attachFacetSelected(function(e){var i=e.getParameters().item;if(t.fireFacetSelected({id:i.getId(),key:i.getKey(),item:i})){t.setSelectedFacet(i)}else{e.preventDefault()}});this._oSocialActions={};if(this.getActionBar()==null){a=new sap.ui.ux3.ActionBar(this.getId()+"-actionBar");a.setShowOpen(false);a.setAlwaysShowMoreMenu(false);a.setDividerWidth("252px");a.attachActionSelected(function(e){var A=e.getParameters().id,b=e.getParameters().action,T;if(A.indexOf('Favorite')!=-1||A.indexOf('Follow')!=-1||A.indexOf('Flag')!=-1){if(t._oSocialActions[A]){T=t._oSocialActions[A]}else{T=new sap.ui.ux3.ThingAction({id:t.getId()+"-"+A.toLowerCase(),text:b.text,enabled:b.enabled});t._oSocialActions[A]=T}t.fireActionSelected({id:A.toLowerCase(),action:T})}else{t.fireActionSelected({id:e.getParameters().id,action:e.getParameters().action})}});a.attachFeedSubmit(function(e){t.fireFeedSubmit({text:e.getParameters().text})});this.setActionBar(a)}};sap.ui.ux3.ThingInspector.prototype.onAfterRendering=function(){sap.ui.ux3.Overlay.prototype.onAfterRendering.apply(this,arguments);var s=this._getShell();this._bShell=!!s;if(!s){this._applyChanges({showOverlay:false})}};sap.ui.ux3.ThingInspector.prototype.onBeforeRendering=function(){sap.ui.ux3.Overlay.prototype.onBeforeRendering.apply(this,arguments)};sap.ui.ux3.ThingInspector.prototype.exit=function(){this._oThingViewer.exit(arguments);this._oThingViewer.destroy();sap.ui.ux3.Overlay.prototype.exit.apply(this,arguments)};sap.ui.ux3.ThingInspector.prototype.open=function(i){if(this.getDomRef()){this.rerender()}sap.ui.ux3.Overlay.prototype.open.apply(this,arguments);this._selectDefault()};sap.ui.ux3.ThingInspector.prototype._getNavBar=function(){return this._oThingViewer._oNavBar};sap.ui.ux3.ThingInspector.prototype._selectDefault=function(){this._oThingViewer._selectDefault()};sap.ui.ux3.ThingInspector.prototype._equalColumns=function(){this._oThingViewer._equalColumns()};sap.ui.ux3.ThingInspector.prototype._setTriggerValue=function(){this._oThingViewer._setTriggerValue()};sap.ui.ux3.ThingInspector.prototype._setFocusLast=function(){var f=this.$("thingViewer-toolbar").lastFocusableDomRef();if(!f&&this.getCloseButtonVisible()&&this.$("close").is(":sapFocusable")){f=this.getDomRef("close")}else if(!f&&this.getOpenButtonVisible()&&this.$("openNew").is(":sapFocusable")){f=this.getDomRef("openNew")}jQuery.sap.focus(f)};sap.ui.ux3.ThingInspector.prototype._setFocusFirst=function(){if(this.getOpenButtonVisible()&&this.$("openNew").is(":sapFocusable")){jQuery.sap.focus(this.getDomRef("openNew"))}else if(this.getCloseButtonVisible()&&this.$("close").is(":sapFocusable")){jQuery.sap.focus(this.getDomRef("close"))}else{jQuery.sap.focus(this.$("thingViewer-content").firstFocusableDomRef())}};sap.ui.ux3.ThingInspector.prototype.insertAction=function(a,i){if(this.getActionBar()){this.getActionBar().insertBusinessAction(a,i)}return this};sap.ui.ux3.ThingInspector.prototype.addAction=function(a){if(this.getActionBar()){this.getActionBar().addBusinessAction(a)}return this};sap.ui.ux3.ThingInspector.prototype.removeAction=function(a){var r;if(this.getActionBar()){r=this.getActionBar().removeBusinessAction(a)}return r};sap.ui.ux3.ThingInspector.prototype.removeAllActions=function(){var r;if(this.getActionBar()){r=this.getActionBar().removeAllBusinessActions()}return r};sap.ui.ux3.ThingInspector.prototype.getActions=function(){var r;if(this.getActionBar()){r=this.getActionBar().getBusinessActions()}return r};sap.ui.ux3.ThingInspector.prototype.destroyActions=function(){if(this.getActionBar()){this.getActionBar().destroyBusinessActions()}return this};sap.ui.ux3.ThingInspector.prototype.indexOfAction=function(a){var r=-1;if(this.getActionBar()){r=this.getActionBar().indexOfBusinessAction(a)}return r};sap.ui.ux3.ThingInspector.prototype.getFacets=function(){return this._oThingViewer.getFacets()};sap.ui.ux3.ThingInspector.prototype.insertFacet=function(f,i){this._oThingViewer.insertFacet(f,i);return this};sap.ui.ux3.ThingInspector.prototype.addFacet=function(f){this._oThingViewer.addFacet(f);return this};sap.ui.ux3.ThingInspector.prototype.removeFacet=function(e){return this._oThingViewer.removeFacet(e)};sap.ui.ux3.ThingInspector.prototype.removeAllFacets=function(){return this._oThingViewer.removeAllFacets()};sap.ui.ux3.ThingInspector.prototype.destroyFacets=function(){this._oThingViewer.destroyFacets();return this};sap.ui.ux3.ThingInspector.prototype.indexOfFacet=function(f){return this._oThingViewer.indexOfFacet(f)};sap.ui.ux3.ThingInspector.prototype.setFollowState=function(f){if(this.getActionBar()){this.getActionBar().setFollowState(f)}return this};sap.ui.ux3.ThingInspector.prototype.getFollowState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFollowState()}return r};sap.ui.ux3.ThingInspector.prototype.setFlagState=function(f){if(this.getActionBar()){this.getActionBar().setFlagState(f)}return this};sap.ui.ux3.ThingInspector.prototype.getFlagState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFlagState()}return r};sap.ui.ux3.ThingInspector.prototype.setFavoriteState=function(f){if(this.getActionBar()){this.getActionBar().setFavoriteState(f)}return this};sap.ui.ux3.ThingInspector.prototype.getFavoriteState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFavoriteState()}return r};sap.ui.ux3.ThingInspector.prototype.setIcon=function(i){this._oThingViewer.setIcon(i);if(this.getActionBar()){this.getActionBar().setThingIconURI(i)}return this};sap.ui.ux3.ThingInspector.prototype.getIcon=function(){return this._oThingViewer.getIcon()};sap.ui.ux3.ThingInspector.prototype.setType=function(t){this._oThingViewer.setType(t);return this};sap.ui.ux3.ThingInspector.prototype.getType=function(){return this._oThingViewer.getType()};sap.ui.ux3.ThingInspector.prototype.insertFacetContent=function(f,i){this._oThingViewer.insertFacetContent(f,i);return this};sap.ui.ux3.ThingInspector.prototype.addFacetContent=function(f){this._oThingViewer.addFacetContent(f);return this};sap.ui.ux3.ThingInspector.prototype.removeFacetContent=function(f){var r=this._oThingViewer.removeFacetContent(f);return r};sap.ui.ux3.ThingInspector.prototype.removeAllFacetContent=function(){var r=this._oThingViewer.removeAllFacetContent();return r};sap.ui.ux3.ThingInspector.prototype.destroyFacetContent=function(){this._oThingViewer.destroyFacetContent();return this};sap.ui.ux3.ThingInspector.prototype.getFacetContent=function(){return this._oThingViewer.getFacetContent()};sap.ui.ux3.ThingInspector.prototype.indexOfFacetContent=function(f){return this._oThingViewer.indexOfFacetContent(f)};sap.ui.ux3.ThingInspector.prototype.setActionBar=function(a){this._oThingViewer.setActionBar(a);return this};sap.ui.ux3.ThingInspector.prototype.getActionBar=function(){return this._oThingViewer.getActionBar()};sap.ui.ux3.ThingInspector.prototype.destroyActionBar=function(){this._oThingViewer.destroyActionBar()};sap.ui.ux3.ThingInspector.prototype.insertHeaderContent=function(h,i){this._oThingViewer.insertHeaderContent(h,i);return this};sap.ui.ux3.ThingInspector.prototype.addHeaderContent=function(h){this._oThingViewer.addHeaderContent(h);return this};sap.ui.ux3.ThingInspector.prototype.getHeaderContent=function(){return this._oThingViewer.getHeaderContent()};sap.ui.ux3.ThingInspector.prototype.removeHeaderContent=function(h){var r=this._oThingViewer.removeHeaderContent(h);return r};sap.ui.ux3.ThingInspector.prototype.removeAllHeaderContent=function(){var r=this._oThingViewer.removeAllHeaderContent();return r};sap.ui.ux3.ThingInspector.prototype.destroyHeaderContent=function(){this._oThingViewer.destroyHeaderContent();return this};sap.ui.ux3.ThingInspector.prototype.indexOfHeaderContent=function(h){return this._oThingViewer.indexOfHeaderContent(h)};sap.ui.ux3.ThingInspector.prototype.setSelectedFacet=function(s){this._oThingViewer.setSelectedFacet(s)};sap.ui.ux3.ThingInspector.prototype.getSelectedFacet=function(s){return this._oThingViewer.getSelectedFacet()};sap.ui.ux3.ThingInspector.prototype.setFavoriteActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFavorite(e)}return this};sap.ui.ux3.ThingInspector.prototype.getFavoriteActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFavorite()}return r};sap.ui.ux3.ThingInspector.prototype.setFlagActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFlag(e)}return this};sap.ui.ux3.ThingInspector.prototype.getFlagActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFlag()}return r};sap.ui.ux3.ThingInspector.prototype.setUpdateActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowUpdate(e)}return this};sap.ui.ux3.ThingInspector.prototype.getUpdateActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowUpdate()}return r};sap.ui.ux3.ThingInspector.prototype.setFollowActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFollow(e)}return this};sap.ui.ux3.ThingInspector.prototype.getFollowActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFollow()}return r};sap.ui.ux3.ThingInspector.prototype.setFirstTitle=function(t){this._oThingViewer.setTitle(t)};sap.ui.ux3.ThingInspector.prototype.getFirstTitle=function(){return this._oThingViewer.getTitle()};sap.ui.ux3.ThingInspector.prototype.setSecondTitle=function(t){this._oThingViewer.setSubtitle(t)};sap.ui.ux3.ThingInspector.prototype.getSecondTitle=function(){return this._oThingViewer.getSubtitle()};sap.ui.ux3.ThingInspector.prototype.setHeaderType=function(h){this._oThingViewer.setHeaderType(h);return this};sap.ui.ux3.ThingInspector.prototype.getHeaderType=function(){var r=this._oThingViewer.getHeaderType();return r};sap.ui.ux3.ThingInspector.prototype._applyChanges=function(c){this.oChanges=c;if(c.showOverlay){this.$().removeClass("sapUiUx3TINoFrame")}else{this.$().addClass("sapUiUx3TINoFrame")}return this}}());
