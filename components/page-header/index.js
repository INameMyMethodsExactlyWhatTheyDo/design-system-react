'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _info = require('./private/info');

var _info2 = _interopRequireDefault(_info);

var _title = require('./private/title');

var _title2 = _interopRequireDefault(_title);

var _detailRow = require('./private/detail-row');

var _detailRow2 = _interopRequireDefault(_detailRow);

var _detailBlock = require('./private/detail-block');

var _detailBlock2 = _interopRequireDefault(_detailBlock);

var _base = require('./private/base');

var _base2 = _interopRequireDefault(_base);

var _recordHome = require('./private/record-home');

var _recordHome2 = _interopRequireDefault(_recordHome);

var _objectHome = require('./private/object-home');

var _objectHome2 = _interopRequireDefault(_objectHome);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _breadcrumb = require('../breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Page Header Component

// Implements the [Page Header design pattern](https://www.lightningdesignsystem.com/components/page-headers) in React.
// Based on SLDS v2.2.1

// ## Dependencies

// ## Constants


var displayName = _constants.PAGE_HEADER;
var propTypes = {
	/**
  * Optional class name
  */
	className: _propTypes2.default.string,
	/**
  * The type of component
  */
	variant: _propTypes2.default.string,
	/**
  * The info property can be a string or a React element
  */
	label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * The title property can be a string or a React element
  */
	title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * The info property can be a string or a React element
  */
	info: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * The page header icon
  */
	icon: _propTypes2.default.element,
	/**
  * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
  */
	iconName: _propTypes2.default.string,
	/**
  * The icons category
  */
	iconCategory: _propTypes2.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
  * If omitted, icon position is centered.
  */
	iconPosition: _propTypes2.default.oneOf(['left', 'right']),
	iconSize: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
  * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
  */
	iconVariant: _propTypes2.default.oneOf(['container', 'border', 'border-filled', 'small', 'more']),
	/**
  * Content to appear on the right hand side of the page header
  */
	contentRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * An array of buttons which appear on the component's right hand side.
  */
	details: _propTypes2.default.array,
	/**
  * Nav content which appears in the upper right hand corner.
  */
	navRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
	/**
  * An array of react elements presumably anchor <a> elements.
  */
	trail: _propTypes2.default.array
};

var defaultProps = {
	className: '',
	variant: 'base',
	navRight: '',
	contentRight: '',
	details: [],
	trail: []
};

/**
 * The PageHeader component adds PageHeader, PageHeader.Info, PageHeader.Title, PageHeader.DetailRow, and PageHeader.DetailBlock.
 */

var PageHeader = function (_Component) {
	_inherits(PageHeader, _Component);

	function PageHeader() {
		_classCallCheck(this, PageHeader);

		return _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).apply(this, arguments));
	}

	_createClass(PageHeader, [{
		key: 'render',
		value: function render() {
			/**
    * OPTIMIZE ES7 style object destructuring removes the need for _.omit.
    * Example: const {foo, ...bar} = this.props;
    */
			var _props = this.props,
			    className = _props.className,
			    contentRight = _props.contentRight,
			    details = _props.details,
			    icon = _props.icon,
			    iconCategory = _props.iconCategory,
			    iconName = _props.iconName,
			    iconPosition = _props.iconPosition,
			    iconSize = _props.iconSize,
			    iconVariant = _props.iconVariant,
			    info = _props.info,
			    label = _props.label,
			    navRight = _props.navRight,
			    title = _props.title,
			    trail = _props.trail,
			    variant = _props.variant;


			var classes = this._getClassNames(className);

			/**
    * Render the icon
    */
			var renderIcon = function renderIcon() {
				if (iconName) {
					return _react2.default.createElement(_icon2.default, {
						name: iconName,
						category: iconCategory,
						position: iconPosition,
						size: iconSize,
						variant: iconVariant
					});
				}
				return icon;
			};

			/**
    * Render the label
    */
			var renderLabel = function renderLabel() {
				var type = typeof label === 'undefined' ? 'undefined' : _typeof(label);

				if (trail.length > 0) {
					return _react2.default.createElement(
						'nav',
						{ className: 'slds-m-bottom--xx-small', role: 'navigation' },
						_react2.default.createElement(_breadcrumb2.default, { trail: trail })
					);
				}
				if (type === 'string') {
					return _react2.default.createElement(
						'p',
						{ className: 'slds-text-title--caps slds-line-height--reset' },
						label
					);
				}
				return label;
			};

			/**
    * Render the title
    */
			var renderTitle = function renderTitle() {
				var type = typeof title === 'undefined' ? 'undefined' : _typeof(title);

				if (type === 'string') {
					return _react2.default.createElement(_title2.default, { title: title });
				}
				return title;
			};

			/**
    * Render info
    */
			var renderInfo = function renderInfo() {
				var type = typeof info === 'undefined' ? 'undefined' : _typeof(info);

				if (type === 'string') {
					return _react2.default.createElement(
						_info2.default,
						null,
						info
					);
				}
				return info;
			};

			/**
    * Steal contentRight's children
    */
			var renderNavRight = function renderNavRight() {
				var type = typeof navRight === 'undefined' ? 'undefined' : _typeof(navRight);

				if (type !== 'string') {
					return _react2.default.createElement('div', _extends({
						className: 'slds-col slds-no-flex slds-grid slds-align-top'
					}, navRight.props));
				}
				return navRight;
			};

			/**
    * Steal contentRight's children
    */
			var renderContentRight = function renderContentRight() {
				var type = typeof contentRight === 'undefined' ? 'undefined' : _typeof(contentRight);

				if (type !== 'string') {
					return _react2.default.createElement('div', _extends({ className: 'slds-grid' }, contentRight.props));
				}
				return contentRight;
			};

			var Variant = void 0;
			switch (variant) {
				case 'objectHome':
					Variant = _objectHome2.default;
					break;
				case 'recordHome':
					Variant = _recordHome2.default;
					break;
				case 'relatedList':
					Variant = RelatedList;
					break;
				default:
					Variant = _base2.default;
			}

			return _react2.default.createElement(
				'div',
				{ className: classes },
				_react2.default.createElement(Variant, {
					label: renderLabel(),
					icon: renderIcon(),
					title: renderTitle(),
					info: renderInfo(),
					contentRight: renderContentRight(),
					navRight: renderNavRight(),
					details: details
				})
			);
		}
	}, {
		key: '_getClassNames',
		value: function _getClassNames(className) {
			return (0, _classnames2.default)('slds-page-header', {
				'slds-page-header--object-home': this.props.variant === 'objectHome'
			}, className);
		}
	}]);

	return PageHeader;
}(_react.Component);

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

module.exports = PageHeader;
module.exports.Info = _info2.default;
module.exports.Title = _title2.default;
module.exports.DetailRow = _detailRow2.default;
module.exports.DetailBlock = _detailBlock2.default;