import React from "react";
import styles from "./Bike.module.css";
import classNames from "clsx";

const Bike = ({ reversed }) => {
  return (
    <div
      className={classNames(styles.bikeContainer, {
        [styles.reversedMove]: reversed,
      })}
    >
      <div className={styles.bikeRiding}>
        <div className={styles.shadow} />
        <div className={styles.cyclist}>
          <div className={styles.bike}>
            <div className={styles.leftTyre}>
              <div className={styles.spokes} />
            </div>
            <div className={styles.rightTyre}>
              <div className={styles.spokes} />
            </div>
            <div className={styles.wheel} />
            <div className={styles.pedals} />
            <div className={styles.chain} />
          </div>
          <div className={styles.girl}>
            <div className={styles.top} />
            <div className={styles.rightArm} />
            <div className={styles.leftArm} />
            <div className={styles.head} />
            <div
              className={classNames(styles.hair, {
                [styles.greenHair]: reversed,
              })}
            />
            <div className={styles.strap} />
            <div className={styles.trousers}>
              <div className={styles.leftLeg}>
                <div className={styles.leftCalf} />
              </div>
              <div className={styles.rightLeg}>
                <div className={styles.calf} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bike;
