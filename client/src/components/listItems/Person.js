import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import Cars from "../lists/Cars";
import { Link } from "react-router-dom";

const Person = (props) => {
  const { id, firstName, lastName } = props;
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
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
          title={`${firstName}  ${lastName}`}
        >
          <Cars personId={id} />
          <Link to={`/people/${id}`}>Show more</Link>
        </Card>
      )}
    </>
  );
};

export default Person;
