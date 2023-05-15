import { Fragment, useEffect, useState } from "react";
import LandingImage from "../components/LandingImage/LandingImage";
import HeroImage2SRC from "../assets/hero2.png";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import "./ServicePages.scss";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { mockRoles, promptTextMock } from "../constants/promptMock";

const basePath = "";

const ServicePage = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("git") || ""
  );
  const [message, setMessage] = useState(promptTextMock);
  const navigate = useNavigate();
  const [radio, setRadio] = useState(null);

  const changeRadio = (ev) => {
    const value = ev.target.value;
    localStorage.setItem("role", value);
    processRadioValue(value);
  };

  const processRadioValue = (value) => {
    setRadio(value);
    const el = mockRoles.find((el) => el.role === value);
    setMessage(
      `act as a ${el.lead} of software development team and create onboarding document for ${el.role} according to this project`
    );
  };

  useEffect(() => {
    const initialRole = localStorage.getItem("role");
    if (initialRole) {
      processRadioValue(initialRole);
    }
  }, []);

  // const imitateLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate("/response");
  //   }, 3_000);
  // };

  const [isWaitingPromtResult, setIsWaitingPromtResult] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const downloadRepository = async () => {
    try {
      const response = await fetch(
        `${basePath}/downloadRepository?param=${inputValue}`
      );
      const data = await response.json();
    } catch (err) {
      console.log("download repo err:", err);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await downloadRepository();
      const response = await fetch(`${basePath}/processInput`, {
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
      console.log("Api error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromtResponse = async () => {
    const response = await fetch(`${basePath}/getPromtResult`, {
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
              <div className="flex">
                {mockRoles.map((el) => {
                  return (
                    <div
                      className="flex margin-right-l align-center"
                      key={el.role}
                    >
                      <label className="service-container-label margin-right-s">
                        {el.role}
                      </label>
                      <input
                        name="role"
                        type="radio"
                        value={el.role}
                        onChange={changeRadio}
                        checked={radio === el.role}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex margin-bottom-l justify-btw align-center">
              <label className="service-label margin-right-m">Github URL</label>
              <Input
                value={inputValue}
                setValue={setInputValue}
                className="service-input"
                placeholder="Place your github URL"
              />
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
