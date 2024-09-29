import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
import publisherBaseUrl from "../../api/publisherApi";
import bookBaseUrl from "../../api/bookApi";
import authorBaseUrl from "../../api/authorApi";
import borrowBaseUrl from "../../api/borrowApi";
const Author = () => {
  // State başı
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [author, setAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });
  const [updateAuthor, setUpdateAuthor] = useState({
    id: "",
    name: "",
    birthDate: "",
    country: "",
  });
  const [authors, setAuthors] = useState([]);
  const [authorListChange, setAuthorListChange] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [shotAuthorsBtnName, setShowAuthorsBtnName] =
    useState("Show All Authors");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });

    setUpdateAuthor({
      ...updateAuthor,
      [name]: value,
    });
  };

  const handleUpdateAuthor = (id, name, birthDate, country) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updatedAuthor = {
      name: name,
      birthDate: birthDate,
      country: country,
    };

    setAuthor(updatedAuthor);
    setUpdateAuthor({
      id: id,
      ...updatedAuthor,
    });
  };

  const handleUpdateSaveClick = () => {
    if (
      author.name === "" ||
      author.name === undefined ||
      author.birthDate === "" ||
      author.birthDate === undefined ||
      author.country === "" ||
      author.country === undefined
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
        .put(authorBaseUrl.baseUrl + "/" + updateAuthor.id, updateAuthor)
        .then((res) => {
          setErrorFlag(false);
          setAuthorListChange(true);
          setAuthor({
            name: "",
            birthDate: "",
            country: "",
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
        .finally(setAuthorListChange(false));
    }
  };

  const handleSaveAuthor = () => {
    if (
      author.name === "" ||
      author.name === undefined ||
      author.birthDate === "" ||
      author.birthDate === undefined ||
      author.country === "" ||
      author.country === undefined
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
        .post(authorBaseUrl.baseUrl, author)
        .then((res) => {
          setErrorFlag(false);
          setAuthorListChange(true);
          setAuthor({
            name: "",
            birthDate: "",
            country: "",
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
          }
        })
        .finally(setAuthorListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(authorBaseUrl.baseUrl).then((res) => {
      setAuthors(res.data);
    });
  }, [authorListChange]);

  const handeShowAuthors = () => {
    if (showAuthors) {
      setShowAuthorsBtnName("Show All Authors");
      return setShowAuthors(false);
    }
    setShowAuthorsBtnName("Hidden List");
    return setShowAuthors(true);
  };

  const handleDeleteAuthor = (id) => {
    console.log(id);
    axios
      .delete(authorBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setAuthorListChange(true);
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
      .finally(setAuthorListChange(false));
  };

  const handleCancelClick = () => {
    setAuthor({
      name: "",
      birthDate: "",
      country: "",
    });
    setUpdateButtonsVisible(false);
    setCreateButtonVisible(true);
  };

  return (
    <>
      <div className="main-container">
        <div className="general-form">
          <h3>{checkStats}</h3>
          <div className="form-input">
            <input
              name="name"
              placeholder="Author Name"
              required
              type="text"
              value={author.name}
              onChange={handleChange}
            />

            <input
              name="birthDate"
              placeholder="Author Birth Date"
              required
              type="date"
              value={author.birthDate}
              onChange={handleChange}
            />

            <input
              name="country"
              placeholder="Author Country"
              required
              type="text"
              value={author.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-btns-1">
            {createButtonVisible && (
              <button onClick={handleSaveAuthor}>Create Author</button>
            )}
            <button onClick={handeShowAuthors}>{shotAuthorsBtnName}</button>
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
            <div className="error-div">
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
        {showAuthors && (
          <div className="form-list-item">
            {authors.map((auhtor) => {
              return (
                <>
                  <div className="form-list">
                    <h3>Author Name: {auhtor.name}</h3>
                    <h3>Author Birthday: {auhtor.birthDate}</h3>
                    <h3>Author Country: {auhtor.country}</h3>
                    <button
                      onClick={(e) => {
                        handleDeleteAuthor(auhtor.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        handleUpdateAuthor(
                          auhtor.id,
                          auhtor.name,
                          auhtor.birthDate,
                          auhtor.country
                        );
                      }}
                    >
                      Update
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
export default Author;
