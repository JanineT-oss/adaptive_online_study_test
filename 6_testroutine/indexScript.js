
 document.getElementById('postForm').addEventListener('submit', postName);
 console.log('entering javascript file...');

 function postName(e){
    e.preventDefault();
    
    var name = document.getElementById('name').value;
    var params = "name="+name;

    console.log(params);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'sending.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload=function(){
        console.log(this.responseText);
    }

    xhr.send(JSON.stringify(params));
}

