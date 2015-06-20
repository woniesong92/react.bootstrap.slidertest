var jQuery = require("jquery");
var $ = jQuery;
var React = require("react");
// var bootstrapSlider = require("bootstrap-slider");
$.fn.bootstrapSlider = require("bootstrap-slider");

module.exports = React.createClass({
    // BootstrapSlider
    // Bootstrap-slider.js from https://github.com/seiyria/bootstrap-slider
    render: function () {
        // The slider's an input.  That's all we need.  We'll do the rest in JS.
        return (
                <input />
            );
    },
    componentDidMount: function () {
        var that = this;
    //    $.fn.bootstrapSlider = $.fn.bootstrapSlider || $.fn.slider;
        this.mySlider = $(this.getDOMNode()).bootstrapSlider({
            "tooltip": this.props.tooltip || "show"
        });
        this.updateSliderValues();
        this.mySlider.on("change", function (e) {
            var fakeEvent = {
                target: {}
            };
            fakeEvent.target.value = e.value.newValue;
            that.props.handleChange(fakeEvent);
        });
    },
    componentDidUpdate: function() {
        this.updateSliderValues();
    },
    updateSliderValues: function() {
        $(this.mySlider)
            .bootstrapSlider("setAttribute", "min", this.props.min)
            .bootstrapSlider("setAttribute", "max", this.props.max)
            .bootstrapSlider("setAttribute", "step", this.props.step)
            .bootstrapSlider("setValue", this.props.value);

        var sliderEnable = this.props.disabled === "disabled" ? false : true;
        var currentlyEnabled = $(this.mySlider).bootstrapSlider("isEnabled");
        if(sliderEnable) {
            if(!currentlyEnabled) {
                $(this.mySlider).bootstrapSlider("enable");
            }
        }
        else {
            if(currentlyEnabled) {
                $(this.mySlider).bootstrapSlider("disable");
            }
        }
    }
});