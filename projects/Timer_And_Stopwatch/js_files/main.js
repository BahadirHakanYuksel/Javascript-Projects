const start_btn = document.getElementById('start_btn')
const counter_text_min = document.getElementById('counter_text_min')
const counter_text_ms = document.getElementById('counter_text_ms')
const remove_btn = document.getElementById('remove_btn')
const selections = document.querySelectorAll("#selections > button")
const html = document.querySelector('html')

//timer
const timerSelectionsMain = document.getElementById('timerSelectionsMain')
const tsm_okBtn = document.getElementById('tsm_okBtn')
const up_buttons = document.querySelectorAll('.up')
const down_buttons = document.querySelectorAll('.down')
const tsm_removeBtn = document.getElementById('tsm_removeBtn')
const counter_text_hour = document.getElementById('counter_text_hour')
const hour_point = document.getElementById('hour_point')
const time_div = document.querySelector("#small_circle>div")
const counter_screen = document.getElementById("counter_screen")
const big_circle = document.getElementById("big_circle")

//theme
const themes = document.querySelectorAll(".theme");

//update fast buttons
const fobs = document.querySelectorAll(".fob")


let animation = 0
let anim_delay = 0
let hour = 0
let min = 0
let s
let ms = 0
let interval
html.classList.add(localStorage.getItem("Mode"));
// var alarm_tone = new Audio("iphone_alarm.mp3");


