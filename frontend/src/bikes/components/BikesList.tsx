import { Button, Skeleton, Space, Typography, message } from "antd";
import { useEffect } from "react";
import { useBikesProvider } from "../providers/useBikesProvider";
import { BikeListItem } from "./BikeListItem";
import type { BikeModel } from "../models/BikeModel";

type Props = {
  onView: (id: string) => void;
  onEdit: (bike: BikeModel) => void;
  onAdd: () => void;
};

export const BikesList = ({ onView, onEdit, onAdd }: Props) => {
  const {
    bikes,
    deleteBike,
    isLoading,
    load,
    totalCount,
    page,
    limit,
  } = useBikesProvider();

  useEffect(() => {
    load(1).catch(() => {
      message.error("Failed to load bikes");
    });
  }, []);

  const totalPages = Math.ceil(totalCount / limit);

  const handleDelete = (id: string) => {
    deleteBike(id)
      .then(() => {
        message.success("Bike deleted successfully");

        if (bikes.length === 1 && page > 1) {
          load(page - 1);
        }
      })
      .catch(() => {
        message.error("Unable to delete bike. It may have existing sales.");
      });
  };

  return (
    <Space
      direction="vertical"
      style={{ padding: ".25rem .5rem", width: "100%" }}
    >
      <Button type="primary" onClick={onAdd}>
        Add Bike
      </Button>

      <Typography.Title level={3}>
        Bicycle Catalog
      </Typography.Title>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          {bikes.length === 0 ? (
            <Typography.Text type="secondary">
              No bikes found.
            </Typography.Text>
          ) : (
            bikes.map((bike) => (
              <BikeListItem
                key={bike.id}
                bike={bike}
                onView={onView}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))
          )}

          <Space style={{ marginTop: 16 }}>
            <Button
              disabled={page <= 1 || isLoading}
              onClick={() =>
                load(page - 1).catch(() =>
                  message.error("Failed to load bikes"),
                )
              }
            >
              Previous
            </Button>

            <Typography.Text>
              Page {page} of {totalPages}
            </Typography.Text>

            <Button
              disabled={page >= totalPages || isLoading}
              onClick={() =>
                load(page + 1).catch(() =>
                  message.error("Failed to load bikes"),
                )
              }
            >
              Next
            </Button>
          </Space>

          <Typography.Text type="secondary">
            Total bikes: {totalCount}
          </Typography.Text>
        </>
      )}
    </Space>
  );
};