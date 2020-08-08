import Reducer from './Reducers';
import { createStore } from 'redux'

const ReduxStore = createStore(Reducer)
export default ReduxStore