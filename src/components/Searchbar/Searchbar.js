import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Searchbar.module.css";

export default function Searchbar({onSubmit}) {
  const [value, setValue] = useState("");

  const handleTextChange = (event) => {
    setValue(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim() === "") {
      return toast.warning("Please, enter a request");
    }

    onSubmit(value);
    setValue("");
  }


  return (
  <header className={styles.searchbar}>
  <form className={styles.searchForm} onSubmit={handleSubmit}>
    <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
    </button>

    <input
      className={styles.searchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleTextChange}
      value={value}
    />
  </form>
</header>
  )
}