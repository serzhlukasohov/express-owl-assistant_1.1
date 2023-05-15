import "./Loading.scss";
import Owl1SRC from "../../assets/owl-icons/1.png";
import Owl2SRC from "../../assets/owl-icons/2.png";
import Owl3SRC from "../../assets/owl-icons/3.png";
import Owl4SRC from "../../assets/owl-icons/4.png";
import Owl5SRC from "../../assets/owl-icons/5.png";
import { useEffect, useRef, useState } from "react";
import Image from "../Image/Image";

const content = [
  {
    imageUrl: Owl1SRC,
    text: "Only 36% of software projects are considered successful, while approximately 19% are deemed failures. (Standish Group)",
  },
  {
    imageUrl: Owl2SRC,
    text: "Pair programming can result in a 15% productivity improvement compared to solo programming. (University of Cambridge)",
  },
  {
    imageUrl: Owl3SRC,
    text: "88% of organizations practicing Agile methodologies report improved productivity. (State of Agile Report)",
  },
  {
    imageUrl: Owl4SRC,
    text: "Developers spend around 17.5 hours per week waiting for code to compile or tests to run. (GitLab)",
  },
  {
    imageUrl: Owl5SRC,
    text: "Interruptions during software development tasks can lead to a 10-15 minute loss of productivity. (Microsoft)",
  },
];

const Loading = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentIdx((prev) => {
        if (prev + 1 > content.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 7_000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="app-loading">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
      <div className="app-loading-text">Processing</div>

      <div className="app-loading-hints flex align-center">
        <Image
          src={content[currentIdx].imageUrl}
          className="app-loading-hints-img margin-right-m"
        />
        <p>{content[currentIdx].text}</p>
      </div>
      <div className="app-loading-backdrop"></div>
    </div>
  );
};

export default Loading;
