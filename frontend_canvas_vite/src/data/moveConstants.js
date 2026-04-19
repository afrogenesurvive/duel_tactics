const moveConstants = {
  base: {
    newMoveDelay: {
      state: false,
      count: 0,
      limit: 15,
    },
    speed: {
      move: 0.1,
      range_1: [0.05, 0.1, 0.125, 0.2],
      range_2: [0.25, 0.3, 0.325, 0.4],
    },
  },
};

export default moveConstants;
