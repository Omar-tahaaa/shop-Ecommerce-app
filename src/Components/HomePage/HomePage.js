import Products from "../Products/products";
import SimpleSlider from "../Slider/Slider";
import Title from "./Title";

export default function HomePage() {
  return (
    <>
      <SimpleSlider />
      <Title title="SEE OUR PRODUCTS"/>
      <Products />
    </>
  );
}
