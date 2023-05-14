import "./Loading.scss";

const Loading = () => {
  return (
    <div className="app-loading">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
      <div className="app-loading-text">Processing</div>
      <div className="app-loading-backdrop"></div>
    </div>
  );
};

export default Loading;
