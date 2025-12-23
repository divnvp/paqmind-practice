window.addEventListener("DOMContentLoaded", () => {
    initSectionNav("section2")
})

function initSectionNav(sectionId) {
    let section = document.getElementById(sectionId)
    let nav = section.querySelector(".subnav")
    let links = [...nav.querySelectorAll("a")]
    let subSections = links.map(link => section.querySelector(
        link.getAttribute("href"))
    )

    links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault()

            window.scrollTo({
                behavior: "smooth",
                top: window.scrollY
                    + subSections[index].getBoundingClientRect().y
                    - nav.getBoundingClientRect().height
            })
        })
    })

    window.addEventListener("scroll", () => {
        let active = -1
        active = subSections.findIndex((subSection, index) => {
            let elY = subSection.getBoundingClientRect().y
            let elHeight = subSection.getBoundingClientRect().height
            let navHeight = nav.getBoundingClientRect().height

            if (elY <= navHeight && elY + elHeight > navHeight) {
                return true
            }
        })

        links.forEach(link => {
            link.classList.remove("active")
        })
        if (active >= 0) {
            links[active].classList.add("active")
        }
    })
}
