document.addEventListener('DOMContentLoaded', function() {
    form = document.querySelector('#image_submission_form')
    predictBtn = document.querySelector('#predict_button')
    chooseFileBtn = document.querySelector('#image_file')
    predictBtn.setAttribute('disabled',"")  
})

// heartbeat function, checks whether a file has been submitted and enables the predict button if so (if not already enabled)
setInterval(function () {
    console.log('heart beating')
    if (chooseFileBtn.files.length > 0) {
        if (predictBtn.hasAttribute('disabled')) {
            predictBtn.removeAttribute('disabled')
        }
    }
    else {
        predictBtn.setAttribute('disabled',"")
    }
}, 500)
