// var jQuery = require("jquery");
// var $ = jQuery;
var React = require("react");
// Bootstrap-slider.js from https://github.com/seiyria/bootstrap-slider
var BSSlider = require("bootstrap-slider");   

module.exports = React.createClass({
    // BootstrapSlider
    render: function () {
        // The slider's an input.  That's all we need.  We'll do the rest in JS.
        return (
                <input />
            );
    },
    componentDidMount: function () {
        var that = this;

        this.mySlider = new BSSlider(this.getDOMNode(), {
            "tooltip": this.props.tooltip || "show"
        });

        this.updateSliderValues();
        this.mySlider.on("change", function (e) {
            var fakeEvent = {
                target: {}
            };
            fakeEvent.target.value = e.newValue;
            that.props.handleChange(fakeEvent);
        });
    },
    componentDidUpdate: function() {
        this.updateSliderValues();
    },
    updateSliderValues: function() {
        this.mySlider
            .setAttribute("min", this.props.min)
            .setAttribute("max", this.props.max)
            .setAttribute("step", this.props.step)
            .setValue(this.props.value);


        var sliderEnable = this.props.disabled === "disabled" ? false : true;
        var currentlyEnabled = this.mySlider.isEnabled();

        if(sliderEnable) {
            if(!currentlyEnabled) {
                this.mySlider.enable();

            }
        }
        else {
            if(currentlyEnabled) {
                this.mySlider.disable();
            }
        }
    }
});





