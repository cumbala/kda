const images = [
    "img/ahri/allout.png",
    "img/ahri/baddest.png",
    "img/ahri/popstars.png",

    "img/akali/allout.png",
    "img/akali/baddest.png",
    "img/akali/popstars.png",

    "img/evelynn/allout.png",
    "img/evelynn/baddest.png",
    "img/evelynn/popstars.png",

    "img/kaisa/allout.png",
    "img/kaisa/baddest.png",
    "img/kaisa/popstars.png",

    "img/allout-tracklist.jpg"
]

for (let url of images) {
    let img = new Image()
    img.src = url
}

window.addEventListener("scroll", (event) => {
    const scroll = window.scrollY
    const fabTop = $(".fab-top")
    if (scroll > 128) {
        fabTop.dataset.visible = "true"
    } else {
        fabTop.dataset.visible = "false"
    }
})