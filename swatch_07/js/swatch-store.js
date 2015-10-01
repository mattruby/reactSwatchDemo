/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.SwatchStore = function () {
		// Actions that this store will listen to
		this.callableActions = {
			swatchSelected: new signals.Signal()
		};
		// Actions for others to listen to
		this.listenableActions = {
			swatchDataChanged: new signals.Signal()
		};

		this.callableActions.swatchSelected.add(this.setSelectedSwatch, this);

	};

	Swatch.SwatchStore.prototype.init = function (swatchJSONData) {
		this.model = _.cloneDeep(swatchJSONData);
		this.listenableActions.swatchDataChanged.dispatch();
	};

	Swatch.SwatchStore.prototype.setSelectedSwatch = function (materialId) {
		Swatch.setSelectedSwatch(materialId, this.model);
		this.listenableActions.swatchDataChanged.dispatch();
	};

	Swatch.SwatchStore.prototype.getReactProps = function () {
		return _.assign({
			selectedSwatch: Swatch.getSelectedSwatch(this.model),
			setSelectedSwatchSignal: this.callableActions.swatchSelected
		}, this.model);
	};

}());