(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var React = require("react");
var SliderNativeBootstrap = require("./SliderNativeBootstrap");

var Demo = React.createClass({
    displayName: "Demo",

    getInitialState: function getInitialState() {
        return {
            currentValue: this.props.startValue,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step
        };
    },
    render: function render() {
        var newValue = this.state.currentValue;
        // TODO: Replace this with bootstrap version
        return React.createElement(
            "div",
            null,
            React.createElement(SliderNativeBootstrap, {
                value: this.state.currentValue,
                handleChange: this.changeValue,
                step: this.state.step,
                max: this.state.max,
                min: this.state.min }),
            React.createElement("br", null),
            React.createElement("br", null),
            "Value: ",
            newValue,
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: this.changeAxes },
                "Change axes!"
            )
        );
    },
    changeValue: function changeValue(e) {
        console.log("changeValue");
        this.setState({ currentValue: e.target.value });
    },
    changeAxes: function changeAxes() {
        this.setState({
            currentValue: 500,
            min: 0,
            max: 2000,
            step: 100
        });
    }
});

React.render(React.createElement(Demo, {
    startValue: 3000,
    max: 20000,
    min: 1000,
    step: 1000 }), document.getElementById("main"));

},{"./SliderNativeBootstrap":3,"react":"react"}],2:[function(require,module,exports){
"use strict";

var React = require("react");

module.exports = React.createClass({
    displayName: "exports",

    // SliderNatve: Front end to the HTML5 native slider, i.e <input type="range">
    render: function render() {
        return React.createElement("input", { id: "mySlider",
            type: "range",
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            onInput: this.props.handleChange,
            onChange: this.handleOnChange,
            step: this.props.step });
    },
    handleOnChange: function handleOnChange() {}
});

// Nothing to do here.  Only present to prevent reactjs warning
// about onChange not being present

},{"react":"react"}],3:[function(require,module,exports){
"use strict";

var React = require("react");
// var $ = jQuery = require("jquery");
// var bootstrap = require("bootstrap");
var BootstrapSlider = require("bootstrap-slider");
var SliderNative = require("./SliderNative.jsx");

var BrowserDetectMixin = {
    // This needs to go elsewhere, e.g. load from another component.
    // Lifted from:
    // http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie/21712356#21712356
    detectIE: function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf("MSIE ");
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }

        var trident = ua.indexOf("Trident/");
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf("rv:");
            return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }

        var edge = ua.indexOf("Edge/");
        if (edge > 0) {
            // IE 12 => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
        }

        // other browser
        return false;
    }
};

module.exports = React.createClass({
    displayName: "exports",

    // SliderNativeBootstrap
    componentWillMount: function componentWillMount() {
        // Although IE10+ displays the native range control,it:
        //      a) looks crap
        //      b) doesn't respond to its Input or Change events properly.
        // So have augmented a feature test with some good, old-fashioned
        // browser sniffing to always display the Bootstrap version on IE.
        var ieVersion = BrowserDetectMixin.detectIE();
        if (ieVersion > 1 && ieVersion < 12) {
            // IE up to version 11
            this.supportsRange = false;
        } else {
            // IE 12+ and all other browsers
            // Test whether range input is accepted by creating such a field, then seeing what its
            // type is set to.
            var input = document.createElement("input");
            input.setAttribute("type", "range");
            this.supportsRange = input.type !== "text" ? true : false;
        }
    },
    render: function render() {
        var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
        if (polyfill) {
            if (this.supportsRange) {
                return React.createElement(SliderNative, this.props);
            } else {
                return React.createElement(BootstrapSlider, this.props);
            }
        } else {
            return React.createElement(BootstrapSlider, this.props);
        }
    }
});

},{"./SliderNative.jsx":2,"bootstrap-slider":"bootstrap-slider","react":"react"}]},{},[1]);
