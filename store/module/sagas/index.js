import {all} from 'redux-saga/effects';
import produtos from './produtos';

export default function* rootSaga() {
  return yield all([produtos]);
}
