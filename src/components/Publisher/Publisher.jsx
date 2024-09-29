import { useEffect, useState } from "react";
import axios from "axios";

import publisherBaseUrl from "../../api/publisherApi";

const Publisher = () => {
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [publisher, setPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [updatePublisher, setUpdatePublisher] = useState({
    id: "",
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [publishers, setPublishers] = useState([]);
  const [publisherListChange, setPublisherListChange] = useState(false);
  const [showPublishers, setShowPublishers] = useState(false);
  const [showPublishersBtnName, setShowPublishersBtnName] =
    useState("Show All Publisher");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublisher({
      ...publisher,
      [name]: value,
    });

    setUpdatePublisher({
      ...updatePublisher,
      [name]: value,
    });
  };

  const handleUpdatePublisher = (id, name, establishmentYear, address) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updatePublisher = {
      name: name,
      establishmentYear: establishmentYear,
      address: address,
    };

    setPublisher(updatePublisher);
    setUpdatePublisher({
      id: id,
      ...updatePublisher,
    });
  };

  const handleUpdateSaveClick = () => {
    if (
      publisher.name === "" ||
      publisher.name === undefined ||
      publisher.establishmentYear === "" ||
      publisher.establishmentYear === undefined ||
      publisher.address === "" ||
      publisher.address === undefined
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
        .put(
          publisherBaseUrl.baseUrl + "/" + updatePublisher.id,
          updatePublisher
        )
        .then((res) => {
          setErrorFlag(false);
          setPublisherListChange(true);
          setPublisher({
            name: "",
            establishmentYear: "",
            address: "",
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
        .finally(setPublisherListChange(false));
    }
  };

  const handleSavePublisher = () => {
    if (
      publisher.name === "" ||
      publisher.name === undefined ||
      publisher.establishmentYear === "" ||
      publisher.establishmentYear === undefined ||
      publisher.address === "" ||
      publisher.address === undefined
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
        .post(publisherBaseUrl.baseUrl, publisher)
        .then((res) => {
          setErrorFlag(false);
          setPublisherListChange(true);
          setPublisher({
            name: "",
            establishmentYear: "",
            address: "",
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
        .finally(setPublisherListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(publisherBaseUrl.baseUrl).then((res) => {
      setPublishers(res.data);
    });
  }, [publisherListChange]);

  const handleShowPublisher = () => {
    if (showPublishers) {
      setShowPublishersBtnName("Show All Publisher");
      return setShowPublishers(false);
    }
    setShowPublishersBtnName("Hidden List");
    return setShowPublishers(true);
  };

  const handleDeletePublisher = (id) => {
    console.log(id);
    axios
      .delete(publisherBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setPublisherListChange(true);
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
      .finally(setPublisherListChange(false));
  };

  const handleCancelClick = () => {
    setPublisher({
      name: "",
      establishmentYear: "",
      address: "",
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
              placeholder="Publisher Name"
              required
              type="text"
              value={publisher.name}
              onChange={handleChange}
            />

            <input
              name="establishmentYear"
              placeholder="Establishment Year"
              required
              type="number"
              min={1900}
              max={2024}
              value={publisher.establishmentYear}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Publisher Address"
              required
              type="text"
              value={publisher.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-btns-1">
            {createButtonVisible && (
              <button onClick={handleSavePublisher}>Create Publisher</button>
            )}
            <button onClick={handleShowPublisher}>
              {showPublishersBtnName}
            </button>
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
        {showPublishers && (
          <div className="form-list-item">
            {publishers.map((publisher) => {
              return (
                <>
                  <div className="form-list">
                    <h3>Publisher Name: {publisher.name}</h3>
                    <h3>
                      Publisher Establishment Year:{" "}
                      {publisher.establishmentYear}
                    </h3>
                    <h3>Publisher Address: {publisher.address}</h3>
                    <button
                      onClick={(e) => {
                        handleDeletePublisher(publisher.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        handleUpdatePublisher(
                          publisher.id,
                          publisher.name,
                          publisher.establishmentYear,
                          publisher.address
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
export default Publisher;
