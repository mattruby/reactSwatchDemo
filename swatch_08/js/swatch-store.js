/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.SwatchStore = function () {

		this.callableActions = {
			swatchSelected: new signals.Signal()
		};
		this.listenableActions = {
			swatchDataChanged: new signals.Signal()
		};
		// default is set to loading.  This may not always be the case for you.
		this.isLoading = true;

		this.callableActions.swatchSelected.add(this.setSelectedSwatch, this);

	};

	Swatch.SwatchStore.prototype.init = function (dataId) {
		this.loadData(dataId);
	};

	Swatch.SwatchStore.prototype.loadData = function (dataId) {

		this.isLoading = true;
		this.loadingError = null;

		// get the data via an ajax get
		var swatchDataLoadingPromise = $.get('../shared_assets/swatch-data-' + dataId + '.json');
		// Success binding
		swatchDataLoadingPromise.done(_.bind(this.loadDataSuccess, this));
		// Failure binding
		swatchDataLoadingPromise.fail(_.bind(this.loadDataFailed, this));

		// this will fire before the ajax returns
		this.listenableActions.swatchDataChanged.dispatch();

	};

	Swatch.SwatchStore.prototype.loadDataSuccess = function (data) {
		// the delay is just to show the loading message
		_.delay(_.bind(function () {
			this.isLoading = false;
			this.model = _.cloneDeep(data);
			this.listenableActions.swatchDataChanged.dispatch();
		}, this), 2000);
	};



	Swatch.SwatchStore.prototype.loadDataFailed = function (jqXHR, textStatus, errorThrown) {
		this.isLoading = false;
		this.loadingError = textStatus;
		this.listenableActions.swatchDataChanged.dispatch();
	};

	Swatch.SwatchStore.prototype.setSelectedSwatch = function setSelectedSwatch (materialId) {
		Swatch.setSelectedSwatch(materialId, this.model);
		this.listenableActions.swatchDataChanged.dispatch();
	};
	Swatch.SwatchStore.prototype.getSelectedSwatch = function () {
		Swatch.setSelectedSwatch(materialId, this.model);
		this.listenableActions.swatchDataChanged.dispatch();
	};

	Swatch.SwatchStore.prototype.getReactProps = function () {
		return _.assign({
			selectedSwatch: Swatch.getSelectedSwatch(this.model),
			setSelectedSwatchSignal: this.callableActions.swatchSelected,
			isLoading: this.isLoading,
			loadingError: this.loadingError
		}, this.model);
	};

}());