start_btn.addEventListener('click',start)
remove_btn.addEventListener('click',removeFunc)
selections.forEach(selection => {
    selection.addEventListener('click',() => {
        selections.forEach(selection => selection.classList.remove("active_selection"))
        selection.classList.add("active_selection")

        if(selection.id === "s_timer"){
            html.classList.add("timer_mode")
            removeFunc()
            timerSelectionsMain.classList.add('tsm_active')

            counter_screen.style.opacity = "1"

            // make active hour section
            counter_text_hour.classList.add("hour_active")
            hour_point.classList.add("hour_active")
            time_div.style.width = "90%"

            // make active circle
            big_circle.style.cursor = "pointer"
        }
        else{
            removeFunc()
            html.classList.remove("timer_mode")
            timerSelectionsMain.classList.remove('tsm_active')

            counter_screen.style.opacity = ""

            // make desable hour selection
            counter_text_hour.classList.remove("hour_active")
            hour_point.classList.remove("hour_active")
            time_div.style.width = "55%"
            counter_text_min.innerHTML = "00"
            counter_text_ms.innerHTML = "00"
            
            // make desable circle
            big_circle.style.cursor = "default"
        }

    })
})
tsm_okBtn.addEventListener('click',() => {

    const hour_left = document.querySelectorAll(".hour")[0].textContent.trim()
    const hour_right = document.querySelectorAll(".hour")[1].textContent.trim()


    const min_left = document.querySelectorAll(".minute")[0].textContent.trim()
    const min_right = document.querySelectorAll(".minute")[1].textContent.trim()


    const s_left = document.querySelectorAll(".second")[0].textContent.trim()
    const s_right = document.querySelectorAll(".second")[1].textContent.trim()

    
    if(hour_left == 0 && hour_right == 0 && 
        min_left == 0 && min_right == 0 && 
        s_left == 0 && s_right == 0){
        alert("Please enter a valid time interval");
    }else{
        counter_text_hour.innerHTML = `${hour_left}${hour_right}`
        counter_text_min.innerHTML = `${min_left}${min_right}`
        counter_text_ms.innerHTML = `${s_left}${s_right}`

        timerSelectionsMain.classList.remove('tsm_active')
        counter_screen.style.height = "0%"
        setTimeout(() => {
            counter_screen.style.height = "100%"
        }, 1000);
    }

})
up_buttons.forEach((up_btn,i) => {
    up_btn.addEventListener('click',() => {
        let first_number = Number(up_btn.nextElementSibling.textContent)
        // minutes and seconds can be maximum 60. --> 1 min = 60 s , 1 hour = 60 min
        up_btn.parentElement.children[2].classList.add("active_tmBtn")
        if(first_number == 8) up_btn.classList.remove("active_tmBtn")
        else up_btn.classList.add("active_tmBtn")

        if(i == 2 || i == 4){
            if(first_number < 6){
                first_number +=1
                if (first_number == 6){
                    first_number = 0
                    up_buttons[i].nextElementSibling.textContent = first_number
                    let addNumber = Number(up_buttons[i-1].nextElementSibling.textContent) + 1
                    up_buttons[i-1].nextElementSibling.textContent = addNumber 
                }
            }
        }
        else if(i != 2 || i != 4){
            if(first_number < 9) first_number+=1
        }
        up_btn.nextElementSibling.textContent = first_number
    })
})
down_buttons.forEach(down_btn => {
    down_btn.addEventListener('click',() => {
        let first_number = Number(down_btn.previousElementSibling.textContent)

        down_btn.parentElement.children[0].classList.add("active_tmBtn")
        if(first_number == 1) down_btn.classList.remove("active_tmBtn")
        else down_btn.classList.add("active_tmBtn")

        if(first_number != 0) first_number-=1
        down_btn.previousElementSibling.textContent = first_number
    })
})
tsm_removeBtn.addEventListener('click',() => {
    up_buttons.forEach(up_btn => {
        up_btn.nextElementSibling.textContent = 0
    })
})
big_circle.addEventListener("click",() => {
    if(selections[1].className === "active_selection"){
        timerSelectionsMain.classList.add('tsm_active')
    }
})
timerSelectionsMain.addEventListener('click',e => {
    if(e.target.id === "timerSelectionsMain"){
        timerSelectionsMain.classList.remove("tsm_active");
    }
})
themes.forEach((theme,i) => {
    if(theme.id == html.classList[0].slice(0,-5)){
        themes.forEach(theme => theme.classList.remove("active_theme"))
        theme.classList.add("active_theme");
    }

    theme.addEventListener("click",() => {
        themes.forEach(t => {
            t.classList.remove("active_theme")
            t.style.transform = "scale(0.8,0.8)"
            t.style.opacity = "50%"
        })
        theme.classList.remove("active_theme");
        theme.style.transform = "scale(1.15,1.15)"
        theme.style.opacity = "100%"

        html.classList.remove("night_mode") //remove
        html.classList.remove("dark_mode") //remove
        localStorage.removeItem("Mode")
        
        if(i == 1){
            html.classList.add("night_mode")
            localStorage.setItem("Mode","night_mode")
        }
        if(i == 2){
            html.classList.add("dark_mode")
            localStorage.setItem("Mode","dark_mode")
        }
    })
})
fobs.forEach(fob => {
    fob.addEventListener("click",() => {
        let fast_time = fob.id

        if(fast_time.length == 1){
        counter_text_hour.innerHTML = `00`
        counter_text_min.innerHTML = `0${fast_time}`
        counter_text_ms.innerHTML = `00`
        }
        else if(fast_time.length == 2){
            if(Number(fast_time) > 60){
                let minute = `${Number(fast_time) % 60}`
                if(minute.length == 2) counter_text_min.innerHTML = `${minute}`
                else if(minute.length == 1) counter_text_min.innerHTML = `0${minute}`

                counter_text_hour.innerHTML = `01`
                counter_text_ms.innerHTML = `00`
            }else{
                counter_text_hour.innerHTML = `00`
                counter_text_min.innerHTML = `${fast_time[0]}${fast_time[1]}`
                counter_text_ms.innerHTML = `00`
            }
        }
        else if(fast_time.length == 3){
            if(Number(fast_time) > 99){
                let hour = `${(Number(fast_time) / 60).toFixed()}`
                let minute = `${Number(fast_time) % 60}`
                if(minute.length == 2) counter_text_min.innerHTML = `${minute}`
                else if(minute.length == 1) counter_text_min.innerHTML = `0${minute}`
                
                if(hour.length == 2) counter_text_hour.innerHTML = `${hour}`
                else if(hour.length == 1) counter_text_hour.innerHTML = `0${hour}`

                counter_text_ms.innerHTML = `00`

            }else{
                counter_text_hour.innerHTML = `00`
                counter_text_min.innerHTML = `${fast_time[0]}${fast_time[1]}`
                counter_text_ms.innerHTML = `00`
            }
        }

        timerSelectionsMain.classList.remove('tsm_active')
        counter_screen.style.height = "0%"
        setTimeout(() => {
            counter_screen.style.height = "100%"
        }, 1000);
    })
})

