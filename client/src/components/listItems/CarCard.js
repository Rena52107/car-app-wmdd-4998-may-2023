import { Card } from "antd";

const CarCard = ({ car }) => {
  return (
    <Card
      title={car.make}
      style={{ width: 260 }}
    >
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
      <p>price: {car.price}</p>
    </Card>
  );
};

export default CarCard;
