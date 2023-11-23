// "use client";
import { css } from "@kuma-ui/core";

// import { useRouter } from "next/navigation";

interface TuningProps {
  tuning: string;
}

export const Tuning = ({ tuning }: TuningProps) => {
  return (
    <section>
      <h2>Tuning</h2>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        Tuning
      </div>
    </section>
  );
};
