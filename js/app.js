
$(document).ready( function() {
    
    const playClass = 'playing';
    const playDelay = 300;
    var clicks = [];
    const keyCodes = [67, 72, 65, 82, 76, 69];
    const keyChars = ["c","d","e","f","g","a","b"];
    var eKey = 69;
    var eFlag = 0;

    function playAudio(x) {
        let box = document.getElementById(x);
        let audio = document.getElementById(x + 'Audio');
        audio.currentTime = 0;
        audio.play();
        box.classList.add(playClass);
        clicks.push(x);
    }

    function stopAudio(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove(playClass);
    }

    function playClicks() {

        /* 
        Copy clicks array to new array
        Each call to playAudio is going to add the key
        to the clicks array... so we need to clone and 
        empty it before starting the loop
         */
        let c = [...clicks];
        resetClicks();
        console.table(c);

        for(var i = 0; i < c.length; i++) {
            (function(i){
                setTimeout(function(){
                    playAudio(c[i]);
            }, playDelay * i)
            })(i);
        }
    }

    function resetClicks() {
        clicks.length = 0;
    }

    function keyAudio(e) {
        let k = e.keyCode;
        let i = keyCodes.indexOf(k);
        if(i > -1) {
            if(k == eKey) {
                i += eFlag;
                eFlag = (eFlag == 0 ? 1 : 0);
            }
            playAudio(keyChars[i]);
        }
    }

    const boxes = Array.from(document.querySelectorAll('.box'));
    boxes.forEach(box => box.addEventListener('mousedown', function(){
            playAudio(this.id);
        })
    );
    boxes.forEach(box => box.addEventListener('transitionend', stopAudio));
    $('#replay').click(playClicks);
    $('#reset').click(resetClicks);

    window.addEventListener('keydown', keyAudio);
    
});