window.addEventListener("DOMContentLoaded", () => {
    let counters = document.querySelectorAll(".counter")
    counters.forEach(initCounter)
})

function initCounter(element) {
    let maxValue = element.dataset.max
    const TOTAL_TIME = 1000

    let currentValue = 0
    let index = 0
    function animate(currentTime) {
        index += 1
        if (index % 2) {
            requestAnimationFrame(animate)
            return
        }

        let currentValue = (currentTime - startTime) * maxValue / TOTAL_TIME
        if (currentValue <= maxValue) {
            element.innerHTML = Math.floor(currentValue)
            requestAnimationFrame(animate)
        } else {
            element.innerHTML = maxValue
        }
    }

    let startTime = document.timeline.currentTime
    requestAnimationFrame(animate)
}
