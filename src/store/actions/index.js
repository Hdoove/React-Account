import { createActions } from 'redux-actions';

const actions = createActions({
    SET_LOADING: loading => loading,
    SET_ACCOUNT: data => data,
    SET_ALL: num => num,
    // 接口
    GET_ACCOUNT:get=> get, // 获取账目
    ADD_ACCOUNT: add => add, // 新增账目
    UPDATE_ACCOUNT: update => update, // 修改账目
    DELETE_ACCOUNT: del => del // 删除账目
});

export default actions;