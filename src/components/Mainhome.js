import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addApiAction,
  deleteApiAction,
  updateApiAction
} from "../redux/actions/apiActions";
import Navbar from "./Navbar";

const Mainhome = () => {
  const [show, setShow] = useState(0);
  const [route, setRoute] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [searchVal, setSearchVal] = useState("");

  const { posts } = useSelector((state) => state.apiReducer);
  const [filterVal, setFilterVal] = useState("");
  const filldata = posts.filter((item) => item.title.match(filterVal));

  const AddMore = () => {
    const dispatch = useDispatch();
    // const { posts } = useSelector((state) => state.apiReducer);
    const [inputData, setInputData] = useState("");
    //   const [newData, setNewData] = useState({});

    const AddNewData = (data) => {
      dispatch(addApiAction(data));
      // console.log(data);
    };

    return (
      <>
        <div className="cardAddMoreTextBody">
          <input
            type="text"
            name=""
            id=""
            placeholder="Add More"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              let idLen = Object.keys(posts).length + 1;
              AddNewData({ title: inputData, id: idLen });
              setInputData("");
              setShow(0);
              setRoute(0);
            }}
          >
            Add now
          </button>
        </div>
      </>
    );
  };

  const UpdateHome = (data) => {
    //   console.log(data.data.data, data.data.id,"  shaon");
    const [newSentData, setSentData] = useState(data.data.data);

    const dispatch = useDispatch();
    return (
      <>
        <div className="updateDataBody">
          <h4>Update your data now</h4>
          <input
            type="text"
            value={newSentData}
            onChange={(e) => setSentData(e.target.value)}
          />{" "}
          <br />
          <div className="updateButtonSec">
            <button
              onClick={() => {
                dispatch(
                  updateApiAction({ title: newSentData, id: data.data.id })
                );
                setShow(0);
                setRoute(0);
              }}
            >
              Update Now
            </button>
            <button
              className={show === 2 ? "active" : null}
              onClick={() => {
                handleShow(0);
                setRoute(0);
              }}
            >
              GO BACK
            </button>
          </div>
        </div>
      </>
    );
  };

  const AllData = () => {
    const dispatch = useDispatch();

    // console.log(posts.reverse());
    //   console.log(Array.isArray(posts));

    const DeletData = (id) => {
      const newData = posts.filter((item) => item.id !== id);
      dispatch(deleteApiAction(newData));
    };

    const handleCount = (data, id) => {
      handleShow(2);
      setRoute(2);
      setUpdateData({ data, id });
      //   dispatch(updateApiAction({data,id}))
    };

    // console.log(filldata);

    return (
      <>
        {!filterVal ? (
          <>
            {posts
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <>
                    <div className="cardTextBody" key={index}>
                      <p>{index + 1}</p>
                      <h4>{item.title} </h4>
                      <button onClick={() => DeletData(item.id)}>Delete</button>
                      <button
                        style={{ background: "#5e5eff" }}
                        onClick={() => handleCount(item.title, item.id)}
                      >
                        Update
                      </button>
                    </div>
                  </>
                );
              })}
          </>
        ) : (
          <>
            {filldata.map((item, index) => {
              return (
                <>
                  <div className="cardTextBody" key={index}>
                    <p>{index + 1}</p>
                    <h4>{item.title} </h4>
                    <button onClick={() => DeletData(item.id)}>Delete</button>
                    <button
                      style={{ background: "#5e5eff" }}
                      onClick={() => handleCount(item.title, item.id)}
                    >
                      Update
                    </button>
                  </div>
                </>
              );
            })}
          </>
        )}
      </>
    );
  };

  const handleShow = (data) => {
    setShow(data);
  };
  // const { posts } = useSelector((state) => state.apiReducer);

  return (
    <>
      <div className="mainHome">
        <Navbar />
        <div className="cardContainer">
          <div className="searchBox">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {!filterVal ? (
              <>
                <button
                  onClick={() => {
                    setFilterVal(searchVal);
                  }}
                >
                  Search
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ background: "red", color: "white" }}
                  onClick={() => {
                    setSearchVal("");
                    setFilterVal("");
                  }}
                >
                  Clear
                </button>
              </>
            )}
          </div>
          <div className="cardBody">
            <h3>Notifications {Object.keys(posts).length}</h3>
            <div className="routes">
              <span
                className={show === 0 ? "active" : null}
                onClick={() => {
                  handleShow(0);
                  setRoute(0);
                }}
              >
                All
              </span>
              <span
                className={show === 1 ? "active" : null}
                onClick={() => {
                  handleShow(1);
                  setRoute(1);
                }}
              >
                Add More
              </span>
            </div>

            <div className="cardText">
              {route === 0 ? (
                <AllData />
              ) : route === 1 ? (
                <AddMore />
              ) : (
                <UpdateHome data={updateData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainhome;
