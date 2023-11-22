import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../Card/Card";
import { db, storage } from "../../../Firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../Redux/slice/productSlice";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" }
];

const initailState = {
  name: "",
  imageURL: "",
  category: "",
  brand: "",
  price: 0,
  desc: ""
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const detectForm = (id, func1, func2) => {
    if (id === "ADD") {
      return func1;
    }
    return func2;
  };
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initailState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },

      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image Uploaded Successfully.");
        });
      }
    );
  };

  const AddProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        category: product.category,
        brand: product.brand,
        price: Number(product.price),
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initailState });
      toast.success("Product upload Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        category: product.category,
        brand: product.brand,
        price: Number(product.price),
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card CardClass={styles.card}>
          <form onSubmit={detectForm(id, AddProduct, editProduct)}>
            <label>Product Name: </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Image: </label>
            <Card CardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `upload ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                // required
                placeholder="Product Image"
                onChange={(e) => handleImgChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  value={product.imageURL}
                  // required
                  name="imageURL"
                  disabled
                />
              )}
            </Card>

            <label>Product Price: </label>
            <input
              type="number"
              name="price"
              required
              placeholder="Product Price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category: </label>
            <select
              required
              name="category"
              onChange={(e) => handleInputChange(e)}
              value={product.category}
              id=""
            >
              <option value="" disabled>
                -- Choose Product Category--
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company/brand: </label>
            <input
              type="text"
              name="brand"
              required
              placeholder="Product Brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Description </label>
            <textarea
              name="desc"
              value={product.desc}
              required
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              {detectForm(id, "Save Product", "Save Edited Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
