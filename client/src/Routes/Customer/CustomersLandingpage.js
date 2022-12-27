import React , {useState} from 'react';
import { Link } from "react-router-dom";
import "./Customer.css";
// Added
import { Divider } from "@mui/material";
import ProductCategory from "./ProductCategory";
import OffersCarousel from "./OffersCarousel";
import BannerCarousel from "./BannerCarousel";
import Feedback from "./Feedback";
import ViewOffers from "../../components/ViewOffers"

const CustomersLandingpage = () => {
  const [open, setOpen] = useState()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="customers_landing_page">

<div className="offerCarousel-container">
<OffersCarousel/>
</div>

      <Divider className="divider" textAlign="left">
        Live markets
      </Divider>
      <div className="live-market">
        <div className="market">
          <img src="https://media.timeout.com/images/105263065/750/422/image.jpg" />
          <h5>Market Name</h5>
          <p>00:00 am - 00:00 pm</p>
          <div className="btn-holder">
            <ViewOffers handleClose={handleClose} handleOpen={handleOpen} open={open}/>
            <button className="btn">Get Direction</button>
          </div>
        </div>
        <div className="market">
          <img src="https://media.timeout.com/images/105263065/750/422/image.jpg" />
          <h5>Market Name</h5>
          <p>00:00 am - 00:00 pm</p>
          <div className="btn-holder">
          <ViewOffers handleClose={handleClose} handleOpen={handleOpen} open={open}/>
            <button className="btn">Get Direction</button>
          </div>
        </div>
        <div className="market">
          <img src="https://media.timeout.com/images/105263065/750/422/image.jpg" />
          <h5>Market Name</h5>
          <p>00:00 am - 00:00 pm</p>
          <div className="btn-holder">
          <ViewOffers handleClose={handleClose} handleOpen={handleOpen} open={open}/>
            <button className="btn">Get Direction</button>
          </div>
        </div>
      </div>
      <Divider className="divider" textAlign="left">
        Product Categories
      </Divider>
      <div className="product-categories">
        <div className="categories-holder">
          <ProductCategory
          link="./customerhome"
            imgsrc="https://post.healthline.com/wp-content/uploads/2020/08/fruits-and-vegetables-thumb.jpg"
            firstHalfTitle="Fruits And"
            secHalfTitle="Vegetables"
          />
          <ProductCategory
          link="./customersnacks"
            imgsrc="https://cdn.shopify.com/s/files/1/0405/5164/5352/files/banner_300x.jpg?v=1647631081"
            firstHalfTitle="Snacks"
          />
          <ProductCategory
            imgsrc="https://pibindia.files.wordpress.com/2016/12/istock_000020447381_medium.jpg?w=1400"
            firstHalfTitle="Pulses &"
            secHalfTitle="Grains"
          />
          <ProductCategory
            imgsrc="https://static.vecteezy.com/system/resources/thumbnails/007/558/975/small/nature-organic-product-logo-with-hand-and-leaf-design-template-free-vector.jpg"
            firstHalfTitle="Organic"
            secHalfTitle="Products"
          />
          <ProductCategory
            imgsrc="https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg"
            firstHalfTitle="Dairy"
            secHalfTitle="Products"
          />
          <ProductCategory
            imgsrc="https://m.media-amazon.com/images/I/71RySHlAMbL._UY550_.jpg"
            firstHalfTitle="Fashion"
          />
          <ProductCategory
            imgsrc="https://m.media-amazon.com/images/I/91gbfULvW0L._AC_SL1500_.jpg"
            firstHalfTitle="Toys & "
            secHalfTitle="Baby Products"
          />
          <ProductCategory
            imgsrc="https://imgmedia.lbb.in/media/2019/08/5d596136e2f8fb4ec61e9405_1566138678272.jpg"
            firstHalfTitle="Furniture"
          />
          <ProductCategory
            imgsrc="https://www.popoptiq.com/wp-content/uploads/2019/01/13-26-1.jpg.webp"
            firstHalfTitle="Fun & "
            secHalfTitle="Entertaimentniture"
          />
        </div>
      </div>
      <Divider className="divider" textAlign="left">
        Top Selling Products
      </Divider>
      <div className="top-product">
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
      </div>
      <div className="banner-carousel-container">
        <BannerCarousel/>
      </div>
      <Divider className="divider" textAlign="left">
        Feedback
      </Divider>
      <div className="feedback-container">
      <Feedback/>
      </div>
    </div>
  );
};

export default CustomersLandingpage;
