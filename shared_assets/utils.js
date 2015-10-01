/** @namespace Swatch */
(function () {
	"use strict";

	var Swatch = Swatch || {};

	Swatch.imgSize = {
		large: '?wid=260&hei=260',
		thumb: '?wid=31&hei=31'
	};

	Swatch.setSelectedSwatch = function (materialId, data) {
		for (var i = 0; i < data.swatches.length; i++) {
			var swatch = data.swatches[i];
			swatch.selected = false;
			if(swatch.materialId === materialId) {
				swatch.selected = true;
			}
		}
	};
	Swatch.getSelectedSwatch = function (data) {
		if(data){
			for (var i = 0; i < data.swatches.length; i++) {
				var swatch = data.swatches[i];
				if (swatch.selected) {
					return swatch;
				}
			}
		}
		return null;
	};

	window.Swatch = Swatch;

}());