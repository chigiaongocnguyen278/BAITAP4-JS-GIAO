function Employee(account, fullName, email, pass, workingDay, salary, position, hour) {

    this.account = account;
    this.fullName = fullName;
    this.email = email;
    this.pass = pass;
    this.workingDay = workingDay;
    this.salary = salary;
    this.position = position;
    this.workingHourPerMOnth = hour;
    
    this.totalSalary= 0;
    this.category= "";
    
    this.calculateSalary = function(){
        this.totalSalary = salary ;
    }
    this.classifyEmployee = function(hour){
        if(hour>=192){
            return this.category = " Xuất sắc"

        } else if(hour>=176 && hour < 192){
            return this.category = " Giỏi "
        } else if (hour>=160 && hour < 176 ){
            return this.category = " Khá "
        } else {
            return this.category = " Trung bình"
        }
    }

}