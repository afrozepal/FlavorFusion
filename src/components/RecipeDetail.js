import {React , useRef} from 'react';
import icon from '../assets/icon.png';
import Cookies from 'js-cookie';
import { BiSolidFilePdf } from "react-icons/bi";
import {useReactToPrint } from "react-to-print";

function RecipeDetail() {
    // console.log('cookieRecipe in RecipeDetail:', cookieRecipe); // Log cookieRecipe to check their values
    const cookieRecipe = JSON.parse(Cookies.get('cookieRecipe'));

    console.log('Cookie Recipe:', cookieRecipe); // Log the cookie recipe to check its value
    
    //printing
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="RecipeDetail" ref={componentRef}>
             <div className="row align-items-center justify-content-center">
                <div className="col text-center">
                    <h1>{cookieRecipe.Title}<sub><button className="btn btn-link pdf" onClick={handlePrint}><BiSolidFilePdf/></button></sub></h1>
                    
                </div>
            </div>
            <div className="row align-items-center justify-content-center">
                <div className="col-3 d-flex justify-content-center">
                    <img src={icon} className="img-thumbnail" alt="..." />
                </div>
                <div className="col-9 mb-3">
                    <h3>Recipe Ingredients:</h3>
                    <ul>
            {cookieRecipe.Ingredients
                .slice(1, -1) // Remove the first and last square brackets
                .split(/\s(?=\d(?!-))/) // Split if a space is followed by a digit but not by a hyphen
                .map((ingredient, index) => (
                    ingredient.trim() && <li key={index}>{ingredient.trim()}</li>
                ))
            }
        </ul>
                </div>
            </div>
                <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}>
                <h3>Recipe Instructions: </h3>
                <ul >
            {cookieRecipe.Instructions.split('.').map((instruction, index) => (
                instruction.trim() && <li key={index}>{instruction.trim()}</li>
            ))}
        </ul>
                </div>
            {/* <p>Image Name: {cookieRecipe.ImageName}</p> */}
            {/* Other components */}
        </div>
    );
}

export default RecipeDetail;
