import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_PEOPLE, GET_CARS } from "../../queries";

const AddCar = () => {
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({});
  }, []);

  // Retrieve people info for options
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const id = uuidv4();
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        console.log("AddCar.js: ", data);
        cache.writeQuery({
          query: GET_CARS,
          data: { ...data, cars: [...data.cars, addCar] },
        });

        form.resetFields();
      },
    });
  };

  return (
    <Form
      form={form}
      name="add-car-form"
      layout="inline"
      onFinish={onFinish}
      style={{ margin: "40px 0", justifyContent: "space-evenly" }}
    >
      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Please input year of car manufacture!" },
        ]}
        label="Year"
      >
        <Input placeholder="i.e. 1997" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input make of the car!" }]}
        label="Make"
      >
        <Input placeholder="i.e. Toyota" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input model of the car!" }]}
        label="Model"
      >
        <Input placeholder="i.e. Lexus" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input price of the car!" }]}
        label="Price"
      >
        <Input placeholder="i.e. 65000" />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please choose an owner!" }]}
        label="Owner"
      >
        <Select
          showSearch
          placeholder="Select a person"
          options={data.people.map((person) => ({
            value: person.id,
            label: `${person.firstName} ${person.lastName}`,
          }))}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
