console.log('amm connected');
function addNewField(){
    let  newtitle=document.createElement('input')
    let  newduration=document.createElement('input')
    let newNode = document.createElement('textarea')
    newNode.classList.add('name')
    newNode.classList.add('textarea')
    newtitle.classList.add('name')
    newtitle.classList.add('textarea')
    newduration.classList.add('name')
    newduration.classList.add('textarea')
    newNode.setAttribute('placeholder', 'Enter here')
    newtitle.setAttribute('placeholder', 'work')
    newduration.setAttribute('placeholder', 'duration')


    let weAddbtn = document.getElementById('weAddbtn')
    let we = document.getElementById('we')

    we.insertBefore(newtitle, weAddbtn)
    we.insertBefore(newduration, weAddbtn)
    we.insertBefore(newNode, weAddbtn)
   
}

function addAccField(){
    let  newtitle=document.createElement('input')
    let  newduration=document.createElement('input')
    let newNode = document.createElement('textarea')
    newtitle.classList.add('name', 'texto')
    newtitle.classList.add('textarea')
    newduration.classList.add('name', 'texto')
    newduration.classList.add('textarea')
    newNode.classList.add('name', 'texto')
    newNode.classList.add('textarea')
    newNode.setAttribute('placeholder', 'Enter here')
    newtitle.setAttribute('placeholder', 'school')
    newduration.setAttribute('placeholder', 'duration')

    let weAddbtn = document.getElementById('usAddBtn')
    let we = document.getElementById('us')

    we.insertBefore(newtitle, weAddbtn)
    we.insertBefore(newduration, weAddbtn)
    we.insertBefore(newNode, weAddbtn)
}
function addskill(){
    let newSkill=document.createElement('input')
    let newRange=document.createElement('input')
    newSkill.classList.add('skil')
    newSkill.classList.add('name')
   newRange.setAttribute('type',range);
    newRange.classList.add('name')
    let btn = document.getElementById('btn')
    let they = document.getElementById('they')
    they.insertBefore(newSkill, btn)
    they.insertBefore (newRange, btn)
}
function addlanguage(){
    let newlanguage=document.createElement('input')
    let newRange=document.createElement('input')
    newlanguage.classList.add('skil')
    newlanguage.classList.add('name')
   newRange.setAttribute('type',range);
    newRange.classList.add('name')
    let btn = document.getElementById('bttn')
    let they = document.getElementById('he')
    they.insertBefore(newlanguage, btn)
    they.insertBefore (newRange, btn)
}



function generateCV() {

    // setting the values
    document.getElementById('name1').innerHTML = document.getElementById('name').value;
    document.getElementById('place').innerHTML = document.getElementById('town').value;
    document.getElementById('prof').innerHTML = document.getElementById('profession').value;
    document.getElementById('mail').innerHTML = document.getElementById('email').value;
    document.getElementById('contact').innerHTML = document.getElementById('phone').value;
    document.getElementById('skill').innerHTML = document.getElementById('skills').value;
    document.getElementById('language').innerHTML = document.getElementById('languages').value;
    // document.getElementById('post').innerHTML = document.getElementById('work-title').value;
    document.getElementById('time').innerHTML = document.getElementById('work-duration').value;
    document.getElementById('work-resume').innerHTML = document.getElementById('work-body').value;
    document.getElementById('school').innerHTML = document.getElementById('school-title').value;
    document.getElementById('tme').innerHTML = document.getElementById('school-duration').value;
    // document.getElementById('school-resume').innerHTML = document.getElementById('school-body').value;


    // taking the variables
    let range = document.getElementById('range').value/5
     document.getElementById('loader').setAttribute('value', range)

     let rang = document.getElementById('rang').value/5
     document.getElementById('load').setAttribute('value', rang)

    let info = document.getElementById('main');
    let cv = document.getElementById('content')
    
    // display when clickedd
    info.style.display = 'none'
    cv.style.display = 'flex'
    console.log(range)
    console.log(rang)

    let christy = document.getElementsByClassName('texto')
    let str = []

    for(let e of christy){
        str.push(`<li>${e.value}</li>`)
    }

    document.getElementById('post').innerHTML = str
    console.log(str);
//    setAttribute('value', `${range}`)
    
    // i think you can contuine here ZENITH?? IF NOT WRITE TO ME ON WHATSAPP
    
    // THANKS <ZENITH>
}
 
