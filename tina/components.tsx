import { type Components } from "tinacms/dist/rich-text";
import Button from "../components/Button/Button";
import ButtonTemplate from "../components/Button/ButtonTemplate";
import Grid from "../components/Grid/Grid";
import GridTemplate from "../components/Grid/GridTemplate";
import Heading from "../components/Heading/Heading";
import HeadingTemplate from "../components/Heading/HeadingTemplate";
import Image from "../components/Image/Image";
import ImageTemplate from "../components/Image/ImageTemplate";
import Slideshow from "../components/Slideshow/Slideshow";
import SlideshowTemplate from "../components/Slideshow/SlideshowTemplate";
import Text from "../components/Text/Text";
import TextTemplate from "../components/Text/TextTemplate";
import CallToActionTemplate from "../components/CallToAction/CallToActionTemplate";
import CallToAction from "../components/CallToAction/CallToAction";

export const templates = [
  ButtonTemplate,
  CallToActionTemplate,
  GridTemplate,
  HeadingTemplate,
  ImageTemplate,
  SlideshowTemplate,
  TextTemplate,
];

export default {
  Button: (props: any) => {
    return <Button {...props} />;
  },
  Call_To_Action: (props: any) => {
    return <CallToAction {...props} />;
  },
  Grid: (props: any) => {
    return <Grid {...props} />;
  },
  Heading: (props: any) => {
    return <Heading {...props} />;
  },
  Image: (props: any) => {
    return <Image {...props} />;
  },
  Slideshow: (props: any) => {
    return <Slideshow {...props} />;
  },
  Text: (props: any) => {
    return <Text {...props} />;
  },
} as Components<{}>;
