import React, { Fragment, useEffect, useState } from 'react'
import { Box, Text, Icon } from '@chakra-ui/react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { Carousel } from 'react-responsive-carousel'

interface userInfo {
  cardId: number
  uid: number
  photos: string[]
}

var focusCardState = 0

const areEqual = (nextProps, nextState) => {
  focusCardState = nextState.focusCard
  return true
};

const SwipeCard = React.memo((props: { onSwipe: any, onDragChange: any, userInfo: userInfo, focusCard: number }) => {
  useEffect(() => {
    return () => {
      this
    }
  }, [])
  const { onSwipe, onDragChange, userInfo, focusCard } = props;
  focusCardState = focusCard
  var swiped = false
  var selectedPhotoNum = 0

  function CardAnimate(props: { this: any }): JSX.Element {
    const timeout = 400
    const cardXpx = 300
    const [selectedPhoto, setSelectedPhoto] = useState(0);

    const firstTo = () => ({ x: 0, y: 0, scale: 1, opacity: 1 })
    const firstFrom = () => ({ x: 0, rot: 0, scale: 1.5, y: -100, opacity: 0, likeOpacity: 0, dislikeOpacity: 0 })
    const to = () => ({ x: 0, y: 0, scale: 1, opacity: 1, delay: 200 })
    const from = () => ({ x: 0, rot: 0, scale: 1, y: 0, opacity: 0, likeOpacity: 0, dislikeOpacity: 0 })

    const [card, set] = useSpring(() => (
      (userInfo.cardId == 0 ? { ...firstTo(), from: firstFrom(), config: config.default } : { ...to(), from: from() })))
    const [gone] = useState(() => new Set())

    var dragState = false
    const bind = useDrag(({ dragging: isDrag, args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      if (dragState != isDrag) {
        dragState = isDrag
        onDragChange(dragState)
      }

      const trigger = velocity > 0.2
      const dir = xDir < 0 ? -1 : 1
      if (!down && trigger) gone.add(index)
      set.start(() => {
        const isGone = gone.has(index)
        const x = isGone ? (cardXpx + window.innerWidth) * dir : down ? mx : 0
        const rot = down ? mx / 50 + (isGone ? dir * 10 * velocity : 0) : 0
        const scale = down ? 1.1 : 1
        const likeOpacity = x / 100
        const dislikeOpacity = -x / 100
        if (isGone && (x >= window.innerWidth || x <= -window.innerWidth)) {
          setTimeout(() => { onSwipe((mx < 0) ? ['left', userInfo.photos.length] : ['right', userInfo.photos.length]) }, timeout)

        }
        return { x, rot, scale, likeOpacity, dislikeOpacity, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
      })
    }, { filterTaps: true })

    useEffect(() => {
      function keySwipe(e: { keyCode: number }) {
        if (focusCardState == userInfo.cardId && !swiped) {
          switch (e.keyCode) {
            case 37: {
              //leftArrow
              swiped = true
              set.start({ x: -window.innerWidth - cardXpx, rot: -20, scale: 1, likeOpacity: 0, dislikeOpacity: 15, config: { friction: 50, tension: 200 } })
              setTimeout(() => { onSwipe(['left', userInfo.photos.length]) }, timeout)
              break
            }
            case 38: {
              if (selectedPhotoNum < userInfo.photos.length - 1) {
                selectedPhotoNum += 1
              }
              setSelectedPhoto(selectedPhotoNum)
              break
            }
            case 39: {
              //rightArrow
              swiped = true
              set.start({ x: window.innerWidth + cardXpx, rot: 20, scale: 1, likeOpacity: 15, dislikeOpacity: 0, config: { friction: 50, tension: 200 } })
              setTimeout(() => { onSwipe(['right', userInfo.photos.length]) }, timeout)
              break
            }
            case 40: {
              if (selectedPhotoNum > 0) {
                selectedPhotoNum -= 1
              }
              setSelectedPhoto(selectedPhotoNum)
              break
            }
          }
        }
      }
      window.addEventListener('keydown', keySwipe)
      return () => window.removeEventListener('keydown', keySwipe)
    }, [])

    return <>
      <animated.div {...bind(card)}
        style={{ x: card.x, y: card.y, opacity: card.opacity, rotate: card.rot, scale: card.scale, position: 'absolute' }}>
        <Box w='40vh'
          className='disableHighlight' >
          <Carousel showArrows={true}
            selectedItem={selectedPhoto}
            showThumbs={false}
            transitionTime={0}
            useKeyboardArrows={false}
            autoPlay={false}
            swipeable={false}
            className='disableHighlight borderRadius'>
            {userInfo.photos.map((photo: React.Key) => <img key={photo} src={"data:image/png;base64, " + photo} />)}
          </Carousel>
          <animated.div style={{ opacity: card.likeOpacity }}>
            <Icon
              width='5vh'
              height='5vh'
              viewBox="0 0 47 47"
              pointerEvents='none'
              bottom='1%'
              left='1%'
              position='absolute'>
              <path fill='#01df8a' d="M34.199,3.83c-3.944,0-7.428,1.98-9.51,4.997c0,0-0.703,1.052-1.818,1.052c-1.114,0-1.817-1.052-1.817-1.052
                          c-2.083-3.017-5.565-4.997-9.51-4.997C5.168,3.83,0,8.998,0,15.376c0,1.506,0.296,2.939,0.82,4.258
                          c3.234,10.042,17.698,21.848,22.051,22.279c4.354-0.431,18.816-12.237,22.052-22.279c0.524-1.318,0.82-2.752,0.82-4.258
                          C45.743,8.998,40.575,3.83,34.199,3.83z"/>
            </Icon>
          </animated.div>
          <animated.div style={{ opacity: card.dislikeOpacity }}>
            <Icon
              width='5vh'
              height='5vh'
              viewBox="0 0 300 300"
              pointerEvents='none'
              bottom='1%'
              right='1%'
              position='absolute'>
              <path fill='#ff4848' d="M149.18,242.567l-21.658-62.082c-0.762-2.188-0.762-4.572,0-6.761l21.699-62.208l-10.666-61.165
			                  c-14.545-16.285-35.674-26.563-59.174-26.563C35.611,23.789,0,59.398,0,103.17c0,23.083,7.848,46.557,23.324,69.772
		                  	c12.014,18.02,28.664,35.957,49.488,53.31c32.584,27.153,64.721,44.107,70.285,46.96L149.18,242.567z"/>
              <path fill='#ff4848' d="M217.619,23.789c-23.076,0-43.871,9.906-58.385,25.683l10.664,61.146c0.301,1.722,0.156,3.492-0.42,5.143l-21.398,61.346
			                  l21.398,61.339c0.604,1.728,0.732,3.583,0.377,5.378l-4.604,23.191c13.398-7.66,36.059-21.696,58.938-40.762
			                  c20.824-17.354,37.475-35.29,49.488-53.311C289.154,149.727,297,126.253,297,103.17C297,59.398,261.391,23.789,217.619,23.789z"/>
            </Icon>
          </animated.div>
          {/* <Text fontSize='large' textColor='white' position='absolute' left='50%' top='80%'>id:{userInfo.uid}</Text> */}
        </Box>
      </animated.div>
    </>
  }

  return (
    <Fragment>
      <CardAnimate this={this} />
    </Fragment>
  )
}, areEqual)

export default SwipeCard;