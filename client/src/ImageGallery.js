import {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {Button, Container, Form, FormControl, Image, InputGroup, Modal, Row} from "react-bootstrap";
import {deleteImage, fetchImages, postNewImage, updateImage} from "./imageRepository";

const EmptyImageModel = {
    id: "",
    imageUrl: "",
    title: "",
    tags: []
}

function mockImageData() {
    return {
        images: [
            {
                id: "im-1",
                title: "Kebab",
                tags: ["Fastfood", "Ottoman", "Meat"],
                imageUrl: "https://ilovekebab.com.ua/images/kebabs/kebab-xxl-img.png"
            },
            {
                id: "im-2",
                title: "French Fries",
                tags: ["Fastfood", "Vegan", "International"],
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG"
            },
            {
                id: "im-3",
                title: "Burger",
                tags: ["Fastfood", "American", "Meat"],
                imageUrl: "https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282?k=20&m=1206323282&s=612x612&w=0&h=yatlq6BHRCCvoTzFZLSwaJc0O8Quct_tRPWtH0dj9Fc="
            }
        ]
    }
}

function containsIgnoreCase(s1, s2) {
    return s1.toLowerCase().indexOf(s2.toLowerCase()) !== -1;
}

export default function ImageGallery(props) {
    const context = useContext(AuthContext);

    const [imageData, setImageData] = useState({images: []});
    const [visibleImages, setVisibleImages] = useState({images: []});

    const [searchQuery, setSearchQuery] = useState('');

    const [deleteModel, setDeleteModel] = useState({show: false, imageId: undefined});

    const confirmDeleteModal = (imageId) => {
        deleteImage(imageId)
            .then(r => r.ok ? undefined : alert("Could not delete the image"))
            .then(() => setImageData({images: imageData.images.filter(i => i.id !== imageId)}));

        hideDeleteModal();
    };
    const hideDeleteModal = () => setDeleteModel({show: false});
    const showDeleteModal = (imageId) => setDeleteModel({show: true, imageId});

    const [modifyImageModel, setModifyImageModel] = useState({
        variant: "new",
        show: false,
        imageData: {
            ...EmptyImageModel
        }
    });

    const confirmModifyImage = (newImageData) => {
        if (modifyImageModel.variant === "modify") {
            const updateImageRequest = {
                id: newImageData.id,
                imageUrl: newImageData.imageUrl,
                title: newImageData.title,
                tags: [...newImageData.tags]
            };

            updateImage(updateImageRequest)
                .then(response => response.ok ? response.json() : alert("Could not update image"))
                .then(image => {
                    let images = imageData.images;

                    let oldImageIndex = images.findIndex(i => i.id === image.id);
                    images[oldImageIndex] = image;

                    setImageData({images});
                });
        }

        if (modifyImageModel.variant === "new") {
            const newImageRequest = {
                imageUrl: newImageData.imageUrl,
                title: newImageData.title,
                tags: [...newImageData.tags]
            };

            postNewImage(newImageRequest)
                .then(response => response.ok ? response.json() : alert("Could not create image"))
                .then(image => {
                    let images = imageData.images;

                    images.push(image);

                    setImageData({images});
                });
        }

        hideImageModel();
    }

    const hideImageModel = () => setModifyImageModel({
        ...modifyImageModel,
        show: false,
        imageData: {
            ...EmptyImageModel
        }
    })
    const showModifyImageModel = (imageId) => setModifyImageModel({
        ...modifyImageModel,
        variant: "modify",
        show: true,
        imageData: imageData.images.find(i => i.id === imageId)
    })
    const showNewImageModel = () => setModifyImageModel({
        ...modifyImageModel,
        variant: "new",
        show: true,
        imageData: {
            ...EmptyImageModel
        }
    })

    const loadImageData = useCallback(() => {
        if (context.isDesignMode) {
            setImageData(mockImageData());

            return;
        }

        fetchImages().then(response => {
            if (response.ok) {
                return response.json()
            } else {
                alert(response.error);
                return {images: []};
            }
        }).then(images => setImageData(images));
    }, [context.isDesignMode]);

    useEffect(() => {
        loadImageData();
    }, [loadImageData]);

    useEffect(() => {
        let search = searchQuery.trim();

        if (search === '') {
            setVisibleImages(imageData);

            return;
        }

        const visibleImages = imageData.images.filter(i =>
            containsIgnoreCase(i.title, searchQuery) ||
            i.tags.filter(t => containsIgnoreCase(t, searchQuery)).length > 0
        )

        setVisibleImages({images: visibleImages});
    }, [imageData, searchQuery])

    let imageViews = visibleImages.images.map((image) => (
        <Container key={image.id} className="p-4 col-sm-8 col-lg-6" style={{width: 560}}>
            <ImageCell imageId={image.id} imageUrl={image.imageUrl} tags={image.tags} title={image.title}
                       triggerDeletionModal={() => showDeleteModal(image.id)}
                       triggerModificationModel={() => showModifyImageModel(image.id)}/>
        </Container>
    ));

    return <>
        <Container>
            <DeleteImageModal show={deleteModel.show} imageId={deleteModel.imageId} cancel={hideDeleteModal}
                              confirm={confirmDeleteModal}/>
            <ModifyImageModel show={modifyImageModel.show} image={modifyImageModel.imageData}
                              variant={modifyImageModel.variant}
                              cancel={hideImageModel}
                              confirm={confirmModifyImage}/>
            <SearchBar placeholder="Search" className={'w-50 ms-auto me-auto mt-3'}
                       updateSearchQuery={setSearchQuery}/>

            {context.isAdmin && <Row className={"justify-content-center mt-3"}>
                <Button className={"text-primary fs-1 text-decoration-none col-auto bg-transparent border-0"}
                        onClick={showNewImageModel}>Add a new image</Button>
            </Row>}
            <Row>
                {imageViews}

                {imageViews.length === 0 &&
                    <p className={'text-secondary fs-3 mt-4 text-center'}>Hmm, there seem to be no images matching these
                        criteria</p>}
            </Row>
        </Container>
    </>;
}

function ImageCell(props) {
    const context = useContext(AuthContext);

    return <Container key={props.imageId} className="p-0 border-0 border shadow rounded-10">
        <Image src={props.imageUrl} fluid className="w-100 rounded-t-10 gallery-img"/>
        <Container className="px-3 pb-3 position-relative">
            <p className="mt-2 fs-4">{props.title}</p>

            <div className="hstack gap-2">
                {props.tags.map((tag) => <span key={tag} className="bg-dark text-white chip">{`#${tag}`}</span>)}
            </div>

            {context.isAdmin && <div className="position-absolute end-0 bottom-0 m-2-5">
                <Button className="bi-pencil-fill bg-transparent text-black-50 border-0 mx-1 px-2 fs-5"
                        onClick={props.triggerModificationModel}/>
                <Button className="bi-trash-fill bg-transparent text-danger border-0 mx-1 px-2 fs-5"
                        onClick={props.triggerDeletionModal}/>
            </div>}
        </Container>
    </Container>
}

function DeleteImageModal(props) {
    return <>
        <Modal show={props.show}>
            <Modal.Header className="bg-danger text-white">
                <Modal.Title>Deleting image</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.cancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => props.confirm(props.imageId)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

function ModifyImageModel(props) {
    const texts = {
        modify: {
            formTitle: "Modify an image",
            submit: "Modify"
        },
        new: {
            formTitle: "Create an image",
            submit: "Create"
        }
    }

    const [image, setImage] = useState(props.image);

    useEffect(() => {
        setImage(props.image)
    }, [props.show, props.image]);

    function handleValueChange(prop, value) {
        setImage({
            ...image,
            [prop]: value,
        });
    }

    function handleFieldChanged(e) {
        const form = e.target.closest("form");

        form.checkValidity();

        handleValueChange(e.target.name, e.target.value);
    }

    function handleTagsChanged(e) {
        let tagString = e.target.value;
        
        if (tagString === null) {
            tagString = '';
        }
        
        let tags = tagString.match(/\S+/g);

        handleValueChange(e.target.name, tags);
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget.closest(".modal-dialog").querySelector("form");

        const isValid = form.checkValidity();

        setValidated(true);

        if (isValid === false) {
            event.preventDefault();
            event.stopPropagation();

            return;
        }

        props.confirm(image);

        setValidated(false);
    };

    return <>
        <Modal show={props.show}>
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>{texts[props.variant].formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form validated={validated}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <InputGroup>
                            <Form.Control name="title" value={image.title}
                                          placeholder="e.g. Minty Kebab"
                                          minLength={3}
                                          onChange={handleFieldChanged}
                                          required/>
                            <Form.Control.Feedback type={"invalid"}>Please enter a valid name</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL</Form.Label>
                        <InputGroup>
                            <Form.Control type="url" name="imageUrl" value={image.imageUrl}
                                          placeholder={"https://example.com/img/kitten.png"}
                                          minLength={5}
                                          onChange={handleFieldChanged}/>
                            <Form.Control.Feedback type={"invalid"}>Please enter a valid url</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Space-separated tags</Form.Label>
                        <Form.Control name="tags"
                                      onChange={handleTagsChanged} required
                                      defaultValue={image.tags?.join(' ')}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={props.cancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {texts[props.variant].submit}
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

function SearchBar(props) {
    const [text, setText] = useState('');

    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            invokeTextEntered();
        }
    }

    const invokeTextEntered = () => {
        props.updateSearchQuery(text);
    }

    return <>
        <div className={`position-relative ${props.className}`}>
            <FormControl placeholder={props.placeholder}
                         onKeyUp={onKeyUp}
                         value={text}
            onChange={(e) => setText(e.target.value)}/>

            <Button className="bg-transparent text-black border-0 ms-auto position-absolute end-0 top-0"
                    onClick={invokeTextEntered}>
                <i className="bi bi-search"/>
            </Button>
        </div>
    </>
}