import Kyc from "../models/Kyc.js";
import AuthModel from "../models/Auth.js";

export const createKyc = async (req, res) => {
  try {
    const { cnicImage } = req.body;
    const userId = req.userId;
    // const kyc = await Kyc.create({ cnicImage, userId });
    const options = {
      method: "POST",
      url: "https://passport-ocr1.p.rapidapi.com/api/v1/ocr-passport",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "ae15d3f710msh4c8061c991ea32dp130e3cjsnf92ca2e5eaf0",
        "X-RapidAPI-Host": "passport-ocr1.p.rapidapi.com",
      },
      data: {
        image: cnicImage,
        return_portrait_image: true,
      },
    };
    // making a request to the OCR API using fetch
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(options.data),
    });
    const data = await response.json();
    let user = await AuthModel.findById(userId);
    if (data.result.date_of_birth) {
      const dob = new Date(data.result.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        return res
          .status(400)
          .send("Your age is below 18 and you are not eligible for trading");
      }
    }
    // checking if the date of expiry of the passport is valid
    if (data.result.date_of_expiry) {
      const expiry = new Date(data.result.date_of_expiry);
      const today = new Date();
      if (expiry < today) {
        return res.status(400).send("Your passport has expired");
      }
    }

    // checking if the country code of the passport is PAK
    if (data.result.country_code !== "PAK") {
      return res.status(400).send("Your passport is not Pakistani");
    }

    user.hasKYC = true;
    await user.save();
    res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getKyc = async (req, res) => {
  try {
    const userId = req.userId;
    const kyc = await Kyc.findOne({ userId });
    res.status(200).json({ kyc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
