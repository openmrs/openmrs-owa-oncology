import { fork, take, call, put } from 'redux-saga/effects';

const baseUrl = 'http://humci.pih-emr.org:443/mirebalais';

function fetchRegeminList() {
  return fetch(`${baseUrl}/ws/rest/v1/orderset`)
    .then(res => res.json())
    .then(result =>
      result.reduce((accumulator, currentValue) => {
        accumulator.push({
          uuid: currentValue.uuid,
          displayName: currentValue.display,
          detailsUri: currentValue.links.uri,
        });
        return accumulator;
      }, []),
    );
}

function* callGetRegimens() {
  const result = yield call(fetchRegeminList);
  yield put({ type: 'FETCH_REGIMENS_DONE', result });
}

function* getRegimensSaga() {
  yield* take('FETCH_REGIMENS', callGetRegimens);
}

export default function* root() {
  yield [fork(getRegimensSaga)];
}
