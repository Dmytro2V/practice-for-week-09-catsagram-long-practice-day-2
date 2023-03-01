//import { goInteractive } from './interactive.js';
export const createMainContent = () => {
    // set global var
    let score = 0;

    // Create h1
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";

    //Create divScore:
    const divScore = document.createElement("div");
    divScore.innerText = 'Popularity Score: '
    divScore.style.fontWeight = 'bold'
    divScore.style.fontSize = '18px'
    divScore.style.margin = "20px";
    //Create spanScore:
    const spanScore = document.createElement("span");
    spanScore.innerText = score;

    //Create divButtons:
    const divButtons = document.createElement("div");


    // create buttonUpvote:    
    const buttonUpvote = document.createElement("button")
    buttonUpvote.innerText = 'Upvote'
    buttonUpvote.style.margin = '5px'

    // create buttonDownvote
    const buttonDownvote = document.createElement("button")
    buttonDownvote.innerText = 'Downvote'
    buttonDownvote.style.margin = '5px'

    // -------form--------------
    
    const divPseudoForm = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", "comment");
    label.innerText = 'Comment: ';
    const input = document.createElement("input");
    input.setAttribute("type", "text")
    input.setAttribute("name", "comment")
    input.setAttribute("placeholder", "Add a comment...")
    input.setAttribute("required", "")

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit")
    submit.style.margin = '10px'
    // ----------- New Image ---------------
    const buttonNewImage = document.createElement("button")
    buttonNewImage.innerText = 'New Image!';
    buttonNewImage.style.margin = '1px';
    //-------- comment section -------------
    const comments = document.createElement('section')
    comments.style = `
    width:600px;height: 300px;border:solid 2px gainsboro;
    box-shadow: inset -12px -12px #F9F9F9, inset -13px -13px gainsboro;
    `
    comments.style.margin = '10px'

    // ---------------appending------------------
    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(img);

    container.appendChild(divScore);
    divScore.appendChild(spanScore)

    container.appendChild(divButtons);
    divButtons.appendChild(buttonUpvote);
    divButtons.appendChild(buttonDownvote);

    container.appendChild(divPseudoForm);
    divPseudoForm.appendChild(label);
    divPseudoForm.appendChild(input);
    divPseudoForm.appendChild(submit);

    container.appendChild(buttonNewImage);

    container.appendChild(comments);

    fetchImage();

    // ==================events=====================
    container.addEventListener('click', event => {
        console.log('clicked on ', event.target)
        switch (event.target) {
            case buttonUpvote:
                console.log('case ', 'Upvote')
                changeScore(spanScore, 1);
                break;
            case buttonDownvote:
                console.log('case ', 'Downvote')
                changeScore(spanScore, -1);
                break;
            case buttonNewImage:
                console.log('case ', 'New Image')
                setNewImage();
                break;
            case submit:
                console.log('case ', 'Submit button')                
                console.log('input before call', input.value);
                
                addComment(input.value)
                input.value = ''
                break;
        }
    
    })

    // alterning functions
    function changeScore(element, change) {
        if (change === 0) score = 0;
        element.innerText = score += change;
    }
    function addComment(comment) {        
        if (comment === '') {
           console.log('empty');
          return;
        }
        const newComment = document.createElement('div')
        newComment.innerText = "• " + comment;
        newComment.style =`
        color:blue;`
        comments.appendChild(newComment)        
    }
    function setNewImage() {
        // change image, reset score, remove comments
        fetchImage();
        changeScore(spanScore, 0);
        comments.replaceChildren();
    }
};

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};
