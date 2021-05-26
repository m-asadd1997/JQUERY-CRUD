
const baseUrl = "http://localhost:3000/";
let apiService = new ApiService();

$(document).ready(function () {
 
//global loader
    $(document).on({
        ajaxStart: function(){
            $("body").addClass("loading"); 
        },
        ajaxStop: function(){ 
            setTimeout(()=>{
                $("body").removeClass("loading"); 
            },1000)
           
        }    
    });


  //TO SEARCH DATA IN TABLE
  $("#mySearch").on("keyup", function () {
    let value = $("#mySearch").val();
    $("#myTbl tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });ed
  });                


//TO CHECK FORM VALIDATION
  $("#nameId,#emailId,#ageId").on("keyup", function () {
    checkInputsForValidation();
  });



  //FETCH DATA
  function fetchData() {
    apiService.getAllData(res=>{
      dynamicTableTemplateOnFetchingData(res)
    })
  }

  fetchData();

  //SAVE DATA
  $("#saveBtn").click(function (e) {
    e.preventDefault();
    let id = $("#myId").val(); //getting id to check whether data is to be saved or update
    let data = {
      id: id,
      name: $("#nameId").val(),
      email: $("#emailId").val(),
      age: $("#ageId").val(),
      gender: $('input[name="gridRadios"]:checked').val(),
    };

    if (id == "") {
        apiService.postData(data,res=>{
          console.log("Data Saved");
            $("#mySpinner").hide();
            $("#myForm")[0].reset();
            fetchData();
          })
    
    } else {

          apiService.updateById(id,data,res=>{
              console.log("Data Updated");
              $("#mySpinner").hide();
              $("#myForm")[0].reset();
              fetchData();
          })

    }

    console.log(data);
  });
});

//TO DELETE DATA ON DELETE BUTTON CLICK
$("tbody").on("click", ".btn-danger", function () {
  let id = parseInt($(this).attr("delid"));
  console.log("Delete " + id);
  let that = this; //cause problem inside ajax call

    apiService.deleteById(id,res =>{
      console.log(res);
      $(that).closest("tr").fadeOut();
    })

});


//FUNCTION TO GET BY ID 
function getById(id) {
    apiService.getById(id, res => {
        mapValuesInForm(res)
        checkInputsForValidation();
    })
}


//TO SHOW DATA IN FORM ON EDIT BUTTON CLICK 
$("tbody").on("click", ".btn-success", function () {
  let id = parseInt($(this).attr("editid"));
    getById(id)
});



//*****************************  UTIL FUNCTIONS  **************************


//To map values in form
function mapValuesInForm(data){

      $("#myId").val(data["id"]);
      $("#nameId").val(data["name"]);
      $("#emailId").val(data["email"]);
      $("#ageId").val(data["age"]);

      if (data["gender"] == "male") 
        $("#genderId").prop("checked", true);
      //checking the radio buttons on given data
      else if (data["gender"] == "female")
        $("#genderId2").prop("checked", true);
}


//form validation
function checkInputsForValidation() {
  if (
    $("#nameId").val().length > 0 &&
    $("#emailId").val().length > 0 &&
    $("#ageId").val().length > 0
  ) {
    $("#saveBtn").attr("disabled", false);
  } else {
    $("#saveBtn").attr("disabled", true);
  }
}


function dynamicTableTemplateOnFetchingData(data){
  let tableBody = "";
  let x; //so that we dont have to write data every time
  if (data) x = data;
  else x = "";

  for (let i = 0; i < data.length; i++) {
    tableBody +=
      "<tr data-id=" +
      x[i].id +
      "><td>" +
      x[i].id +
      "</td>" +
      "<td>" +
      x[i].name +
      "</td>" +
      "<td>" +
      x[i].email +
      "</td>" +
      "<td>" +
      x[i].age +
      "</td>" +
      "<td>" +
      x[i].gender +
      "</td>" +
      `<td><div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                  <button type="button" class="btn btn-success" editid=${x[i].id}>Edit</button>
                                  <button type="button" class="btn btn-danger"  delid=${x[i].id}>Delete</button>
                                  </div></td>` +
      "</tr>";
  }

  $("tbody").html(tableBody);  

}

