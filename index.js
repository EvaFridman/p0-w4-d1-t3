// одна октава: true = чёрная клавиша (диез)
const notes = [
    { note: "C", sharp: false }, { note: "C#", sharp: true },
    { note: "D", sharp: false }, { note: "D#", sharp: true },
    { note: "E", sharp: false }, { note: "F", sharp: false },
    { note: "F#", sharp: true }, { note: "G", sharp: false },
    { note: "G#", sharp: true }, { note: "A", sharp: false },
    { note: "A#", sharp: true }, { note: "B", sharp: false },
];

const piano = document.querySelector("#piano");

const keys = notes.map((item) => {
    const key = document.createElement("div");
    key.classList.add("key");
    key.dataset.note = item.note;

    key.classList.add(item.sharp === false ? "white" : "black");

    return key;
});

piano.append(...keys);