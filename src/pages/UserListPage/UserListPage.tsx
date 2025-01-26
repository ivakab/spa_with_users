import { useState, useEffect, useMemo } from "react";
import styles from "./UserListPage.module.scss";
import { Loader } from "src/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchUsers } from "src/redux/usersSlice";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.userList}>
        {currentUsers.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            className={styles.userItem}
          >
            <p className={styles.userName}>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        {totalPages ? (
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
        ) : null}
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaChevronLeft />
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};
