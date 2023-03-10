function ListOfEmployee() {
 
    
    this.arrayEmployee = [];

    
    this.addEmployee = function (emp) {
        this.arrayEmployee.push(emp);
    }

    this.findIndexEmp = function (accountNumber) {
    
        var indexFind = -1;
        
        indexFind = this.arrayEmployee.findIndex(function (emp) {
        
            return emp.account == accountNumber;
        })

            return indexFind;
    }


    this.deleteEmployee = function (accountNumber) {
        
        var index = this.findIndexEmp(accountNumber);
      
        if (index != -1) {
            
            this.arrayEmployee.splice(index, 1);
        }

    }

    this.updateEmployee = function (emp) {

        var index = this.findIndexEmp(emp.account);
        if (index != -1) {
           
            this.arrayEmployee[index] = emp;
        }
    }



}




ListOfEmployee.prototype.searchCategory = function (keyword) {

    var arrayResult = [];
   
    var keywordLowerCase = keyword.toLowerCase();

    keywordLowerCase = keywordLowerCase.replace(/\s/g, "");

 
    this.arrayEmployee.map(function (emp) {
        var categoryLowerCase = emp.category.toLowerCase().replace(/\s/g, "");
       

        if (categoryLowerCase.indexOf(keywordLowerCase) > -1) {
          
            arrayResult.push(emp);
        }

    });

    return arrayResult;


}