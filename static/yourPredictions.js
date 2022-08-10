// THE ONLY THING that is different from predictions.js is the fetch call

var startIndex = 0
var predictionsDiv = null

document.addEventListener('DOMContentLoaded', function() {
    predictionsDiv = document.getElementById('predictions')  // need to put in in here bc shouldn't be called before page is rendered
    console.log(predictionsDiv)

    

    fetch('/getPredictionsByUser')
    .then(response => response.json())
    .then(predictions => {
        var predictions = predictions
        console.log(predictions)
        loadTenPredictions(predictions)
        window.onscroll = infinite_scroll
    }) 
})


function loadTenPredictions(predictions) {
    if (startIndex >= predictions.length) {
        predictionsDiv.innerHTML += '<p> no more predictions to display </p>'
        window.onscroll = do_nothing
    }

    // avoids indexOutOfBounds error
    // if (startIndex+10 >= predictions.length) { 
    //     endIndex = predictions.length // (noninclusive)
    // } else {
    //     endIndex = startIndex+10
    // }
    let endIndex = (startIndex+10 >= predictions.length) ? predictions.length : startIndex+10

    predictions = predictions.slice(startIndex, endIndex)
    predictions.forEach((pred) => {
        const predDiv = document.createElement('div')
        predDiv.classList.add("d-flex")            
        predDiv.classList.add("flex-row")
        predDiv.classList.add("justify-content-center")

        predDiv.innerHTML += `<p class="pr-3"><strong>${pred.prediction}</strong> with <strong>${pred.certainty}%</strong> certainty (submitted at ${pred.date_submitted})</p>
                            <img src="../${pred.image_filepath}" width="25%" height="25%">`
        predDiv.setAttribute('id', `prediction-${pred.id}`)
        predictionsDiv.appendChild(predDiv)
        predictionsDiv.innerHTML += '<br><br>'
    })

    startIndex += 10
}





function infinite_scroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("loading more predictions....")
        fetch('/getPredictionsByUser')
        .then(response => response.json())
        .then(predictions => {
            loadTenPredictions(predictions)
        })
    }
}

function do_nothing() {
    // this is just for fun
    // I am aware that there are better ways to do this
}