const getStyles = () => ({
  title: {
    padding: "15px",
    textTransform: "uppercase",
  },
});

const Title = () => {
  const styles = getStyles();
  return <h1 style={styles.title}>People and their cars</h1>;
};

export default Title;
