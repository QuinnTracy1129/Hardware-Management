import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBModalBody, MDBModal } from "mdbreact";
import { ENDPOINT } from "../../../../../services/utilities";
import { FullView } from "./fullView";
import { InformationView } from "./informationView";

const View = ({ isView, toggleView, selected, setIsView }) => {
  const [images, setImages] = useState([]),
    [variant1, setVariant1] = useState(""),
    [variant2, setVariant2] = useState(""),
    [kilo, setKilo] = useState(1),
    [kiloGrams, setKiloGrams] = useState(0),
    [quantity, setQuantity] = useState(1),
    [isFullView, setIsFullView] = useState(false),
    [imgForFullView, setImgForFullView] = useState({}),
    [baseImages, setBaseImages] = useState([]),
    [storageOfRemoveImages, setStorageOfRemoveImages] = useState([]),
    thumbnailsPerPage = 4,
    [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (isView) {
      const { media } = selected;
      const productImages = media.product.map(({ label }) => ({
        large: `${ENDPOINT}/assets/products/${selected._id}/${label}.jpg`,
        thumb: `${ENDPOINT}/assets/products/${selected._id}/${label}.jpg`,
        label,
      }));

      const variantImages = media.variant?.options?.map(({ _id }) => ({
        large: `${ENDPOINT}/assets/products/${selected._id}/variant/${_id}.jpg`,
        thumb: `${ENDPOINT}/assets/products/${selected._id}/variant/${_id}.jpg`,
        label: _id,
      }));
      setBaseImages([]);

      setImages([...productImages, ...variantImages]);
      setBaseImages([...productImages, ...variantImages]);
      setSelectedImage(productImages[0]);
      setStorageOfRemoveImages([]);
      setVariant1("");
      setVariant2("");
      setKilo(1);
      setKiloGrams(0);
      setQuantity(1);
    }
  }, [selected, isView]);

  const handleClickThumbnail = (largeImage) => {
    setSelectedImage(largeImage);
  };

  const nextPage = () => {
    const _images = [...images];
    const _removeImages = [...storageOfRemoveImages];
    const removedImage = _images.shift();
    _removeImages.push(removedImage);
    setImages(_images);
    setStorageOfRemoveImages(_removeImages);
  };

  const prevPage = () => {
    const _images = [...images];
    const _removeImages = [...storageOfRemoveImages];
    const lastIndex = _removeImages.length - 1;
    _images.unshift(_removeImages[lastIndex]);
    _removeImages.splice(lastIndex, 1);
    setImages(_images);
    setStorageOfRemoveImages(_removeImages);
  };

  const totalPages = Math.ceil(images.length / thumbnailsPerPage);
  const currentThumbnails = images.slice(0, 0 + 4);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected.hasVariant) {
      if (selected.has2Variant) {
        if (!variant1 || !variant2)
          return Swal.fire({
            title: "Please choose a variant",
            text: "You need to select a variant before proceeding.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
      } else {
        if (!variant1)
          return Swal.fire({
            title: "Please choose a variant",
            text: "You need to select a variant before proceeding.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
      }
    }
  };

  console.log('test')

  return (
    <MDBModal isOpen={isView} toggle={toggleView} backdrop size="xl">
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          {isFullView ? (
            <FullView
              images={baseImages}
              setIsFullView={setIsFullView}
              imgForFullView={imgForFullView}
              selected={selected}
            />
          ) : (
            <InformationView
              selected={selected}
              baseImages={baseImages}
              selectedImage={selectedImage}
              setIsFullView={setIsFullView}
              toggleView={toggleView}
              variant1={variant1}
              setVariant1={setVariant1}
              storageOfRemoveImages={storageOfRemoveImages}
              currentThumbnails={currentThumbnails}
              prevPage={prevPage}
              handleClickThumbnail={handleClickThumbnail}
              nextPage={nextPage}
              totalPages={totalPages}
              setIsView={setIsView}
              setSelectedImage={setSelectedImage}
              setImgForFullView={setImgForFullView}
              variant2={variant2}
              setVariant2={setVariant2}
              quantity={quantity}
              setQuantity={setQuantity}
              kilo={kilo}
              setKilo={setKilo}
              kiloGrams={kiloGrams}
              setKiloGrams={setKiloGrams}
            />
          )}
        </form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default View;
