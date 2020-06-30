var $messages = $('#messages-content');
var serverResponse = "QWERTY";
var from,to,mot;
var flag = 0;
var cities = ["Port Blair","Ladakh","Amaravati","Itanagar","Guwahati","Patna","Raipur","Daman","New Delhi","Panaji","Gandhinagar","Chandigarh","Shimla","Srinagar","Ranchi","Bangalore","Thiruvananthapuram","Leh","Kavaratti","Bhopal","Mumbai","Imphal","Shillong","Aizawl","Kohima","Bhubaneswar","Pondicherry","Chandigarh","Jaipur","Gangtok","Chennai","Hyderabad","Agartala","Lucknow","Dehradun","Kolkata"];
var modeoftravel = ["Flight","Train","Rental Car","Own Car"];
var avgspeed, ppkm, approxprice, approxtime;
var i;

if(flag == 0)
  {
    for (i = 0; i < cities.length; i++) {
      $('<option value="'+cities[i]+'" id="From">'+cities[i]+'</option>').appendTo($('#MSG')).addClass('new');
    }
  }

function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
  document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  setTimeout(function() {
    serverMessage("I am a simple option based chatbot which will allow you to calculate approximate price on the mode of travel of your choice from one city to another!");
  }, 100);
  setTimeout(function() {
    serverMessage("First of all, Please enter your start location!");
  }, 1500);
});

function updatescroll(){
  var element = document.getElementById('message-content');
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function insertMessage() {
  msg = $('.form-control').val();
  console.log(msg);
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="row"><div class="col d-flex justify-content-end mb-3"><div class="card text-white bg-primary" style="max-height: 4rem; max-width: 20rem;"><div class="card-body" style="padding-left: 0.5rem;padding-top: 0.3rem;padding-right: 0.4rem;padding-bottom: 0.4rem;">' + msg + '</div></div></div></div>').appendTo($('#message-content')).addClass('new');
  fetchmsg() 
  updatescroll();
  $('.form-control').val(null);
}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  updatescroll();
}

function serverMessage(response2) {
  console.log(response2);
  /*if ($('.form-control').val() != '') {
    return false;
  }*/
  setTimeout(function() {
    $('<div class="row align-middle"><div class="col d-flex"><div class="card border-dark mb-3" style="max-width: 20rem;background-color: #ffcb05;color: darkslategrey;"><div class="card-body" style="padding-left: 0.5rem;padding-top: 0.3rem;padding-right: 0.4rem;padding-bottom: 0.4rem;">' + response2 + '</div></div></div></div>').appendTo($('#message-content')).addClass('new');
    updatescroll();
  }, 100 + (Math.random() * 20) * 100);
}

function fetchmsg(){
  if(flag == 0)
  {
    from = $('.form-control').val();
    var myobj = document.getElementById("MSG");
    myobj.remove();
    var myobj = document.getElementById("MSGS");
    myobj.remove();
    $('<select class="form-control  col-md-10 col-sm-10 col-9 d-flex" id="MSG" name="MSG" style="margin-bottom: 0;"></select><div class="ml-auto" id="MSGS"><button type="submit" class="btn btn-outline-warning">Send</button></div>').appendTo($('#mess')).addClass('new');
    setTimeout(function() {
      serverMessage("Please enter your destination!");
    }, 500);
    for (i = 0; i < cities.length; i++) {
      if(cities[i] == from)
      {
        continue;
      }
      $('<option value="'+cities[i]+'" id="From">'+cities[i]+'</option>').appendTo($('#MSG')).addClass('new');
    }
    flag++;
  }
  else if(flag == 1)
  {
    to = $('.form-control').val();
    var myobj = document.getElementById("MSG");
    myobj.remove();
    var myobj = document.getElementById("MSGS");
    myobj.remove();
    $('<select class="form-control  col-md-10 col-sm-10 col-9 d-flex" id="MSG" name="MSG" style="margin-bottom: 0;"></select><div class="ml-auto" id="MSGS"><button type="submit" class="btn btn-outline-warning">Send</button></div>').appendTo($('#mess')).addClass('new');
    setTimeout(function() {
      serverMessage("Please enter your mode of travel!");
    }, 500);
    for (i = 0; i < modeoftravel.length; i++) {
      $('<option value="'+modeoftravel[i]+'" id="From">'+modeoftravel[i]+'</option>').appendTo($('#MSG')).addClass('new');
    }
    flag++;
  }
  else if(flag == 2)
  {
    mot = $('.form-control').val();
    if(mot == 'Flight'){
      avgspeed = 500; 
      ppkm = 3.5;
    }
    else if(mot == "Train"){
      avgspeed = 70;
      ppkm = 0.7;
    }
    else if(mot == "Rental Car"){
      avgspeed = 80;
      ppkm = 12;
    }
    else if(mot == "Own Car"){
      avgspeed = 80;
      ppkm = 4.5;
    }
    var myobj = document.getElementById("MSG");
    myobj.remove();
    var myobj = document.getElementById("MSGS");
    myobj.remove();
    $('<div class="ml-auto" id="MSGS"><button type="submit" class="btn btn-outline-warning" onClick="location.reload();">Reset</button></div>').appendTo($('#mess')).addClass('new');
    serverMessage("According to insights, you shall:");
    var distance = Math.floor(Math.random() * 3000) + 100;
    approxprice = Math.floor(distance * ppkm);
    approxtime = Math.floor(distance / avgspeed);
    setTimeout(function() {
      serverMessage('The approximate distance will be '+ distance +' kms');
      serverMessage('The approximate price will be Rs. '+ approxprice +'');
      serverMessage('The approximate time will be '+ approxtime +' hours');
    }, 1500);
    flag = 0;
  }
}