import React from 'react';


class SliderNative extends React.Component {
    render() {
        return (
            <input id="mySlider"
                type="range"
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                onInput={this.props.handleChange}
                onChange={this.handleOnChange}
                step={this.props.step} />
        }
}

export default SliderNative;



// var React = require("react");


// var SliderNative = React.createClass({
//     // SliderNatve: Front end to the HTML5 native slider, i.e <input type="range">
//     render: function () {
//         return (
//             <input id="mySlider"
//                 type="range"
//                 value={this.props.value}
//                 min={this.props.min}
//                 max={this.props.max}
//                 onInput={this.props.handleChange}
//                 onChange={this.handleOnChange}
//                 step={this.props.step} />
//         );
//     },
//     handleOnChange: function () {
//         // Nothing to do here.  Only present to prevent reactjs warning
//         // about onChange not being present
//     }
// });

// module.exports = SliderNative;