import {
    put,
    takeLatest,
    delay
} from 'redux-saga/effects';
import actions from '../actions';
import store from '../../createStore';
import { sortBy } from 'lodash';
// 获取账目
function* fetchGetAcount() {
    try {
        yield put(actions.setLoading(true));
        yield delay(1000);
        yield put(actions.setLoading(false));
        yield put(actions.setAccount([
            {
                name: '充值',
                type: 0,
                money: 100,
                date: new Date(),
                id: 1
            },
            {
                name: '兼职',
                type: 1,
                money: 200,
                date: new Date(),
                id: 2
            }
        ]));
        yield put(actions.setAll(100));
    } catch (error) {
        return error;
    }
}

// 新增账目
function* fetchAddAcount(action) {
    try {
        const allData = store.getState().account;
        
        const newData = sortBy(allData.accounts.concat(action.payload), function(item){
            return item.date;
        });

        const money = action.payload.type ? action.payload.money : -action.payload.money;

        yield put(actions.setAccount(newData));
        yield put(actions.setAll(allData.all + money));

    } catch (error) {
        return error;
    }
}

// 修改账目
function* fetchUpdateAcount(action) {
    try {
        const allData = store.getState().account;

        const selectNum = allData.accounts.findIndex(item => {
            return item.id === action.payload.id;
        });
        
        const [...accounts] = allData.accounts;

        accounts.splice(selectNum, 1);

        const newData = sortBy(accounts.concat(action.payload), function(item){
            return item.date;
        });
        yield put(actions.setAccount(newData));
        yield put(actions.setAll(allData.all - action.payload.initial + (action.payload.type ? action.payload.money : -action.payload.money)));

    } catch (error) {
        return error;
    }
}

// 删除账目
function* fetchDeleteAcount(action) {
    try {
        const allData = store.getState().account;
        const [...accounts] = allData.accounts;
        accounts.splice(action.payload.index, 1);
      
        yield put(actions.setAccount(accounts));
        yield put(actions.setAll(allData.all - action.payload.money));

    } catch (error) {
        return error;
    }
}

export default function* accountSaga() {
    yield takeLatest(actions.getAccount().type, fetchGetAcount);
    yield takeLatest(actions.addAccount().type, fetchAddAcount);
    yield takeLatest(actions.updateAccount().type, fetchUpdateAcount);
    yield takeLatest(actions.deleteAccount().type, fetchDeleteAcount);
}