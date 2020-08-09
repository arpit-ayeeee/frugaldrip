 import React, { useState} from 'react';
 import {Card, CardImg, CardBody, CardTitle, CardText,Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
 import { FadeTransform } from 'react-animation-components';
 import { Link } from 'react-router-dom';

 export const items = [
    {
      src: 'assets/images/tee.jpg',
      altText: '',
      caption: 'The drip you deserve!'
    },
    {
      src: 'assets/images/tee3.jpg',
      altText: '',
      caption: 'Aesthetics, you will fall for!'
    },
    {
      src: 'assets/images/tee2.jpg',
      altText: '',
      caption: 'Your everyday wear is on us!'
    }
  ];
 function Home(props){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides =items.map((items) => {
        return (
        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={items.src}>
            <img src={items.src} alt={items.altText} width="110%" height="400px"/>
            <CarouselCaption captionHeader={items.caption} />
        </CarouselItem>
        );
    });
    function Carousal () {
        return(
            <div className="row row-content">
                <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                { slides }
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </div>
        )
    }
    return(
        <div className="container" id="homecont"> 
            <div>
            <Carousal />
            </div>
            <div className="row align-items">
                <div className="col-12 col-md m-1">
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'}}>
                        <Link to="/about">
                            <Card className="bg-dark">
                                <CardImg src="assets/images/us.png"></CardImg>
                                <CardBody>
                                    <CardTitle className="text-light">About Us</CardTitle> 
                                    <CardText className="text-light">Know us! Always be the first to get updated with our latest drops. Subscribe to our newsletter to get the info about the latest trends and fashion on the streets by clicking on the above images!</CardText>
                                </CardBody>
                            </Card>
                        </Link>
                    </FadeTransform>
                </div>
                <div className="col-12 col-md m-1">
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'}}>
                        <Card className="bg-dark">
                            <Link to="/menu">
                                <CardImg src="assets/images/collection.jpeg"></CardImg>
                            </Link>
                            <CardBody>
                                <CardTitle className="text-light">Our Collection</CardTitle> 
                                <CardText className="text-light">We take maximum care of our customer's comfort and aesthetics. Our product is 6 oz. 100% cotton tubular. Double-needle bottom hem and sleeves. Shoulder-to-shoulder tape.</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
                <div className="col-12 col-md m-1">
                    <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'}}>

                        <Card className="bg-dark">
                            <a href="https://open.spotify.com/playlist/2WlnrJMdMWxdTntVluxZYX?si=7WkR0PRzQMSuj4Ri7pWwRg" >
                                <CardImg src="assets/images/music.jpg"></CardImg>
                            </a>
                            <CardBody>
                                <CardTitle className="text-light">Music</CardTitle> 
                                <CardText className="text-light">Check out the music which matches our swag! A collection of hip-hop music from old skool to mumble, lyrical to trap. As they say "Thou shalt not let negative energy penetrate thy aura".</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            </div>
        </div>

    );
  }

  export default Home;