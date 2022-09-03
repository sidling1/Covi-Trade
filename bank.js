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

const country_list = ["CHINA", "INDIA", "USA", "INDONESIA","BRAZIL","RUSSIA","JAPAN","TURKEY","GERMANY","FRANCE","UK","THAILAND","SOUTHAFRICA","SPAIN","UKRAINE","CANADA","POLAND","UAE","AUSTRIA","NETHERLANDS","AUSTRIA","SWITZERLAND","NEWZEALAND"];
const testcountry_list = ["BRAZIL","CHINA","INDIA","INDONESIA","POLAND","TURKEY"];
var transactionlist = [];
const prop_list = ["POPULATION","INFECTED","I_CHILD","I_ADULT","I_OLD","TAXSTAR","PCM","COF","VITC","CEF","AZE","LEVO","MONEY","C1","C2","C3","C4","C5","C6"];


var table = document.getElementsByTagName("table")[0];
var row1 = table.getElementsByTagName("tr")[1];
var row2 = table.getElementsByTagName("tr")[2];
var row3 = table.getElementsByTagName("tr")[3];

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

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


// onValue(ref(database,`AUSTRALIA/`),(golgol)=>
//         {
//             var top = table.insertRow();
//             var cell = top.insertCell();
//             cell.innerHTML = "PROPERTY";
//             top.id = "property";
//             for(var property in golgol.val())
//             {
//                 cell = top.insertCell();
//                 cell.innerHTML=property;
//             }
//         })

// onValue(ref(database,`/`),(snapshot)=>{
//     for(var country in snapshot.val())
//     {
//         if(country == 'Transaction')continue;
//         var pat = country + "/";
//         var row = table.insertRow();
//         row.id = country;
//         var head = row.insertCell();
//         head.innerHTML = country;
//         head.classList = ["head"];
//         onValue(ref(database,`${pat}`),(golgol)=>
//         {
//             for(var property in golgol.val())
//             {
//                 var cell = row.insertCell();
//                 cell.classList = [property];
//                 pat = country + "/" + property + "/";
//                 onValue(ref(database,`${pat}`),(golgolgol)=>{
//                     cell.innerHTML = golgolgol.val();
//                 })                
//             }
//         })
//     }
// })

prop_list.forEach(show_info);

