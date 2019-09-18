import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Blog from './components/Blog';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import 'typeface-roboto';

import yourRawTheme from './theme.json';

const theme = createMuiTheme(yourRawTheme);


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Blog />
    </MuiThemeProvider>
  , document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
