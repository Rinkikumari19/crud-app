import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { Dialog } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FormDataRaducer from "../Store/FormDataReducer";
import { useSelector, useDispatch } from "react-redux";


function UserData() {
    const formdata = useSelector((state) => state.FormDataRaducer);
    const dispatch = useDispatch();
    // console.log("redux data", formdata)
    const [UserData, setUserData] = useState([]);
    const [IsOpen, setIsopen] = useState(false);
    const [IsOpen1, setIsopen1] = useState(false);
    const [IsOpen2, setIsopen2] = useState(false);
    const [DataOfUser, setDataOfUser] = useState({});
    const [Id, setId] = useState("");
    const [userId, setUserId] = useState("");
    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState("");

    useEffect(() => {
        if (formdata.dataList.length > 0) {
            setUserData(formdata.dataList)

        } else {
            userList();
        }

    }, []);

    async function userList() {
        const result = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        console.log(result.data, 'hhh')
        setUserData(result.data);
        dispatch({ type: "Save_Data", payload: result.data })
        localStorage.setItem('userData', JSON.stringify(result.data))
    };

    const getDetails = (item) => {
        setId(item.id);
        setDataOfUser(item);
        setTitle(item.title);
        setCompleted(item.completed ? "True" : "False");
        setIsopen(true);
    };

    const addData = () => {
        if (userId === "" || title === "" || completed === "") {
            alert("data should be not empty");
        } else {
            setIsopen1(!IsOpen1);
            console.log("add new data", Id, userId, title, completed);
            var newArr = [];
            var obj = {
                id: UserData.length + 1,
                userId: userId,
                title: title,
                completed: completed
            };
            newArr = [...UserData, obj];
            setUserId("");
            setTitle("");
            setCompleted("");
            setUserData(newArr);
            dispatch({ type: "Add_Data", payload: newArr })
            localStorage.setItem('userData', JSON.stringify(newArr))
        }
    };

    const editData = () => {
        if (title === "") {
            alert("Title should be not empty");
        } else {
            setIsopen(false);
            console.log("edit data", completed, title);
            const newArr = UserData.map((ele, index) => {
                if (ele.id === DataOfUser.id) {
                    return {
                        ...ele,
                        title: title,
                        completed: completed
                    };
                }
                return ele;
            });
            // console.log("updated data", newArr);
            setUserData(newArr);
            dispatch({ type: "Edit_Data", payload: newArr })
            localStorage.setItem('userData', JSON.stringify(newArr))
            setTitle("");
            setCompleted("");
        }
    };

    const deleteData = (id, index) => {
        // console.log("delete index", index, id);
        var deleteArr = UserData.filter((item) => item.id !== id);
        setUserData(deleteArr);
        dispatch({ type: "Remove_Data", payload: deleteArr })
        localStorage.setItem('userData', JSON.stringify(deleteArr))
    };

    function viewDetails(viewData) {
        setDataOfUser(viewData);
        setIsopen2(true);
    }

    return (
        <div>
            <header className="main-head">
                <div className="head">
                    <h2>User Data</h2>
                    <input
                        className="search-title"
                        placeholder="Search title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        type="button"
                        onClick={() => setIsopen1(!IsOpen1)}
                        className="add-btn"
                        style={{ marginLeft: "30px" }}
                    >
                        Add New Data
                    </Button>
                </div>
                <Table responsive style={{ marginLeft: "50px", width: "90%" }}>
                    <tr className="table-tr">
                        <th>Id</th>
                        <th>User Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>

                    {UserData.length
                        ? UserData.filter((ele) =>
                            (ele.title.toLowerCase().includes(search.toLowerCase()))
                        ).map((item, index) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.title}</td>
                                <td
                                    className={item.completed ? "successStatus" : "failStatus"}
                                >
                                    {item.completed ? "True" : "False"}
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            getDetails(item);
                                        }}
                                        className="btn"
                                        type="button"
                                    >
                                        <EditIcon />
                                    </Button>

                                    <Button
                                        className="btn"
                                        type="button"
                                        style={{ background: "red" }}
                                    >
                                        <DeleteIcon
                                            onClick={() => {
                                                deleteData(item.id, index);
                                            }}
                                        />
                                    </Button>
                                    <Button className="btn" type="button">
                                        <VisibilityIcon onClick={() => viewDetails(item)} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                        : ""}
                </Table>
                <Dialog maxWidth="md" open={IsOpen} toggle={() => setIsopen(!IsOpen)}>
                    <div style={{ padding: "20px", width: "400px" }}>
                        <h2>Edit Data</h2>
                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Ttile</h3>
                            <input
                                defaultValue={DataOfUser.title}
                                value={title}
                                placeholder="Enter the title"
                                className="col-12 input-div"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Status</h3>
                            <select
                                value={completed}
                                className="col-12 input-div"
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value={DataOfUser.completed ? "true" : "false"}>
                                    {DataOfUser.completed ? "True" : "False"}
                                </option>
                                <option value={DataOfUser.completed ? "false" : "true"}>
                                    {DataOfUser.completed ? "False" : "True"}
                                </option>
                            </select>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <Button onClick={editData} className="btn btn-sub col-5">
                                Edit Changes
                            </Button>
                            <Button
                                onClick={() => setIsopen(!IsOpen)}
                                className="btn btn-sub col-5"
                                style={{ marginLeft: "30px", background: "red" }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    maxWidth="md"
                    open={IsOpen1}
                    toggle={() => setIsopen1(!IsOpen1)}
                >
                    <div style={{ padding: "20px", width: "400px" }}>
                        <h2>Add Data</h2>
                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Id</h3>
                            <input
                                value={UserData.length + 1}
                                className="col-12 input-div"
                                onChange={() => setId(UserData.length + 1)}
                            />
                        </div>
                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>User Id</h3>
                            <input
                                value={userId}
                                placeholder="Enter the userId"
                                className="col-12 input-div"
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Ttile</h3>
                            <input
                                value={title}
                                placeholder="Enter your title"
                                className="col-12 input-div"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Status</h3>
                            <select
                                value={completed}
                                className="col-12 input-div"
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="row" style={{ marginTop: "10px" }}>
                            <Button onClick={addData} className="btn btn-sub col-5">
                                Add Data
                            </Button>
                            <Button
                                onClick={() => setIsopen1(!IsOpen1)}
                                className="btn btn-sub col-5"
                                style={{ marginLeft: "30px", background: "red" }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    maxWidth="md"
                    open={IsOpen2}
                    toggle={() => setIsopen2(!IsOpen2)}
                >
                    <div style={{ padding: "20px", width: "400px" }}>
                        <h2>View Data</h2>
                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>User Id</h3>
                            <input
                                value={DataOfUser.userId}
                                className="col-12 input-div"
                                disabled
                            />
                        </div>

                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Ttile</h3>
                            <input value={DataOfUser.title} className="col-12 input-div" />
                        </div>

                        <div className="row">
                            <h3 style={{ marginBottom: "-6px" }}>Status</h3>
                            <input
                                value={DataOfUser.completed ? "True" : "False"}
                                className="col-12 input-div"
                            />
                        </div>

                        <div className="row" style={{ marginTop: "10px" }}>
                            <Button
                                onClick={() => setIsopen2(!IsOpen2)}
                                className="btn btn-sub col-5"
                                style={{ marginLeft: "30px", background: "red" }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </header>
        </div>
    );
}

export default UserData;