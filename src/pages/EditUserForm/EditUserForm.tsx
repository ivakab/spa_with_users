import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { updateUserById } from "src/redux/usersSlice";
import styles from "./EditUserForm.module.scss";
import { Button } from "src/components/Button";
import { UserDetails } from "src/redux/usersTypes";

interface IEditUserFormProps {
  userDetails: UserDetails;
  onClose: () => void;
}

export const EditUserForm = ({ userDetails, onClose }: IEditUserFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(userDetails);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.startsWith("company")) {
        return {
          ...prev,
          company: {
            ...prev.company,
            ["name"]: value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUserById({ id: userDetails.id, userData: formData })
      ).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Edit User</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className={styles.input}
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className={styles.input}
      />
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="Website"
        className={styles.input}
      />
      <input
        type="text"
        name="company"
        value={formData.company.name}
        onChange={handleInputChange}
        placeholder="Company"
        className={styles.input}
      />
      <div className={styles.buttons}>
        <Button type="submit" className={styles.saveButton}>
          Save
        </Button>
        <Button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
