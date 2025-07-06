import React, { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./RegistrationForm.module.css";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: File | null;
  bio: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  country?: string;
  hobbies?: string;
  profilePic?: string;
  bio?: string;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  dob: "",
  country: "",
  hobbies: [],
  profilePic: null,
  bio: "",
};

const countryOptions = [
  { value: "", label: "Select a country" },
  { value: "vn", label: "Vietnam" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

const hobbyOptions = [
  { value: "reading", label: "Reading" },
  { value: "traveling", label: "Traveling" },
  { value: "gaming", label: "Gaming" },
  { value: "sleeping", label: "Sleeping" },
  { value: "coding", label: "Coding" },
];

const RegistrationForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [bioCharsLeft, setBioCharsLeft] = useState(300);

  const validate = (vals: FormValues): FormErrors => {
    const errs: FormErrors = {};
    if (!vals.fullName || vals.fullName.trim().length < 3) {
      errs.fullName = "Full Name must be at least 3 characters.";
    }
    if (!vals.email || !/^\S+@\S+\.\S+$/.test(vals.email)) {
      errs.email = "Email must be a valid email format.";
    }
    if (
      !vals.password ||
      vals.password.length < 8 ||
      !/[A-Za-z]/.test(vals.password) ||
      !/\d/.test(vals.password)
    ) {
      errs.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    }
    if (vals.confirmPassword !== vals.password) {
      errs.confirmPassword = "Passwords must match.";
    }
    if (!vals.phone || !/^\d{10,}$/.test(vals.phone)) {
      errs.phone = "Phone Number must be at least 10 digits.";
    }
    if (!vals.gender) {
      errs.gender = "Please select a gender.";
    }
    if (!vals.dob) {
      errs.dob = "Date of Birth is required.";
    } else {
      const age = getAge(vals.dob);
      if (age < 18) {
        errs.dob = "User must be at least 18 years old.";
      }
    }
    if (!vals.country) {
      errs.country = "Please select a country.";
    }
    if (!vals.hobbies || vals.hobbies.length === 0) {
      errs.hobbies = "Please select at least one hobby.";
    }
    if (vals.profilePic) {
      const name = vals.profilePic.name.toLowerCase();
      if (
        !name.endsWith(".jpg") &&
        !name.endsWith(".jpeg") &&
        !name.endsWith(".png")
      ) {
        errs.profilePic =
          "Profile Picture must be a .jpg, .jpeg, or .png file.";
      }
    }
    if (vals.bio.length > 300) {
      errs.bio = "Bio cannot exceed 300 characters.";
    }
    return errs;
  };

  function getAge(dob: string) {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => {
        let hobbies = prev.hobbies;
        if (checked) {
          hobbies = [...hobbies, value];
        } else {
          hobbies = hobbies.filter((h) => h !== value);
        }
        return { ...prev, hobbies };
      });
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setValues((prev) => ({ ...prev, profilePic: file }));
    } else if (name === "bio") {
      setValues((prev) => ({ ...prev, bio: value }));
      setBioCharsLeft(300 - value.length);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      setValues(initialValues);
      setBioCharsLeft(300);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          className={errors.fullName ? styles.invalid : ""}
          autoComplete="off"
        />
        {errors.fullName && (
          <div className={styles.error}>{errors.fullName}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={errors.email ? styles.invalid : ""}
          autoComplete="off"
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={errors.password ? styles.invalid : ""}
          autoComplete="new-password"
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? styles.invalid : ""}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className={errors.phone ? styles.invalid : ""}
          autoComplete="off"
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
      </div>

      <div className={styles.formGroup}>
        <label>Gender *</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={values.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={values.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={values.gender === "other"}
              onChange={handleChange}
            />
            Gay
          </label>
        </div>
        {errors.gender && <div className={styles.error}>{errors.gender}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dob">Date of Birth *</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={values.dob}
          onChange={handleChange}
          className={errors.dob ? styles.invalid : ""}
        />
        {errors.dob && <div className={styles.error}>{errors.dob}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          value={values.country}
          onChange={handleChange}
          className={errors.country ? styles.invalid : ""}
        >
          {countryOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.value === ""}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {errors.country && <div className={styles.error}>{errors.country}</div>}
      </div>

      <div className={styles.formGroup}>
        <label>Hobbies *</label>
        <div className={styles.checkboxGroup}>
          {hobbyOptions.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                name="hobbies"
                value={opt.value}
                checked={values.hobbies.includes(opt.value)}
                onChange={handleChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.hobbies && <div className={styles.error}>{errors.hobbies}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
        />
        {errors.profilePic && (
          <div className={styles.error}>{errors.profilePic}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          maxLength={300}
          rows={4}
          value={values.bio}
          onChange={handleChange}
          className={errors.bio ? styles.invalid : ""}
        />
        <div className={styles.charCount}>
          {bioCharsLeft} characters remaining
        </div>
        {errors.bio && <div className={styles.error}>{errors.bio}</div>}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
