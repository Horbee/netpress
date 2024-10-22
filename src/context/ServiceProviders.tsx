import type { FC, PropsWithChildren } from "react";

import { RSSFeedContextProvider } from "./RSSFeedContext";

export const ServiceProviders: FC<PropsWithChildren> = ({ children }) => {
  return <RSSFeedContextProvider>{children}</RSSFeedContextProvider>;
};
