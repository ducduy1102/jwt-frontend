import "../../App.scss";

const Home = () => {
  return (
    <div className="container">
      <h4>Home</h4>
      <title>
        Hướng dẫn tạo project SSIS SSAS đơn giản với SQL server và Visual Studio
        2022
      </title>
      <div className="mt-3 embed-container">
        <iframe
          width="935"
          height="526"
          src="https://www.youtube.com/embed/Vz8ttUSKpYo"
          title="Hướng dẫn tạo project SSIS SSAS đơn giản với SQL server và Visual Studio 2022"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
