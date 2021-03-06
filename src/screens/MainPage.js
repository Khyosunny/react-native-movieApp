import React, {useEffect} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {loadingStart, getData} from '../common/main'

import LoadingPage from '../components/Loading/Loading'
import Main from '../components/Main'
import {fetchData} from '../util/api'

export default function MainPage({navigation}) {
  const {loading, popularMovieList, nowMovieList} = useSelector(
    (state) => state.main,
    shallowEqual,
  )
  const dispatch = useDispatch()

  const lists = ['popular', 'now_playing']

  const fetchDatas = async () => {
    dispatch(loadingStart())
    try {
      const result = await fetchData(lists)
      let popular = await result.popular.filter((item) => item.overview !== '')
      popular = popular.slice(0, 10)
      let nowPlaying = await result.now_playing.slice(0, 5)
      dispatch(getData(popular, nowPlaying))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchDatas()
  }, [])

  return loading ? (
    <LoadingPage />
  ) : (
    <Main
      popularMovieList={popularMovieList}
      nowMovieList={nowMovieList}
      navigation={navigation}
    />
  )
}
