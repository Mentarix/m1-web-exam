import { Button, Card, Popconfirm, Space, Typography } from "antd";
import type { BikeModel } from "../models/BikeModel";

type Props = {
  bike: BikeModel;
  onView: (id: string) => void;
  onEdit: (bike: BikeModel) => void;
  onDelete: (id: string) => void;
};

export const BikeListItem = ({
  bike,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Card size="small">
      <Space
        direction="vertical"
        style={{ width: "100%" }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {bike.brand} {bike.model}
        </Typography.Title>

        <Typography.Text type="secondary">
          {bike.category} · {bike.frameMaterial}
        </Typography.Text>

        <Typography.Text>
          {bike.weightKg} kg · {bike.gearCount} gears ·{" "}
          {bike.electric ? "Electric" : "Non-electric"}
        </Typography.Text>

        <Typography.Text strong>
          €{(bike.priceCents / 100).toFixed(2)}
        </Typography.Text>

        <Space wrap>
          <Button onClick={() => onView(bike.id)}>
            View
          </Button>

          <Button onClick={() => onEdit(bike)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete this bike?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(bike.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      </Space>
    </Card>
  );
};