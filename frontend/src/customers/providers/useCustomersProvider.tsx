import axios from "axios";
import { useState } from "react";
import type {
  CreateCustomerModel,
  CustomerModel,
} from "../models/CustomerModel";

export const useCustomersProvider = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const load = (pageNumber: number = 1) => {
    setIsLoading(true);

    axios
      .get("http://localhost:3000/customers", {
        params: { page: pageNumber, limit },
      })
      .then((result) => {
        setCustomers(result.data.customers);
        setTotalCount(result.data.totalCount);
        setPage(pageNumber);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteCustomer = (id: string) => {
    axios.delete(`http://localhost:3000/customers/${id}`).then(() => {
      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== id),
      );
      setTotalCount((prev) => prev - 1);
    });
  };

  const createCustomer = (input: CreateCustomerModel) =>
    axios
      .post<CustomerModel>("http://localhost:3000/customers", input)
      .then((result) => {
        setCustomers((prev) =>
          [...prev, result.data].sort(
            (a, b) =>
              a.lastName.localeCompare(b.lastName) ||
              a.firstName.localeCompare(b.firstName),
          ),
        );
        setTotalCount((prev) => prev + 1);
      });

  return {
    customers,
    load,
    isLoading,
    deleteCustomer,
    createCustomer,
    totalCount,
    page,
    limit,
  };
};