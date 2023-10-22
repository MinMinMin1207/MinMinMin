import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./Post.module.scss";
import ProgressBar from "~/components/ProgressBar/ProgressBar";
import { useState } from "react";
import ChoseCategory from "../../components/Upload/ChooseCategory";
import FormUpload from "../../components/Upload/FormUpload";
import ConfirmForm from "../../components/Upload/ConfirmForm";

import axios from "axios";

const cx = classNames.bind(styles);

function Post() {
  const [steps, setSteps] = useState(1);
  const [id, setId] = useState(null); //Id category
  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [purpose, setPurpose] = useState();
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState();
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState("");

  const [typeProduct, setTypeProduct] = useState("");

  const handlePreviousClick = () => {
    updateSteps("prev");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const handleNextClick = () => {
    if (id) {
      if (id === "Cat" || id === "Dog") {
        setSpecies(id);
      }
      updateSteps("next");
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const updateSteps = (value) => {
    if (value === "prev") {
      if (steps === 2) {
        setSteps((prev) => prev - 1);
      }
      if (steps === 3) {
        setSteps((prev) => prev - 1);
      }
    } else {
      if (steps === 1) {
        setSteps((prev) => prev + 1);
      }
      if (steps === 2) {
        setSteps((prev) => prev + 1);
      }
    }
  };

  const handleUploadClick = async () => {
    let image = fileList[0];
    const formData = new FormData();
    formData.append("image", image);
    if (breed) {
      const res = await axios.post("http://localhost:3000/pets", {
        petName: title,
        species: species,
        breed: breed,
        petPrice: price,
        content: desc,
      });
      alert("Post successfully");
      if (res.data.code === 200) {
        console.log("Post successfully");
      }
    } else {
      formData.append("productName", title);
      formData.append("quantity", qty);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("description", desc);
      formData.append("typeOfPet", species);
      formData.append("typeOfProduct", typeProduct);
      const res = await axios.post("http://localhost:3000/products", formData);
      alert("Post successfully");
      if (res.data.code === 200) {
        console.log("Post successfully");
      }
    }
  };

  return (
    <div className={cx("post-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("post-hero")}>
        <h2 className={cx("heading")}>UPLOADING PRODUCT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>UploadProduct</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Progress bar */}
        <header className={cx("progress-bar")}>
          <ProgressBar steps={steps} />
        </header>
        {/* Form */}
        <div className={cx("form")}>
          {/* Chose category */}
          {steps === 1 && (
            <ChoseCategory
              id={id}
              setId={setId}
              handleNextClick={handleNextClick}
            />
          )}
          {steps === 2 && (
            <FormUpload
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
              handlePrevClick={handlePreviousClick}
              handleNextClick={handleNextClick}
              purpose={purpose}
              setPurpose={setPurpose}
              fileList={fileList}
              setFileList={setFileList}
            />
          )}

          {steps === 3 && (
            <ConfirmForm
              id={id}
              size={size}
              setSize={setSize}
              qty={qty}
              setQty={setQty}
              purpose={purpose}
              handlePrevClick={handlePreviousClick}
              handleUploadClick={handleUploadClick}
              species={species}
              setSpecies={setSpecies}
              breed={breed}
              setBreed={setBreed}
              age={age}
              setAge={setAge}
              price={price}
              setPrice={setPrice}
              typeProduct={typeProduct}
              setTypeProduct={setTypeProduct}
            />
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Post;
