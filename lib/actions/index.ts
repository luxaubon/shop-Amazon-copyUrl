"use server"


import { revalidatePath } from "next/cache";
import {scrapeAmazonProduct} from "../scraper/";

import Product from "@/lib/models/product.model";
import Users from "@/lib/models/user.model";

import {connectToDB} from "@/lib/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody,sendEmail } from "@/lib/nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {

    if(!productUrl) return;

    try{   
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) return; 
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({url: scrapedProduct.url});

        if(existingProduct){
            
            const updatedPriceHistory:any = [
                ...existingProduct.priceHistory,
                {
                    price: scrapedProduct.currentPrice,
                    date: Date.now()
                }
            ];
            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
          );
      
          revalidatePath(`/products/${newProduct._id}`);

    } catch(err) {
        throw new Error(`error scraping product DATA HERE: ${err}`);
    }
}

export async function getProductById(productId: string) {
    try {
      connectToDB();
  
      const product = await Product.findOne({ _id: productId });
  
      if(!product) return null;
  
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getAllProducts() {
    try {
      connectToDB();
  
      const products = await Product.find();
  
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getSimilarProducts(productId: string) {
    try {
      connectToDB();
  
      const currentProduct = await Product.findById(productId);
  
      if(!currentProduct) return null;
  
      const similarProducts = await Product.find({
        _id: { $ne: productId },
      }).limit(3);
  
      return similarProducts;
    } catch (error) {
      console.log(error);
    }
  }

  export async function addUserEmailToProduct(productId : string, userEmail : string){
    try{

        const product = await Product.findById(productId);

        if(!product) return;

        const userExists = product.users.some((user: User) => user.email === userEmail);

        console.log('userExists', userExists);

        if(!userExists){
            product.users.push({email: userEmail});
            await product.save();
            const emailContent = await generateEmailBody(product, "WELCOME");
            console.log('userEmail', userEmail);
            
            await sendEmail(emailContent, [userEmail]);
        }
    }catch(err){
      console.log(err);
    }

  }
export async function checkFavorite(uid : string, email: string){
    try{
      connectToDB();
      const member = await Users.findOne({ email: email });
      if(!member) return;
      const plainObject = JSON.parse(JSON.stringify(member));
      return plainObject;
    }catch(err){
      throw new Error(`error checking favorite DATA HERE: ${err}`);
    }
}
export async function checkLikeStatus(uid:string, email: string){
  try{

    connectToDB();
    const member = await Users.findOne({ email: email });

    if(!member) return;
    
    if(member){
        const plainObject = JSON.parse(JSON.stringify(member));

        const favoritelog = plainObject.favoritelog;
        const hasLog = favoritelog.includes(uid);
        if(hasLog){
          const updatedFavoritelog = favoritelog.filter((item:string) => item !== uid);
          
          const profiles = await Users.updateOne(
            { email: email },
            { $set: { favoritelog: updatedFavoritelog } }
          );
          return profiles;
          
        }else{
          const updatedFavoriteHistory = [
              ...plainObject.favoritelog,uid
          ];

          const profiles = await Users.updateOne(
            { email: email },
            { $set: { favoritelog: updatedFavoriteHistory } }
          );
          return profiles;
        }

    }

  }catch(err){
    throw new Error(`error adding favorite DATA HERE: ${err}`);
  }

}
  