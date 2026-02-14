export function setBackgroundImage(app, args) {
  document.getElementsByClassName(
    app.state.containerInnerClass,
  )[0].style.backgroundImage = `url('${app.backgroundImageRef[args].src}')`;
}
