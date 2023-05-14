import Rating from "../components/Rating/Rating";
import ResponseWindow from "../components/ResponseWindow/ResponseWindow";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";

const ResponsePage = () => {
  return (
    <main className="page-padding">
      <ResponseWindow />
      <Rating />
      <div className="flex justify-center">
        <Link to="/service">
          <Button className="margin-right-l">Upload another Project</Button>
        </Link>
        <Button primary={false}>Same project, another service</Button>
      </div>
    </main>
  );
};

export default ResponsePage;
