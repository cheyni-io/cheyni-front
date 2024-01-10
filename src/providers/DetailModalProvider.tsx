import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { INITIAL_DETAIL_STATE } from "src/constant";
import createSafeContext from "src/lib/createSafeContext";
import api from "src/services/api";
import { useLazyGetAppendedVideosQuery } from "src/store/slices/discover2";
import { MEDIA_TYPE } from "src/types/Common";
import { MovieDetails } from "src/types/Movie";

interface DetailType {
  id?: string;
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

  // const handleChangeDetail = useCallback(
  //   async (newDetailType: { mediaType?: MEDIA_TYPE; id?: number }) => {
  //     if (!!newDetailType.id && newDetailType.mediaType) {
  //       const response = await getAppendedVideos({
  //         mediaType: newDetailType.mediaType,
  //         id: newDetailType.id as number,
  //       }).unwrap();
  //       setDetail({ ...newDetailType, mediaDetail: response });
  //     } else {
  //       setDetail(INITIAL_DETAIL_STATE);
  //     }
  //   },
  //   []
  // );

  const handleChangeDetail = useCallback(
    async (newDetailType: { mediaType?: MEDIA_TYPE; id?: string }) => {
      if (!newDetailType.id || !newDetailType.mediaType) {
        setDetail(INITIAL_DETAIL_STATE);
        return;
      }
      api.get(`/upload/${newDetailType.id}`)
        .then(response => {
          setDetail({ ...newDetailType, mediaDetail: response.data });
        })
        .catch(err => {
          console.log(err)
        })
    }
  , []
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
