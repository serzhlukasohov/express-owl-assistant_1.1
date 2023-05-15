import Rating from "../components/Rating/Rating";
import ResponseWindow from "../components/ResponseWindow/ResponseWindow";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ResponsePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="page-padding">
      <ResponseWindow />
      <Rating />
      <div className="flex justify-center">
        <Link to="/service">
          <Button className="margin-right-l">Upload another Project</Button>
        </Link>
        <Link to="/service">
          <Button primary={false}>Same project, another role</Button>
        </Link>
      </div>
    </main>
  );
};

export default ResponsePage;
