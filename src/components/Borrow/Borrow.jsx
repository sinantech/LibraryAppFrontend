import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
import publisherBaseUrl from "../../api/publisherApi";
import bookBaseUrl from "../../api/bookApi";
import authorBaseUrl from "../../api/authorApi";
import borrowBaseUrl from "../../api/borrowApi";

const Borrow = () => {
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [borrow, setBorrow] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    bookForBorrowingRequest: {
      id: "",
      name: "",
    },
  });
  const [updateBorrow, setUpdateBorrow] = useState({
    id: "",
    borrowerName: "",
    borrowingDate: "",
    returnDate: "",
  });
  const [borrows, setBorrows] = useState([]);
  const [book, setBooks] = useState([]);
  const [borrowListChange, setBorrowListChange] = useState(false);
  const [showBorrows, setShowBorrows] = useState(false);
  const [showBorrowBtnName, setShowBorrowBtnName] = useState("Show All Borrow");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);
  const [showUpdateReturnDate, setShowUpdateReturnDate] = useState(false);
  const [hiddenOtherInputs, setHiddenOtherInputs] = useState(true);
  const [hiddenSelectedBook, setHiddenSelectedBook] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrow({
      ...borrow,
      [name]: value,
    });

    setUpdateBorrow({
      ...updateBorrow,
      [name]: value,
    });
  };

  const handleUpdateBorrower = (
    id,
    borrowerName,
    borrowingDate,
    returnDate
  ) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);

    const updateBorrowData = {
      id: id,
      borrowerName: borrowerName,
      borrowingDate: borrowingDate,
      returnDate: returnDate,
    };

    setUpdateBorrow(updateBorrowData);
    setBorrow(updateBorrowData);
  };

  const handleUpdateSaveClick = () => {
    if (borrow.returnDate === "" || updateBorrow.returnDate === undefined) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = [];
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .put(borrowBaseUrl.baseUrl + "/" + updateBorrow.id, updateBorrow)
        .then((res) => {
          setErrorFlag(false);
          setBorrowListChange(true);
          setBorrow({
            borrowerName: "",
            borrowerMail: "",
            borrowingDate: "",
          });
          setUpdateBorrow({
            returnDate: "",
          });

          setCheckStats("Updated");
          function clearStats() {
            setTimeout(() => {
              setCheckStats("");
            }, 2000);
          }
          clearStats();
        })
        .catch((e) => {
          console.log(e);
          if (e.code === "ERR_NETWORK") {
            const err = ["Server Down"];
            setError(err);
          } else {
            setError(["Bad Request"]);
          }
        })
        .finally(setBorrowListChange(false));
    }
  };

  const handleSaveBook = () => {
    console.log(borrow.bookForBorrowingRequest.id);
    if (
      borrow.borrowerName === "" ||
      borrow.borrowerName === undefined ||
      borrow.borrowerMail === "" ||
      borrow.borrowerMail === undefined
    ) {
      const emptyFieldErros = ["Empty Field"];
      const clearMsg = () =>
        setTimeout(() => {
          const clearError = [];
          setError(clearError);
          setErrorFlag(false);
        }, 2000);
      setError(emptyFieldErros);
      clearMsg();
    } else {
      axios
        .post(borrowBaseUrl.baseUrl, borrow)
        .then((res) => {
          setErrorFlag(false);
          setBorrowListChange(true);
          setBorrow({
            borrowerName: "",
            borrowerMail: "",
            borrowingDate: "",
            bookForBorrowingRequest: { id: "" },
          });
          setCheckStats("Created");
          function clearStats() {
            setTimeout(() => {
              setCheckStats("");
            }, 2000);
          }
          clearStats();
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK") {
            const err = ["Server Down"];
            setError(err);
          } else {
            const err = ["Bad Request. Contact a developer."];
            setError(err);
            console.log(e);
          }
        })
        .finally(setBorrowListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(borrowBaseUrl.baseUrl).then((res) => {
      setBorrows(res.data);
    });
  }, [borrowListChange]);

  const handleShowBorrower = () => {
    if (showBorrows) {
      setShowBorrowBtnName("Show All Category");
      return setShowBorrows(false);
    }
    setShowBorrowBtnName("Hidden List");
    return setShowBorrows(true);
  };

  const handleDeleteBorrower = (id) => {
    console.log(id);
    axios
      .delete(borrowBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setBorrowListChange(true);
        setCheckStats("Deleted");
        function clearStats() {
          setTimeout(() => {
            setCheckStats("");
          }, 2000);
        }
        clearStats();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(setBorrowListChange(false));
  };

  const handleCancelClick = () => {
    setBorrow({
      borrowerName: "",
      borrowerMail: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
    setShowUpdateReturnDate(false);
    setHiddenOtherInputs(true);
    setHiddenSelectedBook(true);
  };

  useEffect(() => {
    axios.get(bookBaseUrl.baseUrl).then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="general-form">
          <h3>{checkStats}</h3>
          <div className="form-input">
            {showUpdateReturnDate && (
              <div>
                <label>
                  Return Date
                  <input
                    value={updateBorrow.returnDate}
                    name="returnDate"
                    onChange={handleChange}
                    type="date"
                  />
                </label>
              </div>
            )}

            {hiddenOtherInputs && (
              <>
                <input
                  name="borrowerName"
                  placeholder="Borrower Name"
                  required
                  type="text"
                  value={borrow.borrowerName}
                  onChange={handleChange}
                />

                <input
                  name="borrowingDate"
                  placeholder="Borrower Date"
                  required
                  type="date"
                  value={borrow.borrowingDate}
                  onChange={handleChange}
                />

                {hiddenSelectedBook && (
                  <input
                    name="borrowerMail"
                    placeholder="Borrower Mail"
                    required
                    type="email"
                    value={borrow.borrowerMail}
                    onChange={handleChange}
                  />
                )}
                {hiddenSelectedBook && (
                  <select
                    name="bookForBorrowingRequest"
                    onChange={(e) =>
                      setBorrow({
                        ...borrow,
                        bookForBorrowingRequest: { id: e.target.value },
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      Select Book
                    </option>
                    {book?.map((e) => {
                      return (
                        <>
                          <option value={e.id}>{e.name}</option>
                        </>
                      );
                    })}
                  </select>
                )}
              </>
            )}
          </div>
          <div className="form-btns-1">
            {createButtonVisible && (
              <button onClick={handleSaveBook}>Create Borrower</button>
            )}
            <button onClick={handleShowBorrower}>{showBorrowBtnName}</button>
          </div>
          {updateButtonsVisible && (
            <>
              <div className="form-btns">
                <button onClick={handleUpdateSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </>
          )}

          {errorFlag && (
            <div>
              {errorFlag &&
                errorMsg.map((e) => {
                  return (
                    <>
                      <h1>{e}</h1>
                    </>
                  );
                })}
            </div>
          )}
        </div>
        {showBorrows && (
          <div className="form-list-item">
            {borrows.map((borrow) => {
              return (
                <>
                  <div className="form-list">
                    <h3>Name: {borrow.borrowerName}</h3>
                    <h3>Mail: {borrow.borrowerMail}</h3>
                    <h3>Borrow Date: {borrow.borrowingDate}</h3>
                    <h3>Book: {borrow.book.name}</h3>
                    <h3>
                      Return Date :{" "}
                      {borrow.returnDate ? borrow.returnDate : "Not brought"}
                    </h3>
                    <button
                      onClick={(e) => {
                        handleDeleteBorrower(borrow.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        setShowUpdateReturnDate(true);
                        setHiddenOtherInputs(false);
                        handleUpdateBorrower(
                          borrow.id,
                          borrow.borrowerName,
                          borrow.borrowingDate,
                          borrow.returnDate
                        );
                      }}
                    >
                      Update For Return Date
                    </button>

                    <button
                      onClick={(e) => {
                        setShowUpdateReturnDate(false);
                        setHiddenOtherInputs(true);
                        setHiddenSelectedBook(false);
                        handleUpdateBorrower(
                          borrow.id,
                          borrow.borrowerName,
                          borrow.borrowingDate,
                          borrow.returnDate
                        );
                      }}
                    >
                      Update Borrower
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default Borrow;
