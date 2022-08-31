import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    child,
    push,
    update,
    get,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCdFQAJcAQqHi3d_ajETfWYZjzJNX1lZc",
    authDomain: "covitrade-1ac29.firebaseapp.com",
    databaseURL:
        "https://covitrade-1ac29-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "covitrade-1ac29",
    storageBucket: "covitrade-1ac29.appspot.com",
    messagingSenderId: "1066677743414",
    appId: "1:1066677743414:web:f6f176b4eee00168700d97",
    measurementId: "G-D166FP41MX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const country_list = ["CHINA", "INDIA", "USA", "INDONESIA"];
var transactionlist = [];
const prop_list = ["POPULATION","INFECTED","PCM","AZE","LEVO"];


var table = document.getElementsByTagName("table")[0];
var row1 = table.getElementsByTagName("tr")[1];
var row2 = table.getElementsByTagName("tr")[2];
var row3 = table.getElementsByTagName("tr")[3];

function show_info(item,index)
{
    var row = table.insertRow();
    row.id = item;
    var cell = row.insertCell();
    cell.innerHTML = item;
    var prop = item;
    country_list.forEach
    (
        function (item,index)
        {
            if(cell.childNodes[0])
            {
                console.log("check");
            }
            var c = item;
            item += "/" + prop;
            get(child(ref(database), `${item}`)) .then((snapshot)=>{
                cell = row.insertCell();
                cell.classList=[c];
                var node = document.createTextNode(snapshot.val());
                cell.appendChild(node);
            })
        }
    )
}

prop_list.forEach(show_info);

var i = 1;
var button = document.getElementById("transaction");
button.onclick = function transaction() {
    var seller;
    var buyer;
    var resource;
    var amt;
    buyer = prompt("buyer");
    seller = prompt("seller");
    resource = prompt("resource");
    amt = parseInt(prompt("amount"));
    var data = { BUYER: buyer, SELLER: seller, RESOURCE: resource, AMOUNT: amt };

    const transaction_list = ref(database, "Transaction/");
    const add_transaction = push(transaction_list);
    var key_transaction = add_transaction.key;
    transactionlist.push(key_transaction);
    set(add_transaction, data);

    var prop = document.getElementById(resource);
    var count_buy = prop.getElementsByClassName(buyer)[0];
    var count_seller = prop.getElementsByClassName(seller)[0];

    buyer += "/";

    seller += "/";

    buyer += resource;
    seller += resource;
    var buy;
    var sell;
    var updated = false;
        get(child(ref(database), `${buyer}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    buy = parseInt(snapshot.val());
                    buy += amt;
                    const updates = {};
                    updates["/" + buyer] = buy;
                    count_buy.innerHTML = buy;
                    update(ref(database), updates)
                        .then(() => {
                            updated = true;
                        })
                        .catch((error) => {
                            updated = false;
                        });
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        updated = false;
        get(child(ref(database), `${seller}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    sell = parseInt(snapshot.val());
                    sell -= amt;
                    const updatess = {};
                    updatess["/" + seller] = sell;
                    count_seller.innerHTML = sell;
                    update(ref(database), updatess)
                        .then(() => {
                            updated = true;
                        })
                        .catch((error) => {
                            updated = false;
                        });
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
};

//setTimeout(transaction(),2000);
function transaction_history(item) {
    item += "/";
    onValue(ref(database, "Transaction/" + item), (snapshot) => {
        var h1 = document.createElement("h1");
        console.log(h1);
        var node = document.createTextNode(snapshot.val());
        console.log(node);
        h1.appendChild(node);
        document.getElementsByTagName("body")[0].appendChild(h1);
        console.log(h1);
    });
}
var history = document.getElementById("history");
history.onclick = transactionlist.forEach(transaction_history);

history.onclick = function ()
{
    var table2 = document.getElementsByTagName("table")[1];
    onValue(ref(database,"Transaction/"),(snapshot) =>{
        for(var key in snapshot.val())
        {
            var path1 = "Transaction/"+key;
            var row = table2.insertRow();
            onValue(ref(database,path1),
            (snapshot)=>{
                for(var data in snapshot.val())
                {
                    var cell = row.insertCell();
                    console.log(data);
                    onValue(ref(database,`Transaction/${key}/${data}`),
                        (snapshot)=>{
                        cell.innerHTML = snapshot.val();
                    });
                }
            });
        }
    })
};


