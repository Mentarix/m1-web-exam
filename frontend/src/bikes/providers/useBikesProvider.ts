import axios from "axios";
import { useState } from "react";
import type {
  BikeModel,
  CreateBikeModel,
  UpdateBikeModel,
} from "../models/BikeModel";

export const useBikesProvider = () => {
  const [bikes, setBikes] = useState<BikeModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const load = (pageNumber: number = 1) => {
    setIsLoading(true);

    return axios
      .get("http://localhost:3000/bikes", {
        params: { page: pageNumber, limit },
      })
      .then((result) => {
        setBikes(result.data.bikes);
        setTotalCount(result.data.totalCount);
        setPage(pageNumber);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getBikeById = (id: string) =>
    axios.get<BikeModel>(`http://localhost:3000/bikes/${id}`);

  const createBike = (input: CreateBikeModel) =>
    axios.post<BikeModel>("http://localhost:3000/bikes", input).then((result) => {
      setTotalCount((prev) => prev + 1);
      return result.data;
    });

  const updateBike = (id: string, input: UpdateBikeModel) =>
    axios.patch<BikeModel>(`http://localhost:3000/bikes/${id}`, input).then(
      (result) => {
        setBikes((prev) =>
          prev.map((bike) => (bike.id === id ? result.data : bike)),
        );
        return result.data;
      },
    );

  const deleteBike = (id: string) =>
    axios.delete(`http://localhost:3000/bikes/${id}`).then(() => {
      setBikes((prev) => prev.filter((bike) => bike.id !== id));
      setTotalCount((prev) => prev - 1);
    });

  return {
    bikes,
    load,
    isLoading,
    totalCount,
    page,
    limit,
    getBikeById,
    createBike,
    updateBike,
    deleteBike,
  };
};