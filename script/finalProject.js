// variables
let contactForm = document.getElementById("contactForm")
let textArea = document.getElementById("textArea")
let email = document.getElementById("email")
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let gallery = document.getElementById("gallery")
let dotsButtons = document.getElementsByClassName("dotsButton")
let tagImgs = document.getElementsByTagName("img")
console.log(dotsButtons)
if (dotsButtons.length > 0) {
    for (el of dotsButtons) {
        console.log(el)
        el.addEventListener("click", function(e) {
            readMore(e.target)
        })
    }
};

if (tagImgs.length > 0) {
    for (el of tagImgs) {
        console.log(el)
        el.addEventListener("click", function(e) {
            lightBox(e.target)
        })
    }
};

if (contactForm && textArea && email && firstName && lastName) {
    contactForm.addEventListener('submit', contactFormSubmit);
    textArea.addEventListener('keyup', textAreaMonitor);
    email.addEventListener('keyup', emailValid);
    firstName.addEventListener('keyup', firstNameValid);
    lastName.addEventListener('keyup', lastNameValid);
}

// stops the form submission for custom submission and actions
console.log(contactForm)

function contactFormSubmit(e) {
    e.preventDefault()
    let formData = new FormData(contactForm);
    console.log(formData);
    for (var data of formData) {
        console.log(data)
    }
    // todo: submit data somewhere
    thankYouSubmission()
}

// thank you message after contact form submit
function thankYouSubmission() {
    contactForm.style.display = "flex"
    contactForm.style.justifyContent = "center"
    contactForm.innerHTML = "Thank you for your submission. We will respond shortly."
}

// Function to monitor length of entry in text area to limit amount of text
console.log(textArea)

function textAreaMonitor(e) {
    console.log(e.target.value) //e is events of keyup. target is thing it happened to (text area). 
    let str = e.target.value
    let subStr = str.slice(0, 100)
    e.target.value = subStr
}

function emailValid(e) {
    let str = e.target.value
    if (isValidEmail(str)) {
        e.target.style.border = ""
    } else {
        e.target.style.border = "1px solid red"
    }

    function isValidEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str)) {
            return (true)
        }
        return (false)
    }
}


function firstNameValid(e) {
    let str = e.target.value
    if (firstNameValid(str)) {
        e.target.style.border = ""
    } else {
        e.target.style.border = "1px solid red"
    }

    function firstNameValid(firstName) {
        if (/^[a-zA-Z\-]+$/.test(str)) {
            return (true)
        }
        return (false)
    }
}

function lastNameValid(e) {
    let str = e.target.value
    if (lastNameValid(str)) {
        e.target.style.border = ""
    } else {
        e.target.style.border = "1px solid red"
    }

    function lastNameValid(lastName) {
        if (/^[a-zA-Z\-]+$/.test(str)) {
            return (true)
        }
        return (false)
    }
}

// gallery
if (gallery) {
    populateGallery()
}
//putting images into gallery
function populateGallery() {
    getDogImages()
        //getting dog images from dog api
    function getDogImages() {
        fetch('https://random.dog/doggos/')
            //line 49&50 specific to Fetch
            .then(response => response.json()) //looking at response and turning into JSON data
            .then(data => displayDogImages(data)); //taking JSON data and doing something
    }
    // take image file name and create an image source
    function generateDogSrc(dogImage) {
        return "https://random.dog/" + dogImage
    }
    // displaying dog images on page
    function displayDogImages(data) {
        for (var x = 0; x < 3; x++) {
            var img = data[x] //access image from array
            var src = generateDogSrc(img) //turning image name into url
            console.log(src)
            var dogCard = generateCard(src)
            gallery.innerHTML += dogCard //putting generateCard() onto page
        }
    }
    //turning source in bootstrap card text
    function generateCard(src) {
        return `<div class="dogImage">
            <div class="card mb-4 shadow-sm">
              <img src="${src}" class="bd-placeholder-img card-img-top" width="100%" height="300" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"/>
              
            </div>
          </div>` //backtick can have multiple lines and also interpolation(${}). write html and implant piece of text
    }
}

function readMore(el) {
    let parent = el.parentNode
    let dots = parent.querySelector(".dots")
    let more = parent.querySelector(".more")
    console.log(parent, dots, more)
    if (dots.style.display === "none") {
        dots.style.display = "inline";
        el.innerHTML = "Read more";
        more.style.display = "none";
    } else {
        dots.style.display = "none";
        el.innerHTML = "Read less";
        more.style.display = "inline";
    }

}

function lightBox(el) {
    console.log(el, el.src)
    let lb = generateLightbox()
    lb.addEventListener("click", removeLightBox)

    document.body.append(lb)

    function generateLightbox() {
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = el.src
        div.classList.add("lightBox")
        img.classList.add("lightBoxImage")
        div.append(img)
        return div
    }

    function removeLightBox(e) {
        document.body.removeChild(e.target);
    }
}