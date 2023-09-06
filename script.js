let btn= document.getElementById("btn");
let input = document.getElementById("input");
let resultList = document.querySelector(".result-list");



// let getUrl = async (link) =>{
//     const url = `https://api.shrtco.de/v2/shorten?url=${link}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     srtLink = data.result.full_short_link
//     console.log(srtLink);
//     console.log(data);
//     return srtLink;
// }


// post request format

// let getUrl = async (link) =>{
//     const APIurl = "https://api.shrtco.de/v2/shorten";
//     let options = {
//         method : "POST",
//         headers : {
//             "Content-type" : "application/json"
//         },
//         body: JSON.stringify({
//             url : link
//         }),
//     }

//     const response = await fetch(APIurl, options);
//     const data = await response.json();
//     console.log(data);
// }


//get request format

let getUrl = async (link) =>{
    const APIurl = `https://api.shrtco.de/v2/shorten?url=${link}`;
    let options = {
        method : "GET",
    }
    try{
    const response = await fetch(APIurl, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    srtLink = data.result.full_short_link;
    console.log(srtLink);
    console.log(data);
    return srtLink;
    }
    catch{
        console.log("error");
        return window.alert("ENTER A VALID LINK");
    }
}

btn.addEventListener('click', async(e) =>{
    e.preventDefault();
    let link = input.value;
    
    if(link === ""){
        input.classList.add("effect");
        document.querySelector(".form").classList.add("visible");
    }
    else{
        input.classList.remove("effect");
        document.querySelector(".form").classList.remove("visible");
        
        let resultLink = await getUrl(link);
        
        let divtag = document.createElement('div');
        divtag.classList.add('div-tag');
        
        let realLink = document.createElement('span');
        realLink.innerHTML= link;
        realLink.classList.add('real-link');
        
        let divtag2 = document.createElement('div');
        divtag2.classList.add('div-tag2');
        
        let shortLink = document.createElement('span');
        shortLink.innerHTML= resultLink;
        shortLink.classList.add('short-link');
        
        let linkBtn = document.createElement('button');
        linkBtn.classList.add('link-btn');
        linkBtn.innerHTML = "copy";

        linkBtn.onclick = function () {
            linkBtn.innerHTML = "copied";
            linkBtn.classList.add('link-btn-effect');
            linkBtn.classList.remove('link-btn');
            copyTextToClipboard(resultLink); // Call the copyTextToClipboard function
        };
        
        // Insert the elements at the beginning of resultList
        divtag.appendChild(realLink);
        divtag.appendChild(divtag2);
        divtag2.appendChild(shortLink);
        divtag2.appendChild(linkBtn);
        resultList.insertBefore(divtag, resultList.firstChild);

        input.value = "";
    }
});




function copyTextToClipboard(resultLink) {
    const textArea = document.createElement("textarea");
    textArea.value = resultLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}