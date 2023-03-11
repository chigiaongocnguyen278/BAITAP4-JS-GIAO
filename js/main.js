

//instance
const list = new ListOfEmployee();
const validation = new Validation();


function getELE(id) {

    return document.getElementById(id);
}

// function getClassOfEle(classname) {

//     return document.querySelector(classname);
// }


// show table
function showTable(array) {

    var content = "";

    array.map(function (emp) {

        var trELE = `<tr>
            <td>${emp.account}</td>
            <td>${emp.fullName}</td>
            <td>${emp.email}</td>
            <td>${emp.workingDay}</td>

            <td>${emp.position}</td>

            <td>${emp.totalSalary.toLocaleString()}</td>
            <td>${emp.category}</td>
             <td>
              <button onclick="deleteEmp('${emp.account}')" class="btn btn-danger">Xóa</button>
                <button data-toggle="modal"
                data-target="#myModal" onclick="showEmp('${emp.account}')" class="btn btn-info" > Xem</button>
             </td>
        </tr>`

        content += trELE;
    })
       document.getElementById("tableDanhSach").innerHTML = content;

}

//local storage
function setLocalStorage(array) {

        localStorage.setItem("List-Of-Employee", JSON.stringify(array));

}

function getLocalStorage() {

       if (localStorage.getItem("List-Of-Employee") != null) {

        list.arrayEmployee = JSON.parse(localStorage.getItem("List-Of-Employee"));
        showTable(list.arrayEmployee);
      }


}
getLocalStorage();


//clear form when add another employee
clearForm = () => {
    let elements = document.getElementsByClassName("input-sm");
    for (let element of elements){
        element.value="";
    }
    getELE("tknv").disabled = false;
    getELE("chucvu").selectedIndex = 0;

}

// function sort account number
function sortArrayEmp(array) {

    array.sort((a, b) => a.account - b.account);

    return array;
}
//  console.log(sortArrayEmp(list.arrayEmployee), '85')



// function add employee
function addEmp() {


    var accountEmp = getELE("tknv").value;
    var fullNameEmp= getELE("name").value;
    var emailEmp = getELE("email").value;
    var passEmp = getELE("password").value;
    var workingDayEmp = getELE("datepicker").value;
    var salaryEmp = getELE("luongCB").value;
    var positionEmp = getELE("chucvu").value;
    var hourEmp = getELE("gioLam").value;




    //TODO: Validation

    var isValid = true;


    //Account
    isValid &= validation.checkEmpty(accountEmp, "tbTKNV", "Tài khoản không để trống!") && validation.checkAccount(accountEmp, "tbTKNV", "Tài khoản chưa đúng định dạng !" ) && validation.checkAccIsExist(accountEmp, "tbTKNV", "Tài khoản không được trùng!",list.arrayEmployee);

    //Name

    isValid &= validation.checkEmpty(fullNameEmp, "tbTen", "Tên nhân viên không để trống!") && validation.checkName(fullNameEmp, "tbTen", "Tên nhân viên chưa đúng định dạng!");


    //Email: có dữ liệu ko, đúng định dạng không

    isValid &= validation.checkEmpty(emailEmp, "tbEmail", "Email không để trống!") && validation.checkEmail(emailEmp, "tbEmail", "Email chưa đúng định dạng!")

    //Pass
    isValid &= validation.checkEmpty(passEmp, "tbMatKhau", "Mật khẩu không để trống!") && validation.checkPass(passEmp, "tbMatKhau", "Mật khẩu chưa đúng định dạng!")


    //Date
    isValid &= validation.checkDate("datepicker", "tbNgay", "Ngày làm không hợp lệ!");


    //Salary

    isValid &= validation.checkEmpty(salaryEmp, "tbLuongCB", "Lương cơ bản không để trống!") && validation.checkSalary(salaryEmp, "tbLuongCB", "Lương cơ bản không hợp lệ!");

    //Position

    isValid &= validation.checkSelectPosition("chucvu", "tbChucVu", "Chức vụ không để trống !");


    //Working hour
    isValid &= validation.checkEmpty(hourEmp, "tbGiolam", " Giờ làm không để trống!") && validation.checkWorkingHourPerMonth(hourEmp, "tbGiolam", "Giờ làm không hợp lệ !");


     console.log(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp)

    if (isValid) {

        var emp = new Employee(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp);

        emp.calculateSalary(positionEmp)

        emp.classifyEmployee(hourEmp);

        list.addEmployee(emp);

        sortArrayEmp(list.arrayEmployee);

        showTable(list.arrayEmployee);

     

        setLocalStorage(list.arrayEmployee);

        
        swal("THÊM NHÂN VIÊN THÀNH CÔNG !", " Danh sách nhân viên đã được thêm !", "success");


    }


}


