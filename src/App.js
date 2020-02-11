import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import List from './component/List';
import Modal from './component/Modal';
import actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {

  const [visible, setVisible] = useState(false);

  const data = useSelector(state => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAccount());
  }, []);

  function handleAccount() {
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleAdd(data) {
    dispatch(actions.addAccount(data));
  }

  return (
    <div className="App">
      <h1>Dong日账目</h1>
      <Spin spinning={data.loading}>
        <List data={data.accounts} all={data.all} />
        <Button type="primary" style={{ marginTop: 20 }} onClick={handleAccount}>开始记账</Button>
      </Spin>
      <Modal isOpen={visible} onClose={handleCancel} type={0} data={null} addAccount={handleAdd} />
    </div>
  );
}


export default App;
