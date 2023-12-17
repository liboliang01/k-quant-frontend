import { Button, DatePicker, Form, Modal, Radio, Select, message } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import companyName from './company_full_name.json';

const { RangePicker } = DatePicker;

interface PropsType {
  stock: string;
}

export const stockList = [
  '000001.SZ',
  '601318.SH',
  '601398.SH',
  '600085.SH',
  '600118.SH',
  '601328.SH',
  '600016.SH',
  '601857.SH',
  '600674.SH',
  '601225.SH',
  '601601.SH',
  '601688.SH',
  '601607.SH',
  '600111.SH',
  '601939.SH',
  '601288.SH',
  '000776.SZ',
  '601988.SH',
  '601006.SH',
  '600583.SH',
  '601186.SH',
  '601668.SH',
  '600660.SH',
  '601628.SH',
  '600066.SH',
  '600585.SH',
  '600028.SH',
  '002304.SZ',
  '601800.SH',
  '600015.SH',
];

const DownloadModal: React.FC<PropsType> = (props) => {
  const { stock } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const stockNameMap = useMemo(() => {
    const map = new Map();
    companyName.forEach((item) => {
      const code = item.code.split('.')[0];
      map.set(code, item.name);
    });
    return map;
  }, [companyName]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const params = {
        explainer: values.explainer,
        stock: values.stock,
        // end_time: values.time[1].format('YYYYMMDD'),
        // start_time: values.time[0].format('YYYYMMDD'),
        date_range: values.date_range,
      };
      setLoading(true);
      await axios({
        url: 'http://143.89.126.57:8001/api/get_report', //调用的接口，该接口返回文件流
        method: 'get',
        params,
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'result.html'); //下载后的文件名myfile.log
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          message.error('下载失败:' + err);
        });
      setLoading(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return !(current >= dayjs('2015-01-05 ') && current <= dayjs('2022-12-30'));
  };
  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        下载打分报告
      </Button>
      <Modal
        title="下载打分报告"
        open={visible}
        onOk={handleOk}
        okText={'下载'}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="股票"
            name="stock"
            initialValue={'000001.SZ'}
            rules={[{ required: true, message: '请选择股票!' }]}
          >
            <Select
              showSearch
              allowClear
              style={{ width: 300 }}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={stockList.map((item) => ({
                label: item + '(' + stockNameMap.get(item.slice(0, 6)) + ')',
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="解释器"
            name="explainer"
            rules={[{ required: true, message: '请选择解释器!' }]}
            initialValue={'GnnExplainer'}
          >
            <Select
              style={{ width: 300 }}
              options={[
                { value: 'GnnExplainer', label: 'GnnExplainer' },
                {
                  value: 'InputGradientExplainer',
                  label: 'InputGradientExplainer',
                },
                { value: 'GradExplainer', label: 'GradExplainer' },
                { value: 'EffectExplainer', label: 'EffectExplainer' },
              ]}
            />
          </Form.Item>
          {/* <Form.Item
            label="时间段"
            name="time"
            rules={[{ required: true, message: '请选择时间!' }]}
          >
            <RangePicker style={{ width: 300 }} disabledDate={disabledDate} />
          </Form.Item> */}
          <Form.Item
            label="时间范围"
            name="date_range"
            initialValue={'THREE_MONTH'}
            rules={[{ required: true, message: '请选择时间!' }]}
          >
            <Radio.Group>
              <Radio value="THREE_MONTH">近三个月</Radio>
              <Radio value="SIX_MONTH">近半年</Radio>
              <Radio value="ONE_YEAR">近一年</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DownloadModal;
