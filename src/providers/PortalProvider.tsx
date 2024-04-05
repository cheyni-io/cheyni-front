import { ReactNode, useState, useCallback, useEffect } from "react";
import { Movie } from "src/types/Movie";
import createSafeContext from "src/lib/createSafeContext";

export interface PortalConsumerProps {
  setPortal: (anchor: HTMLElement | null, vidoe: Movie | null) => void;
}
export interface PortalDataConsumerProps {
  anchorElement: HTMLElement | null;
  miniModalMediaData: Movie | null;
}

export const [usePortal, Provider] =
  createSafeContext<PortalConsumerProps["setPortal"]>();

export const [usePortalData, PortalDataProvider] =
  createSafeContext<PortalDataConsumerProps>();

export default function PortalProvider({ children }: { children: ReactNode }) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [miniModalMediaData, setMiniModalMediaData] = useState<Movie | null>(
    null
  );

  const handleChangePortal = useCallback(
    (anchor: HTMLElement | null, video: Movie | null) => {
      setAnchorElement(anchor);
      setMiniModalMediaData(video);
    },
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorElement && !anchorElement.contains(event.target as Node)) {
        handleChangePortal(null, null);
      }
    };

    if (anchorElement) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (anchorElement) {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [anchorElement, handleChangePortal]);

  return (
    <Provider value={handleChangePortal}>
      <PortalDataProvider
        value={{
          anchorElement,
          miniModalMediaData,
        }}
      >
        {children}
      </PortalDataProvider>
    </Provider>
  );
}
