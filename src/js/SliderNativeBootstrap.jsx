
// var jQuery = require("jquery");
// var $ = jQuery;
// var bootstrap = require("bootstrap");
var React = require("react");
var BootstrapSlider = require("./BootstrapSlider.jsx");
var SliderNative = require("./SliderNative.jsx");

var BrowserDetectMixin = {
    // This needs to go elsewhere, e.g. load from another component.
    // Lifted from:
    // http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie/21712356#21712356
    detectIE: function () {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
};



module.exports = React.createClass({
    // SliderNativeBootstrap
    componentWillMount: function () {
        // Although IE10+ displays the native range control,it:
        //      a) looks crap
        //      b) doesn't respond to its Input or Change events properly.
        // So have augmented a feature test with some good, old-fashioned
        // browser sniffing to always display the Bootstrap version on IE.
        var ieVersion = BrowserDetectMixin.detectIE();
        if (ieVersion > 1 && ieVersion < 12) {
                // IE up to version 11
                this.supportsRange = false;
        }
        else {
            // IE 12+ and all other browsers
            // Test whether range input is accepted by creating such a field, then seeing what its
            // type is set to.
            var input = document.createElement('input');
            input.setAttribute('type', 'range');
            this.supportsRange = input.type !== "text" ? true : false;        
        }

        
    },
    render: function () {
        var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
        if(polyfill) {
            if(this.supportsRange) {
                return (
                    <SliderNative {...this.props} />
                );
            }
            else {
                return (
                    <BootstrapSlider {...this.props} />
                );
            }
        }
        else {
            return (
                <BootstrapSlider {...this.props} />
            );            
        }
    }
});