var cursor = document.querySelector(".cursor");
var scrollIcon = document.querySelector(".icon-scroll");
var videos = document.querySelectorAll("video");
var images = document.querySelectorAll('img');
var rows = document.querySelectorAll('.page_5 .row');
var navElements = document.querySelectorAll('nav h4');
var navhover = document.querySelector('.nav_hover');
var navhoverH1 = document.querySelectorAll('.nav_hover h1');
var main = document.querySelector("main");

function locoMotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoMotiveScroll();

//++++++++++++++++++++++++++    cursor Animation on body   ++++++++++++++++++++++++++++++++

// var crsr = document.querySelector(".cursor");
// var main = document.querySelector("main");
// document.addEventListener("mousemove", function (dets) {
//   crsr.style.left = dets.x + 20 + "px";
//   crsr.style.top = dets.y + 20 + "px";
// });

document.addEventListener("mousemove", function (dets) {
  cursor.style.left = dets.x + 20 + "px";
  cursor.style.top = dets.y + 20 + "px";

  cursor.animate(
    {
      left: `${dets.x}px`,
      top: `${dets.y}px`,
    },
    { duration: 1500, fill: "forwards" }
  );
});

//++++++++++++++++++++++++++    cursor Animation on Hero section video   ++++++++++++++++++++++++++++++++

function cursorOnVideo(video, text1, text2) {
  cursor.classList.add("cursor-active");
  if (video.muted) {
    cursor.innerHTML = text1;
  } else {
    cursor.innerHTML = text2;
  }
}

videos.forEach((video) => {
  video.addEventListener("mousemove", function () {
    cursorOnVideo(video, "sound on", "sound off");
  });
});

videos.forEach((video) => {
  video.addEventListener("mouseenter", function () {
    cursorOnVideo(video, "sound on", "sound off");
  });
});

videos.forEach((video) => {
  video.addEventListener("click", function () {
    video.muted = !video.muted;
  });
});

videos.forEach((video) => {
  video.addEventListener("mouseleave", function () {
    cursor.classList.remove("cursor-active");
    cursor.innerHTML = "";
  });
});

//------------------------cursor effect on nav--------------------->

navElements.forEach((element, idx) => {
  if(idx == 0) return;

  element.addEventListener('mouseenter', function(){
      navhoverH1.forEach((h1) => {
          h1.innerHTML = "&nbsp;"+element.innerHTML+"  "+element.innerHTML+"  "+element.innerHTML+"  "+element.innerHTML+"  "+element.innerHTML;
      })
      navhover.style.display = "block";
      navhover.style.opacity = "1";
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
  })
});

document.querySelector('nav').addEventListener('mouseleave', function(){
  navhover.style.display = "none";
  navhover.style.opacity = "0";
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
})


document.querySelector(".nav_hover h1").addEventListener("mouseenter", function(){
  cursor.style.transform = "translate(-50%, -50%) scale(2)";
})

document.querySelector(".nav_hover h1").addEventListener("mouseleave", function(){
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});


//------------------ cursor effect on images ------------------>

function cursorOnImages(text){
  cursor.classList.add('cursor-active');
  cursor.innerHTML = "view";
}

images.forEach((img, idx) => {
  if(idx==0) return;
  img.addEventListener('mouseenter', function(){
      cursorOnImages("view");
      img.style.filter = "blur(2px)";
  })
});

images.forEach((img) => {
  img.addEventListener('mouseleave', function(){
      cursor.classList.remove('cursor-active');
      cursor.innerHTML = "";
      img.style.filter = "blur(0px)"
  });
});


//------------------------cursor effect on rows--------------------->

const preloadedImages = []; // Array to store preloaded images

// Preload the images and store them in the array
rows.forEach((row) => {
  const img = new Image();
  img.onload = () => {
      preloadedImages.push(img); // Add the loaded image to the array
  };
  img.src = row.dataset.image;
});


function cursorOnRows(img){
  cursor.classList.add('cursor-blend');
  cursor.classList.add('cursor-img');
  // cursor.style.backgroundImage = `url(${img.src})`;
  cursor.appendChild(img);
}

rows.forEach((row, index) => {
  if(index == 0){
      return;
  }
  row.addEventListener('mouseenter', function(){
      cursorOnRows(preloadedImages[index - 1]); // Use the preloaded image from the array
  })  
});