function start(){
    if(start_btn.classList[2] != 'active'){
        if(selections[0].className === "active_selection"){
            start_btn.classList.add('active')
            start_btn.textContent = 'Stop'
            remove_btn.style.display = 'block'
            setTimeout(() => {
                remove_btn.style.opacity = "1"
            }, 100)
            hour = 0
            min = 0
            s = 0
            ms = 0
            interval = setInterval(stopwatch,10)
        }
        if(selections[1].className === "active_selection"){
            if(counter_text_hour.textContent == "00" && counter_text_min.textContent == "00" && counter_text_ms.textContent == "00"){
                alert("Please enter a valid time interval")
                timerSelectionsMain.classList.add("tsm_active")
            }else{
                start_btn.classList.add('active')
                start_btn.textContent = 'Stop'
                remove_btn.style.display = 'block'
                setTimeout(() => {
                    remove_btn.style.opacity = "1"
                }, 100)
                ms = 0
                hour = Number(counter_text_hour.textContent)
                min = Number(counter_text_min.textContent)
                s = Number(counter_text_ms.textContent)
                animation = 100
                if(hour > 0 && min > 0) anim_delay = hour*3600 + min*60 + s
                if(min > 0 && hour === 0) anim_delay = min*60 + s
                if(min === 0 && hour === 0 && s > 0) anim_delay = s
                anim_delay = animation / anim_delay
                interval = setInterval(timer,1000)
            }
        }else{
            counter_screen.style.height = "0%"
        }
    }else{
        start_btn.classList.remove('active')
        start_btn.textContent = 'Start'
        clearInterval(interval)
    }

}

function stopwatch(){
    ms++
    if(ms <= 9) counter_text_ms.innerHTML = "0" + ms
    if(ms > 9) counter_text_ms.innerHTML = ms
    if(ms > 99){
        min++
        ms = 0
        counter_text_min.innerHTML = "0" + min
        counter_text_ms.innerHTML = "0" + ms
    }
    if(min > 9) counter_text_min.innerHTML = min
    // if(min == 59){
    //     hour++
    //     min = 0
    //     counter_text_hour.className = "counter_text hour_active"
    //     hour_point.className = "hour_active"
    //     counter_text_min.innerHTML = "0" + min
    //     counter_text_hour.innerHTML = "0" + hour //hour --> min
    //     time_div.style.width = "90%"
    // }
}

function timer(){

    if(s > 0){
        s--
        counter_text_ms.innerHTML = "0" + s
    }
    if(s > 9) counter_text_ms.innerHTML = s

    if(min > 0){
        if(s == 0){
            if(min == 59) min = min
            else min--
            s = 59
            counter_text_ms.innerHTML = s
            counter_text_min.innerHTML = "0" + min
        }
    }
    if(min > 9) counter_text_min.innerHTML = min

    if(hour > 0){
        if(min == 0){
            hour--
            min= 59
            counter_text_min.innerHTML = min
            counter_text_hour.innerHTML = "0" + hour

        }
    }
    if(hour > 9) counter_text_hour.innerHTML = hour

    animation -= anim_delay
    counter_screen.style.height = `${animation}%`

    if(hour === 0 && min === 0 && s === 0) timerFinish()
}

function timerFinish(){
    removeFunc()
    animation = 0
    counter_screen.style.height = `${animation}%`
    // alarm_tone.play()
}

function removeFunc(){
    clearInterval(interval)
    remove_btn.style.opacity = ''
    setTimeout(() => {
        remove_btn.style.display = ""
        start_btn.classList.remove('active')
        start_btn.textContent = 'Start'
    },1)
    
    hour = 0
    min = 0
    ms = 0
    counter_text_hour.innerHTML = "00"
    counter_text_min.innerHTML = "00"
    counter_text_ms.innerHTML = "00"
    counter_screen.style.height = "0%"
}