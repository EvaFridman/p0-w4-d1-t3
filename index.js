// одна октава: true = чёрная клавиша (диез)
const NOTES = [
    { note: "C", sharp: false, file: "C.mp3" },
    { note: "C#", sharp: true, file: "C_sharp.mp3" },
    { note: "D", sharp: false, file: "D.mp3" },
    { note: "D#", sharp: true, file: "D_sharp.mp3" },
    { note: "E", sharp: false, file: "E.mp3" },
    { note: "F", sharp: false, file: "F.mp3" },
    { note: "F#", sharp: true, file: "F_sharp.mp3" },
    { note: "G", sharp: false, file: "G.mp3" },
    { note: "G#", sharp: true, file: "G_sharp.mp3" },
    { note: "A", sharp: false, file: "A.mp3" },
    { note: "A#", sharp: true, file: "A_sharp.mp3" },
    { note: "B", sharp: false, file: "B.mp3" },
];

const piano = document.querySelector("#piano");
const recorded = document.querySelector("#recorded");
const play = document.querySelector("#play");
const clear = document.querySelector("#clear");
const noteSequence = [];

function playSound(fileName) {
    const audio = new Audio(`audio/${fileName}`); 
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Ошибка воспроизведения:", err));
};

function createItemKeyListener(event) {
    const key = event.currentTarget;

    key.classList.add("active");
    setTimeout(() => {
        key.classList.remove("active");
    }, 200);

    playSound(key.dataset.file);

    noteSequence.push(key.dataset.note);
    recorded.textContent = noteSequence.join(" - ");
}

function createItemKey(item) {
    const key = document.createElement("div");
    key.classList.add("key");
    key.dataset.note = item.note;
    key.dataset.file = item.file;
    key.classList.add(!item.sharp ? "white" : "black");
    key.addEventListener("click", createItemKeyListener);
    return key;
}

const keys = NOTES.map(createItemKey);

play.addEventListener("click", () => {
    noteSequence.forEach((n, i) => {
        const currentKey = document.querySelector(`[data-note="${n}"]`);
        
        if (currentKey) {
            setTimeout(() => {
                currentKey.classList.add("active");

                playSound(currentKey.dataset.file);
                
                setTimeout(() => {
                    currentKey.classList.remove("active");
                }, 300);
                
            }, i * 500); 
        } 
    });

    const totalDuration = noteSequence.length * 500;
    setTimeout(() => {
        noteSequence.length = 0;
        recorded.textContent = "";
    }, totalDuration);
});

clear.addEventListener("click", () => {
    noteSequence.length = 0;
    recorded.textContent = "";
});

piano.append(...keys);