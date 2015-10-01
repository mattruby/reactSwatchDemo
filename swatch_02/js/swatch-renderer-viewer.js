/** @namespace Swatch */
var Swatch = Swatch || {};
(function () {
	"use strict";

	Swatch.ViewerFullRenderer = React.createClass({
		displayName: 'viewer.Swatch',
		render: function () {
			return React.DOM.div({
					className: 'swatch-viewer'
				},
				React.DOM.h1(null, 'Fabric Details'),

				React.DOM.img({
					height: 260,
					width: 260,
					alt: 'Tatum Mustard',
					className: 'selected-swatch-image',
					src: 'http://s7d4.scene7.com/is/image/roomandboard/sw_tatummustard?&amp;wid=260&amp;hei=260'
				}),

				React.DOM.strong({
					className: 'selected-swatch-name'
				}, 'Tatum Mustard'),

				React.createElement(Swatch.swatchGroupRenderer, null)
			);
		}
	});

	Swatch.swatchGroupRenderer = React.createClass({
		displayName: 'swatchGroup.Swatch',
		render: function () {

			return React.DOM.div({
					className: 'swatch-container'
				},
				React.createElement(Swatch.swatchThumbnailRenderer, null)
			);
		}
	});

	Swatch.swatchThumbnailRenderer = React.createClass({
		displayName: 'swatchThumbnail.Swatch',
		render: function () {

			return React.DOM.div({
					className: 'swatch'
				},
				React.DOM.img({
					height: 31,
					width: 31,
					alt: 'Tatum Mustard',
					src: 'http://s7d4.scene7.com/is/image/roomandboard/sw_tatumoatmeal?$mobile$&amp;wid=31&amp;hei=31'
				})
			);
		}
	});

}());