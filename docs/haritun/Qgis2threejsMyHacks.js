function detectScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 1000 || height < 800) {
        if (document.body.style.display !== "none") {
            document.body.style.display = "none"
            const tooSmallElm = document.createElement("div");
            tooSmallElm.id = "screenTooSmall"
            tooSmallElm.style.cssText = "text-align: center; white-space: pre; background: #4ea7ed; display: flex;" +
                "height: 100%; width: 100%; justify-content: space-around; align-items: center; font-size: 4.5vw; flex-direction: column;" +
                "font-family: arial, sans-serif; width: 100%; height: 100%; background: #4ea7ed; position: fixed; line-height: 6vw;";
            const tooSmallTextNode = document.createTextNode("oh dear...\nwe have detected that\nthe screen size is too small.\n" +
                "your experience will surely be harmed!\n" +
                "we strongly recommend to\nuse a larger display");
            var button = document.createElement('button');
            button.style.cssText = "border: none; font-size: 3vw; padding: 5px 25px; background: #81c0f3; cursor: pointer;"
            button.innerHTML = 'continue anyway';
            button.addEventListener('click', removeTooSmall);
            tooSmallElm.appendChild(tooSmallTextNode);
            tooSmallElm.appendChild(button);
            document.body.after(tooSmallElm);
        }
    } else {
        removeTooSmall();
    }
}

function removeTooSmall() {
    document.body.style.display = ""
    document.getElementById("screenTooSmall")?.remove();
}

function addCredits() {
    const creditsHeaderElm = document.createElement("h1");
    const creditsHeaderTextNode = document.createTextNode("Credits")
    creditsHeaderElm.appendChild(creditsHeaderTextNode);

    const creditsElm = document.createElement("div");
    creditsElm.id = "aboutUs"
    creditsElm.style.cssText = "line-height: 20px; padding: 15px; font-weight: bold; white-space: pre;" +
        "background: #eeeeee; margin: 10px;";
    const creditsTextNode = document.createTextNode("cave model, GIS, animations: Ofir Shemesh & Omri Gaster\n" +
        "photos and advise: Boaz Langford & Raz Ben-Yair\n" +
        "data background: Israel Cave Research Center");
    creditsElm.appendChild(creditsTextNode);
    document.getElementById("pageinfo").prepend(creditsElm);
    document.getElementById("pageinfo").prepend(creditsHeaderElm);
}

function progress() {
    const progressElm = document.createElement("div");
    progressElm.style.setProperty('--value', 0);

    progressElm.id = "progressMyHacks"
    document.getElementById("progressbar").prepend(progressElm);
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            const val = Number(mutationRecord.target.style.width.slice(0, -1)).toFixed();
            progressElm.style.setProperty('--value', val);
        });    
    });

    var target = document.getElementById('progressbar');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });

}

document.addEventListener('DOMContentLoaded',() => {
    progress();
    detectScreenSize();
    addCredits();
});
window.addEventListener('resize', detectScreenSize);

