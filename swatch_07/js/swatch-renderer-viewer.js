/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.ViewerLookup = React.createClass({
		displayName: 'SmartViewer.Swatch',
		componentWillMount: function () {

			var store = new Swatch.SwatchStore();
			var listenableActions = store.listenableActions;

			this.signalBinding = listenableActions.swatchDataChanged.add(function () {
				this.setState(store.getReactProps());
			}, this);
			store.init(swatchData1);
		},
		componentWillUnmount: function () {
			this.signalBinding.detach();
		},
		render: function () {
			return React.createElement(Swatch.ViewerFullRenderer, this.state);
		}
	});

	Swatch.ViewerFullRenderer = React.createClass({
		displayName: 'viewer.Swatch',
		propTypes: {
			title: React.PropTypes.string.isRequired,
			selectedSwatch: React.PropTypes.object.isRequired,
			swatches: React.PropTypes.array.isRequired,
			setSelectedSwatchSignal: React.PropTypes.object.isRequired
		},
		render: function () {

			var selectedSwatch = this.props.selectedSwatch;

			return React.DOM.div({
					className: 'swatch-viewer'
				},
				React.DOM.h1(null, this.props.title),

				React.DOM.img({
					height: 260,
					width: 260,
					alt: selectedSwatch.name,
					className: 'selected-swatch-image',
					src: selectedSwatch.image + Swatch.imgSize.large
				}),

				React.DOM.strong({
					className: 'selected-swatch-name'
				}, selectedSwatch.name),

				React.createElement(Swatch.swatchGroupRenderer,
					{
						key: 'swatch-group',
						swatches: this.props.swatches,
						setSelectedSwatchSignal: this.props.setSelectedSwatchSignal
					})
			);
		}
	});

	Swatch.swatchGroupRenderer = React.createClass({
		displayName: 'swatchGroup.Swatch',
		propTypes: {
			swatches: React.PropTypes.array.isRequired,
			setSelectedSwatchSignal: React.PropTypes.object.isRequired
		},
		render: function () {

			var renderedSwatches = this.props.swatches.map(function (swatch) {
				return React.createElement(Swatch.swatchThumbnailRenderer, {
					key: swatch.materialId,
					selected: swatch.selected,
					materialId: swatch.materialId,
					name: swatch.name,
					image: swatch.image,
					setSelectedSwatchSignal: this.props.setSelectedSwatchSignal
				});
			}, this);

			return React.DOM.div({
					className: 'swatch-container'
				},
				renderedSwatches
			);
		}
	});

	Swatch.swatchThumbnailRenderer = React.createClass({
		displayName: 'swatchThumbnail.Swatch',
		propTypes: {
			selected: React.PropTypes.bool.isRequired,
			materialId: React.PropTypes.number.isRequired,
			name: React.PropTypes.string.isRequired,
			image: React.PropTypes.string.isRequired,
			setSelectedSwatchSignal: React.PropTypes.object.isRequired
		},
		render: function () {

			var className = 'swatch' + (this.props.selected ? ' selected' : '');

			return React.DOM.div({
					className: className,
					key: this.props.materialId,
					onClick: this.swatchClickHandler
				},
				React.DOM.img({
					height: 31,
					width: 31,
					alt: this.props.name,
					src: this.props.image + Swatch.imgSize.thumb
				})
			);
		},
		swatchClickHandler: function () {
			this.props.setSelectedSwatchSignal.dispatch(this.props.materialId)
		}
	});

}());