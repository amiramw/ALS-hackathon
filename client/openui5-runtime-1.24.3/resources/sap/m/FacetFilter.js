/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.FacetFilter");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.FacetFilter",{metadata:{publicMethods:["openFilterDialog"],library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"showPersonalization":{type:"boolean",group:"Appearance",defaultValue:false},"type":{type:"sap.m.FacetFilterType",group:"Appearance",defaultValue:sap.m.FacetFilterType.Simple},"liveSearch":{type:"boolean",group:"Behavior",defaultValue:true},"showSummaryBar":{type:"boolean",group:"Behavior",defaultValue:false},"showReset":{type:"boolean",group:"Behavior",defaultValue:true},"showPopoverOKButton":{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"lists",aggregations:{"lists":{type:"sap.m.FacetFilterList",multiple:true,singularName:"list"},"buttons":{type:"sap.m.Button",multiple:true,singularName:"button",visibility:"hidden"},"removeFacetIcons":{type:"sap.ui.core.Icon",multiple:true,singularName:"removeFacetIcon",visibility:"hidden"},"popover":{type:"sap.m.Popover",multiple:false,visibility:"hidden"},"addFacetButton":{type:"sap.m.Button",multiple:false,visibility:"hidden"},"dialog":{type:"sap.m.Dialog",multiple:false,visibility:"hidden"},"summaryBar":{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},"resetButton":{type:"sap.m.Button",multiple:false,visibility:"hidden"},"arrowLeft":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},"arrowRight":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{"reset":{}}}});sap.m.FacetFilter.M_EVENTS={'reset':'reset'};jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.m.NavContainer");jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");sap.m.FacetFilter.SCROLL_STEP=264;
sap.m.FacetFilter.prototype.setType=function(t){var s=this.getAggregation("summaryBar");if(sap.ui.Device.system.phone){this.setProperty("type",sap.m.FacetFilterType.Light);s.setActive(true)}else{this.setProperty("type",t);s.setActive(t===sap.m.FacetFilterType.Light)}if(t===sap.m.FacetFilterType.Light){if(this.getShowReset()){this._addResetToSummary(s)}else{this._removeResetFromSummary(s)}}};
sap.m.FacetFilter.prototype.setShowReset=function(v){this.setProperty("showReset",v);var s=this.getAggregation("summaryBar");if(v){if(this.getShowSummaryBar()||this.getType()===sap.m.FacetFilterType.Light){this._addResetToSummary(s)}}else{if(this.getShowSummaryBar()||this.getType()===sap.m.FacetFilterType.Light){this._removeResetFromSummary(s)}}};
sap.m.FacetFilter.prototype.setShowSummaryBar=function(v){this.setProperty("showSummaryBar",v);if(v){var s=this.getAggregation("summaryBar");if(this.getShowReset()){this._addResetToSummary(s)}else{this._removeResetFromSummary(s)}s.setActive(this.getType()===sap.m.FacetFilterType.Light)}};
sap.m.FacetFilter.prototype.setLiveSearch=function(v){this.setProperty("liveSearch",v);if(this._displayedList){var l=this._displayedList;var s=sap.ui.getCore().byId(l.getAssociation("search"));s.detachLiveChange(l._handleSearchEvent,l);if(v){s.attachLiveChange(l._handleSearchEvent,l)}}return this};
sap.m.FacetFilter.prototype.getLists=function(){var l=this.getAggregation("lists");if(!l){l=[]}if(this._displayedList){l.splice(this._listAggrIndex,0,this._displayedList)}return l};
sap.m.FacetFilter.prototype.removeList=function(o){var l=sap.ui.base.ManagedObject.prototype.removeAggregation.call(this,"lists",o);this._removeList(l);return l};
sap.m.FacetFilter.prototype.removeAggregation=function(){var l=sap.ui.base.ManagedObject.prototype.removeAggregation.apply(this,arguments);if(arguments[0]==="lists"){this._removeList(l)}return l};
sap.m.FacetFilter.prototype.openFilterDialog=function(){var d=this._getFacetDialog();var n=this._getFacetDialogNavContainer();d.addContent(n);d.open();return this};
sap.m.FacetFilter.prototype.getWidth=function(){return"100%"};
sap.m.FacetFilter.prototype.init=function(){this._pageSize=5;this._addDelegateFlag=false;this._invalidateFlag=false;this._closePopoverFlag=false;this._bundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._buttons={};this._removeFacetIcons={};this._listAggrIndex=-1;this._displayedList=null;this._lastScrolling=false;this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._getAddFacetButton();this._getSummaryBar();this.setAggregation("resetButton",this._createResetButton());if(jQuery.sap.touchEventMode==="ON"&&!sap.ui.Device.system.phone){this._enableTouchSupport()}if(sap.ui.Device.system.phone){this.setType(sap.m.FacetFilterType.Light)}};
sap.m.FacetFilter.prototype.exit=function(){sap.ui.getCore().detachIntervalTimer(this._checkOverflow,this);if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy()}};
sap.m.FacetFilter.prototype.onBeforeRendering=function(){if(this.getShowSummaryBar()||this.getType()===sap.m.FacetFilterType.Light){var s=this.getAggregation("summaryBar");var t=s.getContent()[0];t.setText(this._getSummaryText());t.setTooltip(this._getSummaryText())}sap.ui.getCore().detachIntervalTimer(this._checkOverflow,this)};
sap.m.FacetFilter.prototype.onAfterRendering=function(){if(!sap.ui.Device.system.phone){sap.ui.getCore().attachIntervalTimer(this._checkOverflow,this)}this._startItemNavigation()};
sap.m.FacetFilter.prototype._startItemNavigation=function(){var f=this.getDomRef(),r=f.getElementsByClassName("sapMFFHead"),d=[];var c="";var n=0;var m=0;if(r.length>0){for(var i=0;i<r[0].childNodes.length;i++){c=r[0].childNodes[i].id;n=c.indexOf("ff");m=c.indexOf("icon");if(n<0&&m<0){d.push(r[0].childNodes[i])}}}if((!this.oItemNavigation)||this._addDelegateFlag==true){this.oItemNavigation=new sap.ui.core.delegate.ItemNavigation();this.addDelegate(this.oItemNavigation);this._addDelegateFlag=false}this.oItemNavigation.setRootDomRef(f);this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(false);this.oItemNavigation.setPageSize(this._pageSize)};
sap.m.FacetFilter.prototype.onsaptabnext=function(e){if(this._invalidateFlag==true){this.oItemNavigation.setFocusedIndex(-1);this.focus();this._invalidateFlag=false}if(this._closePopoverFlag==true){this.oItemNavigation.setFocusedIndex(-1);this.focus();this._closePopoverFlag=false}};
sap.m.FacetFilter.prototype._navToTabChain=function(a){var s=a?1:-1;var e=a?"after":"before";var E=this.$(e).attr("tabindex","0");for(var p=this;(p=p.getParent())&&p.$;){var t=p.$().find(":sapTabbable");var l=a?t.length-1:0;var i=t.index(E);if(t.length>1&&i!=l){break}}t=t||this.$().parent().find(":sapTabbable");i=t.index(E)+s;E.attr("tabindex","-1");return t[i]&&t.eq(i).focus()};
sap.m.FacetFilter.prototype.onsapskipforward=function(e){if(e.isMarked()){return}if(this._navToTabChain(true)){e.preventDefault();e.setMarked()}};
sap.m.FacetFilter.prototype.onsapincreasemodifiers=function(e){if(e.which==jQuery.sap.KeyCodes.ARROW_RIGHT){var c=this.oItemNavigation.getFocusedIndex()-1;var n=c+this._pageSize;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()}};
sap.m.FacetFilter.prototype.onsapdecreasemodifiers=function(e){var c=0;if(e.which==jQuery.sap.KeyCodes.ARROW_LEFT){c=this.oItemNavigation.getFocusedIndex()+1;var n=c-this._pageSize;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()}};
sap.m.FacetFilter.prototype.onsapdownmodifiers=function(e){var c=0;c=this.oItemNavigation.getFocusedIndex()-1;var n=c+this._pageSize;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()};
sap.m.FacetFilter.prototype.onsapupmodifiers=function(e){var c=0;c=this.oItemNavigation.getFocusedIndex();if(c!=0){c=c+1}var n=c-this._pageSize;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()};
sap.m.FacetFilter.prototype.onsapexpand=function(e){var n=this.oItemNavigation.getFocusedIndex()+1;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()};
sap.m.FacetFilter.prototype.onsapcollapse=function(e){var n=this.oItemNavigation.getFocusedIndex()-1;jQuery(e.target).blur();this.oItemNavigation.setFocusedIndex(n);this.focus()};
sap.m.FacetFilter.prototype._getPopover=function(){var p=this.getAggregation("popover");if(!p){var t=this;p=new sap.m.Popover({placement:sap.m.PlacementType.Bottom,beforeOpen:function(e){this.setCustomHeader(t._createFilterItemsSearchFieldBar(t._displayedList));var s=this.getSubHeader();if(!s){this.setSubHeader(t._createSelectAllCheckboxBar(t._displayedList))}},afterClose:function(e){t._addDelegateFlag=true;t._closePopoverFlag=true;var l=t._restoreListFromDisplayContainer(this);if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){jQuery.sap.delayedCall(100,t,t._handlePopoverAfterClose,[l])}else{t._handlePopoverAfterClose(l)}},horizontalScrolling:false});if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){p.setContentWidth("30%")};this.setAggregation("popover",p,true);p.addStyleClass("sapMFFPop")}if(this.getShowPopoverOKButton()){this._addOKButtonToPopover(p)}else{p.destroyAggregation("footer")}return p};
sap.m.FacetFilter.prototype._handlePopoverAfterClose=function(l){this._displayRemoveIcon(false,l);l._fireListCloseEvent();this.destroyAggregation("popover");if(this._oOpenPopoverDeferred){jQuery.sap.delayedCall(0,this,function(){this._oOpenPopoverDeferred.resolve();this._oOpenPopoverDeferred=undefined})}};
sap.m.FacetFilter.prototype._openPopover=function(p,c){if(!p.isOpen()){var l=sap.ui.getCore().byId(c.getAssociation("list"));this._moveListToDisplayContainer(l,p);l.fireListOpen({});p.openBy(c);if(l.getShowRemoveFacetIcon()){this._displayRemoveIcon(true,l)}l._applySearch()}return this};
sap.m.FacetFilter.prototype._getAddFacetButton=function(){var b=this.getAggregation("addFacetButton");if(!b){var t=this;var b=new sap.m.Button(this.getId()+"-add",{icon:sap.ui.core.IconPool.getIconURI("add-filter"),type:sap.m.ButtonType.Transparent,tooltip:this._bundle.getText("FACETFILTER_ADDFACET"),press:function(e){t.openFilterDialog()}});this.setAggregation("addFacetButton",b,true)}return b};
sap.m.FacetFilter.prototype._getButtonForList=function(l){if(this._buttons[l.getId()]){this._setButtonText(l);return this._buttons[l.getId()]}var t=this;var b=new sap.m.Button({type:sap.m.ButtonType.Transparent,press:function(e){var T=this;var o=function(){var p=t._getPopover();t._openPopover(p,T)};if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){jQuery.sap.delayedCall(100,this,o)}else{var p=t._getPopover();if(p.isOpen()){t._oOpenPopoverDeferred=jQuery.Deferred();t._oOpenPopoverDeferred.promise().done(o)}else{t._openPopover(p,this)}}}});this._buttons[l.getId()]=b;this.addAggregation("buttons",b);b.setAssociation("list",l.getId(),true);this._setButtonText(l);return b};
sap.m.FacetFilter.prototype._setButtonText=function(l){var b=this._buttons[l.getId()];if(b){var t="";var s=Object.getOwnPropertyNames(l._oSelectedKeys);var L=s.length;if(L>0){if(L===1){var S=l._oSelectedKeys[s[0]];t=this._bundle.getText("FACETFILTER_ITEM_SELECTION",[l.getTitle(),S])}else{t=this._bundle.getText("FACETFILTER_ITEM_SELECTION",[l.getTitle(),L])}}else{t=this._bundle.getText("FACETFILTER_ALL_SELECTED",[l.getTitle()])}b.setText(t);b.setTooltip(t)}};
sap.m.FacetFilter.prototype._getFacetRemoveIcon=function(l){var i=this._removeFacetIcons[l.getId()];if(!i){i=new sap.ui.core.Icon({src:sap.ui.core.IconPool.getIconURI("sys-cancel"),tooltip:this._bundle.getText("FACETFILTER_REMOVE"),press:function(e){var l=sap.ui.getCore().byId(this.getAssociation("list"));l.removeSelections(true);l.setSelectedKeys();l.setProperty("active",false,true)}});i.setAssociation("list",l.getId(),true);i.addStyleClass("sapMFFLRemoveIcon");this._removeFacetIcons[l.getId()]=i;this.addAggregation("removeFacetIcons",i);this._displayRemoveIcon(false,l)}return i};
sap.m.FacetFilter.prototype._displayRemoveIcon=function(d,l){if(this.getShowPersonalization()){var i=this._removeFacetIcons[l.getId()];if(d){i.removeStyleClass("sapMFFLHiddenRemoveIcon");i.addStyleClass("sapMFFLVisibleRemoveIcon")}else{i.removeStyleClass("sapMFFLVisibleRemoveIcon");i.addStyleClass("sapMFFLHiddenRemoveIcon")}}};
sap.m.FacetFilter.prototype._getFacetDialogNavContainer=function(){var n=new sap.m.NavContainer();var f=this._createFacetPage();n.addPage(f);n.setInitialPage(f);var t=this;n.attachAfterNavigate(function(e){var T=e.getParameters()["to"];var F=e.getParameters()['from'];if(T===f){F.destroySubHeader();F.destroyContent();t._selectedFacetItem.invalidate();t._selectedFacetItem=null}});return n};
sap.m.FacetFilter.prototype._createFacetPage=function(){var f=this._createFacetList();var F=new sap.m.SearchField({width:"100%",tooltip:this._bundle.getText("Search"),liveChange:function(e){var b=f.getBinding("items");if(b){var a=new sap.ui.model.Filter("text",sap.ui.model.FilterOperator.Contains,e.getParameters()["newValue"]);b.filter([a])}}});var p=new sap.m.Page({enableScrolling:true,title:this._bundle.getText("FACETFILTER_TITLE"),subHeader:new sap.m.Bar({contentMiddle:F}),content:[f]});return p};
sap.m.FacetFilter.prototype._createFilterItemsPage=function(){var t=this;var p=new sap.m.Page({showNavButton:true,enableScrolling:true,navButtonPress:function(e){var n=e.getSource().getParent();t._navFromFilterItemsPage(n)}});return p};
sap.m.FacetFilter.prototype._getFilterItemsPage=function(n){var o=n.getPages()[1];if(o){n.removePage(o);o.destroy()}var p=this._createFilterItemsPage();n.addPage(p);return p};
sap.m.FacetFilter.prototype._createFilterItemsSearchFieldBar=function(l){var t=this;var s=true;if(l.getDataType()!=sap.m.FacetFilterListDataType.String){s=false};var S=new sap.m.SearchField({value:l._getSearchValue(),width:"100%",enabled:s,tooltip:this._bundle.getText("FACETFILTER_SEARCH"),search:function(e){t._displayedList._handleSearchEvent(e)}});if(this.getLiveSearch()){S.attachLiveChange(l._handleSearchEvent,l)}var b=new sap.m.Bar({contentMiddle:S});l.setAssociation("search",S);return b};
sap.m.FacetFilter.prototype._getFacetDialog=function(){var d=this.getAggregation("dialog");if(!d){var t=this;d=new sap.m.Dialog({showHeader:false,stretch:sap.ui.Device.system.phone?true:false,afterClose:function(){t._addDelegateFlag=true;t._invalidateFlag=true;var n=this.getContent()[0];var f=n.getPages()[1];if(n.getCurrentPage()===f){var l=t._restoreListFromDisplayContainer(f);l._updateActiveState();l._fireListCloseEvent()}this.destroyAggregation("content",true);t.invalidate()},beginButton:new sap.m.Button({text:this._bundle.getText("FACETFILTER_ACCEPT"),tooltip:this._bundle.getText("FACETFILTER_ACCEPT"),press:function(){t._closeDialog()}}),contentHeight:"500px"});d.addStyleClass("sapMFFDialog");this.setAggregation("dialog",d,true)}return d};
sap.m.FacetFilter.prototype._closeDialog=function(){var d=this.getAggregation("dialog");if(d&&d.isOpen()){d.close()}};
sap.m.FacetFilter.prototype._closePopover=function(){var p=this.getAggregation("popover");if(p&&p.isOpen()){p.close()}};
sap.m.FacetFilter.prototype._createFacetList=function(){var f=new sap.m.List({mode:sap.m.ListMode.None,items:{path:"/items",template:new sap.m.StandardListItem({title:"{text}",tooltip:"{text}",counter:"{count}",type:sap.m.ListType.Navigation,customData:[new sap.ui.core.CustomData({key:"index",value:"{index}"})]})}});var F=[];for(var i=0;i<this.getLists().length;i++){var l=this.getLists()[i];F.push({text:l.getTitle(),tooltip:l.getTitle(),count:l.getAllCount(),index:i})}var m=new sap.ui.model.json.JSONModel({items:F});var t=this;f.attachUpdateFinished(function(){for(var i=0;i<f.getItems().length;i++){var o=this.getItems()[i];o.detachPress(t._handleFacetListItemPress,t);o.attachPress(t._handleFacetListItemPress,t)}});f.setModel(m);return f};
sap.m.FacetFilter.prototype._createSelectAllCheckboxBar=function(l){if(!l.getMultiSelect()){return null}var c=new sap.m.CheckBox(l.getId()+"-selectAll",{text:this._bundle.getText("FACETFILTER_CHECKBOX_ALL"),tooltip:this._bundle.getText("FACETFILTER_CHECKBOX_ALL"),selected:l.getActive()&&!l.getSelectedItem()&&!Object.getOwnPropertyNames(l._oSelectedKeys).length,select:function(e){h(!e.getParameter("selected"))}});l.setAssociation("allcheckbox",c);var b=new sap.m.Bar();b.addEventDelegate({ontap:function(e){if(e.srcControl===this){h(c.getSelected())}}},b);b.addContentLeft(c);var h=function(s){if(l.getActive()){c.setSelected(true)}else{c.setSelected(!s)}if(c.getSelected()){l.removeSelections(true);l.setSelectedKeys()}};b.addStyleClass("sapMFFCheckbar");return b};
sap.m.FacetFilter.prototype._handleFacetListItemPress=function(e){this._navToFilterItemsPage(e.getSource())};
sap.m.FacetFilter.prototype._navToFilterItemsPage=function(f){this._selectedFacetItem=f;var n=this.getAggregation("dialog").getContent()[0];var c=f.getCustomData();var i=c[0].getValue();var F=this.getLists()[i];this._listIndexAgg=this.indexOfAggregation("lists",F);if(this._listIndexAgg==i){var o=this._getFilterItemsPage(n);this._moveListToDisplayContainer(F,o);o.setSubHeader(this._createFilterItemsSearchFieldBar(F));var C=this._createSelectAllCheckboxBar(F);if(C){o.insertContent(C,0)}o.setTitle(F.getTitle());F.fireListOpen({});n.to(o)}};
sap.m.FacetFilter.prototype._navFromFilterItemsPage=function(n){var f=n.getPages()[1];var l=this._restoreListFromDisplayContainer(f);l._updateActiveState();l._fireListCloseEvent();this._selectedFacetItem.setCounter(l.getAllCount());n.backToTop()};
sap.m.FacetFilter.prototype._moveListToDisplayContainer=function(l,c){this._listAggrIndex=this.indexOfAggregation("lists",l);sap.ui.base.ManagedObject.prototype.removeAggregation.call(this,"lists",l,true);c.addAggregation("content",l,false);l.setAssociation("facetFilter",this,true);this._displayedList=l};
sap.m.FacetFilter.prototype._restoreListFromDisplayContainer=function(c){var l=c.removeAggregation("content",this._displayedList,true);this.insertAggregation("lists",l,this._listAggrIndex,l.getActive());this._listAggrIndex=-1;this._displayedList=null;return l};
sap.m.FacetFilter.prototype._getSequencedLists=function(){var m=-1;var s=[];var l=this.getLists();if(l.length>0){for(var i=0;i<l.length;i++){if(l[i].getActive()){if(l[i].getSequence()<-1){l[i].setSequence(-1)}else if(l[i].getSequence()>m){m=l[i].getSequence()}s.push(l[i])}else if(!l[i].getRetainListSequence()){l[i].setSequence(-1)}}for(var j=0;j<s.length;j++){if(s[j].getSequence()<=-1){m+=1;s[j].setSequence(m)}}if(s.length>1){s.sort(function(a,b){return a.getSequence()-b.getSequence()})}}return s};
sap.m.FacetFilter.prototype._getSummaryBar=function(){var s=this.getAggregation("summaryBar");if(!s){var t=new sap.m.Text({maxLines:1});var a=this;s=new sap.m.Toolbar({content:[t],active:this.getType()===sap.m.FacetFilterType.Light?true:false,design:sap.m.ToolbarDesign.Info,height:"auto",press:function(e){a.openFilterDialog()}});this.setAggregation("summaryBar",s)}return s};
sap.m.FacetFilter.prototype._createResetButton=function(){var t=this;var b=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI("undo"),tooltip:this._bundle.getText("FACETFILTER_RESET"),press:function(e){t._addDelegateFlag=true;t._invalidateFlag=true;t.fireReset();t.invalidate()}});return b};
sap.m.FacetFilter.prototype._addOKButtonToPopover=function(p){var b=p.getFooter();if(!b){var t=this;var b=new sap.m.Button({text:this._bundle.getText("FACETFILTER_ACCEPT"),tooltip:this._bundle.getText("FACETFILTER_ACCEPT"),width:"100%",press:function(){t._closePopover()}});p.setFooter(b)}return b};
sap.m.FacetFilter.prototype._getSummaryText=function(){var C=", ";var S=" ";var f="";var F=true;var l=this.getLists();if(l.length>0){for(var i=0;i<l.length;i++){var o=l[i];if(o.getActive()){var L=this._getSelectedItemsText(o);var t="";for(var j=0;j<L.length;j++){t=t+L[j]+C}if(t){t=t.substring(0,t.lastIndexOf(C)).trim();if(F){f=this._bundle.getText("FACETFILTER_INFOBAR_FILTERED_BY",[o.getTitle(),t]);F=false}else{f=f+S+this._bundle.getText("FACETFILTER_INFOBAR_AND")+S+this._bundle.getText("FACETFILTER_INFOBAR_AFTER_AND",[o.getTitle(),t])}}}}}if(!f){f=this._bundle.getText("FACETFILTER_INFOBAR_NO_FILTERS")}return f};
sap.m.FacetFilter.prototype._getSelectedItemsText=function(l){var t=l.getSelectedItems().map(function(v){return v.getText()});l._oSelectedKeys&&Object.getOwnPropertyNames(l._oSelectedKeys).forEach(function(v){t.indexOf(l._oSelectedKeys[v])===-1&&t.push(l._oSelectedKeys[v])});return t};
sap.m.FacetFilter.prototype._addResetToSummary=function(s){if(s.getContent().length===1){s.addContent(new sap.m.ToolbarSpacer({width:""}));s.addContent(this._createResetButton())}};
sap.m.FacetFilter.prototype._removeResetFromSummary=function(s){if(s.getContent().length===3){var S=s.removeAggregation("content",1);S.destroy();var b=s.removeAggregation("content",1);b.destroy()}};
sap.m.FacetFilter.prototype._removeList=function(l){if(l){var b=this._buttons[l.getId()];if(b){this.removeAggregation("buttons",b);b.destroy()}var r=this._removeFacetIcons[l.getId()];if(r){this.removeAggregation("removeIcons",r);r.destroy()}delete this._buttons[l.getId()];delete this._removeFacetIcons[l.getId()]}};
sap.m.FacetFilter.prototype._getScrollingArrow=function(n){var a=null;var p={src:"sap-icon://navigation-"+n+"-arrow"};if(n==="left"){a=this.getAggregation("arrowLeft");if(!a){p.id=this.getId()+"-arrowScrollLeft";a=sap.ui.core.IconPool.createControlByURI(p);var c=["sapMPointer","sapMFFArrowScroll","sapMFFArrowScrollLeft"];for(var i=0;i<c.length;i++){a.addStyleClass(c[i]);a.setTooltip(this._bundle.getText("FACETFILTER_PREVIOUS"))}this.setAggregation("arrowLeft",a)}}else if(n==="right"){a=this.getAggregation("arrowRight");if(!a){p.id=this.getId()+"-arrowScrollRight";a=sap.ui.core.IconPool.createControlByURI(p);var C=["sapMPointer","sapMFFArrowScroll","sapMFFArrowScrollRight"];for(var i=0;i<C.length;i++){a.addStyleClass(C[i]);a.setTooltip(this._bundle.getText("FACETFILTER_NEXT"))}this.setAggregation("arrowRight",a)}}else{jQuery.sap.log.error("Scrolling arrow name "+n+" is not valid")}return a};
sap.m.FacetFilter.prototype._checkOverflow=function(){var b=this.getDomRef("head");var $=this.$();var s=false;if(b){if(b.scrollWidth>b.clientWidth){s=true}}$.toggleClass("sapMFFScrolling",s);$.toggleClass("sapMFFNoScrolling",!s);this._lastScrolling=s;if(b){var S=b.scrollLeft;var a=false;var c=false;var r=b.scrollWidth;var d=b.clientWidth;if(Math.abs(r-d)==1){r=d}if(!this._bRtl){if(S>0){a=true}if((r>d)&&(S+d<r)){c=true}}else{var l=jQuery(b);if(l.scrollLeftRTL()>0){c=true}if(l.scrollRightRTL()>0){a=true}}if((c!=this._bPreviousScrollForward)||(a!=this._bPreviousScrollBack)){$.toggleClass("sapMFFNoScrollBack",!a);$.toggleClass("sapMFFNoScrollForward",!c)}}};
sap.m.FacetFilter.prototype.onclick=function(e){var t=e.target.id;if(t){var i=this.getId();e.preventDefault();if(t==i+"-arrowScrollLeft"){this._scroll(-sap.m.FacetFilter.SCROLL_STEP,500)}else if(t==i+"-arrowScrollRight"){this._scroll(sap.m.FacetFilter.SCROLL_STEP,500)}}};
sap.m.FacetFilter.prototype._scroll=function(d,D){var o=this.getDomRef("head");var s=o.scrollLeft;if(!!!sap.ui.Device.browser.internet_explorer&&this._bRtl){d=-d}var S=s+d;jQuery(o).stop(true,true).animate({scrollLeft:S},D)};
sap.m.FacetFilter.prototype._enableTouchSupport=function(){var t=this;var T=function(e){e.preventDefault();if(t._iInertiaIntervalId){window.clearInterval(t._iInertiaIntervalId)}t.startScrollX=t.getDomRef("head").scrollLeft;t.startTouchX=e.touches[0].pageX;t._bTouchNotMoved=true;t._lastMoveTime=new Date().getTime()};var f=function(e){var d=e.touches[0].pageX-t.startTouchX;var l=t.getDomRef("head");var o=l.scrollLeft;var n=t.startScrollX-d;l.scrollLeft=n;t._bTouchNotMoved=false;var b=new Date().getTime()-t._lastMoveTime;t._lastMoveTime=new Date().getTime();if(b>0){t._velocity=(n-o)/b}e.preventDefault()};var a=function(e){if(t._bTouchNotMoved===false){e.preventDefault();var l=t.getDomRef("head");var d=50;var b=Math.abs(t._velocity/10);t._iInertiaIntervalId=window.setInterval(function(){t._velocity=t._velocity*0.80;var c=t._velocity*d;l.scrollLeft=l.scrollLeft+c;if(Math.abs(t._velocity)<b){window.clearInterval(t._iInertiaIntervalId);t._iInertiaIntervalId=undefined}},d)}else if(t._bTouchNotMoved===true){t.onclick(e);e.preventDefault()}else{}t._bTouchNotMoved=undefined;t._lastMoveTime=undefined};this.addEventDelegate({ontouchstart:T},this);this.addEventDelegate({ontouchend:a},this);this.addEventDelegate({ontouchmove:f},this)};
