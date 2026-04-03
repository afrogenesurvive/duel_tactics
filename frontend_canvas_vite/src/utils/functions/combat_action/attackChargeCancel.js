export function attackChargeCancel(app, player) {
  //   console.log("attackChargeCancel");
  if (player.attacking.chargeCount > 0) {
    console.log("player is currently charging an attack. Cancel/Feint");
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
