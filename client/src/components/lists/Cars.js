import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";
import Car from "../listItems/Car";

const getStyles = () => ({
  list: {
    width: "70vw",
    display: "flex",
    justifyContent: "center",
  },
  item: {
    width: "68vw"
  }
});

const Cars = ({ personId }) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Filter cars by personId
  const carlist = data.cars.filter((car) => {
    return car.personId === personId;
  });

  console.log("data", data);

  return (
    <List
      grid={{ gutter: 20, column: 1 }}
      style={styles.list}
    >
      {carlist.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id} style={styles.item}>
          <Car
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
