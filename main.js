
let opts = document.querySelectorAll(".item_content");
let select_opt = opts[0];
let nav_line = document.querySelector("#navline");
let f_submit = document.querySelector(".form_btn");
let data = {0: ["Sachin", "226301188@gkv.ac.in", "2023", "Migration Certificate"],
            1: ["Kamal", "226301104@gkv.ac.in", "2023", "Bonafide Certificate"],
            1: ["Rohit", "226301104@gkv.ac.in", "2023", "Admission Letter"]};
let login_btn = document.querySelector(".login_submit_box");
let login = false;
let user = "Namaste";
let pass = "Namaste01";

function select_opts(element) {
    element.style.backgroundColor = "white";
    element.style.color = "black";
    let p = element.children[0].children[0].children[0]
    p.style.fill = "black";
    select_opt = element;
}


function deselect_opts(element) {
    element.style.backgroundColor = "black";
    element.style.color = "white";
    let p = element.children[0].children[0].children[0]
    p.style.fill = "white";
}

function move_navline(pos) {
    nav_line.style.top = `${pos}px`;
}

function select_frame(opt) {
    let a = "." + select_opt.id + "_content";
    let f = document.querySelector(a);
    f.style.opacity = "0";
    f.style.display = "none";
    f = document.querySelector("." + opt + "_content");
    f.style.opacity = "0";
    f.style.display = "inline-block";
    f.style.width = "calc(100vw - 100px)";
    f.style.animationName = "fade_in_ani";
    f.style.animationDuration = "0.2s";
    f.style.animationTimingFunction = "ease-out";
    f.style.animationFillMode = "forwards";
}

function incomplete() {
    alert("FORM IS INCOMPLETE!");
}

function submit_form() {
    let inp = document.querySelectorAll(".form_input");
    let data_ = [];
    inp.forEach(e => {
        if (e.id == "proof") {
            null;
        }
        else {
            data_.push(e.value);
        }
    });
    inp = document.querySelector(".year_select");
    data_.push(inp.value);
    inp = document.getElementById("form_text_area");
    data_.push(inp.value);
    data[data.length] = data_;
    console.log(data);
    alert("FORM SUBMITTED");
}

function check_all() {
    let i = document.querySelectorAll(".form_input");
    let c = true;
    i.forEach(e => {
        console.log(e);
        if (e.value == "") {
            c = false;
        }
    });
    i = document.getElementById("form_text_area");
    if (i.values == "") {
        c = false;
    }
    if (c) {
        submit_form();
    }
    else {
        incomplete();
    }
}

function login_staff(){
    let ni = document.querySelectorAll(".login_input_box");
    let p = true;
    ni.forEach(e => {
        if (e.value == ""){
            p = false;
        }
    });
    if (p){
        let q = false
        if(ni[0].value == user && ni[1].value == pass){
            login = true;
            login_btn.children[0].innerHTML = "LOGOUT";
            alert("LOGIN SUCCESFULLY!");
        }
        else{
            alert("INVALID USERNAME AND PASSWORD!");
        }
    }
    else{
        alert("INVALID USERNAME AND PASSWORD!");
    }
}

function addData(){
    let values = Object.values(data);
    values.forEach(element => {
        let a = document.querySelector(".main_status_container");
        a.innerHTML += `<div class="student_detail" id="${element[0]}"></div>`;
        a = document.getElementById(element[0]);
        a.innerHTML += `<div class="student_detail_box" id="${element[0]}_detail_box"></div>`;
        a.innerHTML += `<div class="status_button_box"><button class="status_btn">ACCEPT</button><button class="status_btn">DECLINE</button></div>`;
        a = document.getElementById(`${element[0]}_detail_box`);
        a.innerHTML += `<div class="name_year">${element[0]} ${element[2]}</div>
        <div class="status_email">${element[1]}</div>
        <div class="status_why">${element[3]}</div>`;
    });
}

opts.forEach(element => {
    element.addEventListener('click', () => {
        if (element != select_opt) {
            if (element.id != "status") {
                deselect_opts(select_opt);
                select_frame(element.id);
                select_opts(element);
                move_navline(element.getBoundingClientRect().y - 5);
            }
            else if (!login) {
                alert("PLEASE LOGIN FIRST!");
            }
            else {
                addData();
                deselect_opts(select_opt);
                select_frame(element.id);
                select_opts(element);
                move_navline(element.getBoundingClientRect().y - 5);
            }
        }
    });
});

f_submit.addEventListener('click', () => {
    check_all();
});
login_btn.addEventListener('click', () => {
    if(!login){
        login_staff();
    }
    else{
        login = false;
        login_btn.children[0].innerHTML = "LOGIN";
        let ni = document.querySelectorAll(".login_input_box");
        ni.forEach(e => {
        e.value = "";
    });
    }
});

select_opts(select_opt);
select_frame(select_opt.id);
