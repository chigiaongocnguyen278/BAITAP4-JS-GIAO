/**
 * + Thêm
 *    + validation
 * + Xóa
 * + Sửa
 * + Tìm kiếm
 */

//instance
const list = new ListOfEmployee();
const validation = new Validation();


function getELE(id) {

    return document.getElementById(id);
}
function getClassOfEle(classname) {

    return document.querySelector(classname);
}



function showTable(array) {
 
    var content = "";
   
    array.map(function (emp) {
       
        var trELE = `<tr>
            <td>${emp.account}</td>
            <td>${emp.fullName}</td>
            <td>${emp.email}</td>
            <td>${emp.workingDay}</td>
      
            <td>${emp.position}</td>

            <td>${emp.totalSalary}</td>
            <td>${emp.category}</td>
             <td>
              <button onclick="deleteEmp('${emp.account}')" class="btn btn-danger">Delete</button>
                <button data-toggle="modal"
                data-target="#myModal" onclick="showEmp('${emp.account}')"  class="btn btn-info" >Show Details</button>
             </td>
        </tr>`
        
        content += trELE;
    })
       document.getElementById("tableDanhSach").innerHTML = content;
        // getElE("tableDanhSach").innerHTML = content;
}
// <td>
            //     <button onclick="xoaSinhVien('${sv.maSV}')"   class="btn btn-danger"  >Xóa</button>//
            //     <button onclick="xemChiTiet('${sv.maSV}')"       class="btn btn-info" >Xem</button>
            // </td>

//Local storage : lưu trữ ở trình duyệt của người dùng
// Lưu các thông tin không bảo mật, giảm tải dung lượng cho BE, tăng performance

function setLocalStorage(array) {
    
        localStorage.setItem("List-Of-Employee", JSON.stringify(array));

}

function getLocalStorage() {

       if (localStorage.getItem("List-Of-Employee") != null) {
       
        list.arrayEmployee = JSON.parse(localStorage.getItem("List-Of-Employee"));
        showTable(list.arrayEmployee);
      }


}
getLocalStorage();//gọi khi load trang


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
    isValid &= validation.checkEmpty(workingDayEmp, "tbNgay", "Ngày làm không để trống!") 


    //Salary

    isValid &= validation.checkEmpty(salaryEmp, "tbLuongCB", "Lương cơ bản không để trống!") && validation.checkSalary(salaryEmp, "tbLuongCB", "Lương cơ bản không hợp lệ!");

    //Position

    isValid &= validation.checkSelectPosition("chucvu", "tbChucVu", "Chức vụ không để trống !");
    //Date
    isValid &= validation.checkDate("datepicker", "tbNgay", "Ngày làm không để trống !");
    console.log('110',document.getElementById("datepicker").value)

    //Working hour
    isValid &= validation.checkEmpty(hourEmp, "tbGiolam", " Giờ làm không để trống!") && validation.checkWorkingHourPerMonth(hourEmp, "tbGiolam", "Giờ làm không hợp lệ !");


     console.log(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp)
    if (isValid) {
        
        var emp = new Employee(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp);

        emp.calculateSalary()

        emp.classifyEmployee(hourEmp);
       
        list.addEmployee(emp);
    
        showTable(list.arrayEmployee);
        setLocalStorage(list.arrayEmployee);
    }



}



function deleteEmp(acc) {
  
    list.deleteEmployee(acc);
    setLocalStorage(list.arrayEmployee);
 
    getLocalStorage();

}




function showEmp(acc) {
    
    var index = list.findIndexEmp(acc);
    if (index != -1) {
     
        console.log(list.arrayEmployee[index]);

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
   

    var emp = new Employee(accountEmp, fullNameEmp, emailEmp, passEmp, workingDayEmp, salaryEmp, positionEmp, hourEmp);

    emp.calculateSalary();

    emp.classifyEmployee(hourEmp);

    //TODO: call method
    list.updateEmployee(emp);

    setLocalStorage(list.arrayEmployee);
    getLocalStorage();

}




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
