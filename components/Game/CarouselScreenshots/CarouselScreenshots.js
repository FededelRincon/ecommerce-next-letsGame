import React, { useState } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import Slider from 'react-slick';
import { map } from 'lodash';
import { BASE_PATH } from '../../../utils/constants';

const settings = {
    className: "carousel-screenshots",
    swipeToSlider: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
};

export default function CarouselScreenshots(props) {
    const { title, screenshots } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    const openImage = (url) => {
        setUrlImage(url)
        setShowModal(true);
    }

    return (
        <>
            <Slider {...settings}>
                {map(screenshots, (screenshot) => (
                    <Image 
                        key={screenshot.id}
                        src={`${BASE_PATH}${screenshot.url}`}
                        alt={screenshot.name}
                        onClick={() => openImage(screenshot.url)}
                    />
                ))}
            </Slider>
            <Modal 
                open={showModal}
                onClose={() => setShowModal(false)}
                size="large"
            >
                <Image src={`${BASE_PATH}${urlImage}`} alt={title} />
            </Modal>
        </>
    )
}
