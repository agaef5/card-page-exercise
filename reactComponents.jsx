// reactComponents.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";

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

      <label htmlFor="cardNumber">Cardh Number</label>
      <input
        value={formData.cardNumber}
        onChange={(e) => onFormChange("cardNumber", e.target.value)}
        pattern="[0-9]{16}"
        title="Must contains 16 numbers."
        id="cardNumber"
        type="number"
        placeholder="e.g. 1234 5678 9123 0000"
        required
      />

      <label htmlFor="expDate">Exp. date (mm/yy)</label>
      <input
        value={formData.expDateM}
        onChange={(e) => onFormChange("expDateM", e.target.value)}
        pattern="[0-9]{2}"
        type="number"
        placeholder="MM"
        required
      />
      <input
        value={formData.expDateY}
        onChange={(e) => onFormChange("expDateY", e.target.value)}
        pattern="[0-9]{2}"
        type="number"
        placeholder="YY"
        required
      />

      <label htmlFor="cvcNumber">CVC</label>
      <input
        value={formData.cvc}
        onChange={(e) => onFormChange("cvc", e.target.value)}
        pattern="[0-9]{3}"
        title="Must contains 3 numbers."
        type="number"
        placeholder="e.g. 123"
        required
      />

      <button type="submit">Confirm</button>
    </form>
  );
}

function Confirmation({ onFormSubmit }) {
  return (
    <section>
      <img src="" alt="" />
      <h1>Thank You!</h1>
      <p>We've added your card details</p>
      <button onClick={onFormSubmit}>Continue</button>
    </section>
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
    <>
      <div className="cards">
        <div className="card-front">
          <p>
            {formData.cardNumber !== ""
              ? formData.cardNumber
              : "0000 0000 0000 0000"}
          </p>
          <p>{formData.name !== "" ? formData.name : "Jane Appleseed"}</p>
          <p>
            {formData.expDateM !== "" ? formData.expDateM : "00"}/
            {formData.expDateY !== "" ? formData.expDateY : "00"}
          </p>
        </div>

        <div className="card-back">
          <p>{formData.cvc}</p>
        </div>
      </div>

      {formSubmitted ? (
        <Confirmation onFormSubmit={handleFormSubmit} />
      ) : (
        <Form
          formData={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
