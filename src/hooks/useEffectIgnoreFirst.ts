import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useEffectIgnoreFirst = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
    } else {
      effect()
    }
  }, deps)
}
