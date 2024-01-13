//HTML ELEMENTS
var SaveBtnEL = $(".saveBtn");
var CurrentDayEL = $("#currentDay");

//CurrentTime = dayjs('');
var storagekey = "wk5-WorkDayPlanner"

// Ensure all DOM elents have loaded before running the contained code
$(function () {
  //listener event for save button click event, then uses dom traversal to quire the id of the container 
  SaveBtnEL.on('click', function () {
    var timeBlockEL = $(this).parent();  //get event item, and then get parent container
    var hourID = timeBlockEL.attr('id'); //save hour ide from container ID
    var desc = timeBlockEL.children(".description").val().trim();    //get text input, and trim blank space
    setLocalStorage(hourID, desc);     //save text to local storage
    $("#saveNoti").show();    //display save notification
    $("#saveNoti").hide(5000);    //hide savenotification over 5 seconds
  });

  //function to save data to local storage - takes a key value pair and inserts it into an object in local storage
  function setLocalStorage(key, value) {
    //check for empty data
    if (value === "" || key === "") {
      return;
    }
    var data = JSON.parse(localStorage.getItem(storagekey)); //read existing data from local storage 
    //check for invalid data stored in local storage;
    if (data === undefined || data == null) {
      var data = {};
    }
    data[key] = value; //save key value pair into the object
    localStorage.setItem(storagekey, JSON.stringify(data)); // send updated object to local storage
  }

  // this function applies either 'past' present or future' classes despending on the current time of day
  function renderTimeColors() {
    var currentHour = parseInt(dayjs().format('H')); //get current hour in 24hr format;
    //uncoment to test at night
    var currentHour = parseInt(dayjs('12-01-2024 12:00 PM').format('H'));

    var timeBlocks = $(".time-block"); //get all time block elements 
       timeBlocks.removeClass('past present future'); // ensure the time blocks are clear of theses clases
    for (var i in timeBlocks) { //for each timeblock
      var blockID = timeBlocks[i].id; //save timeblock class id 
      if (blockID !== undefined) { //prevent code running on addtional information within the object
        var blockNum = parseInt(blockID.split('-')[1]); //pick out the numeric hour identenfier
        if (blockNum < currentHour) { //if time has past
          $('#' + blockID).addClass('past');
        } else if (blockNum == currentHour) { //if current hour
          $('#' + blockID).addClass('present');
        }
        else if (blockNum > currentHour) { //if hour is in the future
          $('#' + blockID).addClass('future');
        }
      }
    }

  }

  //on page load add an the data currently stored in local storage into the appropiate time block 
  function renderPreviousData() {
    var StoredData = JSON.parse(localStorage.getItem(storagekey)); //get data from local storage
    for (var i in StoredData) { //for all items within the stored Data Object
      $("#" + i).children(".description").val(StoredData[i]);//dynamically find, navigate the DOM and update the time block from the key and value pair
    }
  }
  //
  //display the current date in the header of the page.
  CurrentDayEL.text(dayjs().format('dddd, MMMM d, YYYY'));
  //run initi functions
  renderPreviousData();
  renderTimeColors();
});
