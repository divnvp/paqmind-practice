window.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector(".nav")
    document.fonts.ready.then(() => {
        initNav(nav)
    })
})

function initNav(nav) {
    let links = [...nav.querySelectorAll("a")]
    let sections = links.map(link => document.querySelector(
        link.getAttribute("href"))
    )

    // scroll to the relevant section when clicking on the link in the navigation
    links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault()

            let sectionY = sections[index].getBoundingClientRect().y
            let navHeight = nav.getBoundingClientRect().height

            window.scrollTo({
                behavior: "smooth",
                top: window.scrollY + sectionY - navHeight
            })
        })
    })

    // highlight an active navigation link
    let navHeight = nav.getBoundingClientRect().height
    let screenHeight = document.documentElement.clientHeight

    let options = {
        rootMargin: `-${navHeight}px 0px -${screenHeight - navHeight - 4}px 0px`
    }

    let currentId = null
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && currentId !== entry.target.id) {
                    currentId = entry.target.id
                    nav.querySelector("a.active")?.classList.remove("active")
                    nav.querySelector(`a[href="#${currentId}"]`)
                        .classList.add("active")
                } else if (!entry.isIntersecting && currentId === entry.target.id) {
                    nav.querySelector("a.active").classList.remove("active")
                    currentId = null
                }
            })
        }, options
    )
    sections.forEach((s) => {observer.observe(s)})
}
