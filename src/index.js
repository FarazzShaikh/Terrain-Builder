import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Provider } from 'react-redux'
import ReduxStore from './Redux/Store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={ReduxStore}>
      <App />
    </Provider>
  </ThemeProvider>,



  document.getElementById('root')
);