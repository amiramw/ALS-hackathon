/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SearchFieldRenderer");sap.m.SearchFieldRenderer={};
sap.m.SearchFieldRenderer.render=function(r,s){if(!s.getVisible()){return}var S=s.getShowMagnifier();var p=s.getPlaceholder();var v=s.getValue();var w=s.getProperty("width");r.write("<div");r.writeControlData(s);if(w){r.writeAttribute("style","width:"+w+";")}r.addClass("sapMSF");if(v){r.addClass("sapMSFVal")}if(!s.getEnabled()){r.addClass("sapMSFDisabled")}r.writeClasses();var t=s.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");var i=s.getId();var b=s.getShowSearchButton();r.write('<form method="post" action="javascript:void(0);"');r.addClass('sapMSFF');if(!b){r.addClass("sapMSFNS")}else if(s.getShowRefreshButton()){r.addClass('sapMSFReload')}r.writeClasses();r.write('>');if(!s._hasPlacehoder&&p){r.write("<label ");r.writeAttribute("id",i+"-P");r.writeAttribute("for",i+"-I");r.addClass("sapMSFPlaceholder");r.writeClasses();r.write(">");r.writeEscaped(p);r.write("</label>")}r.write('<input type="search" autocorrect="off"');r.writeAttribute("id",s.getId()+"-I");r.addClass("sapMSFI");if(sap.ui.Device.os.android&&sap.ui.Device.os.version>=4&&sap.ui.Device.os.version<4.1){r.addClass("sapMSFIA4")}r.writeClasses();if(!s.getEnabled()){r.writeAttribute("disabled","disabled")}if(p){r.writeAttributeEscaped("placeholder",p)}if(s.getMaxLength()){r.writeAttribute("maxLength",s.getMaxLength())}if(v){r.writeAttributeEscaped("value",v)}r.write(">");if(s.getEnabled()){r.write("<div");r.writeAttribute("id",s.getId()+"-reset");r.addClass("sapMSFR");r.addClass("sapMSFB");if(!b){r.addClass("sapMSFNS")}r.writeClasses();r.write("></div>");if(b){r.write("<div");r.writeAttribute("id",s.getId()+"-search");r.addClass("sapMSFS");r.addClass("sapMSFB");r.writeClasses();if(s.getRefreshButtonTooltip()){r.writeAttributeEscaped("title",s.getRefreshButtonTooltip())}r.write("></div>")}}r.write("</form>");r.write("</div>")};
