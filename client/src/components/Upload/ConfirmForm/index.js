import Wrapper from "~/components/Upload/Wrapper";
import classNames from "classnames/bind";
import styles from "./ConfirmForm.module.scss";
import InputItem from "~/components/Layout/Author/InputItem";
import DropDownMenu from "~/components/DropDown";

const cx = classNames.bind(styles);

const SPECIES = [
  {
    value: "Cat",
    title: "CAT",
  },
  {
    value: "Dog",
    title: "DOG",
  },
];

const TYPE_PRODUCT = [
  {
    value: "toy",
    title: "Toy",
  },
  {
    value: "food",
    title: "Food",
  },
  {
    value: "others",
    title: "Others",
  },
];

function ConfirmForm({
  id,
  qty,
  setQty,
  size,
  setSize,
  purpose,
  handlePrevClick,
  handleUploadClick,
  species,
  setSpecies,
  breed,
  setBreed,
  age,
  setAge,
  price,
  setPrice,
  typeProduct,
  setTypeProduct,
}) {
  return (
    <Wrapper className={cx("confirm-wrapper")}>
      <div className={cx("form-wrapper")}>
        <h1 className={cx("heading")}>Confirm information</h1>
        <div className={cx("form")}>
          <h2 className={cx("title")}>Pet Details</h2>
          {/* Input Item */}
          {id !== "Stuff" && (
            <InputItem
              title="Species *"
              placeholder=""
              className={cx("input-item")}
              value={species}
              setValue={setSpecies}
              readonly="readonly"
            />
          )}

          {/* Input Item */}
          <DropDownMenu
            title="Species *"
            ListValue={SPECIES}
            value={species}
            setValue={setSpecies}
            className={cx("input-item", "input-desc")}
          />

          {/* Input Item */}
          <DropDownMenu
            title="Type of product *"
            ListValue={TYPE_PRODUCT}
            value={typeProduct}
            setValue={setTypeProduct}
            className={cx("input-item", "input-desc")}
          />
          {/* Input Item */}
          {id !== "Stuff" && (
            <InputItem
              title="Breed *"
              placeholder="Breed"
              className={cx("input-item")}
              value={breed}
              setValue={setBreed}
            />
          )}
          {/* Input Item */}
          <div className={cx("row")}>
            {id !== "Stuff" && (
              <InputItem
                title="Age *"
                placeholder="Age"
                className={cx("input-item")}
                value={age}
                setValue={setAge}
              />
            )}
            {purpose !== "Gift" && (
              <InputItem
                title="Price *"
                placeholder="Price"
                className={cx("input-item")}
                value={price}
                setValue={setPrice}
              />
            )}

            {id === "Stuff" && (
              <InputItem
                title="Size *"
                placeholder="Size"
                className={cx("input-item")}
                value={size}
                setValue={setSize}
              />
            )}

            {id === "Stuff" && (
              <InputItem
                title="Qty *"
                placeholder="Quantity"
                className={cx("input-item")}
                value={qty}
                setValue={setQty}
              />
            )}
          </div>
          {purpose === "Gift" && (
            <p className={cx("desc-price")}>
              Price has been set to $0 because as your post's intention is to
              offer it as a gift.
            </p>
          )}
        </div>
      </div>
      {/* Action */}
      <div className={cx("list-action")}>
        <div className={cx("action")} onClick={handlePrevClick}>
          BACK
        </div>
        <div className={cx("action", "active")} onClick={handleUploadClick}>
          UPLOAD
        </div>
      </div>
    </Wrapper>
  );
}

export default ConfirmForm;
