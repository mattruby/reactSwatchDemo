/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.ViewerFullRenderer = React.createClass({
		displayName: 'viewer.Swatch',
		propTypes: {
			title: React.PropTypes.string.isRequired,
			selectedSwatch: React.PropTypes.object.isRequired,
			swatches: React.PropTypes.array.isRequired,
			eventBinding: React.PropTypes.object.isRequired
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
						swatches: this.props.swatches,
						eventBinding: this.props.eventBinding
					})
			);
		}
	});

	Swatch.swatchGroupRenderer = React.createClass({
		displayName: 'swatchGroup.Swatch',
		propTypes: {
			swatches: React.PropTypes.array.isRequired,
			eventBinding: React.PropTypes.object.isRequired
		},
		render: function () {

			var renderedSwatches = this.props.swatches.map(function (swatch) {
				return React.createElement(Swatch.swatchThumbnailRenderer, {
					key: swatch.materialId,
					selected: swatch.selected,
					materialId: swatch.materialId,
					name: swatch.name,
					image: swatch.image,
					eventBinding: this.props.eventBinding
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
			eventBinding: React.PropTypes.object.isRequired
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
			$(this.props.eventBinding).trigger('swatchSelected.swatch', this.props.materialId);
		}
	});

}());