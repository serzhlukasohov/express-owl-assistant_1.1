import "./OurSolution.scss";

import { ourSolutionMock } from "../../constants/ourSolution.mock";
import Image from "../Image/Image";

const OurSolution = () => {
  return (
    <div className="flex flex-col our-solution align-center">
      <h1 className="our-sol-heading">{ourSolutionMock.heading}</h1>
      <h2 className="our-sol-subtitle">{ourSolutionMock.subtitle}</h2>
      <div className="flex justify-btw">
        {ourSolutionMock.icons.map((el) => {
          return (
            <div
              key={el.iconDescription}
              className="flex flex-col align-center margin-right-l"
            >
              <Image src={el.iconURL} className="our-sol-icon" />
              <p className="our-sol-icon-description">{el.iconDescription}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurSolution;
