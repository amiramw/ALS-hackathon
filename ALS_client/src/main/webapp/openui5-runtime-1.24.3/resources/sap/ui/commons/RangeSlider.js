/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.RangeSlider");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.commons.Slider");sap.ui.commons.Slider.extend("sap.ui.commons.RangeSlider",{metadata:{library:"sap.ui.commons",properties:{"value2":{type:"float",group:"Appearance",defaultValue:80}}}});
sap.ui.commons.RangeSlider.prototype.onAfterRendering=function(){this.oGrip2=this.getDomRef("grip2");sap.ui.commons.Slider.prototype.onAfterRendering.apply(this);var n=this.getValue();var N=this.getValue2();if(n>=N){n=N}else if(n<=this.getMin()){n=this.getMin()}if(N>=this.getMax()){N=this.getMax()}else if(N<=n){N=n}var i=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();var a=(N-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){i=this.getBarWidth()-i;a=this.getBarWidth()-a}this.changeGrip(n,i,this.oGrip);this.changeGrip(N,a,this.oGrip2)};
sap.ui.commons.RangeSlider.prototype.onresize=function(e){var n=this.getValue2();var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip2);sap.ui.commons.Slider.prototype.onresize.apply(this,arguments)};
sap.ui.commons.RangeSlider.prototype.onfocusin=function(e){this.oMovingGrip=e.target};
sap.ui.commons.RangeSlider.prototype.onsaphome=function(e){if(this.getEditable()&&this.getEnabled()){var n=0;var N=0;if(this.oMovingGrip==this.oGrip){n=this.getMin();if(this.getVertical()||(this.bRtl&&!this.getVertical())){N=this.getBarWidth()}}else if(this.oMovingGrip==this.oGrip2){n=this.getValue();N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip}this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.RangeSlider.prototype.onsapend=function(e){if(this.getEditable()&&this.getEnabled()){var n=0;var N=0;if(this.oMovingGrip==this.oGrip){n=this.getValue2();N=this.getOffsetLeft(this.oGrip2)+this.iShiftGrip}else if(this.oMovingGrip==this.oGrip2){n=this.getMax();if(this.getVertical()||(this.bRtl&&!this.getVertical())){N=0}else{N=this.getBarWidth()}}this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.RangeSlider.prototype.fireLiveChangeForGrip=function(g,n,o){if(g==this.oGrip){if(o!=n){this.fireLiveChange({value:n,value2:this.getValue2()})}}else if(g==this.oGrip2){if(o!=n){this.fireLiveChange({value2:n,value:this.getValue()})}}};
sap.ui.commons.RangeSlider.prototype.adjustHighlightBar=function(n,g){if(n<0||isNaN(n))n=0;var p=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;var P=this.getOffsetLeft(this.oGrip2)+this.iShiftGrip;var w;if(this.getVertical()){this.setLeft(P,this.oHiLi);this.setRight(this.getBarWidth()-p,this.oHiLi);w=Math.round(p-P)}else{if(this.bRtl){this.setLeft(P,this.oHiLi);this.setRight(this.getBarWidth()-p,this.oHiLi)}else{this.setLeft(p,this.oHiLi);this.setRight(this.getBarWidth()-P,this.oHiLi)}w=Math.abs(Math.round(P-p))}if(w<0)w=0;this.setObjectWidth(w+'px',this.oHiLi)};
sap.ui.commons.RangeSlider.prototype.setRight=function(n,o){if(o==undefined)return;if(this.getVertical()){o.style.bottom=n+'px'}else{o.style.right=n+'px'}};
sap.ui.commons.RangeSlider.prototype.updateValueProperty=function(n,g){if(g==this.oGrip){this.setProperty('value',n,true)}else{this.setProperty('value2',n,true)}};
sap.ui.commons.RangeSlider.prototype.setValue=function(v){this.setProperty('value',v,true);this._oldValue1=v;if(isNaN(v)){return this}if(!this.oBar){return this}var n=parseFloat(v);var N;if(n>=this.getValue2()){n=this.getValue2();N=this.getOffsetLeft(this.oGrip2)+this.iShiftGrip;if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}}else if(n<=this.getMin()){n=this.getMin();if(this.getVertical()){N=this.getBarWidth()}else{N=0}}else{N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth()}if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip);this._oldValue1=n;return this};
sap.ui.commons.RangeSlider.prototype.setValue2=function(v){this.setProperty('value2',v,true);this._oldValue2=v;if(isNaN(v)){return this}if(!this.oBar){return this}var n=parseFloat(v);var N;if(n>=this.getMax()){n=this.getMax();if(this.getVertical()){N=0}else{N=this.getBarWidth()}}else if(n<=this.getValue()){n=this.getValue();N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}}else{N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth()}if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip2);this._oldValue2=n;return this};
sap.ui.commons.RangeSlider.prototype.getLeftGrip=function(){return this.oGrip};
sap.ui.commons.RangeSlider.prototype.getRightGrip=function(){return this.oGrip2};
sap.ui.commons.RangeSlider.prototype.getValueForGrip=function(g){if(g==this.oGrip){return this.getValue()}else{return this.getValue2()}};
sap.ui.commons.RangeSlider.prototype.validateNewPosition=function(n,N,g,m){if(!this.bRtl||this.getVertical()){if(g==this.oGrip){if(m){if(n<=this.getMin()||N<=0){n=this.getMin();if(this.getVertical()){N=this.getBarWidth()}else{N=0}}}else{if(n>=this.getValue2()){n=this.getValue2();N=this.getOffsetLeft(this.oGrip2)+this.iShiftGrip}}}else{if(m){if(n<=this.getValue()){n=this.getValue();N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip}}else{if(n>=this.getMax()||N>=this.getBarWidth()){n=this.getMax();if(!this.getVertical()){N=this.getBarWidth()}else{N=0}}}}}else{if(g==this.oGrip){if(m){if(n<=this.getMin()||N>=this.getBarWidth()){n=this.getMin();N=this.getBarWidth()}}else{if(n>=this.getValue2()){n=this.getValue2();N=this.getOffsetLeft(this.oGrip2)}}}else{if(m){if(n<=this.getValue()){n=this.getValue();N=this.getOffsetLeft(this.oGrip)}}else{if(n>=this.getMax()||N<=0){n=this.getMax();N=0}}}}this.oGrip.setAttribute('aria-valuemax',this.getValue2());this.oGrip2.setAttribute('aria-valuemin',this.getValue());return{fNewValue:n,iNewPos:N}};
sap.ui.commons.RangeSlider.prototype.handleMove=function(e){if(!this.bRtl){if(this.oMovingGrip==this.oGrip2&&this.getValue2()==this.getMax()&&(this.getOffsetLeft(this.oGrip2)-this.getOffsetLeft(this.oGrip)<2)){this.oMovingGrip=this.oGrip;this.oGrip.focus()}else if(this.oMovingGrip==this.oGrip&&this.getValue()==this.getMin()&&(this.getOffsetLeft(this.oGrip2)-this.getOffsetLeft(this.oGrip)<2)){this.oMovingGrip=this.oGrip2;this.oGrip2.focus()}}else{if(this.oMovingGrip==this.oGrip&&this.getValue2()==this.getMax()&&(this.getOffsetLeft(this.oGrip)-this.getOffsetLeft(this.oGrip2)<2)){this.oMovingGrip=this.oGrip2;this.oGrip2.focus()}else if(this.oMovingGrip==this.oGrip2&&this.getValue()==this.getMin()&&(this.getOffsetLeft(this.oGrip)-this.getOffsetLeft(this.oGrip2)<2)){this.oMovingGrip=this.oGrip;this.oGrip.focus()}}sap.ui.commons.Slider.prototype.handleMove.apply(this,[e])};
sap.ui.commons.RangeSlider.prototype.handleFireChange=function(n){var v=this.getValue();var V=this.getValue2();if(v!==this._oldValue1||V!==this._oldValue2){this._oldValue1=v;this._oldValue2=V;this.fireChange({value2:V,value:v});if(!n){this.fireLiveChange({value:v,value2:V})}}};
sap.ui.commons.RangeSlider.prototype.getNearestGrip=function(o){var m;if(this.getVertical()){var d=Math.abs(o-this.getOffsetLeft(this.oGrip2));var D=Math.abs(this.getOffsetLeft(this.oGrip)-o);if(d==D){if(o>D){m=this.oGrip}else{m=this.oGrip2}}else if(d>=D){m=this.oGrip}else{m=this.oGrip2}}else{var d=Math.abs(o-this.getOffsetLeft(this.oGrip));var D=Math.abs(this.getOffsetLeft(this.oGrip2)-o);if(d==D){if((o>D&&!this.bRtl)||(o<D&&this.bRtl)){m=this.oGrip2}else{m=this.oGrip}}else if(d<=D){m=this.oGrip}else{m=this.oGrip2}}return m};
sap.ui.commons.RangeSlider.prototype.setObjectWidth=function(n,o){if(this.getVertical()){o.style.height=n}else{o.style.width=n}};
sap.ui.commons.RangeSlider.prototype.targetIsGrip=function(m){if(m==this.oGrip.id||m==this.oGrip2.id){return true}return false};
sap.ui.commons.RangeSlider.prototype.setAriaState=function(){sap.ui.commons.Slider.prototype.setAriaState.apply(this);var v=this.getValue2();if(this.bTextLabels){v=this.getNearestLabel(v)}this.oGrip2.setAttribute('aria-valuenow',v);this.oGrip2.setAttribute('aria-valuetext','Value '+v)};
