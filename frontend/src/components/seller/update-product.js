import axios from "axios";
import {useState, useEffect} from "react";
import Sidebar from './sidebar';
import { XCircle} from 'react-feather';
import { useParams } from "react-router-dom";
function UpdateProduct(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const {product_id} = useParams();
    const VendorId=localStorage.getItem('vendor_id');
    const [errorMsg,seterrorMsg]=useState('');
    const [successMsg,setsuccessMsg]=useState('');
    const [CategoryData, setCategoryData]=useState([]);
    const [ProductData, setProductData]=useState({
        "vendor":'',
        "category":'',
        "title":'',
        "slug":'',
        "detail":'',
        "price":'',
        "usd_price":'',
        "tags":'',
        "image":'',
        "demo_url":'',
        "product_file":'',
        "product_imgs":'',
    });

    const [ImgUploadErrorMsg,setImgUploadErrorMsg]=useState('');
    const [ImgUploadSuccessMsg,ImgUploadSetsuccessMsg]=useState('');

    const [IsImageDeleted, setIsImageDeleted]=useState(false);

    const [ProductImgs, setProductImgs]=useState([]);
    const [ImageSelected, setImageSelected]=useState(false);
    const [FileSelected, setFileSelected]=useState(false);
    const [MultipleFProductImageSelected, setMultipleProductImageSSelected]=useState(false);

    useEffect(()=>{
        setProductData({
            ...ProductData,
            'vendor':VendorId
        })
        fetchData(baseUrl+'/categories/');
        fetchProductData(baseUrl+'/product/'+product_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategoryData(data.results);
        });
    }

    function fetchProductData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData({
                "vendor":VendorId,
                "category":data.category,
                "title":data.title,
                "slug":data.slug,
                "detail":data.detail,
                "price":data.price,
                "usd_price":data.usd_price,
                "tags":data.tags,
                "image":data.image,
                "demo_url":data.demo_url,
                "product_file":data.product_file,
                "product_imgs":data.product_imgs,
            });
        });
    }

    const inputHandler =(event) => {
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.value
        })
    };

    const fileHandler =(event) => {
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.files[0]
        })

        if(event.target.name == 'image'){
            setImageSelected(true);
        }
        if(event.target.name == 'product_file'){
            setFileSelected(true);
        }
    };

    const multipleFilesHandler =(event) => {
        var files=event.target.files;
        if(files.length>0){
            setMultipleProductImageSSelected(true);
            setProductImgs(files);
        }
    };

    const submitHandler =(event) => {
        const formData=new FormData();
        formData.append('vendor',ProductData.vendor);
        formData.append('category',ProductData.category);
        formData.append('title',ProductData.title);
        formData.append('slug',ProductData.slug);
        formData.append('detail',ProductData.detail);
        formData.append('price',ProductData.price);
        formData.append('usd_price',ProductData.usd_price);
        formData.append('tags',ProductData.tags);
        formData.append('demo_url',ProductData.demo_url);
        
        if(ImageSelected){
            formData.append('image',ProductData.image);
        }
        if(FileSelected){
            formData.append('product_file',ProductData.product_file);
        }

        //SUBMIT DATA
        axios.patch(baseUrl+'/product/'+product_id+'/',formData,{
            headers: {
                'content-type' : 'multipart/form-data'
            }
        })
        .then(function (response){
            if(response.status==200){  
                setProductData({
                    "vendor":'',
                    "category":'',
                    "title":'',
                    "slug":'',
                    "detail":'',
                    "price":'',
                    "usd_price":'',
                    "tags":'',
                    "image":'',
                    "demo_url":'',
                    "product_file":'',
                });   
                setsuccessMsg(response.statusText);               
                seterrorMsg('');
                if(MultipleFProductImageSelected){
                    //SUBMIT IMGS
                    for(let i=0; i<ProductImgs.length; i++){
                        const ImgFormData=new FormData();
                        ImgFormData.append('product',response.data.id);
                        ImgFormData.append('image',ProductImgs[i]);

                        axios.post(baseUrl+'/product-imgs/?from_update=1',ImgFormData)
                        .then(function (response){
                            console.log(response);
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    }  
                    setProductImgs('');              
                    //end submit imgs
                }                
            }else{                
                seterrorMsg('Not successful');
                setsuccessMsg('');
            }
        })
        .catch(function(error){
            console.log(error);
        });
    };

    function deleteImage(image_id){
         //SUBMIT DATA
        axios.delete(baseUrl+'/product-img/'+image_id+'/')
        .then(function (response){
            if(response.status==204){
               window.location.reload();
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
    
    
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Update Product</h5></div>
                        <div className="card-body">  
                                {successMsg && <p className="text-success"><b>{successMsg}</b></p> } 
                                {errorMsg && <p className="text-danger"><b>{errorMsg}</b></p> }                        
                            <form>
                                <div className="mb-3">
                                    <label for="InputEmail" className="form-label">Category</label>
                                    <select className="form-control" name='category' onChange={inputHandler}>
                                        {
                                            CategoryData.map((item,index)=><option selected={item.id==ProductData.category} value={item.id}>{item.title}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="fnm" className="form-label">Title</label>
                                        <input type="text" onChange={inputHandler} value={ProductData.title} name="title"  className="form-control" id="fnm"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="fnm" className="form-label">Slug</label>
                                        <input type="text" onChange={inputHandler} value={ProductData.slug} name="slug"  className="form-control" id="fnm"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="lnm" className="form-label">Ksh Price</label>
                                        <input type="number" onChange={inputHandler} value={ProductData.price} name="price" className="form-control" id="lnm"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lnm" className="form-label">USD Price</label>
                                        <input type="number" onChange={inputHandler} value={ProductData.usd_price} name="usd_price" className="form-control" id="lnm"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">Description</label>
                                    <textarea type="text" onChange={inputHandler} value={ProductData.detail} name="detail" className="form-control" id="lnm"/>
                                </div>
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">Tags</label>
                                    <input className="form-control" type="text" onChange={inputHandler} value={ProductData.tags} name="tags" id="tags"/>
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Demo URL</label>
                                    <input className="form-control" type="text" onChange={inputHandler} value={ProductData.demo_url} name="demo_url" id="demo_url"/>
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Product File (Zip File)</label>
                                    <input className="form-control" type="file" onChange={fileHandler} name="product_file" id="product_file"/>
                                    <a href={ProductData.product_file}>{ProductData.product_file}</a>
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Featured Image</label>
                                    <input className="form-control" type="file" onChange={fileHandler} name="image" id="image"/>
                                    <img src={ProductData.image} className="img rounded border mt-2" width='200' />
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Product Images</label>
                                    <input className="form-control" type="file" multiple onChange={multipleFilesHandler} name="product_imgs" id="image"/>
                                    {
                                        ProductData.product_imgs && ProductData.product_imgs.map((img,index)=>
                                        <span onClick={()=>deleteImage(img.id)}>
                                            <i className="text-danger" role='button'><XCircle/></i>
                                            <img src={img.image} className="img rounded border mt-2 me-2" width='200' />
                                        </span>
                                    )
                                    }                                    
                                </div>
                                <button type="button" onClick={submitHandler} className="col-12 btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateProduct;