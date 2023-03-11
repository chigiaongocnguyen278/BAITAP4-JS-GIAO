function Validation() {
     // check if input is empty
    this.checkEmpty = function (valueInput, spanID, message) {
        if (valueInput == "") {
      
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
    }
     
     //account

    this.checkAccIsExist = function (valueInput, spanID, message, array) {

        var isExist = false;
    
        isExist = array.some(function (emp) {
            return valueInput === emp.account
        });

        if (isExist) {
      
             document.getElementById(spanID).style.display = "block";
             document.getElementById(spanID).innerHTML = message;
            return false
        } else {
     
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
           return true
        }

    }


   
    this.checkAccount = function (valueInput, spanID, message) {
        var pattern = /^([0-9]{4,6})$/;

        if (valueInput.match(pattern)) {
         
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    }


    //name
    this.checkName = function (valueInput, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;

       
        if (valueInput.match(pattern)) {
         ;
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    }


    //email
    this.checkEmail = function (valueInput, spanID, message) {
        var pattern= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     
        if (valueInput.match(pattern)) {
         
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
      }

      //pass
    this.checkPass = function (valueInput, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

        if (valueInput.match(pattern)) {
         
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    }


    //date
     //?function to check if input is empty and convert valid date to  format mm/dd/yyyy

    this.checkDate = function (valueInput, spanID, message){
        var date = new Date(document.getElementById(valueInput).value);

        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
       
        if(  date.toString() !== 'Invalid Date'   ){
             

            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";


             document.getElementById(valueInput).value = ((''+month).length<2 ? '0' : '') + month  + '/' +
            ((''+day).length<2 ? '0' : '') + day + '/' + year;
            
        
        return true;
            
        } else  {
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    
        }

        
        
    }

    // this.dateCorrectForm = function(valueInput){
    //     document.getElementById(valueInput).value = ((''+month).length<2 ? '0' : '') + month  + '/' +
    //     ((''+day).length<2 ? '0' : '') + day + '/' + year;
    // }


     //salary
    this.checkSalary = function (valueInput, spanID, message) {
        

        if (valueInput >= 1000000 && valueInput <= 20000000) {
         
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    }




    //position
    this.checkSelectPosition = function (selectID, spanID, message) {
        var indexOption = document.getElementById(selectID).selectedIndex;

        if (indexOption !== 0) {
  
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false

    }

    //working hour
    this.checkWorkingHourPerMonth = function (valueInput, spanID, message) {
      

        if (valueInput >= 80 && valueInput <= 200 ) {
       
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
    }
}
