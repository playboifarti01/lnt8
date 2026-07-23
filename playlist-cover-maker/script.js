const tabs = document.querySelectorAll(".tab");
const inserthere = document.getElementById("inserthere");
const inserthere2 = document.getElementById("inserthere2");

const panels = {
  1: document.getElementById("panel1"),
  2: document.getElementById("panel2"),
  3: document.getElementById("panel3"),
  4: document.getElementById("panel4"),
  5: document.getElementById("panel5"),
};

const covers = {
  1: document.getElementById("d1"),
  2: document.getElementById("d2"),
  3: document.getElementById("d3"),
  4: document.getElementById("d4"),
  5: document.getElementById("d5"),
};

function setView(id) {
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === id));

  Object.values(panels).forEach((p) => p.classList.remove("active"));
  Object.values(covers).forEach((c) => c.classList.add("hidden"));

  panels[id].classList.add("active");
  covers[id].classList.remove("hidden");
}

setView("1");

tabs.forEach((t) => (t.onclick = () => setView(t.dataset.tab)));

/* TEXT FIXED (no syntax errors) */
document.getElementById("d1-title").oninput = (e) =>
  (document.getElementById("d1Title").innerText = e.target.value);

document.getElementById("d2-text").oninput = (e) =>
  (document.getElementById("d2Text").innerText = e.target.value);

document.getElementById("d3-text").oninput = (e) =>
  (document.getElementById("d3Text").innerText = e.target.value);

document.getElementById("d4-text").oninput = (e) =>
  (document.getElementById("d4Text").innerText = e.target.value);

document.getElementById("d5-text").oninput = (e) =>
  (document.getElementById("d5Text").innerText = e.target.value);

/* BG LOGIC */
const d1 = document.getElementById("d1");
const d4 = document.getElementById("d4");
const solidBtn = document.getElementById("solidBtn");
const gradBtn = document.getElementById("gradBtn");
const linearBtn = document.getElementById("linearBtn");
const radialBtn = document.getElementById("radialBtn");
const gradBox = document.getElementById("gradBox");

let mode = "solid";
let gradMode = "linear";

function updateBG() {
  const c1 = document.getElementById("d1-c1").value;
  const c2 = document.getElementById("d1-c2").value;

  if (mode === "solid") {
    d1.style.background = c1;
    gradBox.style.display = "none";
  } else {
    gradBox.style.display = "block";

    if (gradMode === "linear") {
      d1.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
    } else {
      d1.style.background = `radial-gradient(circle, ${c1}, ${c2})`;
    }
  }
}

function updateBG4() {
  const c1 = document.getElementById("d4-c1").value;
  d4.style.background = c1;
}

solidBtn.onclick = () => {
  mode = "solid";
  solidBtn.classList.add("active");
  gradBtn.classList.remove("active");
  updateBG();
};

gradBtn.onclick = () => {
  mode = "gradient";
  gradBtn.classList.add("active");
  solidBtn.classList.remove("active");
  updateBG();
};

linearBtn.onclick = () => {
  gradMode = "linear";
  linearBtn.classList.add("active");
  radialBtn.classList.remove("active");
  updateBG();
};

radialBtn.onclick = () => {
  gradMode = "radial";
  radialBtn.classList.add("active");
  linearBtn.classList.remove("active");
  updateBG();
};

document.getElementById("d1-c1").oninput = updateBG;
document.getElementById("d1-c2").oninput = updateBG;
document.getElementById("d4-c1").oninput = updateBG4;

updateBG();
updateBG4();

/* DOWNLOAD */
document.getElementById("downloadBtn").onclick = async () => {
  const active = document.querySelector(".cover:not(.hidden)");

  const canvas = await html2canvas(active, {
    scale: 1,
    backgroundColor: null,
  });

  const link = document.createElement("a");
  link.download = "playlist-cover.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

/* CROPPER */
let cropper;
const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal2");
const cropImage = document.getElementById("cropImage");
const cropImage2 = document.getElementById("cropImage2");

document.getElementById("imgUpload").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    cropImage.src = ev.target.result;
    modal.classList.add("active");

    cropper = new Cropper(cropImage, {
      aspectRatio: 600 / 361,
      viewMode: 1,
    });
  };
  reader.readAsDataURL(file);
};

document.getElementById("cancel").onclick = () => {
  modal.classList.remove("active");
  cropper.destroy();
};

document.getElementById("apply").onclick = () => {
  inserthere.classList.add("shut");
  const canvas = cropper.getCroppedCanvas({
    width: 600,
    height: 361,
  });

  document.getElementById("croppedImg").src = canvas.toDataURL();

  modal.classList.remove("active");
  cropper.destroy();
};

// 4

document.getElementById("imgUpload2").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    cropImage2.src = ev.target.result;
    modal2.classList.add("active");

    cropper = new Cropper(cropImage2, {
      aspectRatio: 300 / 300,
      viewMode: 1,
    });
  };
  reader.readAsDataURL(file);
};

document.getElementById("cancel2").onclick = () => {
  modal2.classList.remove("active");
  cropper.destroy();
};

document.getElementById("apply2").onclick = () => {
  inserthere2.classList.add("shut");
  const canvas2 = cropper.getCroppedCanvas({
    width: 373.3,
    height: 373.3,
  });

  document.getElementById("croppedImg2").src = canvas2.toDataURL();

  modal2.classList.remove("active");
  cropper.destroy();
};
