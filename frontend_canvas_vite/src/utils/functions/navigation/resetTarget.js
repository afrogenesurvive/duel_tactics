export function resetTarget(app) {
  return {
    cell1: {
      number: {
        x: 0,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      free: true,
      occupant: {
        type: "",
        player: "",
      },
      void: false,
    },
    cell2: {
      number: {
        x: 0,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      free: true,
      occupant: {
        type: "",
        player: "",
      },
      void: false,
    },
    myCellBlock: false,
  };
}
