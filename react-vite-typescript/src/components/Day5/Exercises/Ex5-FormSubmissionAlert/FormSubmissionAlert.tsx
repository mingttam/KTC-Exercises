import { useState } from "react";

const FormSubmissionAlert = () => {
  const [formData, setFormData] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const handleSubmit = () => {
    alert(formData);
    setFormData("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <input type="text" value={formData} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormSubmissionAlert;
