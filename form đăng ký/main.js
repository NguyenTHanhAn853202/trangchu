

    
function waring(element,objectForms,value,e) {
    // lấy thẻ ông của thẻ input
    var parentInputElement = element.parentElement.parentElement;
    // lấy thẻ span báo lỗi quan thẻ cha qua thẻ cha
    var waringText = parentInputElement.querySelector(objectForms.waringText)
    var waringIcon = parentInputElement.querySelector(objectForms.waringIcon)
    // lấy ra value của hàm test
    // console.log(element.target.value);
    if (!value) {
        succeed(element,waringText,waringIcon,objectForms)
        
    }
    else {
        fail(element,waringText,waringIcon,objectForms,value)
        if (e) {
            e.preventDefault()
        }
    }
}
// hàm hiển thị khi không hợp lệ

function fail(element,waringText,waringIcon,objectForms,valueCheck){
    
    waringText.textContent =valueCheck
    element.classList.add(objectForms.inputWaring)  
    waringIcon.classList.add(objectForms.zIndex)
    element.classList.remove(objectForms.succeed) 
    
    // setInterval(function(){
    //     waringIcon.classList.toggle(objectForms.zIndex)
    // },500)
    
    
}
// hàm hiển thị khi hợp lệ
function succeed(element,waringText,waringIcon,objectForms){

    waringText.textContent =''
    element.classList.remove(objectForms.inputWaring)  
    waringIcon.classList.remove(objectForms.zIndex)
    element.classList.add(objectForms.succeed) 
}

// hàm kiểm tra blur

function testOnblur(element,objectForms,test=null,e){
    
    var valueCheck = test(element.value)
        // không hợp lệ
    waring(element,objectForms,valueCheck,e)
    // hợp lệ
    

} 
// check password

function supporCheckPass( passValue,checkPassValue ){
    if (passValue.trim()===checkPassValue.trim() && passValue.trim()!=='') {
        return 1
    }
    else if(checkPassValue.trim()==='') return 2;

    return 0
}

function announce(element,objectForms,passwordElement){

    if (supporCheckPass(element.value,passwordElement.value)===1) {
        waring(element,objectForms)
   
    }
    else if(supporCheckPass(element.value,passwordElement.value)===2) {
        var valueCheck='Vui Lòng nhập mật khẩu'
        waring(element,objectForms,valueCheck)
       
    }
    else{
        var valueCheck='Mật khẩu không trùng khớp'
        waring(element,objectForms,valueCheck)
        
    }
}

function checkPassWord(element,objectForms,formElement){
    // lấy ra element input password
    var checkpasswordElement =  formElement.querySelector(objectForms.checkpass)

    var passwordElement = formElement.querySelector(objectForms.pass)
    // var ganElement
    if (checkpasswordElement===element) {
        
        announce(element,objectForms,passwordElement)
        
    }
    else if(element===passwordElement)
    {
        if (checkpasswordElement.value.trim()!=='') {
            announce(checkpasswordElement,objectForms,passwordElement)
        }
    }
}
function checkPassSubmit(checkpasswordElement,objectForms,formElement,e){
   
    var passwordElement = formElement.querySelector(objectForms.pass)
    console.log(checkpasswordElement.value,passwordElement.value)
       if (checkpasswordElement.value !== passwordElement.value) {
           
        //  waring(checkpasswordElement,objectForms)
            var valueCheck='Mật khẩu không trùng khớp'
            waring(checkpasswordElement,objectForms,valueCheck)
            e.preventDefault()
       }
    // Thanhan123@ Thanhan123@
}

function objectForm(objectForms){

    // lấy form-1 bằng key của obj truyền vào
    if (objectForms) {
        var formElement = document.querySelector(objectForms.form)
        if (formElement) {
            // duyệt qua các phần tử để lấy element trong mãng rules
            objectForms.rules.forEach(function (rule,index) {
                var inputElement = formElement.querySelector(rule.selection)
 
                inputElement.onblur = function(element){
                    // element là obj của input
                    testOnblur(element.target,objectForms,rule.test)
                    // hàm checkpass
                    
                    checkPassWord(element.target,objectForms,formElement)
                    console.log(element.target.value)
                }
                inputElement.oninput = function (element)
                {
                    testOnblur(element.target,objectForms,rule.test)
                    
                }
            });

            formElement.onsubmit = function(e)
            {
                // e.preventDefault()
                // lấy các hàm cần thiết để kiểm tra checkTick
                var tickElement = formElement.querySelector(objectForms.tick)
                parentTick = tickElement.parentElement;
                TextTick =parentTick.querySelector('.account__text')
                // console.log(e)
            //    check xem đã tích vào đồng ý hayc chưa nếu chưa thì bôi đỏ
                if (!tickElement.checked) {
                    TextTick.classList.add('waring__text-account');
                    e.preventDefault()
                }else {
                    TextTick.classList.remove('waring__text-account')                    
                }
                // kiểm tra xem có thẻ input nào chưa điền hay không nếu có
                // thì báo waring khi bấm submit
                objectForms.rules.forEach(function (rule){
                    let inputElement = formElement.querySelector(rule.selection)
                    testOnblur(inputElement,objectForms,rule.test,e)
                    
                });
                var checkpasswordElement = formElement.querySelector(objectForms.checkpass)
                
                checkPassSubmit(checkpasswordElement,objectForms,formElement,e)
                
            }
        }
    }


}





objectForm.isFullname = function(selection){
    return {
        selection:selection,
        test: function(value){
            return value.trim()?undefined : 'Lỗi, vui lòng nhập đúng cú pháp'
        }
    }
}

objectForm.isEmail = function(selection) {
    return {
        selection:selection,
        test: function(value){
            var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return checkEmail.test(value)?undefined : 'Lỗi, vui lòng nhập đúng cú pháp'
        }
    }
}

function conditionPassword(value) {
    var demnumber = 0;
    var demstr = 0;
    var special = 0;
    var demstrupper= 0
    for (let index = 0; index < value.length; index++) {
       if (value[index]<='9' && value[index]>='0') {
           demnumber++;
       }
       else if (value[index]<='Z' && value[index]>='A')
       {
           demstr++
       }
       else if(value[index]<='z' && value[index]>='a')
       {
           demstrupper++
       }
       else special++;
    }
    if (demnumber>0 && demstr>0 && special>0 &&demstrupper>0) {
        return true;
    }
    else return false;
}

objectForm.isPassword = function (selection,min,max){
    return {
        selection:selection,
        test:function (value){
            return value.trim().length>=min && value.trim().length<=max 
            &&conditionPassword(value)?
            undefined :` Lỗi, 
            Mật khẩu phải có độ dài lớn hơn ${min-1} và nhỏ hơn ${max+1}`
        }
    }
}

objectForm.ischeckpass = function (selection){
    return{
        selection: selection,
        test: function(value){
            return value.trim()?undefined:'Lỗi, vui lòng nhập đúng cú pháp'
        }
    }
}

