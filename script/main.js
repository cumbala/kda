const membersData = [
    {
        name: "Ahri",
        voice: "Jeon So-yeon",
        description: "After rising to fame as a teenage pop star, Ahri tossed aside her girly and young look to reveal her new self: a high fashion, elegant, and stunning celebrity. As the leader, founder, and main vocalist of K/DA, Ahri graces the stage with confident charm. The calm center of the group, she values authentic self-expression and encourages her team to do the same. Ahri takes pride in discovering new talents and shaping them towards their full potential.",
        icon: "img/SVG/Ahri.svg",
        images: [
            { src: "img/ahri/allout.webp", alt: "Ahri (All Out)"},
            { src: "img/ahri/baddest.webp", alt: "Ahri (The Baddest)"},
            { src: "img/ahri/popstars.webp", alt: "Ahri (Pop/Stars)"},
        ]
    },
    {
        name: "Akali",
        voice: "Soyeon",
        description: "Akali makes appearances next to other street performers in cities she is visiting. Combining mixed martial arts and the beat of her own rap lyrics, she delights audiences with her bold lyrical rap and punk ninja style. She is the main rapper of the group, boasting street punk style with a brash, dangerous streak. She constantly keeps her team on their toes - and values her creative independence most of all. Akali’s always spinning on new projects and refuses to compromise for her art.",
        icon: "img/SVG/Akali.svg",
        images: [
            { src: "img/akali/allout.webp", alt: "Akali (All Out)"},
            { src: "img/akali/baddest.webp", alt: "Akali (The Baddest)"},
            { src: "img/akali/popstars.webp", alt: "Akali (Pop/Stars)"},
        ]
    },
    {
        name: "Evelynn",
        voice: "Madison Beer & Bea Miller",
        description: "Evelynn is the vocalist of K/DA and when she takes the stage, no one captivates fance more than her. Always the focus of the spotlight, the artist enjoys seeing the crowd's reactions to his masterfully sculpted image.<br>Evelynn, co-founder of K/DA with Ahri, persuades the group to take exciting risks in terms of style.",
        icon: "img/SVG/Evelynn.svg",
        images: [
            { src: "img/evelynn/allout.webp", alt: "Evelynn (All Out)"},
            { src: "img/evelynn/baddest.webp", alt: "Evelynn (The Baddest)"},
            { src: "img/evelynn/popstars.webp", alt: "Evelynn (Pop/Stars)"},
        ]
    },
    {
        name: "Kai'sa",
        voice: "Jaira Burns & Wolfyta",
        description: "As the main dancer and team choreographer, Kai'Sa strives for perfection. Her intense, quiet focus pushes the team forward with otherworldly concepts and pristine attention to detail.<br><br><i>\"When the music begins, a symphony of movement stirs in my being. My body reacts to the call, jumping to weave a story. A story to leave the void behind, and fall into the steps of life.</i>\"",
        icon: "img/SVG/Kaisa.svg",
        images: [
            { src: "img/kaisa/allout.webp", alt: "Kai'sa (All Out)"},
            { src: "img/kaisa/baddest.webp", alt: "Kai'sa (The Baddest)"},
            { src: "img/kaisa/popstars.webp", alt: "Kai'sa (Pop/Stars)"},
        ]
    }
]

let selectedMember = 0
let selectedSkin = 0

function changeSkin(member, skin, force = false) {
    if (skin == selectedSkin && !force) return
    const img = $(".member-photo img")
    img.dataset.visible = "false"
    setTimeout(() => {
        img.src = membersData[member].images[skin].src
        img.alt = membersData[member].images[skin].alt
        img.dataset.visible = "true"
        selectedMember = member
        selectedSkin = skin  
        console.log("Member:", member, "Selected skin:", selectedSkin)
    }, 550)
}

function skinSwitcherOnSwitch(event) {
    const switcherOpts = $$(".switcher > a")
    for (let o of switcherOpts) {
        o.dataset.selected = "false";
    }
    event.target.dataset.selected = "true";
    let skin = switcherOpts.indexOf(event.target)
    changeSkin(selectedMember, skin)
}

function changeMember(member) {
    const memberName = $(".member-description .name")
    const memberDescription = $(".member-description .description")
    const memberIcon = $(".member-description .icon")
    const memberSwitcherIcons = $$(".member-switcher > img")
    memberName.innerHTML = membersData[member].name
    memberDescription.innerHTML = membersData[member].description
    memberIcon.src = membersData[member].icon
    memberIcon.alt = membersData[member].name
    for (let i = 0; i < memberSwitcherIcons.length; i++) {
        memberSwitcherIcons[i].dataset.selected = `${i == member}`
    }
    changeSkin(member, selectedSkin, true)
    console.log("Member:", member, "Selected skin:", selectedSkin)
}

function memberSwitcherOnSwitch(event) {
    const member = $$(".member-switcher > img").indexOf(event.target)
    changeMember(member)
}
function memberSwitcherPrevious() {
    const member = selectedMember - 1
    if (member < 0) return
    changeMember(member)
}
function memberSwitcherNext() {
    const member = selectedMember + 1
    if (member >= membersData.length) return
    changeMember(member)
}

function hamburgerMenuClick() {
    const navMobile = $(".menu-mobile")
    if(navMobile.dataset.active === "false") 
        navMobile.dataset.active = "true"
    else
        navMobile.dataset.active = "false"
}

function mobileMenuClose() {
    $(".menu-mobile").dataset.active = "false"
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "auto" })
}