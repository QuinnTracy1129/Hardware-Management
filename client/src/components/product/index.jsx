import { MDBBtn, MDBCol, MDBRow } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./product.css";
import Basic from "./basic";
import Informations from "./informations";
import Media from "./media";
import {
  SAVE,
  UPDATE,
} from "../../services/redux/slices/administrator/products";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINT } from "../../services/utilities";

const _media = {
  product: [
    { img: "", label: "Cover Photo" },
    { img: "", label: "Image 1" },
    { img: "", label: "Image 2" },
    { img: "", label: "Image 3" },
    { img: "", label: "Image 4" },
    { img: "", label: "Image 5" },
    { img: "", label: "Image 6" },
    { img: "", label: "Image 7" },
    { img: "", label: "Image 8" },
  ],

  variant: {
    name: "",
    options: [],
  },
};

const ProductInformation = ({
  setIsViewProductInformation,
  selected,
  willCreate = true,
  setWillCreate,
  setSelected,
}) => {
  const { token } = useSelector(({ auth }) => auth);
  const [media, setMedia] = useState(_media);
  const [form, setForm] = useState({ isPerKilo: false });
  const [variations, setVariations] = useState([]);
  const disptach = useDispatch();

  const imgToBase64 = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          `Failed to fetch image: ${url}, status: ${response.status}`
        );
        return false;
      }

      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) {
        return false;
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Error converting image to base64: ${error}`);
      return false;
    }
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!willCreate && isMounted) {
        const {
          hasVariant,
          variations = [],
          media: mediaSelected = {},
        } = selected || {};

        const { variant = {}, product: productImages } = mediaSelected || {};

        if (hasVariant) {
          const getTheImageOfOptions = async () => {
            const promises = variant?.options?.map(async ({ label, _id }) => {
              const img = `${ENDPOINT}/assets/products/${selected._id}/variant/${_id}.jpg`;
              const base64 = await imgToBase64(img);
              return {
                label,
                _id,
                img: base64 || "",
                preview: base64 ? img : "",
              };
            });

            const result = await Promise.all(promises);
            return result;
          };

          const optionsWithImages = await getTheImageOfOptions();

          setMedia((prev) => ({
            ...prev,
            variant: { options: optionsWithImages },
          }));
        }

        const getTheImageOfProduct = async () => {
          for (const { label } of productImages) {
            const img = `${ENDPOINT}/assets/products/${selected._id}/${label}.jpg`;
            const base64 = await imgToBase64(img);

            if (base64) {
              setMedia((prev) => {
                const newProductImgs = [...prev.product];
                const indexProduct = newProductImgs.findIndex(
                  ({ label: pLabel }) => pLabel === label
                );

                newProductImgs[indexProduct] = {
                  ...newProductImgs[indexProduct],
                  preview: img,
                  img: base64,
                };

                return { ...prev, product: newProductImgs };
              });
            }
          }
        };
        await getTheImageOfProduct();

        setVariations(variations);
        setForm(selected);
      }
    };

    fetchData();
    return () => {
      isMounted = false; // Itigil ang pag-update ng estado kapag unmounted na ang component
    };
  }, [willCreate, selected]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, transferIndex) => {
    e.preventDefault();

    const {
      img,
      index: originalIndex,
      title,
    } = JSON.parse(e.dataTransfer.getData("text/plain"));

    const copyLabels =
      title === "product" ? media.product : media.variant?.options;

    if (transferIndex <= copyLabels.length - 1) {
      const { preview: image = "", img: transferImg } =
        copyLabels[transferIndex];

      const getLabel = (index) => copyLabels[index]?.label;

      copyLabels[transferIndex] = {
        label: getLabel(transferIndex),
        img: copyLabels[originalIndex]?.img,
        preview: img,
      };

      copyLabels[originalIndex] = {
        label: getLabel(originalIndex),
        preview: image,
        img: transferImg,
      };

      if (title === "variant") {
        setMedia({
          ...media,
          variant: { ...media.variant, options: copyLabels },
        });
      } else {
        setMedia({
          ...media,
          product: copyLabels,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coverPhoto = media.product.find(
      ({ label }) => label === "Cover Photo"
    );

    if (!coverPhoto.img)
      return Swal.fire({
        title: "Cover Photo is Required",
        text: "Please Upload a Cover Photo!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // Add any actions you want to take when the user confirms
        }
      });
    const productsImages = media?.product
      .map((product) => (product.img ? product : ""))
      .filter(Boolean);

    const newForm = {
      ...form,
      hasVariant: variations.length > 0 ? true : false,
      has2Variant: variations.length === 2 ? true : false,
      variations: variations,
      media: { ...media, product: productsImages },
    };
    const title = willCreate ? "publish" : "Update";
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${title} this product!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${title} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (willCreate) {
          disptach(SAVE({ token, data: newForm }));
        } else {
          disptach(UPDATE({ token, data: newForm }));
        }
        handleClearForm();
        Swal.fire({
          title: "Success!",
          text: `Your product has been ${title}.`,
          icon: "success",
        });
      }
    });
  };

  const handleClearForm = () => {
    setIsViewProductInformation(false);
    setMedia(_media);
    setVariations([]);
    setForm({ isPerKilo: false });
    setWillCreate(true);
    setSelected({});
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Basic form={form} setForm={setForm} selected={selected} />
        <Informations
          variations={variations}
          setVariations={setVariations}
          form={form}
          setForm={setForm}
          media={media}
          setMedia={setMedia}
        />
        <Media
          dragOver={dragOver}
          handleDrop={handleDrop}
          media={media}
          setMedia={setMedia}
          variations={variations}
        />
        <MDBRow>
          <MDBCol md="12" className="d-flex justify-content-end mt-3 mr-5">
            <MDBBtn color="white" onClick={handleClearForm}>
              Cancel
            </MDBBtn>
            <MDBBtn color="primary" type="submit">
              {willCreate ? "Publish" : "Update"}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    </>
  );
};

export default ProductInformation;
