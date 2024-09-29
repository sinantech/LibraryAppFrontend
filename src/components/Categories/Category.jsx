import { useEffect, useState } from "react";
import axios from "axios";
import categoryBaseUrl from "../../api/categoryApi";
const Category = () => {
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [updateCategory, setUpdateCategory] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [categoryListChange, setCategoryListChange] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoryBtnName, setShowCategoryBtnName] =
    useState("Show All Category");
  const [checkStats, setCheckStats] = useState("");
  const [createButtonVisible, setCreateButtonVisible] = useState(true);
  const [updateButtonsVisible, setUpdateButtonsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });

    setUpdateCategory({
      ...updateCategory,
      [name]: value,
    });
  };

  const handleUpdateCategory = (id, name, description) => {
    setCreateButtonVisible(false);
    setUpdateButtonsVisible(true);
    const updateCategory = {
      name: name,
      description: description,
    };

    setCategory(updateCategory);
    setUpdateCategory({
      id: id,
      ...updateCategory,
    });
  };

  const handleUpdateSaveClick = () => {
    if (
      category.name === "" ||
      category.name === undefined ||
      category.description === "" ||
      category.description === undefined
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
        .put(categoryBaseUrl.baseUrl + "/" + updateCategory.id, updateCategory)
        .then((res) => {
          setErrorFlag(false);
          setCategoryListChange(true);
          setCategory({
            name: "",
            description: "",
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
        .finally(setCategoryListChange(false));
    }
  };

  const handleSaveCategory = () => {
    if (
      category.name === "" ||
      category.name === undefined ||
      category.description === "" ||
      category.description === undefined
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
        .post(categoryBaseUrl.baseUrl, category)
        .then((res) => {
          setErrorFlag(false);
          setCategoryListChange(true);
          setCategory({
            name: "",
            description: "",
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
        .finally(setCategoryListChange(false));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      setErrorMsg(error);
      setErrorFlag(true);
    }
  }, [error]);

  useEffect(() => {
    axios.get(categoryBaseUrl.baseUrl).then((res) => {
      setCategories(res.data);
    });
  }, [categoryListChange]);

  const handleShowCategory = () => {
    if (showCategories) {
      setShowCategoryBtnName("Show All Category");
      return setShowCategories(false);
    }
    setShowCategoryBtnName("Hidden List");
    return setShowCategories(true);
  };

  const handleDeleteCategory = (id) => {
    console.log(id);
    axios
      .delete(categoryBaseUrl.baseUrl + "/" + id)
      .then((res) => {
        setCategoryListChange(true);
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
      .finally(setCategoryListChange(false));
  };

  const handleCancelClick = () => {
    setCategory({
      name: "",
      description: "",
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
              placeholder="Category Name"
              required
              type="text"
              value={category.name}
              onChange={handleChange}
            />

            <input
              name="description"
              placeholder="Category Description"
              required
              type="text"
              value={category.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-btns-1">
            {createButtonVisible && (
              <button onClick={handleSaveCategory}>Create Category</button>
            )}
            <button onClick={handleShowCategory}>{showCategoryBtnName}</button>
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
        {showCategories && (
          <div className="form-list-item">
            {categories.map((category) => {
              return (
                <>
                  <div className="form-list">
                    <h3>Category Name: {category.name}</h3>
                    <h3>Category Description: {category.description}</h3>
                    <button
                      onClick={(e) => {
                        handleDeleteCategory(category.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        handleUpdateCategory(
                          category.id,
                          category.name,
                          category.description
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
export default Category;
