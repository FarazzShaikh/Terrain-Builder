import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const initialState = {
  GLOBAL_ProjectName: 'unnamedProject',
  GLOBAL_HeightBuffer: [],
  GLOBAL_terrainResolution: 32,
  GLOBAL_mDate: new Date().toLocaleString('en-US', dateOptions),
  GLOBAL_doesCaptureMap: false,

  GEN_Scale: 1,
  GEN_Persistance: 0.5,
  GEN_Lacunarity: 2,
  GEN_Octaves: 6,
  GEN_Redistribution: 1,
  GEN_zScaling: 10,
  GEN_xOff: 0,
  GEN_yOff: 0,

  TIME_displace: 2000,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set_GLOBAL_HeightBuffer': {
      return {
        ...state,
        GLOBAL_HeightBuffer: action.data
      }
    }

    case 'set_GLOBAL_terrainResolution' : {
      return {
        ...state,
        GLOBAL_terrainResolution: action.data,
      }
    }

    case 'set_GLOBAL_ProjectName': {
      return {
        ...state,
        GLOBAL_ProjectName: action.data,
      }
    }

    case 'set_GLOBAL_doesCaptureMap' : {
      return {
        ...state,
        GLOBAL_doesCaptureMap: action.data,
      }
    }

    case 'set_GEN': {
      switch (action.label) {
        case 'Scale':
          return {
            ...state,
            GEN_Scale: action.data
          }
        case 'Persistance':
          return {
            ...state,
            GEN_Persistance: action.data
          }
        case 'Lacunarity':
          return {
            ...state,
            GEN_Lacunarity: action.data
          }
        case 'Octaves':
          return {
            ...state,
            GEN_Octaves: action.data
          }
        case 'Redistribution':
          return {
            ...state,
            GEN_Redistribution: action.data
          }
        case 'Height':
          return {
            ...state,
            GEN_zScaling: action.data
          }
        case 'X-Offset':
          return {
            ...state,
            GEN_xOff: action.data
          }
        case 'Y-Offset':
          return {
            ...state,
            GEN_yOff: action.data
          }
        default:
          break;
      }
      break;
    }
    default:
      break;
  }
  return state
}

const store = createStore(reducer)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,



  document.getElementById('root')
);