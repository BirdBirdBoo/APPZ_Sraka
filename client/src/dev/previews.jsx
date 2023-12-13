import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import AppNavbar from "../AppNavbar";
import ImageGallery from "../ImageGallery";
import ImageCell from "../ImageGallery";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AppNavbar">
                <AppNavbar/>
            </ComponentPreview>
            <ComponentPreview path="/ImageGallery">
                <ImageGallery/>
            </ComponentPreview>
            <ComponentPreview path="/ImageCell">
                <ImageCell/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews