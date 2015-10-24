import React from 'react';
import BootstrapSlider from "./BootstrapSlider.jsx";
import SliderNative from "./SliderNative.jsx");

import detectIE from './detect-ie';

// var x = "test" * 3;


class SliderNativeBootstrap extends React.component{
    componentWillMount() {
        // Although IE10+ displays the native range control,it:
        //      a) looks crap
        //      b) doesn"t respond to its Input or Change events properly.
        // So have augmented a feature test with some good, old-fashioned
        // browser sniffing to always display the Bootstrap version on IE.
        var ieVersion = detectIE();
        if (ieVersion > 1 && ieVersion < 12) {
                // IE up to version 11
                this.supportsRange = false;
        }
        else {
            // IE 12+ and all other browsers
            // Test whether range input is accepted by creating such a field, then seeing what its
            // type is set to.
            var input = document.createElement("input");
            input.setAttribute("type", "range");
            this.supportsRange = input.type !== "text" ? true : false;
        }


    }

    render() {
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
};

export default SliderNativeBootstrap;
