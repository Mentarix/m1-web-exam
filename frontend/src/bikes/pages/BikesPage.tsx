import { useState } from "react";
import { message } from "antd";

import { BikesList } from "../components/BikesList";
import { AddBikeForm } from "../components/AddBikeForm";
import { EditBikeForm } from "../components/EditBikeForm";
import { BikeDetails } from "../components/BikeDetails";

import { useBikesProvider } from "../providers/useBikesProvider";
import type { BikeModel } from "../models/BikeModel";

export const BikesPage = () => {
  const {
    getBikeById,
    createBike,
    updateBike,
    load,
  } = useBikesProvider();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<BikeModel | null>(null);
  const [editingBike, setEditingBike] = useState<BikeModel | null>(null);

  const handleView = (id: string) => {
    getBikeById(id)
      .then((result) => setSelectedBike(result.data))
      .catch(() => message.error("Failed to load bike details"));
  };

  const handleCreate = (data: Omit<BikeModel, "id">) =>
    createBike(data).then(() => load(1));

  const handleUpdate = (
    id: string,
    data: Partial<Omit<BikeModel, "id">>,
  ) => updateBike(id, data);

  return (
    <>
      <BikesList
        onView={handleView}
        onEdit={setEditingBike}
        onAdd={() => setIsAddOpen(true)}
      />

      <AddBikeForm
        open={isAddOpen}
        onCancel={() => setIsAddOpen(false)}
        onCreate={handleCreate}
      />

      <EditBikeForm
        bike={editingBike}
        onCancel={() => setEditingBike(null)}
        onUpdate={handleUpdate}
      />

      <BikeDetails
        bike={selectedBike}
        onClose={() => setSelectedBike(null)}
      />
    </>
  );
};