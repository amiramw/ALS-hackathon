/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SelectRenderer");
jQuery.sap.require("sap.ui.core.ValueStateSupport");

/**
 * @class Select renderer.
 * @static
 */
sap.m.SelectRenderer = {};

/**
 * CSS class to be applied to the HTML root element of the Select control.
 *
 * @type {string}
 */
sap.m.SelectRenderer.CSS_CLASS = "sapMSlt";

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect An object representation of the control that should be rendered.
 */
sap.m.SelectRenderer.render = function(oRm, oSelect) {
	var	sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(oSelect, oSelect.getTooltip_AsString()),
		sType = oSelect.getType(),
		bAutoAdjustWidth = oSelect.getAutoAdjustWidth(),
		bEnabled = oSelect.getEnabled(),
		CSS_CLASS = sap.m.SelectRenderer.CSS_CLASS;

	// suppress rendering if not visible
	if (!oSelect.getVisible()) {
		return;
	}

	oRm.write("<div");
	this.addStyleClass(oRm, oSelect);
	oRm.addClass(CSS_CLASS);
	oRm.addClass(CSS_CLASS + oSelect.getType());

	if (!bEnabled) {
		oRm.addClass(CSS_CLASS + "Disabled");
	}

	if (bAutoAdjustWidth) {
		oRm.addClass(CSS_CLASS + "AutoAdjustedWidth");
	} else {
		oRm.addStyle("width", oSelect.getWidth());
	}

	if (oSelect.getIcon()) {
		oRm.addClass(CSS_CLASS + "WithIcon");
	}

	if (bEnabled && sap.ui.Device.system.desktop) {
		oRm.addClass(CSS_CLASS + "Hoverable");
	}

	oRm.addClass(CSS_CLASS + "WithArrow");
	oRm.addStyle("max-width", oSelect.getMaxWidth());
	oRm.writeControlData(oSelect);
	oRm.writeStyles();
	oRm.writeClasses();

	if (sTooltip) {
		oRm.writeAttributeEscaped("title", sTooltip);
	}

	if (bEnabled) {
		oRm.writeAttribute("tabindex", "0");
	}

	oRm.write(">");

	switch (sType) {
		case sap.m.SelectType.Default:
			this.renderLabel(oRm, oSelect);
			this.renderArrow(oRm, oSelect);
			break;

		case sap.m.SelectType.IconOnly:
			this.renderIcon(oRm, oSelect);
			break;

		// no default
	}

	if (oSelect._isRequiredSelectElement()) {
		this.renderSelectElement(oRm, oSelect);
	}

	oRm.write("</div>");
};

/**
 * Renders the select's label, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect An object representation of the control that should be rendered.
 * @private
 */
sap.m.SelectRenderer.renderLabel = function(oRm, oSelect) {
	var oSelectedItem = oSelect.getSelectedItem();

	oRm.write('<label class="' + sap.m.SelectRenderer.CSS_CLASS + 'Label"');
	oRm.writeAttribute("id", oSelect.getId() + "-label");
	oRm.writeAttribute("for", oSelect.getId());
	oRm.write(">");
	oRm.writeEscaped(oSelectedItem ? oSelectedItem.getText() : "");
	oRm.write('</label>');
};

/**
 * Renders the select's arrow, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @private
 */
sap.m.SelectRenderer.renderArrow = function(oRm, oSelect) {
	oRm.write('<span class="' + sap.m.SelectRenderer.CSS_CLASS + 'Arrow"');
	oRm.writeAttribute("id", oSelect.getId() + "-arrow");
	oRm.write("></span>");
};

/**
 * Renders the select's icon, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {string} oSelect
 * @private
 */
sap.m.SelectRenderer.renderIcon = function(oRm, oSelect) {
	oRm.writeIcon(oSelect.getIcon(), sap.m.SelectRenderer.CSS_CLASS + "Icon");
};

/**
 * Renders the HTMLSelectElement for the select control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect An object representation of the select that should be rendered.
 * @private
 */
sap.m.SelectRenderer.renderSelectElement = function(oRm, oSelect) {
	var sName = oSelect.getName(),
		oSelectedItem = oSelect.getSelectedItem(),
		sSelectedItemText = oSelectedItem ? oSelectedItem.getText() : "";

	oRm.write('<select class="'+ sap.m.SelectRenderer.CSS_CLASS + "Native" +'"');

	if (sName) {
		oRm.writeAttributeEscaped("name", sName);
	}

	oRm.writeAttribute("tabindex", "-1");
	oRm.write(">");
	this.renderOptions(oRm, oSelect, sSelectedItemText);
	oRm.write("</select>");
};

/**
 * Renders the HTMLOptionElement(s) for the select control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oSelect An object representation of the select that should be rendered.
 * @param {string} sSelectedItemText
 * @private
 */
sap.m.SelectRenderer.renderOptions = function(oRm, oSelect, sSelectedItemText) {
	var aItems = oSelect.getItems(),
		aItemsLength = aItems.length,
		i = 0;

	for (; i < aItemsLength; i++) {
		oRm.write("<option>");
		oRm.writeEscaped(aItems[i].getText());
		oRm.write("</option>");
	}

	if (aItemsLength === 0) {
		oRm.write("<option>" + sSelectedItemText + "</option>");
	}
};

/**
 * This method is reserved for derived class to add extra classes to the HTML root element of the control.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oSelect An object representation of the control that should be rendered.
 * @protected
 */
sap.m.SelectRenderer.addStyleClass = function(oRm, oSelect) {};