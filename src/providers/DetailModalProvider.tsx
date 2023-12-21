import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { INITIAL_DETAIL_STATE } from "src/constant";
import createSafeContext from "src/lib/createSafeContext";
import { useLazyGetAppendedVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { MovieDetails } from "src/types/Movie";
import { mockMovieDetails } from "src/types/mockMovieDetails";

interface DetailType {
  id?: number;
  mediaType?: MEDIA_TYPE;
}
export interface DetailModalConsumerProps {
  detail: { mediaDetail?: MovieDetails } & DetailType;
  setDetailType: (newDetailType: DetailType) => void;
}

export const [useDetailModal, Provider] =
  createSafeContext<DetailModalConsumerProps>();

export default function DetailModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const [detail, setDetail] = useState<
    { mediaDetail?: MovieDetails } & DetailType
  >(INITIAL_DETAIL_STATE);

  const [getAppendedVideos] = useLazyGetAppendedVideosQuery();

  const handleChangeDetail = useCallback(
    async (newDetailType: { mediaType?: MEDIA_TYPE; id?: number }) => {
      if (!!newDetailType.id && newDetailType.mediaType) {
        let response;
  
        if (newDetailType.mediaType === MEDIA_TYPE.Movie) {
          response = mockMovieDetails;
        } else {
          response = mockMovieDetails;
        }
        //@ts-ignore
        setDetail({ ...newDetailType, mediaDetail: response });
        console.log(response);
      } else {
        setDetail(INITIAL_DETAIL_STATE);
      }
    },
    []
  );
  

  useEffect(() => {
    setDetail(INITIAL_DETAIL_STATE);
  }, [location.pathname, setDetail]);

  return (
    <Provider value={{ detail, setDetailType: handleChangeDetail }}>
      {children}
    </Provider>
  );
}
