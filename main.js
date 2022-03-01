const config = require("./config.json");
const axios = require("axios");

const TIMETABLE_URL = "https://www2.edulinkone.com/api/?method=EduLink.Timetable";
const LOGIN_URL = "https://www2.edulinkone.com/api/?method=EduLink.Login";

let date = new Date();
const CURRENT_DATE = date.toISOString().split('T')[0];

let edulinkToken = "";
let edulinkID = "";

let timetablePayload = {
    "method": "EduLink.Timetable",
    "params": {
        "learner_id": "",
        "date": CURRENT_DATE
    },
    "id": "1",
    "jsonrpc": "2.0"
};
let timetableHeaders = {
    "X-API-Method": "EduLink.Timetable",
    "Authorization": ""
}

let loginPayload = {
    "method": "EduLink.Login",
    "params": {
        "from_app": false,
        "password": config.edulink_password,
        "username": config.edulink_username,
        "establishment_id": config.edulink_establishment_id
    },
    "id": "1",
    "jsonrpc": "2.0"
};

let loginHeaders = {
    "X-API-Method": "EduLink.Login"
}

function getTimetable() {
    timetableHeaders.Authorization = "Bearer " + edulinkToken;
    timetablePayload.params.learner_id = edulinkID;
    console.log(timetableHeaders);
    console.log(timetablePayload);
    axios.post(TIMETABLE_URL, timetablePayload, { headers: timetableHeaders }).then(res => {
        console.log(JSON.stringify(res.data));
        console.log(res.data);
    });
}

function login() {
    axios.post(LOGIN_URL, loginPayload, { headers: loginHeaders }).then(res => {
        let data = res.data.result;
        edulinkToken = data.authtoken;
        edulinkID = data.user.id;
        console.log("Token: " + edulinkToken);
        console.log("ID: " + edulinkID);
        getTimetable();
    });
}

login();