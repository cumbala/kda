[
    "img/ahri/allout.webp", "img/ahri/baddest.webp", "img/ahri/popstars.webp",
    "img/akali/allout.webp", "img/akali/baddest.webp", "img/akali/popstars.webp",
    "img/evelynn/allout.webp", "img/evelynn/baddest.webp", "img/evelynn/popstars.webp",
    "img/kaisa/allout.webp", "img/kaisa/baddest.webp", "img/kaisa/popstars.webp",
    "img/allout-tracklist.jpg"
].forEach(url => {
    let img = new Image()
    img.src = url
})
window.addEventListener("scroll", () => {
    $(".fab-top").dataset.visible = `${window.scrollY > 128}`
})