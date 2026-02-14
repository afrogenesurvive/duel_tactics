export function handleGamepadEvent(app, event, type) {
  if (type === "disconnected") {
    app.connectedGamepadsInit = false;
    app.showSettingsKeyPress.state = true;
    console.log(
      "connected gamepads state change! please re-configure controller/gamepad settings",
    );
  }
}
