import React = from 'react';
// Bootstrap-slider.js from https://github.com/seiyria/bootstrap-slider
import BSSlider from 'bootstrap-slider';
import {es6BindAll} from 'es6bindall';

class BootstrapSlider extends React.component {
    contructor(props){
        super(props);
        es6BindAll(this, ["updateSliderValues"]);
    }

    render() {
        // The slider's an input.  That's all we need.  We'll do the rest in JS  in the
        // componentDidMount and componentDidUpdate methods
        return (
                <input />
            );
    }
    componentDidMount() {
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
    }
    componentDidUpdate() {
        this.updateSliderValues();
    }

    updateSliderValues() {
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
};

export default = BootstrapSlider;







