import { Button, Form, Input, InputNumber, Modal, Switch, message } from "antd";
import { useEffect } from "react";
import type { BikeModel, UpdateBikeModel } from "../models/BikeModel";

type Props = {
  bike: BikeModel | null;
  onCancel: () => void;
  onUpdate: (id: string, data: UpdateBikeModel) => Promise<unknown>;
};

export const EditBikeForm = ({ bike, onCancel, onUpdate }: Props) => {
  const [form] = Form.useForm<UpdateBikeModel>();

  useEffect(() => {
    if (bike) {
      form.setFieldsValue({
        brand: bike.brand,
        model: bike.model,
        description: bike.description,
        category: bike.category,
        frameMaterial: bike.frameMaterial,
        frameSizeCm: bike.frameSizeCm,
        wheelSizeInches: bike.wheelSizeInches,
        gearCount: bike.gearCount,
        weightKg: bike.weightKg,
        electric: bike.electric,
        priceCents: bike.priceCents,
      });
    }
  }, [bike, form]);

  const handleSubmit = (values: UpdateBikeModel) => {
    if (!bike) return;

    onUpdate(bike.id, values)
      .then(() => {
        message.success("Bike updated successfully");
        onCancel();
      })
      .catch(() => {
        message.error("Failed to update bike");
      });
  };

  return (
    <Modal
      title="Edit Bike"
      open={!!bike}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};