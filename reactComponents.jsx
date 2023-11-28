// reactComponents.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import FrontCardIcon from "./images/card-logo.svg";
import ConfirmationIcon from "./images/icon-complete.svg";

function Form({ formData, onFormChange, onFormSubmit }) {
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="cardholderName">Cardholder Name</label>
      <input
        value={formData.name}
        onChange={(e) => onFormChange("name", e.target.value)}
        id="cardholderName"
        type="text"
        placeholder="e.g.Jane Appleseed"
        required
      />

      <label htmlFor="cardNumber">Card Number</label>
      <input
        value={formData.cardNumber}
        onChange={(e) => onFormChange("cardNumber", e.target.value)}
        pattern="[0-9]{16}"
        title="Must contains 16 numbers."
        id="cardNumber"
        inputMode="numeric"
        maxLength="16"
        placeholder="e.g. 1234 5678 9123 0000"
        required
      />

      <div>
        <label id="exp-date" htmlFor="expDate">
          Exp. date (mm/yy){" "}
        </label>
        <input
          value={formData.expDateM}
          onChange={(e) => onFormChange("expDateM", e.target.value)}
          id="exp-date-M"
          pattern="[0-9]{2}"
          inputMode="numeric"
          maxLength="2"
          placeholder="MM"
          required
        />
        <input
          value={formData.expDateY}
          onChange={(e) => onFormChange("expDateY", e.target.value)}
          id="exp-date-Y"
          pattern="[0-9]{2}"
          inputMode="numeric"
          maxLength="2"
          placeholder="YY"
          required
        />

        <label id="cvc-label" htmlFor="cvcNumber">
          CVC{" "}
        </label>
        <input
          value={formData.cvc}
          onChange={(e) => onFormChange("cvc", e.target.value)}
          id="cvc-number"
          pattern="[0-9]{3}"
          title="Must contain 3 numbers."
          inputMode="numeric"
          maxLength="3"
          placeholder="e.g. 123"
          required
        />
      </div>

      <button type="submit">Confirm</button>
    </form>
  );
}

function Confirmation({ onFormSubmit }) {
  return (
    <div class="confirmation">
      <img src={ConfirmationIcon} alt="" />
      <h1>Thank You!</h1>
      <p>We've added your card details</p>
      <button onClick={onFormSubmit}>Continue</button>
    </div>
  );
}

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    cvc: "",
    expDateM: "",
    expDateY: "",
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormSubmitted(!formSubmitted);
  }

  function handleFormChange(field, value) {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }

  return (
    <div className="container">
      <div className="cards">
        <div className="card card-front">
          <img src={FrontCardIcon} />
          <p className="card-number">
            {formData.cardNumber !== ""
              ? formData.cardNumber
              : "0000 0000 0000 0000"}
          </p>
          <p className="name">
            {formData.name !== "" ? formData.name : "Jane Appleseed"}
          </p>
          <p className="date">
            {formData.expDateM !== "" ? formData.expDateM : "00"}/
            {formData.expDateY !== "" ? formData.expDateY : "00"}
          </p>
        </div>

        <div className="card card-back">
          <p>{formData.cvc !== "" ? formData.cvc : "000"}</p>
        </div>
      </div>

      <section className="content">
        {formSubmitted ? (
          <Confirmation onFormSubmit={handleFormSubmit} />
        ) : (
          <Form
            formData={formData}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
          />
        )}

        <div class="attribution">
          {" "}
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://github.com/agaef5">Aga</a>.
        </div>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