//function delete employee
function deleteEmp(acc) {

   

    swal({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Một khi đã xóa thì không thể phục hồi lại được!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

            list.deleteEmployee(acc);
           

            setLocalStorage(list.arrayEmployee);

            getLocalStorage();


          swal("Xóa thành công!", {
            icon: "success",
          });
        } else {
          swal(" Danh sách nhân viên vẫn giữ nguyên!");
        }
      });

    

}


//function show employee on table

function showEmp(acc) {

    var index = list.findIndexEmp(acc);
    if (index != -1) {



        getELE("tknv").value =list.arrayEmployee[index].account;
        getELE("tknv").disabled = true;

        getELE("name").value =list.arrayEmployee[index].fullName;
        getELE("email").value = list.arrayEmployee[index].email;
        getELE("password").value = list.arrayEmployee[index].pass;

        getELE("datepicker").value = list.arrayEmployee[index].workingDay;
        getELE("luongCB").value =list.arrayEmployee[index].salary;
        getELE("chucvu").value = list.arrayEmployee[index].position;
        getELE("gioLam").value = list.arrayEmployee[index].workingHourPerMOnth;

    }
}


function update() {

    var accountEmp = getELE("tknv").value;
    var fullNameEmp= getELE("name").value;
    var emailEmp = getELE("email").value;
    var passEmp = getELE("password").value;
    var workingDayEmp = getELE("datepicker").value;
    var salaryEmp = getELE("luongCB").value;
    var positionEmp = getELE("chucvu").value;
    var hourEmp = getELE("gioLam").value;


    //TODO: Validation

    var isValid = true;


    //Name

    isValid &= validation.checkEmpty(fullNameEmp, "tbTen", "Tên nhân viên không để trống!") && validation.checkName(fullNameEmp, "tbTen", "Tên nhân viên chưa đúng định dạng!");


    //Email: có dữ liệu ko, đúng định dạng không

    isValid &= validation.checkEmpty(emailEmp, "tbEmail", "Email không để trống!") && validation.checkEmail(emailEmp, "tbEmail", "Email chưa đúng định dạng!")

    //Pass
    isValid &= validation.checkEmpty(passEmp, "tbMatKhau", "Mật khẩu không để trống!") && validation.checkPass(passEmp, "tbMatKhau", "Mật khẩu chưa đúng định dạng!")


    //Date
    isValid &= validation.checkDate("datepicker", "tbNgay", "Ngày làm không hợp lệ !");



    //Salary

    isValid &= validation.checkEmpty(salaryEmp, "tbLuongCB", "Lương cơ bản không để trống!") && validation.checkSalary(salaryEmp, "tbLuongCB", "Lương cơ bản không hợp lệ!");

    //Position

    isValid &= validation.checkSelectPosition("chucvu", "tbChucVu", "Chức vụ không để trống !");


    //Working hour
    isValid &= validation.checkEmpty(hourEmp, "tbGiolam", " Giờ làm không để trống!") && validation.checkWorkingHourPerMonth(hourEmp, "tbGiolam", "Giờ làm không hợp lệ !");

    //TODO: call instance

    if( isValid){

    var emp = new Employee(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp);


    emp.calculateSalary( positionEmp);

    emp.classifyEmployee(hourEmp);


    list.updateEmployee(emp);

    setLocalStorage(list.arrayEmployee);

    getLocalStorage();

    
    swal("CẬP NHẬT THÀNH CÔNG !", "Danh sách nhân viên đã được cập nhật !", "success");

    }


}


// function search employee

function search() {
    var keyword = getELE("searchName").value;
    var resultArr = list.searchCategory(keyword);

    showTable(resultArr);
}


getELE("btnTimNV").onclick = search;


getELE("searchName").onkeyup = function(){
    var keyword = getELE("searchName").value;
    var resultArr = list.searchCategory(keyword);
    showTable(resultArr);
}

