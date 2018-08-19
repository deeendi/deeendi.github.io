(function () {
    document.addEventListener("DOMContentLoaded", function (event) {
        var save = document.getElementById('Save');
        var name = document.getElementById('name');
        var pName = document.getElementById('num');
        var list = document.querySelector('.wrapper');
        var phone = document.getElementById('phone');
        var searchBlock = document.getElementById('filter');
        var New = document.getElementById('AddContactBlock');
        var edit = document.getElementById('EditContactBlock');
        var addContact = document.getElementById('AddContact');
        var cancel = document.getElementById('Cancel');
        var main = document.getElementById('Main');
        var editBtn = document.getElementById('edit');
        var removeBtn =  document.getElementById ('del');
        var selectedContact =  document.getElementById('selectedContact');
        addContact.addEventListener('click', function () {
            main.innerHTML = 'New contact';
            cancel.style.display = 'block';
            save.style.display = 'block';
            addContact.style.display = 'none';
            searchBlock.style.display = 'none';
            New.style.display = 'block';
            name.value = '';
            phone.value = '';
        });
        cancel.addEventListener('click',function(){
            New.style.display = 'none';
            window.location.reload();
        });
        save.addEventListener("click", function (e) {
            var isFull = name.value!='' && phone.value!='';
            if(isFull) {
                var obj = new objJson(name.value, phone.value);
                phoneBook.push(obj);
                localStorage['wrapper'] = JSON.stringify(phoneBook);
                New.style.display = 'none';

                show();
            }
            window.location.reload();
        });
        list.addEventListener("click",function(e){
            if(e.target.classList.contains('open')){
                var index = e.target.getAttribute('id');
                selectedContact.style.display = 'block';
                cancel.style.display = 'block';
                cancel.innerHTML = '<i class="fas fa-chevron-left"></i>';
                save.style.display = 'none';
                searchBlock.style.display = 'none';
                selectedContact.style.display = 'block';
                name.value = phoneBook[index].name;
                phone.value = phoneBook[index].phone;
                main.innerHTML = name.value;
                pName.innerHTML = phone.value;
                addContact.style.display = 'none';

            }
            editBtn.addEventListener("click", function(){
                editBtn.style.display = 'none';
                removeBtn.style.display = 'none';
                edit.style.display = 'block';
                name.style.display = 'block';
                save.style.display = 'inline-block';
                name.value = phoneBook[index].name;
                phone.value = phoneBook[index].phone;
                cancel.innerHTML = '<i class="far fa-trash-alt" id="del"></i>';
                main.innerHTML = 'Edit';
                phoneBook.splice(index,1);
                localStorage['wrapper'] = JSON.stringify(phoneBook);
                addContact.style.display = 'none';
                show();
            });
            removeBtn.addEventListener("click",function () {
                var r = confirm("Do you really want to delete?");
                if (r == true) {
                    phoneBook.splice(index,1);
                    localStorage['wrapper'] = JSON.stringify(phoneBook);
                    main.style.display = 'none';
                    show();
                    window.location.reload();
                }
            });
        });
        list.addEventListener("click", function (e) {
            if(e.target.classList.contains('removeBtn')){
                var remID = e.target.getAttribute('data-id');
                var r = confirm("Do you really want to delete?");
                if (r === true) {
                    return true;
                    phoneBook.splice(remID,1);
                    localStorage['wrapper'] = JSON.stringify(phoneBook);
                    show();
                }
            }
        });
        var phoneBook = [];
        function compare(a,b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }
        function filterByName(item) {
            for(var i=0;i<item.name.length;i++){
                if (item.name[i] === searchBlock.value ||
                    item.name[i].toLowerCase() === searchBlock.value||
                    item.name === searchBlock.value ||
                    item.name.toLowerCase() === searchBlock.value||
                    item.name.toLowerCase().includes(searchBlock.value.toLowerCase())) {
                    return true;
                }
                else{
                    return false;
                }
            }

        }
        searchBlock.addEventListener('input',function () {
            if(searchBlock.value === ''){
                show();
            }else{
                var contacts = phoneBook.filter(filterByName);
                 list.innerHTML = '';
                for(var i=0;i<contacts.length;i++){
                    phoneBook.sort(compare);
                    var adding = '<div id="contact">';
                    adding += '<i class="fas fa-user-circle"></i>';
                    adding += '<div class="name"><p class="open" id="'+i+'">' + contacts[i].name + '</p></div>';
                    adding += '</div>';
                    list.innerHTML += adding;
                    console.log(contacts);
                }
            }


        });
        function objJson(name,phone){
            this.name = name;
            this.phone = phone;
        }
        function show(){
            if(localStorage['wrapper'] === undefined){
                localStorage['wrapper'] = '';
            } else {
                phoneBook = JSON.parse(localStorage['wrapper']);
                list.innerHTML = '';
                for(var i=0;i<phoneBook.length;i++){
                    phoneBook.sort(compare);
                    var adding = '<div id="contact">';
                    adding += '<i class="fas fa-user-circle"></i>';
                    adding += '<div class="name"><p class="open" id="'+i+'">' + phoneBook[i].name + '</p></div>';
                    adding += '</div>';
                    list.innerHTML += adding;
                    console.log(phoneBook);
                }
            }
        }
        show();
    });
    })();































// firstSearch=function(){
//     d.innerHTML=""
//     input.style.color=null
//     var out=search(input.value)
//     if(out.length<1) return secondSearch()
//     var str=out.join("<br><br>")
//     d.innerHTML=str
// }
//
// secondSearch=function(){
//     input.style.color="red"
//     d.innerHTML="Нет результатов для <b>"+input.value+"</b>"
// }
// onload=firstSearch
// input.oninput=firstSearch
// input.focus()
// onkeydown=function(){input.focus()}
