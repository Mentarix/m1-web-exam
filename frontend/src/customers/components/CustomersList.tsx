import { Button, Skeleton, Space, Typography } from "antd";
import { useEffect } from "react";
import { useCustomersProvider } from "../providers/useCustomersProvider";
import { AddCustomerButton } from "./AddCustomerButton";
import { CustomerListItem } from "./CustomerListItem";

export const CustomersList = () => {
  const {
    customers,
    deleteCustomer,
    createCustomer,
    isLoading,
    load,
    totalCount,
    page,
    limit,
  } = useCustomersProvider();

  useEffect(() => {
    load(1);
  }, []);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Space orientation="vertical" style={{ padding: ".25rem .5rem", width: "100%" }}>
      <AddCustomerButton createCustomer={createCustomer} />

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              customer={customer}
              deleteCustomer={deleteCustomer}
            />
          ))}

          <Space style={{ marginTop: 16 }}>
            <Button
              disabled={page <= 1 || isLoading}
              onClick={() => load(page - 1)}
            >
              Previous
            </Button>

            <Typography.Text>
              Page {page} of {totalPages}
            </Typography.Text>

            <Button
              disabled={page >= totalPages || isLoading}
              onClick={() => load(page + 1)}
            >
              Next
            </Button>
          </Space>

          <Typography.Text type="secondary">
            Total customers: {totalCount}
          </Typography.Text>
        </>
      )}
    </Space>
  );
};