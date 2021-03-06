/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.ui.ux3.FeedRenderer");

/**
 * @class Feed renderer.
 * @static
 */
sap.ui.ux3.FeedRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.ui.ux3.FeedRenderer.render = function(oRenderManager, oControl){
    // convenience variable
	var rm = oRenderManager;
	var oFeed = oControl;
	var sMyId = oFeed.getId();

	// write the HTML into the render manager
    rm.write('<DIV');
    rm.writeControlData(oFeed);
	rm.addClass('sapUiFeed');
	rm.writeClasses();
    rm.write('>');

    //feeder
	rm.renderControl(oFeed.oFeeder);

    rm.write('<HEADER class=sapUiFeedTitle ><H4>');
    //titlebar
    var sTitle = oFeed.getTitle();
    if (!sTitle || sTitle == "") {
		// use default title
		sTitle = oFeed.rb.getText('FEED_TITLE');
	}
	rm.writeEscaped(sTitle);
	//menu button (only if exist)
	if(oFeed.oToolsButton){
		rm.renderControl(oFeed.oToolsButton);
	}
    //live-button (alsways must exist)
	rm.renderControl(oFeed.oLiveButton);
    rm.write('</H4>');

    //toolbar
    rm.write('<DIV class="sapUiFeedToolbar" >');
	rm.renderControl(oFeed.oFilter);
	rm.renderControl(oFeed.oSearchField);

    rm.write('</DIV>');
    rm.write('</HEADER>');

    //Chunks
    rm.write('<SECTION>');
    for ( var i = 0; i < oFeed.getChunks().length; i++) {
		var oChunk = oFeed.getChunks()[i];
		rm.renderControl(oChunk);
	}

    rm.write('</SECTION>');

    rm.write('</DIV>');

};
