import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PERSONWITHCARS } from "../queries";
import CarCard from "../components/listItems/CarCard";
import { Col, Row, Space } from "antd";

const Showmore = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PERSONWITHCARS, {
    variables: { id: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const response = data.personWithcars;

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex" }}
    >
      <h1>
        {response.firstName} {response.lastName}{" "}
      </h1>
      <Row gutter={16}>
        {response.cars.map((car, index) => (
          <Col span={8}>
            <CarCard
              key={index}
              car={car}
            />
          </Col>
        ))}
      </Row>

      <Link to="/">Back to Home</Link>
    </Space>
  );
};

export default Showmore;
