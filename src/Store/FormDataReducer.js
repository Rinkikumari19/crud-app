var localUserData = [];
if(typeof window != 'undefined'){
    if(JSON.parse(localStorage.getItem("userData")!= null)){
       localUserData = JSON.parse(localStorage.getItem("userData"))
        // console.log("user data from local storage", localUserData)
    }
}

var initialVal = {
    dataList: localUserData
}



export default function FormDataRaducer(state = initialVal, action) {
    switch (action.type) {
        case "Save_Data":
            state = { dataList: [action.payload] }
            return (state);
        case "Add_Data":
            state = { dataList: [action.payload] }
            return (state);
        case "Edit_Data":
            state = { dataList: [action.payload] }
            return (state);
        case "Remove_Data":
            // state = { dataList: [...state.dataList, action.payload] }
            state = { dataList: [action.payload] }
            return (state);
        default:
            return state;
    }
}