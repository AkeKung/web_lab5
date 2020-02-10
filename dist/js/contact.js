let firebaseConfig = {
    apiKey: "AIzaSyAZEnXpUiMD6Mudry9PJPl60vHI2XdSwwM",
    authDomain: "localhost",
    projectId: "labweb-cfe07",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$(`#save`).click(() => {
    if ($('input[name="gender"]:checked').length === 0 || $(`#name`).val() === "" || $(`#email`).val() === "" || $(`#detail`).val() === "") {
        alert("Please fill all required fields");        
        return;
    } else if (!validateEmail($(`#email`).val())) {
        alert("You have entered an invalid email address!");
        return;
    }

    db.collection("users")
        .add({
            name: $(`#name`).val(),
            gender: $('input[name="gender"]:checked').val(),
            email: $(`#email`).val(),
            detail: $(`#detail`).val(),
        })
        .then(function (docRef) {
            if(!isNaN(docRef.id.charAt(0))){
                delete_data(docRef)
                write_data()
            }
            location.reload();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
})

db.collection("users").orderBy("gender")
    .onSnapshot(function(snapshot) {
        $("#contact .row").html("")
        snapshot.forEach(doc=>{
            // console.log(typeof(doc.id))
            $("#contact .row").append(`
             <div class="col-sm-3 col-sm-6 col-xs-12">
            <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">
              ${doc.data().name} 
              </br>
              ${doc.data().gender} 
              </br>
              ${censoring(doc.data().email)} 
              </h3>
            </div>
              <div class="box-body">  
              
              <div class="col-sm-6 col-sm-6 col-xs-6">
              <button class="btn btn-primary" data-toggle="modal" data-target="#${doc.id}">visit </button>
            </div>
            
            <div class="col-sm-6 col-sm-6 col-xs-6">
              <button class="btn btn-danger pull-right" id="delete" onclick="delete_data(${doc.id})">delete</button>
              </div>
              
              </div>
              </div>
              <div class="modal fade" id="${doc.id}" role="dialog">
              <div class="modal-dialog">
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Contact</h4>
                  </div>
                  <div class="modal-body">
                    <p>Name : ${doc.data().name}</p><br>
                    <p>Gender : ${doc.data().gender}</p><br>
                    <p>Email : ${doc.data().email}</p><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                  </div>
                </div>
                
              </div>
              </div> 
              </div>
              </div>
              `)
        });
    });


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
let female;
let male;
let other;
db.collection('users').orderBy("name").onSnapshot(doc => {
    female=0;
    male=0;
    other=0;
    doc.forEach(item => {
        if(item.data().gender=== "male")
        male++;
        else if(item.data().gender=== "female")
        female++;
        else if(item.data().gender=== "other")
        other++;
    })
    showchart(male,female,other);
})   

function showchart(n_male,n_female,n_other) {
        "use strict";
        //DONUT CHART
        let donut = new Morris.Donut({
            element: 'genders-chart',
            resize: true,
            colors: [
                "#f56954",
                "#3c8dbc",
                "#00a65a"
            ],
            data: [{
                    label: "Female",
                    value: n_female
                },
                {
                    label: "Male",
                    value: n_male
                },
                {
                    label: "Other",
                    value: n_other
                }
            ],
            hideHover: 'auto'
        })
    }

    function write_data(){
        event.preventDefault()
        if($("#firstname").val()!=""){
        db.collection("users").add({firstname:$("#firstname").val(),lastname:$("#lastname").val(),email:$("#email").val(),gender:$('input[name=optionsRadios]:checked').val(),detail:$("#detail").val()})
        .then(function(docRef) {
                // console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                // console.error("Error adding document: ", error);
            });
    }
    }
    
    function delete_data(id){
        // console.log(typeof(id.id))
        db.collection("users").doc(id.id).delete().then(function() {
            // console.log("Document successfully deleted!");
            location.reload();
        }).catch(function(error) {
            // console.error("Error removing document: ", error);
        })
    }
    
    function censoring(data){
        var data_x = data[0];
        for(var i = 1 ; i<data.length;i++){
            if(data[i]!="@" && data[i]!="."){
                data_x+="X"
            }else{
                data_x+=data[i]
            }
        }
        return data_x
    }    
