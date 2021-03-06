// --------------------------------------
// --------- PSEUDO-DATABASE ------------
// --------------------------------------

//  ----- SETTINGS ------
COLORS = Array.from(
    [
        {color_name: "Silver Pink", value:"D4BEBE"},
        {color_name: "Champagne Pink", value:"EDDCD2"},
        {color_name: "Mint Cream", value:"DBE7E4"},
        {color_name: "Lavender Gray", value:"CAC4CE"},
        {color_name: "Languid Lavender", value:"D5CFE1"},
        {color_name: "Lavender Web", value:"E1DEE9"},
        {color_name: "Pale Cerulean", value:"99C1DE"},
        {color_name: "Beau Blue", value:"BCD4E6"},
        {color_name: "Alice Blue", value:"D6E2E9"},
        {color_name: "Pale Pink", value:"FDE2E4"},
    ])

BACKGROUNDS = Array.from(
    [
        {background_name: "Mist", src:"assets/imgs/img1.jpg"},
        {background_name: "Trees", src:"assets/imgs/img2.jpg"},
        {background_name: "Sunset", src:"assets/imgs/img3.jpg"},
        {background_name: "Snow 1", src:"assets/imgs/img4.jpg"},
        {background_name: "Sea", src:"assets/imgs/img5.jpg"},
        {background_name: "Snow 2", src:"assets/imgs/img6.jpg"},
        {background_name: "Wood", src:"assets/imgs/img7.jpg"},
        {background_name: "Clouds", src:"assets/imgs/img8.jpg"},
    ]);

TABS = Array.from(
    [
        {tab_name: "My Progress", src:"assets/tasks.png", href:"upcoming-tasks.html"},
        {tab_name: "My Statistics", src:"assets/stats.png", href:"statistics.html"},
        {tab_name: "My Timer", src:"assets/timer.png", href:"index.html"},
        {tab_name: "My Music", src:"assets/music.png", href:"music.html"},
        {tab_name: "My Settings", src:"assets/settings.png", href:"settings.html"},
    ]
);

// --------------------------------------
// ---------- HELPER METHODS ------------
// --------------------------------------

// ---------- FORMATTING ---------

function hyphenated(c){
    return c.replaceAll(" ","-")
}

function unhyphenated(c){
    return c.replaceAll("-"," ")
}

function fmt2 (seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const odd_secs = seconds % 60
    if (hours <= 0){ hh = ''}     
    else if (hours < 10) {hh='0'+hours+':'} 
    else {hh = hours+':'}

    if (minutes <= 0){ mm = ''}
    else if (minutes < 10) {mm='0'+minutes+':'} 
    else {mm = minutes+':'}
    
    if (odd_secs < 10) {ss='0'+odd_secs} 
    else {ss = odd_secs}
    return hh+mm+ss
}

// ---------- OBJECT MANIPULATION ------------

// Courtesy of https://github.com/coolaj86/knuth-shuffle
function shuffle(array) {
    var array_ = [...array]
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array_[currentIndex], array_[randomIndex]] = [
        array_[randomIndex], array_[currentIndex]];
    }
  
    return array_;
  }

function get_item(array,attr,val){
    for (i in array){
        d = array[i]
        if (d[attr] == val) 
            return d;
    }
    return null;
}

function get_item_indirect(array,key1,key2,val2){
    for (i in array){
        d = array[i]
        if (d[key2] == val2) 
            return d[key1];
    }
    return null;
}

// --------------------------------------
// ---------- ELEMENT STYLING -----------
// --------------------------------------

// -------- HTML-CSS MANIPULATION ----------

function writeHTML(element,html){
    if (document.querySelector(element))
        document.querySelector(element).innerHTML = html;
}

function hideHTMLElement(element){
    if (document.querySelector(element))
        document.querySelector(element).style.display = "none";
}

function showHTMLElement(element,display){
    display = display ? display : "grid"
    if (document.querySelector(element))
        document.querySelector(element).style.display = display;
}

function write_textContent(element,text){
    if (document.querySelector(element))
        document.querySelector(element).textContent = text;
}

function clear_textContent(element){
    write_textContent(element,"")
}

function change_active_status(button_id,parent,button_class,flag){
    parent = parent == null ? "html" : parent;
    button_class = button_class == null ? ".button" : button_class;
    flag = flag == null ? " active" : flag;

    parent_item = document.querySelector(parent);
    var all_buttons = parent_item.querySelectorAll(button_class);
    Array.from(all_buttons).forEach(button=>{
        button.className = button.className.replace(flag,"")
    })
    if (button_id != null){
        button_active = parent_item.querySelector(button_id)
        if (button_active) button_active.className += flag
    }
}

// ------------ CHECK VISITED PAGE ------------

function has_visited(tab_name){
    tab_name =  tab_name ? tab_name : document.querySelector("head > title").textContent
    var has_visited = false
    if (sessionStorage.visited){
        var visited = JSON.parse(sessionStorage.visited)
        has_visited = visited[tab_name];
    }
    else {
        var visited = {"My Progress":false,"My Statistics":false,"My Timer":false,"My Music":false,"My Settings":false}
    }
    visited[tab_name] = true;
    sessionStorage.visited = JSON.stringify(visited);
    return has_visited
}

// ========================================
// ----------- NAV BAR EFFECTS ------------
// ========================================
function load_navbar_effects(){
    Array.from(document.querySelectorAll(".navitemlist .icon a")).forEach(icon => {
        var tab_name = icon.querySelector('img').alt
        icon.addEventListener('mouseover', () => { write_textContent("#icon-name",tab_name) });
        icon.addEventListener('mouseout', () => { clear_textContent("#icon-name") });
    })
}


// ------------ SETTINGS OPERATIONS ------------

function default_settings(){
    settings = {
        background_color: "none",
        background_color_name: "none",
        background_img_name: "Snow 2",
        background_img_src: "assets/imgs/img6.jpg",
        home_tab: "My Timer",
        home_tab_href: "index.html"
    }
    sessionStorage.settings = JSON.stringify(settings)
    return settings
}

function load_settings(){
    settings = get_settings()
    if (settings.home_tab_href)
        apply_home_tab(settings.home_tab_href)
    if (settings.background_img_src != "none")
        apply_background_img(settings.background_img_src)
    else if (settings.background_color != "none")
        apply_background_color(settings.background_color)
    return settings
}



function get_settings(){
    return sessionStorage.settings ? JSON.parse(sessionStorage.settings) : default_settings();
}

function save_settings(attr,value){
    var settings = JSON.parse(sessionStorage.settings);
    settings[attr] = value
    sessionStorage.settings = JSON.stringify(settings)
}


// ---------------------------------------
// ------------- PAGE STYLING ------------
// ---------------------------------------
function apply_home_tab(href){
    document.querySelector('.logoimg > a').href = href
}

function apply_background_img(src,root=""){
    src1 = src | (src != "none") ? `url(${root}${src})` : "none"
    document.querySelector('body').style.backgroundImage = src1;
}

function apply_background_color(value){
    document.querySelector('body').style.backgroundImage = "none";
    document.querySelector('body').style.backgroundColor = `#${value}`;
}



// ========= INIT FOR EVERY PAGE ========

load_navbar_effects()
load_settings()



