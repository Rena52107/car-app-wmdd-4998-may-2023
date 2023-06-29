import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries";

import { DeleteOutlined } from "@ant-design/icons";
import filter from "lodash.filter";

const RemovePerson = ({ id, firstName, lastName }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          person: filter(people, (p) => {
            return p.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (result) {
      removePerson({
        variables: { id },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
