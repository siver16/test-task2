/**
 * Created by siver on 12.10.16.
 */

var  butWinner=document.getElementById('new_winner');
var  butSave=document.getElementById('save');
var butDeleteAll=document.getElementById('deleteAll');

var tableRef = document.getElementById('tab');
var editingRow=0;


butSave.addEventListener("click",function () {
    addRow(tableRef.getElementsByTagName("tr").length>1);
},false);

butDeleteAll.addEventListener("click",function () {
    while (tableRef.getElementsByTagName("tr").length>1){
        deleteRow(getLastRowId());
    }
},false);

butWinner.addEventListener("click",function () {
    getWinner();
},false);

function addRow() {
    var name=document.getElementById('name');
    var surname=document.getElementById('surname');
    var email=document.getElementById('email');
    var phone=document.getElementById('phone');
    var dob=document.getElementById('date');
//////////////////////////////////validation/////////////////////////////
    if(!name.value){
        alert("enter your name");
        return;
    }
    if(!surname.value){
        alert("enter your surname");
        return;
    }
    if(!email.value){
        alert("enter your email");
        return;
    }else{
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexp.test(email.value)){
            alert("enter valid email");
            return;
        }
    }

    if(phone.value.length>0&&(phone.value.length<7||phone.value.length>15)){
        alert("phone number must not be less then 7 and more than 15 digits");
        return;
    }

    var id=+getLastRowId().substr(3)+1;
    var newRow   = tableRef.insertRow(-1);
    var rowId="row"+id;
    newRow.id="row"+id;
    newRow.insertCell(0).appendChild(document.createTextNode(name.value));
    newRow.insertCell(1).appendChild(document.createTextNode(surname.value));
    newRow.insertCell(2).appendChild(document.createTextNode(email.value));
    newRow.insertCell(3).appendChild(document.createTextNode(phone.value));
    newRow.insertCell(4).appendChild(document.createTextNode(dob.value));
    newRow.insertCell(5).innerHTML='<input id=deleteRow'+id+' type="button" value="delete" onclick="deleteRow(\''+rowId+'\')"/>' +
        '<input id=editRow'+id+' type="button" value="edit" onclick="editRow(\''+rowId+'\')"/>';
    name.value='';
    surname.value='';
    email.value='';
    phone.value='';
    dob.value='';
    if(editingRow!=0){
        deleteRow(editingRow);
        editingRow=0;
    }

}
function editRow(id){
    var tds=document.getElementById(id).getElementsByTagName("td");
    document.getElementById('name').value=tds[0].innerHTML;
    document.getElementById('surname').value=tds[1].innerHTML;
    document.getElementById('email').value=tds[2].innerHTML;
    document.getElementById('phone').value=tds[3].innerHTML;
    document.getElementById('date').value=tds[4].innerHTML;
    editingRow=id;

}
function getWinner(){
    var rows=tableRef.getElementsByTagName("tr");
    if(rows.length<2){
       alert("Too few members");
        return;
    }
    var winId=rows[Math.floor(Math.random() *(rows.length-1))+1].id;
    if(document.getElementById('winnerName').value){
        document.getElementById('winnerName').value+=', ';
    }
    document.getElementById('winnerName').value+=document.getElementById(winId).getElementsByTagName("td")[0].innerHTML+' '+
    document.getElementById(winId).getElementsByTagName("td")[1].innerHTML;
}
function deleteRow(id){
   tableRef.deleteRow(document.getElementById(id).rowIndex);
}
function getLastRowId(){
    var ret="row0";
    var rows=tableRef.getElementsByTagName("tr");
    if(rows.length>1){
        ret= rows[rows.length-1].id;
    }
    return ret;

}