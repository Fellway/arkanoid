export const collisionVector = (b1, b2) => {
    console.log(b1.velocity, b2.velocity);
    return b1.velocity
      .subtract(
        b1.position
        .subtract(b2.position)
        .multiply(
          b1.velocity
          .subtract(b2.velocity)
          .dotProduct(
            b1.position
            .subtract(b2.position)
          )
          / b1.position
          .subtract(b2.position)
          .magnitude ** 2
        )
      );
  };