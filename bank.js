import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getDatabase, ref, set, onValue, child, push, update } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";


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


function transaction() {
    var seller;
    var buyer;
    var resource;
    var amt;
    buyer = prompt("buyer");
    seller = prompt("seller");
    resource = prompt("resource");
    amt = prompt("amount");
    buyer += "/";
    seller += "/";

}
// var initalresources = 10000;

//setTimeout(transaction(),2000);

var table = document.getElementsByTagName("table")[0];
var row = table.getElementsByTagName("tr")[1];

function show_info(item, index) {

    item += "/";
    setTimeout(function() {
        onValue(
            ref(database, item), (snapshot) => {
                var data = row.getElementsByTagName("td")[index];
                const node = document.createTextNode(snapshot.val().Aze);
                data.appendChild(node);
                // var h1 = document.createElement(h1);
                // h1.innerHTML = snapshot.val().Aze;
            }
        )
    }, 1000);
}

country_list.forEach(show_info);


// var acc_num;
// var name;
// var net_bln;
// //var resources;
// //var star;
// //var population;
// //var affected;
// //var cured;
// //var vaccinated;

// var resources = {
//     paracetamol : 0 ,
//     oxygen : 0,
//     bed : 0
// };

// var country = {
//     this_name : " ",
//     population:0,
//     affected: 0,
//     cured:0 ,
//     vaccinated:0 ,
//     star:0 
// };

// var country1 = {
//     this_name : " ",
//     population:0,
//     affected:0 ,
//     cured:0 ,
//     vaccinated:0 ,
//     star:0 
// };

// function create_account(country)
// {
//     country.this_name = prompt("Enter a country name",country.this_name);
//     country.population = prompt("Enter the population",country.population);
//     alert("Enter resources available");
//     resources.paracetamol = prompt("Paracetamol",resources.paracetamol);
//     country.affected = 0.6*country.population;
// }




// function account_information()
// {

// }

// function transaction()
// {
//     var seller;
//     var buyer;
//     var res;
//     var quant;  
//     buyer = prompt("BUYER");
//     seller = prompt("SELLER");
//     res = prompt("resources");
//     quant = prompt("quantity");

//     //money ka bhi dekhna hai
//     // buyer me add karo
//     //seller me subtract karo
//     //transaction history me save karo
// }

// function resource_info()
// {
//     //retrive data and print the data of resources only
// }

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
