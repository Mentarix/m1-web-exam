import { Button, Form, Input, InputNumber, Modal, Switch, message } from "antd";
import type { CreateBikeModel } from "../models/BikeModel";

type Props = {
  open: boolean;
  onCancel: () => void;
  onCreate: (data: CreateBikeModel) => Promise<unknown>;
};

export const AddBikeForm = ({ open, onCancel, onCreate }: Props) => {
  const [form] = Form.useForm<CreateBikeModel>();

  const handleSubmit = (values: CreateBikeModel) => {
    onCreate(values)
      .then(() => {
        message.success("Bike created successfully");
        form.resetFields();
        onCancel();
      })
      .catch(() => {
        message.error("Failed to create bike. Check the entered values.");
      });
  };

  return (
    <Modal
      title="Add New Bike"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ electric: false }}
      >
        <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="model" label="Model" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="frameMaterial" label="Frame Material" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="frameSizeCm" label="Frame Size (cm)" rules={[{ required: true }]}>
          <InputNumber min={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="wheelSizeInches" label="Wheel Size (inches)" rules={[{ required: true }]}>
          <InputNumber min={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="gearCount" label="Gear Count" rules={[{ required: true }]}>
          <InputNumber min={1} precision={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="weightKg" label="Weight (kg)" rules={[{ required: true }]}>
          <InputNumber min={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="electric" label="Electric Bike" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="priceCents" label="Price (cents)" rules={[{ required: true }]}>
          <InputNumber min={0} precision={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Bike
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};