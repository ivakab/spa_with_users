import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserDetailsPage.module.scss";
import { Loader } from "src/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchUserById } from "src/redux/usersSlice";
import { Button } from "src/components/Button";
import { Modal } from "src/components/Modal";
import { EditUserForm } from "../EditUserForm/EditUserForm";

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <Button onClick={() => navigate("/")}>Back to user list</Button>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>User not found.</p>
        <Button onClick={() => navigate("/")}>Back to user list</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button onClick={() => navigate("/")}>Back</Button>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </div>
      <h1 className={styles.detailsName}>{userDetails.name}</h1>
      <p>
        <strong>Username:</strong> {userDetails.username}
      </p>
      <p>
        <strong>Email:</strong> {userDetails.email}
      </p>
      <p>
        <strong>Phone:</strong> {userDetails.phone}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={`http://${userDetails.website}`}
          target="_blank"
          rel="noreferrer"
          className={styles.detailsLink}
        >
          {userDetails.website}
        </a>
      </p>
      <p>
        <strong>Company:</strong> {userDetails.company.name}
      </p>
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          {userDetails && (
            <EditUserForm
              userDetails={userDetails}
              onClose={() => setIsEditing(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
