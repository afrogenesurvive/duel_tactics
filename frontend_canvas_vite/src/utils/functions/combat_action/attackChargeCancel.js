export function attackChargeCancel(app, player) {
  const logCharge = (message, data = {}) => {
    app.globalLogger("player.attacking.charge", message, data, { fn: "attackChargeCancel" });
  };

  if (player.attacking.chargeCount > 0) {
    logCharge("chargeCancel", {
      plyr_no: player.number,
      action: player.action,
      count: player.attacking.count,
      chargeCount: player.attacking.chargeCount,
      maxCharge: player.attacking.maxCharge,
    });
    player.attacking = {
      state: false,
      count: 0,
      limit: player.attacking.limit,
      strength: 0,
      direction: "",
      directionType: "", //thrust or slash
      animRef: player.attacking.animRef,
      peak: false,
      peakCount: 0,
      charge: 0,
      chargePeak: false,
      blunt: false,
      clashing: {
        state: false,
        count: 0,
        limit: player.attacking.clashing.limit,
      },
      maxCharge: player.attacking.maxCharge,
      chargeCount: 0,
      execute: false,
      effectivenessAllowance: player.attacking.effectivenessAllowance,
    };
    player.action = "idle";
  }
}
