/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.AccordionRenderer");sap.ui.commons.AccordionRenderer={};
sap.ui.commons.AccordionRenderer.render=function(r,a){var b=r;b.write("<div");b.writeControlData(a);if(sap.ui.getCore().getConfiguration().getAccessibility()){b.writeAttribute('role','tablist')}b.addClass("sapUiAcd");b.addStyle("width",a.getWidth());b.writeClasses();b.writeStyles();b.write(">");b.write("<div id='"+a.getId()+"-dropTarget"+"' style='width:"+a.getWidth()+"' tabIndex='-1' class='sapUiAcd-droptarget'></div>");var s=a.getSections();var d=a.getOpenedSectionsId().split(",");for(var i=0;i<s.length;i++){if(a.bInitialRendering){if(jQuery.inArray(s[i].getId(),d)!=-1){s[i]._setCollapsed(false)}else{s[i]._setCollapsed(true)}}sap.ui.commons.AccordionRenderer.renderSection(b,s[i])}b.write('<SPAN id="'+a.getId()+'-Descr" style="visibility: hidden; display: none;">');b.write(a.rb.getText("ACCORDION_DSC"));b.write('</SPAN>');b.write("</div>");a.bInitialRendering=false};
sap.ui.commons.AccordionRenderer.renderSection=function(r,c){var a=r;var b=sap.ui.getCore().getConfiguration().getAccessibility();var h=sap.ui.commons.AccordionSection._isSizeSet(c.getMaxHeight());var w=sap.ui.commons.AccordionSection._isSizeSet(c.getParent().getWidth());a.write("<div");a.writeElementData(c);a.addClass("sapUiAcdSection");if(c.getParent().isLastSection(c)){a.addClass("sapUiAcdSectionLast")}a.addStyle("width",c.getParent().getWidth());if(!c.getCollapsed()){a.addStyle("height",c.getMaxHeight())}else{a.addClass("sapUiAcdSectionColl")}a.addClass("sapUiAcdSectionArea");if(!h){a.addClass("sapUiAcdSectionFlexHeight")}if(!c.getEnabled()){a.addClass("sapUiAcdSectionDis")}a.writeClasses();a.writeStyles();a.write("><div class='sapUiAcdSectionHdr'");if(c.getEnabled()){a.write(" tabindex='0'")}a.writeAttribute("id",c.getId()+"-hdr");if(b){a.writeAttribute('role','tab');a.writeAttribute("aria-labelledby",c.getId()+"-lbl");a.writeAttribute("aria-describedby",c.getParent().getId()+"-Descr");if(c.getEnabled()){if(c.getCollapsed()){a.writeAttribute("aria-expanded","false")}else{a.writeAttribute("aria-expanded","true")}}}a.write(">");a.write("<div ");a.writeAttribute("id",c.getId()+"-trgt");a.write(">");a.write("<span id='"+c.getId()+"-hdrL'>");if(c.getEnabled()){a.write("<a id='"+c.getId()+"-minL' class='sapUiAcdSectionMinArrow' href='javascript:void(0)' title='Collapse/Expand'")}else{a.write("<a id='"+c.getId()+"-minL' class='sapUiAcdSectionMinArrow sapUiAcdCursorText' href='javascript:void(0)' title='Collapse/Expand'")}a.write(" tabindex='-1' ");if(b){a.writeAttribute("aria-labelledby",c.getId()+"-lbl");if(c.getCollapsed()){a.writeAttribute("aria-selected","false")}else{a.writeAttribute("aria-selected","true")}if(c.getEnabled()){a.writeAttribute("aria-disabled","false");if(!!!sap.ui.Device.browser.internet_explorer){a.writeAttribute("aria-grabbed","false")}}else{a.writeAttribute("aria-disabled","true");if(!!!sap.ui.Device.browser.internet_explorer){a.writeAttribute("aria-grabbed","")}}}a.write("></a>");a.write("<span tabindex='-1' id='"+c.getId()+"-lbl' class='sapUiAcdSectionLabel'");if(c.getCollapsed()){a.writeAttribute("aria-selected","false");a.addStyle("font-weight","normal");a.writeStyles()}else{a.writeAttribute("aria-selected","true");a.addStyle("font-weight","bold");a.writeStyles()}if(b){a.writeAttribute("role","heading");a.writeAttribute("aria-labelledby",c.getId()+"-lbl");a.writeAttribute("tabindex","0");if(c.getEnabled()){a.writeAttribute("aria-disabled","false")}else{a.writeAttribute("aria-disabled","true")}}a.write(">");a.writeEscaped(c.getTitle());a.write("</span>");a.write("</span>");a.write("</div></div>");if(!c.getCollapsed()){a.write("<div class='sapUiAcdSectionCont' tabindex='-1' id='"+c.getId()+"-cont'");if(h&&w){a.write(" style='position:absolute;'")}else{a.write(" style='position:relative;top:0px;'")}if(sap.ui.getCore().getConfiguration().getAccessibility()){a.writeAttribute('role','tabpanel')}a.write(">");var C=c.getContent(),l=C.length;for(var i=0;i<l;i++){a.renderControl(C[i])}a.write("</div>")}a.write("</div>")};
