import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from '../Modal';
import './index.css';
import actions from '../../store/actions';
import { useDispatch } from 'react-redux';

function List(props) {

    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState({});
    const dispatch = useDispatch();

    const { data, all } = props;

    function handleAccount(data) {
        setSelect(data);
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
    }

    //修改
    function updateAccount(data) {
        dispatch(actions.updateAccount(data));
    }

    //删除
    function handleDel(item, index) {
        dispatch(actions.deleteAccount({money: item.type ? item.money : -item.money, index}));
    }

    return (
        <ul className="list">
            {
                data && data.length > 0 ? data.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <span className="type">{item.name}</span>
                            <span className="money" style={{ color: item.type ? 'green' : 'red' }}>{`${item.type ? '+' : '-'}${item.money}`}</span>
                            <span className="date">{item.date.toLocaleDateString()}</span>
                            <div>
                                <Button type="" style={{ marginRight: 10 }} onClick={() => handleAccount(item)}>修改</Button>
                                <Button type="danger" onClick={() => handleDel(item, index)}>删除</Button>
                            </div>
                        </li>
                    )
                }) : '暂无数据'
            }

            <Modal isOpen={visible} onClose={handleCancel} data={select} type={1} updateAccount={updateAccount}/>

            <span className="all">总计： {all}</span>
        </ul>
    )
}

export default List;