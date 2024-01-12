var SaveBtnEL = $(".saveBtn");
var CurrentDayEL = $("#currentDay");

CurrentTime = dayjs('');
var storagekey = "wk5-WorkDayPlanner"


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  SaveBtnEL.on('click', function () {
    var timeBlockEL = $(this).parent();
    var hourID = timeBlockEL.attr('id');
    var desc = timeBlockEL.children(".description").val().trim();
    //console.log(hourID);
    //console.log(desc);
    setLocalStorage(hourID, desc);
  });

  function setLocalStorage(key, value) {
    if (value === "" || key === "") {
      return;
    }
    var data = JSON.parse(localStorage.getItem(storagekey));
    if (data === undefined || data == null) {
      var data = {};
    }
    data[key] = value;
    localStorage.setItem(storagekey, JSON.stringify(data));
  }

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
function renderTimeColors()
{
  var currentHour = parseInt(dayjs().format('H'));
  //uncoment to test at night
 //var currentHour = parseInt(dayjs('12-01-2024 12:00 PM').format('H'));

  var timeBlocks = $(".time-block");
  timeBlocks.removeClass('past present future');
  for(var i in timeBlocks)
  {
    var blockID= timeBlocks[i].id;
    var blockNum = parseInt(blockID.split('-')[1]);
    if(blockNum < currentHour)
    {
      $('#'+blockID).addClass('past');
    }else if
    (blockNum == currentHour)
    {
      $('#'+blockID).addClass('present');
    }
    else if(blockNum > currentHour)
    {
     $('#'+blockID).addClass('future');
    }
  }

}
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function renderPreviousData()
  {
    var StoredData = JSON.parse(localStorage.getItem(storagekey));
    for(var i in StoredData)
    {
      console.log('$(#'+i+').val('+StoredData[i]+')');
      $("#"+i).children(".description").val(StoredData[i]);
    }

  }
  //
  // TODO: Add code to display the current date in the header of the page.
  CurrentDayEL.text(dayjs().format('dddd, MMMM d, YYYY'));

  renderPreviousData();
  renderTimeColors()
});

