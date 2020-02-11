import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

function AccountModal(props) {

    const { isOpen, onClose, data, type } = props;

    const [name, setName] = useState('');
    const [money, setMoney] = useState(0);
    const [accountType, setType] = useState(-1);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (data) {
            setName(data.name);
            setMoney(data.money);
            setType(data.type);
            setDate(moment(data.date));
        }
    }, [data]);

    function handleOk() {
        const { addAccount, updateAccount } = props;
        if (type === 0) {
            const data = {
                name,
                money: Number(money),
                type: accountType,
                date: new Date(date),
                id: Math.floor(Math.random() * 10000)
            }
            addAccount(data);
        } else {
            const newData = {
                id: data.id,
                initial: data.type ? data.money : -data.money,
                name,
                money,
                type: accountType,
                date: new Date(date)
            }
            updateAccount(newData);
        }
        setName('');
        setMoney(0);
        setType(0);
        setDate(null);
        onClose();
    }

    function handleCancel() {
        setName('');
        setMoney(0);
        setType(0);
        setDate(null);
        onClose();
    }

    return (
        <div className="Modal">
            <Modal
                title={`${type ? '修改' : '新增'}账目`}
                visible={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                destroyOnClose={true}
            >
                <Form>
                    <Form.Item label="名称">
                        <Input
                            placeholder="请输入名称"
                            defaultValue={data && data.name}
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Item>
                    <Form.Item label="类型">
                        <Select
                            placeholder="请输入..."
                            style={{ width: '100%' }}
                            onChange={e => setType(e)}
                            defaultValue={data && data.type}
                        >
                            <Option value={0}>支出</Option>
                            <Option value={1}>收入</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="支出/收入">
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="请输入..."
                            defaultValue={data && data.money}
                            onChange={e => setMoney(Number(e))}
                            value={money}
                        />
                    </Form.Item>
                    <Form.Item label="日期">
                        <DatePicker
                            style={{ width: '100%' }}
                            defaultValue={data && moment(data.date)}
                            onChange={e => setDate(e)}
                            value={date}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default AccountModal;
