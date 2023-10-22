// Import library
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import cookie from "js-cookie";

// Import component
import Wrapper from "~/components/Layout/Author/Wrapper";
import InputItem from "~/components/Layout/Author/InputItem";
import {
  register as ValidateRegister,
  registerRest as ValidateRegisterRest,
} from "~/components/Layout/Author/Validation/register";
import images from "~/assets/images";

// Import CSS
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");

  const [checkEmail, setCheckEmail] = useState(false);

  const listValue = ["Male", "Fmale", "Different"];

  const [error, setError] = useState({});

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        setCheckEmail(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    const form = {
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };
    const res = await axios.post("http://localhost:3000/users/register", {
      email: email,
      password: password,
    });
    alert("Plese Check your mail to register");
    if (res.data.code === 200) {
      console.log("Register successfully");
    }
    let err = ValidateRegister(form);
    setError(err);
  };

  const handleCreateAccount = () => {
    const form = {
      fullName: fullName.trim(),
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber.trim(),
      username: username.trim(),
      gender: gender.trim(),
    };
    let err = ValidateRegisterRest(form);
    setError(err);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("heading")}>Create Account</h1>
      <Wrapper className={cx("wrapper-form")}>
        <div className={cx("desc")}>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </div>
        {checkEmail === false && (
          <>
            {/* Input item email*/}
            <div className={cx("input-item")}>
              <InputItem
                type="text"
                title="Email address *"
                placeholder="Email address"
                value={email}
                setValue={setEmail}
              />
              {error.email && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.email}
                </p>
              )}
            </div>

            {/* Input item password */}
            <div className={cx("input-item")}>
              <InputItem
                type="password"
                title="Password *"
                placeholder="Password"
                value={password}
                setValue={setPasword}
              />
              {error.password && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.password}
                </p>
              )}
            </div>

            {/* Input item confirm password */}
            <div className={cx("input-item")}>
              <InputItem
                type="password"
                title="Confirm Password *"
                placeholder="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
              {error.confirmPassword && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.confirmPassword}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className={cx("footer")}>
              <div className={cx("submit")} onClick={handleSubmit}>
                Submit
              </div>
              <div className={cx("login-dif")}>
                <p className={cx("title")}>Or you can sign in with</p>
                <div className={cx("list-icon")}>
                  <a href="http://localhost:3000/auth/google">
                    <img src={images.googleIcon} alt="Login google" />
                  </a>
                  <img src={images.facebookIcon} alt="Login facebook" />
                </div>
              </div>
            </div>
          </>
        )}

        {checkEmail === true && (
          <>
            {/* Input item full name*/}
            <div className={cx("input-item")}>
              <InputItem
                type="text"
                title="Full Name *"
                placeholder="Full Name"
                value={fullName}
                setValue={setFullName}
              />
              {error.fullName && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.fullName}
                </p>
              )}
            </div>

            {/* Input item date of birth */}
            <div className={cx("input-item")}>
              <InputItem
                type="date"
                title="Date of Birth *"
                placeholder="Date of Birth"
                value={dateOfBirth}
                setValue={setDateOfBirth}
              />
              {error.dateOfBirth && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.dateOfBirth}
                </p>
              )}
            </div>

            {/* Input item confirm phone number */}
            <div className={cx("input-item")}>
              <InputItem
                type="text"
                title="Phone Number *"
                placeholder="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
              />
              {error.phoneNumber && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.phoneNumber}
                </p>
              )}
            </div>

            {/* Input item confirm username */}
            <div className={cx("input-item")}>
              <InputItem
                type="text"
                title="Username *"
                placeholder="Username"
                value={username}
                setValue={setUsername}
              />
              {error.username && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.username}
                </p>
              )}
            </div>

            {/* Input item confirm gender */}
            <div className={cx("input-item")}>
              <InputItem
                type="list"
                list="data"
                listValue={listValue}
                title="Gender *"
                placeholder="Gender"
                value={gender}
                setValue={setGender}
              />
              {error.gender && (
                <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
                  {error.gender}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className={cx("footer")}>
              <div className={cx("submit")} onClick={handleCreateAccount}>
                Create Account
              </div>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
}

export default Register;
