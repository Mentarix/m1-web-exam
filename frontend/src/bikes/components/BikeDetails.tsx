import { Button, Card, Descriptions, Modal, Typography } from "antd";
import type { BikeModel } from "../models/BikeModel";

type Props = {
  bike: BikeModel | null;
  onClose: () => void;
};

export const BikeDetails = ({ bike, onClose }: Props) => {
  return (
    <Modal
      title="Bike Details"
      open={!!bike}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={650}
    >
      {bike && (
        <Card>
          <Typography.Title level={4}>
            {bike.brand} {bike.model}
          </Typography.Title>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="Brand">
              {bike.brand}
            </Descriptions.Item>
            <Descriptions.Item label="Model">
              {bike.model}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {bike.description}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {bike.category}
            </Descriptions.Item>
            <Descriptions.Item label="Frame Material">
              {bike.frameMaterial}
            </Descriptions.Item>
            <Descriptions.Item label="Frame Size">
              {bike.frameSizeCm} cm
            </Descriptions.Item>
            <Descriptions.Item label="Wheel Size">
              {bike.wheelSizeInches} inches
            </Descriptions.Item>
            <Descriptions.Item label="Gear Count">
              {bike.gearCount}
            </Descriptions.Item>
            <Descriptions.Item label="Weight">
              {bike.weightKg} kg
            </Descriptions.Item>
            <Descriptions.Item label="Electric">
              {bike.electric ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              €{(bike.priceCents / 100).toFixed(2)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </Modal>
  );
};