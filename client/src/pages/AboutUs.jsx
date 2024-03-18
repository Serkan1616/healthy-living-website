import React, { useEffect } from 'react';
import image from "../img/image.jpg"
import mountain1 from "../img/mountain1.png"
import mountain2 from "../img/mountain2.png"
import mountain3 from "../img/mountain3.png"
import person from "../img/person.png"
import sky from "../img/sky.png"

const AboutUs = () => {
  useEffect(() => {
    const translate = document.querySelectorAll(".translate");
    const big_title = document.querySelector(".big-title");
    const header = document.querySelector("header");
    const shadow = document.querySelector(".shadow");
    const content = document.querySelector(".content");
    const section = document.querySelector("section");
    const image_container = document.querySelector(".imgContainer");
    const opacity = document.querySelectorAll(".opacity");
    const border = document.querySelector(".border");

    let header_height = header.offsetHeight;
    let section_height = section.offsetHeight;

    const handleScroll = () => {
      let scroll = window.pageYOffset;
      let sectionY = section.getBoundingClientRect();

      translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
      });

      opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
      });

      big_title.style.opacity = -scroll / (header_height / 2) + 1;
      shadow.style.height = `${scroll * 0.5 + 300}px`;

      content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
      image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

      border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs once after initial render
    return(
        <div className='aboutus'>
            <header>
        <nav>
            <div class="container">
                <h3 class="logo">/Healthy<span>Life</span></h3>
                
            </div>
        </nav>

        <h1 class="big-title translate" data-speed="0.1">Read More...</h1>

        <img src={person} class="person translate" data-speed="-0.25" alt=""></img>
        <img src={mountain1} class="mountain1 translate" data-speed="-0.2" alt=""></img>
        <img src={mountain2} class="mountain2 translate" data-speed="0.4" alt=""></img>
        <img src={mountain3} class="mountain3 translate" data-speed="0.3" alt=""></img>
        <img src={sky} class="sky translate" data-speed="0.5" alt=""></img>
    </header>

    <section>
        <div class="shadow"></div>

        <div class="container">
            <div class="content opacity">
                <h3 class="title">
                    About Us
                    <div class="border"></div>
                </h3>
                <p class="text">The website of healthy life is a website that all people can use for dieting, a website that helps us all change our eating style, and even change our lifestyle and be healthy.
Through this website, we can all share our blogs and use other people's blogs.</p>
            </div>

            <div class="imgContainer opacity">
                <img src={image} alt=""></img>
            </div>
        </div>
    </section>
        </div>
    )


}
export default AboutUs;