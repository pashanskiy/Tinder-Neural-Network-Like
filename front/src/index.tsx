import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Tnn from './components/tnn';

import './styles/styles'

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    React.createElement(Tnn),
    document.getElementById("root")
  );
});
