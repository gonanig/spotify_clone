import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { useGetSongBySearchQuery } from '../redux/services/shazamCore'

const Search = () => {
	const { searchTerm } = useParams()
	const { activeSong, isPlaying } = useSelector((state) => state.player)
	const { data, isFetching, error, loading } =
		useGetSongBySearchQuery(searchTerm)

	const songs = data?.tracks?.hits?.map((song) => song.track)

	if (isFetching && loading) return <Loader title='Loading top charts' />
	if (error && country) return <Error />

	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10 '>
				Showing result for <span className='font-black'>{searchTerm}</span>
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{songs?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	)
}

export default Search
