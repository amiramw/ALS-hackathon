/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.FeedChunk");jQuery.sap.require("sap.ui.ux3.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.ux3.FeedChunk",{metadata:{library:"sap.ui.ux3",properties:{"thumbnailSrc":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"text":{type:"string",group:"Data",defaultValue:null},"sender":{type:"string",group:"Data",defaultValue:null},"timestamp":{type:"string",group:"Data",defaultValue:null},"deletionAllowed":{type:"boolean",group:"Behavior",defaultValue:false},"commentChunk":{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},"feederThumbnailSrc":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"feederSender":{type:"string",group:"Data",defaultValue:null},"flagged":{type:"boolean",group:"Data",defaultValue:false},"favorite":{type:"boolean",group:"Data",defaultValue:null},"shared":{type:"boolean",group:"Data",defaultValue:false},"enableFlag":{type:"boolean",group:"Appearance",defaultValue:true},"enableShare":{type:"boolean",group:"Appearance",defaultValue:true},"enableComment":{type:"boolean",group:"Appearance",defaultValue:true},"enableInspect":{type:"boolean",group:"Appearance",defaultValue:true},"enableFavorite":{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{"comments":{type:"sap.ui.ux3.FeedChunk",multiple:true,singularName:"comment",bindable:"bindable"},"actionMenuItems":{type:"sap.ui.commons.MenuItem",multiple:true,singularName:"actionMenuItem",bindable:"bindable"}},events:{"deleted":{},"commentAdded":{},"toggleFlagged":{},"senderClicked":{},"referenceClicked":{},"toggleFavorite":{},"inspect":{},"toggleShared":{},"actionItemSelected":{}}}});sap.ui.ux3.FeedChunk.M_EVENTS={'deleted':'deleted','commentAdded':'commentAdded','toggleFlagged':'toggleFlagged','senderClicked':'senderClicked','referenceClicked':'referenceClicked','toggleFavorite':'toggleFavorite','inspect':'inspect','toggleShared':'toggleShared','actionItemSelected':'actionItemSelected'};jQuery.sap.require("sap.ui.core.theming.Parameters");jQuery.sap.require("sap.ui.commons.MenuButton");jQuery.sap.require("sap.ui.ux3.Feeder");
sap.ui.ux3.FeedChunk.prototype.init=function(){this.maxComments=2;this.allComments=false;this.rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this.expanded=false};
sap.ui.ux3.FeedChunk.prototype.initCommentFeeder=function(){if(!this.oCommentFeeder){this.oCommentFeeder=new sap.ui.ux3.Feeder(this.getId()+'-CommentFeeder',{type:sap.ui.ux3.FeederType.Comment}).setParent(this);this.oCommentFeeder.attachEvent('submit',this.handleCommentFeederSubmit,this);this.showCommentFeeder=true}};
sap.ui.ux3.FeedChunk.prototype.initToolsButton=function(){if(!this.oToolsButton){this.oToolsButton=new sap.ui.commons.MenuButton(this.getId()+'-toolsButton',{tooltip:this.rb.getText('FEED_TOOLS'),lite:true,menu:new sap.ui.commons.Menu(this.getId()+'-toolsMenu')}).setParent(this);this.oToolsButton.attachEvent('itemSelected',this.handleToolsButtonSelected,this);var i=sap.ui.core.theming.Parameters.get('sap.ui.ux3.Feed:sapUiFeedToolsIconUrl');var I=sap.ui.core.theming.Parameters.get('sap.ui.ux3.Feed:sapUiFeedToolsIconHoverUrl');if(i){this.oToolsButton.setProperty('icon',jQuery.sap.getModulePath("sap.ui.ux3",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+i,true)}if(I){this.oToolsButton.setProperty('iconHovered',jQuery.sap.getModulePath("sap.ui.ux3",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+I,true)}}};
sap.ui.ux3.FeedChunk.prototype.exit=function(){if(this.oCommentFeeder){this.oCommentFeeder.destroy();delete this.oCommentFeeder}if(this.oToolsButton){this.oToolsButton.destroy();delete this.oToolsButton}this.rb=undefined;this.showCommentFeeder=undefined;this.expanded=undefined;this.oText=undefined;if(this.oHCMMenuButton){this.oHCMMenuButton.destroy();delete this.oHCMMenuButton}};
sap.ui.ux3.FeedChunk.prototype.onAfterRendering=function(){this.oText=this.$().children(".sapUiFeedChunkText").get(0);if(this.oText.clientHeight<this.oText.scrollHeight){var f=this.$().children(".sapUiFeedChunkByline").get(0);jQuery(f).append(sap.ui.ux3.FeedChunkRenderer.renderExpander(this));if(this.expanded){jQuery(this.oText).css('height','auto')}}};
sap.ui.ux3.FeedChunk.prototype.onclick=function(e){var t=e.target.getAttribute('ID');if(t){switch(t){case(this.getId()+'-delete'):this.fireDeleted();break;case(this.getId()+'-sender'):this.fireSenderClicked();break;case(this.getId()+'-thumb'):this.fireSenderClicked();break;case(this.getId()+'-exp'):var n='';if(this.expanded){jQuery(this.oText).css('height','');n=this.rb.getText("FEED_EXPAND");this.expanded=false}else{jQuery(this.oText).css('height','auto');n=this.rb.getText("FEED_COLLAPSE");this.expanded=true}jQuery.sap.byId(t).attr('title',n).toggleClass('sapUiFeedChunkExpand sapUiFeedChunkCollapse');break;case(this.getId()+'-all'):this.showAllComments();break;case(this.getId()+'-ActComment'):if(!this.showCommentFeeder){this.initCommentFeeder();this.rerender()}break;case(this.getId()+'-ActFlag'):this.setFlagged(!this.getFlagged());this.fireToggleFlagged({flagged:this.getFlagged()});break;case(this.getId()+'-ActFavorite'):this.setFavorite(!this.getFavorite());this.fireToggleFavorite({favorite:this.getFavorite()});break;case(this.getId()+'-ActInspect'):this.fireInspect();break;case(this.getId()+'-ActShare'):this.setShared(!this.getShared());this.fireToggleShared({shared:this.getShared()});break;default:if(t.search(this.getId()+'-Ref')!=-1){this.fireReferenceClicked({text:jQuery(e.target).text()})}break}}e.stopPropagation()};
sap.ui.ux3.FeedChunk.prototype.showAllComments=function(){this.allComments=!this.allComments;var $=jQuery.sap.byId(this.getId()+" > section");if($.length>0){var r=sap.ui.getCore().createRenderManager();this.getRenderer().renderComments(r,this);r.flush($[0]);r.destroy()}};
sap.ui.ux3.FeedChunk.prototype.handleCommentFeederSubmit=function(e){var d=new Date();var D=String(d);var n=new sap.ui.ux3.FeedChunk(this.getId()+'-new-'+this.getComments().length,{text:e.getParameter('text'),commentChunk:true,deletionAllowed:true,timestamp:D,sender:this.getFeederSender(),thumbnailSrc:this.getFeederThumbnailSrc()});this.addComment(n);this.fireCommentAdded({comment:n})};
sap.ui.ux3.FeedChunk.prototype.handleToolsButtonSelected=function(e){if(e.getParameter('itemId')==this.getId()+'-actDelete'){this.fireDeleted()}else{this.fireActionItemSelected(e.mParameters)}};
sap.ui.ux3.FeedChunk.prototype.insertComment=function(c,i){this.insertAggregation("comments",c,i);this.initCommentFeeder();return this};
sap.ui.ux3.FeedChunk.prototype.addComment=function(c){this.addAggregation("comments",c);this.initCommentFeeder();return this};
sap.ui.ux3.FeedChunk.prototype.setDeletionAllowed=function(d){if(d==this.getDeletionAllowed()){return this}this.setProperty("deletionAllowed",d);if(d){this.initToolsButton();this.oToolsButton.getMenu().insertItem(new sap.ui.commons.MenuItem(this.getId()+'-actDelete',{text:this.rb.getText('FEED_DELETE')}),0)}else{if(this.oToolsButton){this.oToolsButton.getMenu().removeItem(this.getId()+'-actDelete')}}return this};
sap.ui.ux3.FeedChunk.prototype.getActionMenuItems=function(){if(this.oToolsButton){var i=this.oToolsButton.getMenu().getItems();if(i.length>0&&i[0].getId()==(this.getId()+'-actDelete')){i.shift()}return i}};
sap.ui.ux3.FeedChunk.prototype.insertActionMenuItem=function(a,i){this.initToolsButton();var I=this.oToolsButton.getMenu().getItems();if(I.length>0&&I[0].getId()==(this.getId()+'-actDelete')){i++}this.oToolsButton.getMenu().insertItem(a,i);return this};
sap.ui.ux3.FeedChunk.prototype.addActionMenuItem=function(a){this.initToolsButton();this.oToolsButton.getMenu().addItem(a);return this};
sap.ui.ux3.FeedChunk.prototype.removeActionMenuItem=function(a){if(this.oToolsButton){return this.oToolsButton.getMenu().removeItem(a)}};
sap.ui.ux3.FeedChunk.prototype.removeAllActionMenuItems=function(){if(this.oToolsButton){var I=this.oToolsButton.getMenu().getItems();if(I.length>0&&I[0].getId()==(this.getId()+'-actDelete')){I.shift();for(var i=0;i<I.length;i++){this.oToolsButton.getMenu().removeItem(I[i])}return I}else{return this.oToolsButton.getMenu().removeAllItems()}}};
sap.ui.ux3.FeedChunk.prototype.indexOfActionMenuItem=function(a){if(this.oToolsButton){var i=this.oToolsButton.getMenu().indexOfItem(a);var I=this.oToolsButton.getMenu().getItems();if(I.length>0&&I[0].getId()==(this.getId()+'-actDelete')){i--}return i}};
sap.ui.ux3.FeedChunk.prototype.destroyActionMenuItems=function(){if(this.oToolsButton){var i=this.oToolsButton.getMenu().getItems();if(i.length>0&&i[0].getId()==(this.getId()+'-actDelete')){this.removeAllActionMenuItems()}else{this.oToolsButton.getMenu().destroyItems()}}return this};
sap.ui.ux3.FeedChunk.prototype.bindActionMenuItems=function(p,t,s,f){this.initToolsButton();this.oToolsButton.getMenu().bindItems(p,t,s,f);return this};
sap.ui.ux3.FeedChunk.prototype.unbindActionMenuItems=function(){if(this.oToolsButton){this.oToolsButton.getMenu().unbindItems()}return this};
sap.ui.ux3.FeedChunk.prototype.getFeederThumbnailSrc=function(){var t=this.getProperty("feederThumbnailSrc");if(!t||t==""){var p=this.getParent();if(p&&(p instanceof sap.ui.ux3.Feed||p instanceof sap.ui.ux3.FeedChunk)){t=p.getFeederThumbnailSrc()}}return t};
sap.ui.ux3.FeedChunk.prototype.getFeederSender=function(){var s=this.getProperty("feederSender");if(!s||s==""){var p=this.getParent();if(p&&(p instanceof sap.ui.ux3.Feed||p instanceof sap.ui.ux3.FeedChunk)){s=p.getFeederSender()}}return s};
sap.ui.ux3.FeedChunk.prototype.initHCMMenuButton=function(){if(!this.oHCMMenuButton){this.oHCMMenuButton=new sap.ui.commons.MenuButton(this.getId()+"-HCMMenu",{lite:true}).setParent(this);this.oHCMMenuButton.attachEvent('itemSelected',this.handleHCMMenuButtonSelected,this)}};
sap.ui.ux3.FeedChunk.prototype.setHCMMenu=function(m){this.initHCMMenuButton();this.oHCMMenuButton.setMenu(m);return this};
sap.ui.ux3.FeedChunk.prototype.handleHCMMenuButtonSelected=function(e){this.fireEvent("HCMMenuItemSelected",e.mParameters)};
