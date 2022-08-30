import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getDatabase, ref, set, onValue, child, push, update,get } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCdFQAJcAQqHi3d_ajETfWYZjzJNX1lZc",
    authDomain: "covitrade-1ac29.firebaseapp.com",
    databaseURL: "https://covitrade-1ac29-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "covitrade-1ac29",
    storageBucket: "covitrade-1ac29.appspot.com",
    messagingSenderId: "1066677743414",
    appId: "1:1066677743414:web:f6f176b4eee00168700d97",
    measurementId: "G-D166FP41MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


const country_list = ["CHINA", "INDIA", "USA", "INDONESIA"];
var transactionlist = [];


//variable reader
// setTimeout(function () {
//     onValue(
//         ref(database, "users/"), (snapshot) => {
//             var p = document.createElement(p);
//             p.innerHTML = snapshot.val().username;
//             document.getElementsByTagName('body')[0].appendChild(p);
//         }
//     )
// }, 3000);

//variable setter
// set(ref(database, 'CHINA/'),{
//     population: 100000,
// })



//setTimeout(show_info(),2000);

//variable updater
// const updates = {};
// updates['/CHINA/' + 'para'] = 2;
// update(ref(database),updates);
var table = document.getElementsByTagName("table")[0];
var row1 = table.getElementsByTagName("tr")[1];
var row2 = table.getElementsByTagName("tr")[2];
var row3 = table.getElementsByTagName("tr")[3];
function show_info(item, index) {

    item += "/";
    setTimeout(function() {
        onValue(
            ref(database, item), (snapshot) => {
                var data = row1.getElementsByTagName("td")[index];
                var node = document.createTextNode(snapshot.val().Aze);
                if(data.childNodes[0])
                {
                data.removeChild(data.childNodes[0]);
                }
                data.appendChild(node);
                data = row2.getElementsByTagName("td")[index];

                node = document.createTextNode(snapshot.val().Para);
                if(data.childNodes[0])
                {
                data.removeChild(data.childNodes[0]);
                }
                data.appendChild(node);
            }
        )
    }, 1000);
}

country_list.forEach(show_info);
var i=1;
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
    var data = {BUYER: buyer,
    SELLER: seller,
    RESOURCE: resource,
    AMOUNT: amt}

    const transaction_list = ref(database,'Transaction/');
    const add_transaction = push(transaction_list);
    var key_transaction = add_transaction.key;
    transactionlist.push(key_transaction);
    set(add_transaction , data);
    
    //ref(database,'Transaction/').push().setValue(data);
    // set(ref(database, 'Transaction/' + i), {
    //         BUYER: buyer,
    //         SELLER: seller,
    //         RESOURCE: resource,
    //         AMOUNT: amt
    // });
    //i+=1;
    

    buyer += "/";

    seller += "/";



    buyer += resource;
    seller += resource;
    var buy;
    var sell;
    var updated = false;

    setTimeout(function (){
    get(child(ref(database), `${buyer}`)).then((snapshot) => {
        if (snapshot.exists()) {
            buy = parseInt(snapshot.val());
                        buy += amt;
                        const updates = {};
                        updates[ '/'+buyer ] = buy;
                        update(ref(database),updates).then(() => {
                            updated = true;
                        })
                        .catch((error) => {
                            updated = false;
                        });;
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
            updated = false;
    get(child(ref(database), `${seller}`)).then((snapshot) => {
        if (snapshot.exists()) {
            sell = parseInt(snapshot.val());
                        sell -= amt;
                        const updatess = {};
                        updatess[ '/'+seller ] = sell;
                        update(ref(database),updatess).then(() => {
                            updated = true;
                        })
                        .catch((error) => {
                            updated = false;
                        });;
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

},1000);}

//setTimeout(transaction(),2000);
function transaction_history(item)
                {
                    item += "/";
                    onValue(
                        ref(database, 'Transaction/'+ item), (snapshot) => {
                            var h1 = document.createElement("h1");
                            console.log(h1);
                            var node = document.createTextNode(snapshot.val());
                            console.log(node);
                            h1.appendChild(node);
                            document.getElementsByTagName("body")[0].appendChild(h1);
                            console.log(h1);
                        }
                    )
                }
var history = document.getElementById("history");
history.onclick = transactionlist.forEach(transaction_history);




                // function transaction_info()
// {
//     //print the list of transactions done
// }

// function population_info()
// {
//     console.log(country.affected + " " + country.population + " " + country.cured + " " + country.vaccinated)
//     //how much are vaccinated affeced non affected and dead
// }



// function stage1_inc()
// {
//     country.affected += 2*country.affected - (country.vaccinated/3)*10;
//     console.log(country.affected);
//     //also decrease the unaffected people
// }



// function stage2_inc()
// {
//     //inc stage 2 and dec stage1
// }

// function dead_inc()
// {
//     //inc the dead people and dec the alive people
// }

// function timer()
// {
//     //maybe a timer to do everything !?!?!
// }
