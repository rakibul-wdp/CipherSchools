import api from '@middlewares/api';
import Button from '@shared/button';
import Layout from '@layouts/layout';
import { toast } from 'react-toastify';
import getTime from '@utilities/getTime';
import { useParams } from 'react-router-dom';
import useGetVideo from '@servers/useGetVideo';
import SuggestCard from './partials/suggestCard';
import useGetVideos from '@servers/useGetVideos';
import { StoreContext } from '@contexts/storeProvider';
import WatchCommentsComp from './partials/watchComments';
import creator from '../../../assets/images/creator.png';
import useGetNotifications from '@servers/useGetNotifications';
import { Fragment, useContext, useEffect, useState } from 'react';
import { WatchRightTop, WatchInfosLeftTexts } from './watch.styled';
import { WatchRightTitle, WatchTexts, WatchTitle } from './watch.styled';
import { WatchPlayer, WatchRight, WatchRightCards } from './watch.styled';
import { WatchInfosLikes, WatchInfosRight, WatchLeft, WatchRightBottom } from './watch.styled';
import { WatchContainer, WatchDescs, WatchInfos, WatchInfosLeft, WatchInfosLeftIcon } from './watch.styled';

export default function Watch() {
  const { vId } = useParams();
  const { user } = useContext(StoreContext);
  const [newVideoData, setNewVideoData] = useState({});
  const [descShow, setDescShow] = useState(false);

  const { data: videosData } = useGetVideos();
  const { data: videoData } = useGetVideo(vId, { enabled: !!vId });
  const { refetch: refetchNotifications } = useGetNotifications();

  function infoBtnHandler(name) {
    return async function () {
      setNewVideoData(prev => {
        if (name === 'share') {
          window.navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to your clipboard');
          return { ...prev, shares: prev.shares + 1 };
        } else if (name === 'like') {
          if (prev?.likes?.includes(user?._id)) {
            return {
              ...prev,
              dislikes: prev?.dislikes?.filter(p => p !== user?._id),
              likes: prev?.likes?.filter(p => p !== user?._id),
            };
          } else {
            return {
              ...prev,
              dislikes: prev?.dislikes?.filter(p => p !== user?._id),
              likes: [...prev?.likes, user?._id],
            };
          }
        } else if (name === 'dislike') {
          if (prev?.dislikes?.includes(user?._id)) {
            return {
              ...prev,
              likes: prev?.likes?.filter(p => p !== user?._id),
              dislikes: prev?.dislikes?.filter(p => p !== user?._id),
            };
          } else {
            return {
              ...prev,
              likes: prev?.likes?.filter(p => p !== user?._id),
              dislikes: [...prev?.dislikes, user?._id],
            };
          }
        }
      });
      await api.post(`/videos/${vId}/${name}`);
      refetchNotifications();
    };
  }

  function getLikeIcon(likes) {
    if (likes?.includes(user?._id)) {
      return 'fluent:thumb-like-24-filled';
    }
    return 'fluent:thumb-like-24-regular';
  }

  function getDislikeIcon(dislikes) {
    if (dislikes?.includes(user?._id)) {
      return 'fluent:thumb-dislike-24-filled';
    }
    return 'fluent:thumb-dislike-24-regular';
  }

  function downloadHandler(name, link) {
    return function () {
      const a = document.createElement('a');
      a.href = link;
      a.download = name;
      a.click();
    };
  }

  function renderDesc(text) {
    if (text?.length <= 270) return text;
    if (descShow) {
      return (
        <Fragment>
          {text}
          <span className='button' onClick={() => setDescShow(false)}>
            See Less
          </span>
        </Fragment>
      );
    }
    return (
      <Fragment>
        {text?.slice(0, 270)}...
        <span className='button' onClick={() => setDescShow(true)}>
          See More
        </span>
      </Fragment>
    );
  }

  useEffect(() => {
    setNewVideoData(videoData);
  }, [videoData]);

  return (
    <Layout>
      <WatchContainer>
        <WatchLeft>
          <WatchPlayer>
            <video
              src={newVideoData?.video}
              poster={newVideoData?.thumnail}
              controls
              style={{
                height: '100%',
                width: '100%',
              }}
            ></video>
          </WatchPlayer>
          <WatchTexts>
            <WatchTitle>{newVideoData?.title}</WatchTitle>
            <WatchInfos>
              <WatchInfosLeft>
                <div>
                  <WatchInfosLeftIcon>
                    <img src={creator} alt='user' />
                  </WatchInfosLeftIcon>
                  <WatchInfosLeftTexts>
                    <h3>
                      {newVideoData?.creator?.name} <span>@{newVideoData?.creator?.username}</span>
                    </h3>
                    <p>3.75M subscribers</p>
                  </WatchInfosLeftTexts>
                </div>
                <div>
                  <Button className='subscribe' name='Subscribe' loading={''} handler={() => { }} main round />
                  <Button className='alert' icon='bi:bell' handler={() => { }} faded round />
                </div>
              </WatchInfosLeft>
              <WatchInfosRight>
                <WatchInfosLikes>
                  <Button
                    className='like'
                    name={newVideoData?.likes?.length}
                    icon={getLikeIcon(newVideoData?.likes)}
                    handler={infoBtnHandler('like')}
                    faded
                    round
                  />
                  <span></span>
                  <Button
                    className='like'
                    name={newVideoData?.dislikes?.length}
                    icon={getDislikeIcon(newVideoData?.dislikes)}
                    handler={infoBtnHandler('dislike')}
                    faded
                    round
                  />
                </WatchInfosLikes>
                <Button name={`${newVideoData?.shares} Shares`} handler={infoBtnHandler('share')} faded round />
                <Button
                  name='Download'
                  className='download'
                  icon='fluent:arrow-download-24-filled'
                  loading={''}
                  handler={downloadHandler(newVideoData?.title, newVideoData?.video)}
                  faded
                  round
                />
              </WatchInfosRight>
            </WatchInfos>
            <WatchDescs>
              <span className='info'>
                {newVideoData?.views} views &bull; {getTime(newVideoData?.createdAt)}
              </span>
              <span className='desc'>{renderDesc(newVideoData?.description)}</span>
            </WatchDescs>
            <WatchCommentsComp vId={vId} user={user} />
          </WatchTexts>
        </WatchLeft>
        <WatchRight>
          <WatchRightTop>
            <WatchRightTitle>Related Videos</WatchRightTitle>
            <WatchRightCards>
              {videosData?.data?.map(item => (
                <SuggestCard key={item?._id} data={item} />
              ))}
            </WatchRightCards>
          </WatchRightTop>
          <WatchRightBottom>
            <WatchRightTitle>Suggested Videos</WatchRightTitle>
            <WatchRightCards>
              {videosData?.data?.map(item => (
                <SuggestCard key={item?._id} data={item} />
              ))}
            </WatchRightCards>
          </WatchRightBottom>
        </WatchRight>
      </WatchContainer>
    </Layout>
  );
}
