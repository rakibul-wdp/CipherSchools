import Loader from '@shared/loader';
import { toast } from 'react-toastify';
import RequireAuth from '@helpers/requireAuth';
import { Route, Routes } from 'react-router-dom';
import { StoreContext } from '@contexts/storeProvider';
import useGetNotifications from '@servers/useGetNotifications';
import { Home, NotFound, Signin, Signup, Upload, Watch } from '@pages';
import React, { Suspense, useContext, useEffect, useState } from 'react';

export default function App() {
  const [current, setCurrent] = useState(0);
  const { user } = useContext(StoreContext);
  const { data } = useGetNotifications({ enabled: !!user?._id });

  function getRevised(data) {
    return data?.filter(item => item?.isRead === false);
  }

  useEffect(() => {
    const diff = data?.data?.length - current;
    if (diff > 0) {
      const title = getRevised(data?.data)?.reverse()?.[0]?.title;
      toast.info(title, {
        position: 'bottom-left',
      });
      setCurrent(data?.data?.length);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<RequireAuth then={<Home />} />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/watch/:vId' element={<RequireAuth then={<Watch />} />} />
          {user?.role === 'creator' ? <Route path='/upload' element={<RequireAuth then={<Upload />} />} /> : <></>}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}
