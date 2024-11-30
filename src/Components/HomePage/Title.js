import Container from "react-bootstrap/Container";
import "./Title.scss";

function Title({ title }) {
  return (
    <Container>
      <h1 className="headerOfProducts">{title}</h1>
    </Container>
  );
}

export default Title;