rows.forEach((row) => {
  row.addEventListener('mouseleave', function(){
      cursor.classList.remove('cursor-blend');
      cursor.classList.remove('cursor-img');
      // cursor.style.backgroundImage = "";
      cursor.innerHTML = "";
  });
});




//------------------------cursor effect on nav--------------------->

//-----------------------footer ----------------------------
function footerEffect( element, distance){
  var x = element.getBoundingClientRect().x;
  var y = element.getBoundingClientRect().y;
  var width = element.getBoundingClientRect().width;
  var height = element.getBoundingClientRect().height;

  var cursorX = cursor.getBoundingClientRect().x;
  var cursorY = cursor.getBoundingClientRect().y;

  var distanceX = cursorX - (x + width/2);
  var distanceY = cursorY - (y + height/2);

  if(distanceX < 0){
      distanceX = -distanceX;
  }
  if(distanceY < 0){
      distanceY = -distanceY;
  }

  var x = cursorX - x - width/2;
  var y = cursorY - y - height/2;

  if(distanceX < distance && distanceY < distance){
      element.style.transform = `translate(${x/2}px, ${y/2}px)`;
      element.children[0].style.transform = `translate(${x/11}px, ${y/11}px)`;
      element.classList.add('focus');
      cursor.style.opacity = "0";
  }
  else if(element.classList.contains('focus')){
      //make it bounce a little and then return to its original state
      element.children[0].style.transform = `translate(0px, 0px)`;
      cursor.style.opacity = "1";
      element.classList.remove('focus');

      //bouncing animation
      var bounce = gsap.timeline();
      bounce.to(element, {
          x: -x/3,
          y: -y/3,
          linear: true,
          duration: 0.2,
      })
      bounce.to(element, {
          x: x/4,
          y: y/4,
          linear: true,
          duration: 0.2,
      })
      bounce.to(element, {
          x: 0,
          y: 0,
          linear: true,
          duration: 0.1,
      })

      //--------------also move text---------------
      var bounceText = gsap.timeline();
      let text = element.children[0];

      bounceText.to(text, {
          x: -x/14,
          y: -y/14,
          linear: true,
          duration: 0.2,
      })
      bounceText.to(text, {
          x: x/20,
          y: y/20,
          linear: true,
          duration: 0.2,
      })
      bounceText.to(text, {
          x: 0,
          y: 0,
          linear: true,
          duration: 0.1,
      })

  }
}

document.addEventListener('mousemove', function(e){
  footerEffect(document.querySelector('footer .circle'), 100);
})

// footerEffect();




//++++++++++++++++++++++++++       Hero_section Animation      ++++++++++++++++++++++++++++++++
function hero_anime() {
  gsap.to(scrollIcon, {
    scrollTrigger: {
      trigger: ".page_1",
      scroller: "main",
      start: "top -2%",
      end: "top -5%",
      scrub: 2,
    },
    opacity: 0,
  });

  gsap.from(".page_1 h1,.page_1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7,
  });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_1 h1",
      scroller: "main",
      // markers:true,
      start: "top 27%",
      end: "top 0",
      scrub: 3,
    },
  });

  tl.to(
    ".page_1 h1",
    {
      x: -100,
    },
    "Hero_animation"
  );

  tl.to(
    ".page_1 h2",
    {
      x: 100,
    },
    "Hero_animation"
  );

  tl.to(
    ".page_1 video",
    {
      width: "90%",
    },
    "Hero_animation"
  );

  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_1 h1",
      scroller: "main",
      // markers:true,
      // start: "top -115%",
      start: "top -80%",
      end: "top -50%",
      scrub: 3,
    },
  });

  tl2.to("main", {
    backgroundColor: "#fff",
  });

  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_1 h1",
      scroller: "main",
      // markers:true,
      start: "top -280%",
      end: "top -300%",
      scrub: 3,
    },
  });

  tl3.to("main", {
    backgroundColor: "#0F0D0D",
  });

  // var tl4 = gsap.timeline({
  //   ScrollTrigger: {
  //     trigger: ".page_4",
  //     scroller: main,
  //     // markers: true,
  //     start: top 50%,
  //     end: top 45%,
  //     scrub: 3,
  //   },
  // });

  // tl4.to("main", {
  //   backgroundColor: "#0F0D0D",
  // })
}

hero_anime();
