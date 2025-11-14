/**
 * Custom background helpers for Hanabi presentation
 * These functions allow dynamic background changes via inline scripts
 */

function findAncestor(el, name) {
  while ((el = el.parentElement) && el.nodeName.toLowerCase() !== name);
  return el;
}

function colorAll(el, textColor) {
  if (!textColor) return;
  el.style.color = textColor;
  Array.from(el.children).forEach((e) => {
    colorAll(e, textColor);
  });
}

function setBackgroundImage(src, textColor) {
  var section = findAncestor(document.currentScript, "section");
  if (section) {
    section.setAttribute("data-background-image", src);
    if (textColor) colorAll(section, textColor);
  }
}

function setBackgroundColor(bgColor, textColor) {
  var section = findAncestor(document.currentScript, "section");
  if (section) {
    section.setAttribute("data-background-color", bgColor);
    if (textColor) colorAll(section, textColor);
  }
}

function setBackgroundVideo(video, textColor) {
  var section = findAncestor(document.currentScript, "section");
  if (section) {
    section.setAttribute("data-background-video", video);
    if (textColor) colorAll(section, textColor);
  }
}

function setBackgroundiFrame(iFrame, textColor) {
  var section = findAncestor(document.currentScript, "section");
  if (section) {
    section.setAttribute("data-background-iframe", iFrame);
    if (textColor) colorAll(section, textColor);
  }
}
