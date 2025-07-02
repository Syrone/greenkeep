import Swiper from 'swiper'
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules'

Swiper.use([Navigation, Pagination, FreeMode, Thumbs])

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
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  })
})

document.querySelectorAll('.objects-swiper')?.forEach(element => {
  const swiperParentElement = element.querySelector('.swiper')
  const swiperParentPrev = element.querySelector('.objects-swiper-prev')
  const swiperParentNext = element.querySelector('.objects-swiper-next')
  const swiperParentPagination = element.querySelector('.objects-swiper-pagination')

  new Swiper(swiperParentElement, {
    slidesPerView: 1,
    spaceBetween: 24,
    autoHeight: true,
    navigation: {
      nextEl: swiperParentNext,
      prevEl: swiperParentPrev,
    },
    pagination: {
      el: swiperParentPagination,
      clickable: true,
    },
  })
})

document.querySelectorAll('.objects-card-swiper')?.forEach(element => {
  const swiperMainElement = element.querySelector('.objects-card-main .swiper')
  const swiperThumbElement = element.querySelector('.objects-card-thumb .swiper')
  const swiperMainPagination = element.querySelector('.objects-card-main .swiper-pagination')

  const thumbSwiper = new Swiper(swiperThumbElement, {
    slidesPerView: 3,
    spaceBetween: 16,
    nested: true,
    freeMode: true,
    watchSlidesProgress: true,
  })

  new Swiper(swiperMainElement, {
    spaceBetween: 24,
    nested: true,
    pagination: {
      el: swiperMainPagination,
      clickable: true,
    },
    thumbs: {
      swiper: thumbSwiper,
    },
  })
})

document.querySelectorAll('.reviews-swiper')?.forEach(element => {
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

document.querySelectorAll('.letters-swiper')?.forEach(element => {
  const swiperElement = element.querySelector('.swiper')
  const swiperPrev = element.querySelector('.swiper-button-prev')
  const swiperNext = element.querySelector('.swiper-button-next')
  const swiperPagination = element.querySelector('.swiper-pagination')

  new Swiper(swiperElement, {
    slidesPerView: 'auto',
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
        spaceBetween: 8,
      },
      576: {
        spaceBetween: 8,
      },
      992: {
        spaceBetween: 24,
      },
    }
  })
})
