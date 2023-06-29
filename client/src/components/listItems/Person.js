import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";


const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Person = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(true);
  };

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              key="edit"
              onClick={handleButtonClick}
            />,
            <RemovePerson
              id={id}
              firstName={firstName}
              lastName={lastName}
            />,
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </>
  );
};

export default Person;
