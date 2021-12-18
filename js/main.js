let numbers = 20
let times = 4
let timePlay = -1
let content = ""
let contentRs = ""
let start = 0
let end = 0
for (i = 1; i <= times; i++) {
    $("#times").append('<span class="times-item"></span>')
}
for (i = 1; i <= numbers; i++) {
    $("#numbers").append(`<button class="btn btn-number">${i}</button>`)
}

function secretNumber() {
    return Math.floor(Math.random() * numbers) + 1
}

let result = secretNumber()

let btnNumbers = $(".btn-number")
let active = $(".times-item")
let btnPlayAgain = $("#btn-play-again")
let btnHelp = $(".help")

btnNumbers.click(function() {
    let number = $(this).text()
    $(this).css("background-color", "#dc3545")
    timePlay++
    $(active[timePlay]).addClass("active")
    if (number < result) {
        content += `<div class="log-item">
        <span class="badge bg-warning">Sai rồi!</span>
        <p>${timePlay+1}. Lần ${timePlay+1}: ${number} - Số của bạn nhỏ hơn số bí mật</p>
    </div>`
        if (number < result && number > start) {
            start = number
        }


    }
    if (number > result) {
        content += `<div class="log-item">
        <span class="badge bg-warning">Sai rồi!</span>
        <p>${timePlay+1}. Lần ${timePlay+1}: ${number} - Số của bạn lớn hơn số bí mật</p>
    </div>`
        if (number > result && number < end) {
            end = number
        }
    }
    if (number == result) {
        content += `
        <span class="badge bg-success">Đúng rồi !!! Sơn thiệt là giỏi ^^!</span>
        `
        contentRs = `<h4 class="me-3">Số bí mật: </h4>
        <h2><span id="result-display" class="badge bg-success">${result}</span></h2>`
        btnNumbers.attr("disabled", "")
    }
    if (timePlay + 1 == times) {
        btnNumbers.attr("disabled", "")
        contentRs = `<h4 class="me-3">Số bí mật: </h4>
        <h2><span id="result-display" class="badge bg-success">${result}</span></h2>`
    }
    $("#logs").html(content)
    $("#result").html(contentRs)

})

btnPlayAgain.click(function() {
    active.removeClass("active")
    timePlay = -1
    $(".btn-number").css("background-color", "")
    btnNumbers.removeAttr("disabled")
    $(".log-item").removeClass("log-item")
    content = ""
    contentRs = ""
    $("#logs").html(content)
    $("#result").html(contentRs)
    result = secretNumber()
    start = 0
    end = 0
})

btnHelp.click(function() {
    console.log(start)
    console.log(end)
    if (start < result) {
        btnNumbers.filter(function(item) {
            return item < start;
        }).attr("disabled", "").css("background-color", "grey")
    }

    if (end > result) {
        btnNumbers.filter(function(item) {
            return item + 1 >= end;
        }).attr("disabled", "").css("background-color", "grey")
    }
})