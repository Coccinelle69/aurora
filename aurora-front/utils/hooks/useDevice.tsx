"use client";

import { useEffect, useState } from "react";

type Device = {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
};

function useDevice(): Device {
  const [device, setDevice] = useState<Device>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  useEffect(() => {
    const queries = {
      sm: window.matchMedia("(min-width: 640px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      xxl: window.matchMedia("(min-width: 1536)"),
    };

    const update = () => {
      setDevice({
        sm: queries.sm.matches,
        md: queries.md.matches,
        lg: queries.lg.matches,
        xl: queries.xl.matches,
        xxl: queries.xxl.matches,
      });
    };

    update();

    Object.values(queries).forEach((mq) =>
      mq.addEventListener("change", update)
    );

    return () =>
      Object.values(queries).forEach((mq) =>
        mq.removeEventListener("change", update)
      );
  }, []);

  return device;
}

export default useDevice;
