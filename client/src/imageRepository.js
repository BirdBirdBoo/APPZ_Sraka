import {AuthHeader, deleteImageUrl, getImagesUrl, newImageUrl, updateImageUrl} from "./api";

export function fetchImages() {
    return fetch(getImagesUrl, {
        method: "GET"
    });
}

export function postNewImage(image) {
    return fetch(newImageUrl, {
        method: "POST",
        body: JSON.stringify(image),
        headers: new Headers({
            ...AuthHeader(),
            'Content-Type': 'application/json'
        })
    });
}

export function updateImage(image) {
    return fetch(updateImageUrl, {
        method: "PATCH",
        body: JSON.stringify(image),
        headers: new Headers({
            ...AuthHeader(),
            'Content-Type': 'application/json'
        })
    });
}

export function deleteImage(imageId) {
    return fetch(`${deleteImageUrl}?${new URLSearchParams({
        id: imageId
    })}`, {
        method: "DELETE",
        headers: new Headers({
            ...AuthHeader(),
        })
    });
}
