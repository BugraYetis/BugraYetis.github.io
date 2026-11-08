const {
  gsap,
  ScrollTrigger,
  gsap: { to, set } } =
window;

gsap.registerPlugin(ScrollTrigger);

gsap.to('.book', {
  scale: 3.2,
  scrollTrigger: {
    scrub: 1,
    duration: 3,
    start: "1100",
    end: "1300",
    markers: false,
    onUpdate: function() {
      // get the current scroll position
      const scrollPosition = this.scrollTrigger.scroll();  

      // update the top value of the .book element based on the scroll position
      gsap.set('.book', {
        top: scrollPosition * 0.5, 
      });
    },
  },
});

to('.logo', {
  scrollTrigger: {
    scrub: true,
    start: () => 13 * (window.innerHeight * 0.25),
    end: () => 14 * (window.innerHeight * 0.25) },

  opacity: 1 });


const PAGES = [...document.querySelectorAll('.book__page')];
PAGES.forEach((page, index) => {
  set(page, { z: index === 0 ? 20 : -index * 1 });
  if (index === 1) return false;
  to(page, {
    rotateY: `-=${180 - index / 13}`,
    scrollTrigger: {
      markers:false,
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * 0.50),
      end: () => (index + 2) * (window.innerHeight * 0.50) } });
 

  to(page, {
    z: index === 0 ? -13 : index,
    scrollTrigger: {
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * 0.50),
      end: () => (index + 1.5) * (window.innerHeight * 0.50) } });



gsap.to(".book",{
  scrollTrigger:{
    trigger: ".book",
    start:"top 300px",
    end:"top ",
    scrub:1,
    markers:false
  },
  x:0,
  rotationY:360,
  rotationX:360,
  ease:"none",
  duration:3
})




gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("#container .book__page").forEach((page, i) => {
  ScrollTrigger.create({
    trigger: page,
    start: "top top",
    end: "bottom top",
    markers: false,
    onEnter: () => {
      gsap.to(page, { rotationY: -180, duration: 1, ease: "power2.out" });
    },
    onEnterBack: () => {
      gsap.to(page, { rotationY: 0, duration: 1, ease: "power2.out" });
    },
  });
});

 const container = document.getElementById("container");
const scrollThreshold = 1300; 

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    container.style.overflowY = "auto";
  } else {
    container.style.overflowY = "hidden";
  }
});

});


const images = document.querySelectorAll('.carousel-image')
const radius = 200
const progress = {
  value: 0
}
const carousel = document.querySelector('.carousel')

Observer.create({
  target: carousel,
  type: "wheel,pointer",
  onPress: (self) => {
    carousel.style.cursor = 'grabbing'
  },
  onRelease: (self) => {
    carousel.style.cursor = 'grab'
  },
  onChange: (self) => {
    gsap.killTweensOf(progress)
    const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05
    gsap.to(progress, {
      duration: 2,
      ease: 'power4.out',
      value: `+=${p}`
    })
  }
})

const animate = () => {
  images.forEach((image, index) => {
    const theta = index / images.length - progress.value
    const x = -Math.sin(theta * Math.PI * 2) * radius
    const y = Math.cos(theta * Math.PI * 2) * radius
    image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta }deg)`
    const c = Math.floor(index/images.length * 360)
  })
}
gsap.ticker.add(animate)