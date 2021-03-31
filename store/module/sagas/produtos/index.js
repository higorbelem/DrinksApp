/* eslint-disable no-empty-function */
import {all, takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import ServerConfig from '../../../../services/ServerConfig';
import jsons from '../../../../services/jsons';

import * as Types from '../../types';

function* getProducts(action) {
  let sucess;
  let sucessPayload = {};
  let message = '';
  try {
    const jsonInput = jsons.inputJson(ServerConfig.auth, 'searchProducts', [
      action.payload.search,
      action.payload.filter,
    ]);

    const formData = new FormData();
    formData.append('inputJson', JSON.stringify(jsonInput));

    const {data} = yield axios.post(
      ServerConfig.url('/input'),
      JSON.stringify(jsonInput),
      {
        headers: {
          'Content-Type': 'application/json', //'multipart/form-data'//'application/x-www-form-urlencoded'
        },
      },
    );

    if (data.successful) {
      sucess = true;
      sucessPayload = data.payload;
    } else {
      sucess = false;
      message = data.description;
    }
  } catch (error) {
    console.log('Algo ocorreu ', error);
    message = error;
    sucess = false;
  }

  if (sucess) {
    yield put({
      type: Types.REQUEST_PRODUCTS_SUCCESS,
      payload: sucessPayload,
    });
  } else {
    yield put({
      type: Types.REQUEST_PRODUCTS_FAILED,
      payload: {message},
    });
  }
}

export default all([takeLatest(Types.REQUEST_PRODUCTS, getProducts)]);
