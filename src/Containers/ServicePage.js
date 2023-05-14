import { Fragment, useEffect, useState } from "react";
import LandingImage from "../components/LandingImage/LandingImage";
import HeroImage2SRC from "../assets/hero2.png";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import "./ServicePages.scss";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(
    "https://github.com/S-Solo/todo-sample"
  );
  const [message, setMessage] = useState(
    "act as a tech lead of software development team and create onboarding document for front-end developer according to this project"
  );
  const navigate = useNavigate();

  // const imitateLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate("/response");
  //   }, 3_000);
  // };

  const [isWaitingPromtResult, setIsWaitingPromtResult] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const onDownloadRepository = async () => {
    const response = await fetch(
      `Api.owlassist.me/downloadRepository?param=${inputValue}`
    );
    const data = await response.json();
    console.log("Data:", data);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onDownloadRepository();
      const response = await fetch("Api.owlassist.me/processInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: message || "What is the purposes of the project?",
          gitName: inputValue,
        }),
      });

      const data = await response.json();

      console.log(
        "Response:",
        JSON.parse(data.response).choices[0].message.content
      );
      localStorage.setItem(
        "gpt-response",
        JSON.parse(data.response).choices[0].message.content
      );
      setIsWaitingPromtResult(true);
      navigate("/response");
    } catch (err) {
      console.log("Api error");
    } finally {
      setLoading(false);
    }
  };

  const handlePromtResponse = async () => {
    const response = await fetch(`Api.owlassist.me/getPromtResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ git: inputValue, prompt: message }),
    });
    const data = await response.json();
    console.log("Data:", data);

    if (data.success) {
      setIsWaitingPromtResult(false);
    }
  };

  useEffect(() => {
    if (isWaitingPromtResult) {
      const id = setInterval(handlePromtResponse, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isWaitingPromtResult]);

  return (
    <Fragment>
      <LandingImage imageSrc={HeroImage2SRC}>
        <Fragment>
          <div className="hero-text-container flex flex-col align-center">
            <h1 className="hero-image-text">Onboarding Assistant</h1>
            <div className="service-container">
              <div className="flex margin-bottom-l justify-btw w-100 align-center">
                <label className="service-label margin-right-m">
                  Github URL
                </label>
                <Input
                  value={inputValue}
                  setValue={setInputValue}
                  className="service-input"
                />
              </div>
              {/* <div className="flex justify-btw w-100">
                <label className="service-label margin-right-m">Prompt</label>
                <Input
                  value={message}
                  setValue={setMessage}
                  className="service-input"
                />
              </div> */}
            </div>
            <Button onClick={handleSubmit}>Get Onboarding Plan</Button>
          </div>
        </Fragment>
      </LandingImage>
      {loading && <Loading />}
    </Fragment>
  );
};

export default ServicePage;