var i = 1;
var button = document.getElementById("transaction");
button.onclick = function transaction() {
    var seller;
    var buyer;
    var resource;
    var amt;
    var rate;
    var buyer_money;
    var seller_money;
    buyer = prompt("buyer");
    seller = prompt("seller");
    resource = prompt("resource");
    amt = parseFloat(prompt("amount"));
    rate = parseFloat(prompt("rates"));
    var data = { BUYER: buyer, SELLER: seller, RESOURCE: resource, AMOUNT: amt,RATE: rate};

    const transaction_list = ref(database, "Transaction/");
    const add_transaction = push(transaction_list);
    var key_transaction = add_transaction.key;
    transactionlist.push(key_transaction);
    set(add_transaction, data);

    var prop = document.getElementById(resource);
    var mon = document.getElementById("MONEY");
    var count_buy = prop.getElementsByClassName(buyer)[0];
    var count_seller = prop.getElementsByClassName(seller)[0];
    var mon_buy =   mon.getElementsByClassName(buyer)[0];
    var mon_sell = mon.getElementsByClassName(seller)[0];

    buyer += "/";
    seller += "/";

    var taxstar=seller + "TAXSTAR";
    var buyer_country_money = buyer + "MONEY";
    var seller_country_money = seller + "MONEY";
    get(child(ref(database),`${taxstar}`)).then((snapshot)=>{
    var tax = parseInt(snapshot.val());   
    get(child(ref(database),`${buyer_country_money}`)).then((snapshot)=>{
        buyer_money = parseFloat(snapshot.val());
        buyer_money -= rate*(1+(7-tax)*0.01);
        buyer_money = buyer_money.toFixed(2);
        mon_buy.innerHTML = buyer_money;
        const upda = {};
        upda["/" + buyer_country_money] = buyer_money;
        update(ref(database),upda); 
    })
})

    get(child(ref(database),`${seller_country_money}`)).then((snapshot)=>{
        seller_money = parseFloat(snapshot.val());
        seller_money += rate;
        seller_money = seller_money.toFixed(2);
        mon_sell.innerHTML = seller_money;
        const upda = {};
        upda["/" + seller_country_money] = seller_money;
        update(ref(database),upda); 
    })

    buyer += resource;
    seller += resource;
    var buy;
    var sell;
    var updated = false;
        get(child(ref(database), `${buyer}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    buy = parseFloat(snapshot.val());
                    buy += amt;
                    buy = buy.toFixed(2);
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
                    sell = parseFloat(snapshot.val());
                    sell -= amt;
                    sell = sell.toFixed(2);
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


var reset = document.getElementById("reset");
reset.onclick = function reset()
{
    get(child(ref(database),`Transaction/`))
    .then ((snapshot)=>{
        
        var last_transactionarr = snapshotToArray(snapshot);
        var last_transaction = last_transactionarr.pop();

        var tax;
        var key = last_transaction.key;

        get(child(ref(database),`${last_transaction.SELLER}/TAXSTAR`)).then((snapshot)=>{
            tax = snapshot.val();
        })

        get(child(ref(database),`${last_transaction.BUYER}`)).then((snapshot)=>
            {
            get(child(ref(database),`${last_transaction.BUYER}/${last_transaction.RESOURCE}`))
            .then((snapshot)=>{
                var prev = parseFloat(snapshot.val());
                var res = document.getElementById(last_transaction.RESOURCE);
                var cont = res.getElementsByClassName(last_transaction.BUYER)[0];
                prev -= parseFloat(last_transaction.AMOUNT);
                    const updates = {};
                    updates[`${last_transaction.BUYER}/${last_transaction.RESOURCE}`] = prev;
                    update(ref(database),updates);
                    cont.innerHTML = prev;
            })
            get(child(ref(database),`${last_transaction.BUYER}/MONEY`)).then((snapshot)=>{
                var prev = parseFloat(snapshot.val());
                var rate = last_transaction.RATE;
                var res = document.getElementById("MONEY");
                var cont = res.getElementsByClassName(last_transaction.BUYER)[0];
                prev += parseFloat(rate*(1+(7-tax)*0.01));
                const updates ={};
                updates[`${last_transaction.BUYER}/MONEY`] = prev;
                update(ref(database),updates);
                cont.innerHTML = prev;
            })
            }
        )
    
    
    get(child(ref(database),`${last_transaction.SELLER}`)).then((snapshot)=>
            {
            get(child(ref(database),`${last_transaction.SELLER}/${last_transaction.RESOURCE}`))
            .then((snapshot)=>{
                var prev = parseFloat(snapshot.val());
                var res = document.getElementById(last_transaction.RESOURCE);
                var cont = res.getElementsByClassName(last_transaction.SELLER)[0];
                prev += parseFloat(last_transaction.AMOUNT);
                    const updates = {};
                    updates[`${last_transaction.SELLER}/${last_transaction.RESOURCE}`] = prev;
                    update(ref(database),updates);
                    cont.innerHTML = prev;
            })
            get(child(ref(database),`${last_transaction.SELLER}/MONEY`)).then((snapshot)=>{
                var prev = parseFloat(snapshot.val());
                var rate = parseFloat(last_transaction.RATE);
                var res = document.getElementById("MONEY");
                var cont = res.getElementsByClassName(last_transaction.SELLER)[0];
                prev -= parseFloat(rate);
                const updates ={};
                updates[`${last_transaction.SELLER}/MONEY`] = prev;
                update(ref(database),updates);
                cont.innerHTML = prev;
            })
            }
        )
        console.log(last_transaction)
        console.log(database.ref.child("Transaction"))

        
        
    })
}

var history = document.getElementById("history");
//history.onclick = transactionlist.forEach(transaction_history);
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
                    onValue(ref(database,`Transaction/${key}/${data}`),
                        (snapshot)=>{
                        cell.innerHTML = snapshot.val();
                    });
                }
            });
        }
    })
};


