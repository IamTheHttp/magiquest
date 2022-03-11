import * as React from 'react';
import './OptionsScreen.scss';

interface IOptionsScreenOptions {
  onClose: () => void;
  className: string;
}

class OptionsScreen extends React.Component<IOptionsScreenOptions> {
  render() {
    let children = React.Children.toArray(this.props.children);
    return (
      <div className={`options-screen ${this.props.className}`}>
        <div className="options-screen__header">
          <div className="options-screen__title">{children[0]}</div>
          <div onClick={this.props.onClose} className="close">
            &times;
          </div>
        </div>
        <div className="options-screen__body">
          <div>{children[1]}</div>
        </div>
        <div className="options-screen__footer">
          <div>{children[2]}</div>
        </div>
      </div>
    );
  }
}

// function OptionsScreen() {
//   let children = React.Children.toArray(this.props.children);
//   return (
//     <div>
//       <div>
//         <div>{children[0]}</div>
//         <div>CloseBtn</div>
//       </div>
//       <div>
//         <div>{children[1]}</div>
//       </div>
//     </div>
//   );
// }

export default OptionsScreen;
