import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

Swiper.use([Navigation, Pagination])

document.querySelectorAll('.stages-swiper')?.forEach(element => {
  const swiperElement = element.querySelector('.swiper')
  const swiperPrev = element.querySelector('.swiper-button-prev')
  const swiperNext = element.querySelector('.swiper-button-next')
  const swiperPagination = element.querySelector('.swiper-pagination')

  new Swiper(swiperElement, {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
      nextEl: swiperNext,
      prevEl: swiperPrev,
    },
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  })
})
