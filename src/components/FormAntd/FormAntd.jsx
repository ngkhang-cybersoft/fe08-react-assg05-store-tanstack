import { Button, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { configFields, configForm } from './configForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../utils/queryKey';
import { addStore, updateStore } from '../../services/apiStore/store/storeApi';
import { useNavigate } from 'react-router-dom';

const FormAntd = ({ action, initialValues = {}, callback }) => {
  const navigate = useNavigate();
  const [form] = useForm();
  const queryClient = useQueryClient();

  // Add new store
  const mutationAdd = useMutation({
    mutationKey: [QUERY_KEY.ADD_STORE],
    mutationFn: addStore,
    onSuccess: () => {
      form.resetFields();
      queryClient.invalidateQueries(QUERY_KEY.GET_ALL_STORE);
      navigate('/admin/store');
    },
  });

  // Update store
  const mutationUpdate = useMutation({
    mutationKey: [QUERY_KEY.UPDATE_STORE],
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_ALL_STORE);
      if (callback) callback();
    },
  });

  const fields = Object.entries(initialValues).map((item) => {
    return {
      name: item[0],
      value: item[1],
    };
  });

  const handleSubmit = async (values) => {
    const formatValues = {};
    for (const key in values) {
      formatValues[key] = values[key] ? values[key] : '';
    }
    if (action === 'add') {
      mutationAdd.mutateAsync(values);
    } else {
      mutationUpdate.mutateAsync({
        id: formatValues.id,
        data: formatValues,
      });
    }
  };

  const onReset = () => {
    console.log(fields);
    const fieldReset = fields
      .filter((field) => field.name !== 'id' && field.name !== 'deleted')
      .map((field) => field.name);
    form.resetFields(fieldReset);
  };

  return (
    <>
      <Form
        form={form}
        {...configForm}
        fields={fields}
        onFinish={(values) => handleSubmit(values)}
        className="justify-content-between py-4"
      >
        <Form.Item {...configFields.id}>
          <Input />
        </Form.Item>

        <Form.Item {...configFields.name}>
          <Input />
        </Form.Item>

        <Form.Item {...configFields.image}>
          <Input />
        </Form.Item>

        <Form.Item {...configFields.description}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Lat and Long">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item {...configFields.latitude}>
                <Input placeholder="Latitude" className="w-100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...configFields.longtitude}>
                <Input className="w-100" placeholder="Longtitude" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          className="mb-0"
          wrapperCol={{
            span: 23,
          }}
        >
          <Row justify="end">
            <Col className="me-2">
              <Button type="primary" htmlType="submit">
                {action === 'add' ? 'Submit' : 'Update'}
              </Button>
            </Col>
            <Col>
              <Button type="default" htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAntd;
